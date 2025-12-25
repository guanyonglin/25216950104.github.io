// index.js - 首页购物车功能

// 添加到购物车
function addToCart(name, price, image) {
    try {
        // 获取当前购物车数据
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        
        // 检查商品是否已经在购物车中
        const existingItemIndex = cart.findIndex(item => item.name === name);
        
        if (existingItemIndex !== -1) {
            // 如果商品已存在，增加数量
            cart[existingItemIndex].quantity += 1;
            showMessage(`"${name}" 数量已增加！`);
        } else {
            // 如果商品不存在，添加新商品
            const newItem = {
                name: name,
                price: price,
                quantity: 1,
                image: image
            };
            cart.push(newItem);
            showMessage(`"${name}" 已成功加入购物车！`);
        }
        
        // 保存到localStorage
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        
        // 更新购物车数量显示
        updateCartCount();
        
    } catch (error) {
        console.error('添加到购物车失败:', error);
        showMessage('添加失败，请重试！', 'error');
    }
}

// 显示消息提示
function showMessage(text, type = 'success') {
    const messageEl = document.getElementById('cart-message');
    if (!messageEl) return;
    
    // 设置消息内容和样式
     messageEl.textContent = text;
     messageEl.style.backgroundColor = type === 'success' ? '#51cf66' : '#ff6b6b';
    messageEl.style.display = 'block';
    
    // 3秒后隐藏消息
    setTimeout(() => {
        messageEl.style.opacity = '0';  // 开始淡出
        messageEl.style.display = 'none';  // 立即隐藏，用户看不到淡出效果！
    }, 2000);
}

// 更新购物车数量显示
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// 页面加载时更新购物车数量
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // 为商品卡片添加悬停效果
    const productCards = document.querySelectorAll('.content li');
    productCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.2s';
        card.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
    
    // 生鲜导航菜单点击事件
    initFreshNavigation();
});

// 初始化生鲜导航功能
function initFreshNavigation() {
    const homeNav = document.getElementById('home-nav');
    const freshNav = document.getElementById('fresh-nav');
    const freshProducts = document.getElementById('fresh-products');
    const banner = document.querySelector('.banner');
    const goods = document.querySelector('.goods');
    const footer = document.querySelector('.footer');
    
    // 首页导航点击事件
    if (homeNav) {
        homeNav.addEventListener('click', function(e) {
            e.preventDefault();
            // 隐藏生鲜商品区域
            if (freshProducts && freshProducts.style.display === 'block') {
                freshProducts.style.display = 'none';
                if (freshNav) freshNav.classList.remove('active');
                homeNav.classList.add('active');
                
                // 恢复原始页面内容
                if (banner) banner.style.display = 'block';
                if (goods) goods.style.display = 'block';
                if (footer) footer.style.display = 'block';
                
                // 平滑滚动回顶部
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // 延迟移除首页active状态
                setTimeout(() => {
                    homeNav.classList.remove('active');
                }, 300);
            }
        });
    }
    
    if (freshNav && freshProducts) {
        freshNav.addEventListener('click', function(e) {
            e.preventDefault();
            // 显示生鲜商品区域，隐藏其他内容
            if (freshProducts.style.display === 'none' || freshProducts.style.display === '') {
                // 隐藏原始页面内容
                if (banner) banner.style.display = 'none';
                if (goods) goods.style.display = 'none';
                if (footer) footer.style.display = 'none';
                
                // 显示生鲜商品区域
                freshProducts.style.display = 'block';
                freshNav.classList.add('active');
                if (homeNav) homeNav.classList.remove('active');
                
                // 平滑滚动到顶部
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // 隐藏生鲜商品区域
                freshProducts.style.display = 'none';
                freshNav.classList.remove('active');
                
                // 恢复原始页面内容
                if (banner) banner.style.display = 'block';
                if (goods) goods.style.display = 'block';
                if (footer) footer.style.display = 'block';
            }
        });
    }
}