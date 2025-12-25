// 登录页面脚本
// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 绑定表单提交事件
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});
// 处理登录表单提交
function handleLogin(event) {
    event.preventDefault();
    // 显示加载状态，获取提交按钮并修改状态
    const submitBtn = event.target.querySelector('.btn-primary');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="iconfont icon-loading"></i> 登录中...';
    submitBtn.disabled = true;
    // 延迟执行登录逻辑，模拟网络延迟
    setTimeout(() => {
        // 创建默认用户
        const defaultUser = {
            id: 'guest_' + Date.now().toString(),
            username: '访客用户',
        };
        // 保存登录状态
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(defaultUser));
        // 显示成功并跳转
        alert('登录成功！即将跳转到首页...');
        window.location.href = 'index.html';
        
    }, 500);
}

