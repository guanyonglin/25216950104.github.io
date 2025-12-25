// register.js - 3秒后自动跳转到登录页

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // 阻止表单自己提交
            
            // 获取表单数据
            const username = document.getElementById('reg-username').value.trim();// .value：获取输入框的值
            const phone = document.getElementById('reg-phone').value.trim();//trim()：去除字符串两端的空格
            const password = document.getElementById('reg-password').value;
            
            // 验证输入是否为空
            if (!username) {
                alert('请输入用户名'); // alert()：浏览器弹窗函数
                return false;
            }
            
            if (!phone) {
                alert('请输入手机号');
                return false;
            }
            
            if (!password) {
                alert('请输入密码');
                return false;
            }
            
            // 显示注册中状态
            const submitBtn = registerForm.querySelector('button[type="submit"]');//在表单元素内查找匹配CSS选择器的元素
            const originalText = submitBtn.innerHTML;//获取按钮的HTML内容（文本）
            submitBtn.innerHTML = ' 注册中...';
            // 禁用按钮，防止重复提交
            submitBtn.disabled = true;
            
            setTimeout(function() {
                // 注册成功，跳转到登录页
                window.location.href = 'login.html';
            }, 1000);//1000毫秒后跳转到登录页
        });
    }
});