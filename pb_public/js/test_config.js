// 配置文件 
// PocketBase CMS 配置文件

// API 配置
const PB_API_URL = 'http://127.0.0.1:8090';

// 初始化 PocketBase 客户端
const pb = new PocketBase(PB_API_URL);

// 应用配置
const APP_CONFIG = {
    siteName: 'PocketCMS',
    pageSize: 12,
    upload: {
        maxSize: 2 * 1024 * 1024 * 1024,
        chunkSize: 5 * 1024 * 1024,
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
        shared: { name: '指定分享', icon: 'fa-share-alt', color: 'blue' }
    }
};

// 获取内容类型显示文本
function getTypeText(type) {
    return APP_CONFIG.contentTypes[type]?.name || type;
}

// 获取内容类型图标
function getTypeIcon(type) {
    return APP_CONFIG.contentTypes[type]?.icon || 'fa-file';
}

// 获取可见性显示文本
function getVisibilityText(visibility) {
    return APP_CONFIG.visibilityTypes[visibility]?.name || visibility;
}

// 获取可见性图标
function getVisibilityIcon(visibility) {
    return APP_CONFIG.visibilityTypes[visibility]?.icon || 'fa-eye';
}

// 格式化日期
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

// HTML 转义
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 显示通知消息
function showNotification(message, type = 'info') {
    // 移除已有的通知
    const oldNotify = document.querySelector('.notification');
    if (oldNotify) oldNotify.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.innerHTML = '<i class="fas ' + 
        (type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle') + 
        '"></i><span>' + escapeHtml(message) + '</span>';
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.remove();
    }, 3000);
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const later = function() {
            clearTimeout(timeout);
            func();
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 检查用户是否已登录
function isAuthenticated() {
    return pb.authStore.isValid;
}

// 获取当前用户
function getCurrentUser() {
    return pb.authStore.model;
}

// 检查是否为管理员
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// 登出
async function logout() {
    pb.authStore.clear();
    localStorage.removeItem('rememberMe');
    showNotification('已退出登录', 'success');
    setTimeout(function() {
        window.location.href = '/login.html';
    }, 1000);
}

// 获取用户显示名称（优先使用昵称）
function getUserDisplayName(user) {
    if (!user) return '用户';
    if (user.name && user.name.trim() !== '') {
        return user.name;
    }
    return user.email || '用户';
}

// 判断用户是否为管理员
function isAdminUser(user) {
    return user && user.role === 'admin';
}
