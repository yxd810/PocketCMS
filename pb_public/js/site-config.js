// js/site-config.js - 站点配置公共脚本

// 应用站点名称到当前页面
function applySiteNameToPage() {
    const siteName = localStorage.getItem('siteName') || 'PocketCMS';
    
    // 更新页面标题
    //const currentTitle = document.title;
    //if (currentTitle.includes(' - ')) {
    //    document.title = siteName + ' - ' + currentTitle.split(' - ').pop();
    //} else if (currentTitle !== siteName) {
    //    document.title = siteName;
    //}

    // 更新所有 Logo 文字
    const logoSpans = document.querySelectorAll('.logo span');
    logoSpans.forEach(span => {
        if (span.textContent === 'PocketCMS' || span.textContent !== siteName) {
            span.textContent = siteName;
        }
    });
    
    // 更新页面中的站点名称元素
    const siteNameElements = document.querySelectorAll('[data-site-name]');
    siteNameElements.forEach(el => {
        el.textContent = siteName;
    });
}

// 页面加载时执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySiteNameToPage);
} else {
    applySiteNameToPage();
}