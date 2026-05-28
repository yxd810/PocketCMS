// PocketBase CMS 配置文件

// ========================================
// 全局 PocketBase 客户端（唯一声明位置）
// ========================================
// 使用 var 使其成为全局变量，避免重复声明错误
if (typeof pb === 'undefined') {
    var pb = new PocketBase('/');
}

// 应用配置
const APP_CONFIG = {
    siteName: 'PocketCMS',
    pageSize: 12,
    upload: {
        maxSize: 2 * 1024 * 1024 * 1024, // 2GB
        chunkSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'application/pdf']
    },
    contentTypes: {
        article: { name: '文章', icon: 'fa-newspaper', color: 'blue' },
        note: { name: '笔记', icon: 'fa-pen', color: 'yellow' },
        file: { name: '文件', icon: 'fa-file', color: 'green' }
    },
    visibilityTypes: {
        public: { name: '公开', icon: 'fa-globe', color: 'green' },
        private: { name: '私有', icon: 'fa-lock', color: 'red' },
        shared: { name: '分享', icon: 'fa-share-alt', color: 'blue' }
    }
};

// 辅助函数
function getTypeText(type) {
    return APP_CONFIG.contentTypes[type]?.name || type;
}

function getTypeIcon(type) {
    return APP_CONFIG.contentTypes[type]?.icon || 'fa-file';
}

function getVisibilityText(visibility) {
    return APP_CONFIG.visibilityTypes[visibility]?.name || visibility;
}

function getVisibilityIcon(visibility) {
    return APP_CONFIG.visibilityTypes[visibility]?.icon || 'fa-eye';
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
    if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
    if (diff < 604800000) return Math.floor(diff / 86400000) + '天前';
    
    return date.getFullYear() + '-' + 
           String(date.getMonth() + 1).padStart(2, '0') + '-' + 
           String(date.getDate()).padStart(2, '0');
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    const old = document.querySelector('.notification');
    if (old) old.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    notification.innerHTML = `<i class="fas ${icon}"></i><span>${escapeHtml(message)}</span>`;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function isAuthenticated() {
    return pb.authStore.isValid;
}

function getCurrentUser() {
    return pb.authStore.model;
}

function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

function getUserDisplayName(user) {
    if (!user) return '用户';
    if (user.name && user.name.trim() !== '') {
        return user.name;
    }
    return user.email || '用户';
}

// ========================================
// 页面权限检查函数
// ========================================

function requireAuth() {
    if (!pb.authStore.isValid) {
        window.location.href = '/login.html';
        return false;
    }
    return true;
}

function requireAdmin() {
    if (!pb.authStore.isValid) {
        window.location.href = '/login.html';
        return false;
    }
    const user = pb.authStore.model;
    if (user.role !== 'admin') {
        alert('您没有管理员权限');
        window.location.href = '/';
        return false;
    }
    return true;
}

function redirectIfLoggedIn() {
    if (pb.authStore.isValid) {
        window.location.href = '/';
        return true;
    }
    return false;
}

// ========================================
// 暗色主题功能
// ========================================

// 初始化主题
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }
}

// 更新主题图标
function updateThemeIcon(isDark) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        if (isDark) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// 切换主题
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

// 页面加载时初始化（确保 DOM 加载完成后执行）
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

// ========================================
// 图片压缩配置与函数
// ========================================

const IMAGE_COMPRESS_CONFIG = {
    // 用户头像 - 显示尺寸150px，压缩至300px适配Retina
    avatar: {
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.8,
        outputFormat: 'image/jpeg'
    },
    // 内容封面 - 卡片封面和详情页使用
    cover: {
        maxWidth: 800,
        maxHeight: 0,
        quality: 0.75,
        outputFormat: 'image/jpeg'
    },
    // 内容插图（编辑器插入）
    editor: {
        maxWidth: 1200,
        maxHeight: 0,
        quality: 0.7,
        outputFormat: 'image/jpeg'
    },
    // 文件管理图片 - 不压缩，保留原图供下载
    file_manager: {
        compress: false
    }
};

/**
 * 压缩图片
 * @param {File} file - 原始图片文件
 * @param {string} type - 图片类型 (avatar/cover/editor/file_manager)
 * @returns {Promise<File>} 压缩后的文件
 */
async function compressImage(file, type) {
    const config = IMAGE_COMPRESS_CONFIG[type];
    
    if (!config || config.compress === false || !file.type.startsWith('image/')) {
        return file;
    }
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                let width = img.width;
                let height = img.height;
                
                // 计算缩放尺寸
                if (config.maxWidth > 0 && width > config.maxWidth) {
                    height = (height * config.maxWidth) / width;
                    width = config.maxWidth;
                }
                if (config.maxHeight > 0 && height > config.maxHeight) {
                    width = (width * config.maxHeight) / height;
                    height = config.maxHeight;
                }
                
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                canvas.toBlob((blob) => {
                    const compressedFile = new File([blob], file.name, {
                        type: config.outputFormat || file.type,
                        lastModified: Date.now()
                    });
                    compressedFile.originalSize = file.size;
                    compressedFile.compressedSize = blob.size;
                    console.log(`📷 ${type} 图片压缩: ${(file.size/1024).toFixed(1)}KB → ${(blob.size/1024).toFixed(1)}KB`);
                    resolve(compressedFile);
                }, config.outputFormat, config.quality);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}