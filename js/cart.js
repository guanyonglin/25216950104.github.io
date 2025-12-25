// 购物车功能

// 页面加载时渲染购物车
document.addEventListener('DOMContentLoaded', renderCart);

// 渲染购物车内容
function renderCart() {
    const cartContent = document.querySelector('.cart-content');
    const emptyCart = document.querySelector('.empty-cart');
    const cartTable = document.getElementById('cart-table');
    const cartItems = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    
    // 从localStorage读取购物车数据
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    if (cart.length === 0) {
        // 显示空购物车状态
        emptyCart.style.display = 'block';// 显示"购物车空空如也"提示
        cartTable.style.display = 'none';//隐藏商品表格
        totalPriceEl.innerText = '¥ 0';//总价设为0
        return;
    }

    // 清空现有的商品行
    cartItems.innerHTML = '';
    
    // 显示表格
    emptyCart.style.display = 'none';
    cartTable.style.display = 'table';
    
    let total = 0;

    // 为每个商品创建行
    cart.forEach((item, index) => {
        let subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement('tr');
         // 商品行的HTML结构
         // <td>行
        //  ${item.quantity}动态显示数量
        // https://via.placeholder.com/60 占位图片
        // ${item.price} 是 JavaScript模板字符串中的变量插入语法
        row.innerHTML = `
            <td>
                <div class="item-name-cell">
                    <img src="${item.image}" alt="${item.name}" 
                         onerror="this.src='https://via.placeholder.com/60'">
                    <div>
                        <div style="font-weight: bold; margin-bottom: 5px;">${item.name}</div>
                        
                    </div>
                </div>
            </td>
            <td class="price">¥ ${item.price}</td>
            <td>
                <div class="qty-control">
                    <button class="qty-btn">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn">+</button>
                </div>
            </td>
            <td class="price">¥ ${subtotal}</td>
            <td>
                <button class="delete-btn">删除</button>
            </td>
        `;

        // 行按钮可以点击
        const minusBtn = row.querySelector('.qty-control button:first-child');
        const plusBtn = row.querySelector('.qty-control button:last-child');
        const deleteBtn = row.querySelector('.delete-btn');
        // 点击按钮更新商品数量，删除商品
        minusBtn.addEventListener('click', () => updateQuantity(index, -1));
        plusBtn.addEventListener('click', () => updateQuantity(index, 1));
        deleteBtn.addEventListener('click', () => removeItem(index));
        // 将商品行插入到表格中
        cartItems.appendChild(row);
    });
    // 更新总价显示
    totalPriceEl.innerText = '¥ ' + total.toLocaleString();
}

// 更新商品数量
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
// index：要修改的商品位置
// change：数量变化值（-1或+1）
    cart[index].quantity += change;
 // 数量小于1时的处理逻辑
    if (cart[index].quantity < 1) {
        if(confirm('确定要从购物车移除该商品吗？')) {
            cart.splice(index, 1);
        } else {
            cart[index].quantity = 1;
        }
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    renderCart();
}

// 删除商品
function removeItem(index) {
    if(confirm('确定删除吗？')) {
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        renderCart();
    }
}

// 跳转到支付页面
function goToPayment() {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    if (cart.length === 0) {
        alert('购物车是空的，无法结算！');
        return;
    }
    // 计算总金额
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // 计算总商品数
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    // 按结算会出现对话框是因为 goToPayment() 函数里使用了 confirm() 函数
    const result = confirm(`是否确认结算？\n\n总金额：¥ ${total.toLocaleString()}\n商品数量：${totalItems} 件`);
    
    if (result) {
        localStorage.removeItem('shoppingCart');
        alert('🎉 结算成功！感谢您的购买！\n\n订单已处理，商品将在3-5个工作日内发货。');
        renderCart();
    }
}