// 公共导航栏组件
// 依赖：config.js 中初始化的全局 pb 变量

async function loadNavbar() {
    const container = document.getElementById('navbar-container');
    if (!container) return;
    
    const isLoggedIn = pb.authStore.isValid;
    const currentUser = pb.authStore.model;
    
    function getUserDisplayName() {
        if (!currentUser) return '用户';
        if (currentUser.name && currentUser.name.trim() !== '') {
            return currentUser.name;
        }
        return currentUser.email || '用户';
    }
    
    const isAdminUser = currentUser && currentUser.role === 'admin';
    
    let navHtml = '';
    
    if (isLoggedIn) {
        // 已登录用户导航栏
        navHtml = `
            <nav class="navbar">
                <div class="nav-container">
                    <a href="/" class="logo">
                        <i class="fas fa-cube"></i>
                        <span id="siteName">PocketCMS</span>
                    </a>
                    <button class="mobile-menu-btn" id="mobileMenuBtn">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="nav-menu" id="navMenu">
                        <a href="/" class="nav-link" data-nav="home">首页</a>
                        <a href="/content-list.html" class="nav-link" data-nav="content">我的内容</a>
                        <a href="/files.html" class="nav-link" data-nav="files">文件管理</a>
                        <div class="nav-user">
                            <a href="/profile.html" class="user-name">${escapeHtml(getUserDisplayName())}</a>
                            ${isAdminUser ? 
                                `<a href="/admin/index.html" class="admin-icon" title="管理后台">
                                    <i class="fas fa-crown" style="color: #f59e0b;"></i>
                                </a>` : 
                                ''
                            }

                            <button class="theme-toggle" onclick="toggleTheme()" title="切换主题">
                                <i class="fas fa-moon"></i>
                            </button>
                            <button class="logout-btn" onclick="handleLogout()">
                                <i class="fas fa-sign-out-alt"></i> 退出
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    } else {
        // 未登录用户导航栏
        navHtml = `
            <nav class="navbar">
                <div class="nav-container">
                    <a href="/" class="logo">
                        <i class="fas fa-cube"></i>
                        <span id="siteName">PocketCMS</span>
                    </a>
                    <button class="mobile-menu-btn" id="mobileMenuBtn">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="nav-menu" id="navMenu">
                        <a href="/" class="nav-link" data-nav="home">首页</a>
                        <a href="/login.html" class="nav-link">登录</a>
                        <a href="/register.html" class="nav-link">注册</a>
                        <button class="theme-toggle" onclick="toggleTheme()" title="切换主题">
                            <i class="fas fa-moon"></i>
                        </button>
                    </div>
                    
                </div>
            </nav>
        `;
        // 重新绑定主题切换按钮（因为 DOM 被替换了）
        const themeBtn = document.querySelector('.theme-toggle');
        if (themeBtn) {
            // 移除旧监听器，添加新监听器
            const newThemeBtn = themeBtn.cloneNode(true);
            themeBtn.parentNode.replaceChild(newThemeBtn, themeBtn);
            newThemeBtn.addEventListener('click', toggleTheme);
        }

        // 更新主题图标状态
        updateThemeIcon(document.body.classList.contains('dark-mode'));
    }
    
    container.innerHTML = navHtml;
    
    // 应用站点名称
    const siteName = localStorage.getItem('siteName') || 'PocketCMS';
    const siteNameSpan = document.getElementById('siteName');
    if (siteNameSpan) siteNameSpan.textContent = siteName;
    
    // 高亮当前页面对应的导航项
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else if (currentPath === '/' && href === '/') {
            link.classList.add('active');
        } else if (href !== '/' && currentPath.startsWith(href)) {
            link.classList.add('active');
        }
    });
    
    // 移动端菜单功能
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileBtn && navMenu) {
        // 移除旧监听器，添加新监听器
        const newBtn = mobileBtn.cloneNode(true);
        mobileBtn.parentNode.replaceChild(newBtn, mobileBtn);
        
        // 关闭菜单的函数
        function closeMenu() {
            navMenu.classList.remove('active');
        }
        
        // 切换菜单的函数
        function toggleMenu(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        }
        
        // 汉堡按钮点击切换菜单
        newBtn.addEventListener('click', toggleMenu);
        
        // 点击菜单内的任何链接或按钮时，关闭菜单
        const menuItems = navMenu.querySelectorAll('a, button');
        menuItems.forEach(item => {
            item.addEventListener('click', closeMenu);
        });
        
        // 点击页面其他地方关闭菜单（可选）
        document.addEventListener('click', function(event) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(event.target) && 
                event.target !== newBtn &&
                !newBtn.contains(event.target)) {
                closeMenu();
            }
        });
    }
}

// 退出登录函数
window.handleLogout = async function() {
    pb.authStore.clear();
    window.location.href = '/';
};

// 页面加载时自动渲染导航栏
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadNavbar, 50);

// 主题切换
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 页面加载时初始化
initTheme();

});