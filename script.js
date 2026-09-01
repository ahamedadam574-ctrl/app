document.addEventListener('DOMContentLoaded', () => {
    // جلب المنتجات المخزنة مسبقاً من الـ LocalStorage أو عمل قائمة فارغة
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];

    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    // فتح وإغلاق السلة
    cartBtn.addEventListener('click', () => cartSidebar.classList.add('open'));
    closeCart.addEventListener('click', () => cartSidebar.classList.remove('open'));

    // عند الضغط على زر الشراء
    const buttons = document.querySelectorAll('.btn-buy');
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const title = card.querySelector('h3').textContent;
            
            // استخراج السعر كـ رقم فقط (إزالة "ج.م")
            const priceText = card.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace(/[^\d.]/g, ''));

            // إضافة المنتج للمصفوفة
            cart.push({ title, price });

            // حفظ التحديثات في المتصفح
            saveAndRenderCart();

            // تأثير مائي على الزر
            button.textContent = 'تمت الإضافة! ✓';
            button.style.backgroundColor = '#2e7d32';
            setTimeout(() => {
                button.textContent = 'شراء الآن';
                button.style.backgroundColor = '#0f3460';
            }, 1500);
        });
    });

    // دالة لحذف عنصر من السلة
    window.removeItem = (index) => {
        cart.splice(index, 1);
        saveAndRenderCart();
    };

    // حفظ البيانات وإعادة عرض السلة
    function saveAndRenderCart() {
        // حفظ في ذاكرة المتصفح
        localStorage.setItem('myCart', JSON.stringify(cart));
        
        // تحديث عدد العناصر
        cartCount.textContent = cart.length;

        // عرض العناصر في السلة
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div>
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">${item.price} ج.م</div>
                    </div>
                    <span class="remove-item" onclick="removeItem(${index})">&times; حذف</span>
                </div>
            `;
        });

        // تحديث إجمالي السعر
        cartTotal.textContent = total;
    }

    // تشغيل العرض أول ما الصفحة تفتح
    saveAndRenderCart();
});
