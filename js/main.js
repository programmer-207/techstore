document.addEventListener('DOMContentLoaded', function() {
    // Hàm thêm sản phẩm vào giỏ hàng
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
       console.log('Đã thêm vào giỏ', product)
    }
    // Thêm sự kiện click cho các nút "Thêm vào giỏ"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                id: this.dataset.productId,
                name: this.dataset.productName,
                price: parseInt(this.dataset.productPrice)
             };
          addToCart(product);
        });
    });

    // Hàm hiển thị giỏ hàng
    function displayCart() {
        const cartTable = document.getElementById('cart-table');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
         const emptyCartMessage = document.getElementById('empty-cart');
          if(!cartTable || !cartItems || !cartTotal || !emptyCartMessage) return;

        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cartItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
          emptyCartMessage.style.display = 'block';
            cartTable.style.display = 'none';
            return;
        }
         emptyCartMessage.style.display = 'none';
        cartTable.style.display = 'table';
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()} VNĐ</td>
                <td>1</td>
                <td>${item.price.toLocaleString()} VNĐ</td>
            `;
            cartItems.appendChild(row);
            total += item.price;
        });
       cartTotal.innerHTML = `<strong>${total.toLocaleString()} VNĐ</strong>`;
    }
      // Hàm hiển thị các sản phẩm ở checkout
     function displayCheckout() {
         const checkoutTable = document.getElementById('checkout-table');
         const checkoutItems = document.getElementById('checkout-items');
         const checkoutTotal = document.getElementById('checkout-total');
         if (!checkoutTable || !checkoutItems || !checkoutTotal ) return;

          let cart = JSON.parse(localStorage.getItem('cart') || '[]');
         checkoutItems.innerHTML = '';
          let total = 0;
         if (cart.length === 0) {
           checkoutTable.style.display = 'none';
           return;
          }
          checkoutTable.style.display = 'table';
          cart.forEach(item => {
            const row = document.createElement('tr');
              row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()} VNĐ</td>
            `;
              checkoutItems.appendChild(row);
              total += item.price;
            });
        checkoutTotal.innerHTML = `<strong>${total.toLocaleString()} VNĐ</strong>`;
    }
    //Gọi hàm hiển thị giỏ hàng và thanh toán
   if(window.location.pathname.includes('cart.html')){
       displayCart();
    } else if(window.location.pathname.includes('checkout.html')){
         displayCheckout();
    }
    // Chuyển sang trang order_confirmation
    const completeOrderLink = document.getElementById('complete-order-link');
      if(completeOrderLink){
             completeOrderLink.addEventListener('click', function() {
              localStorage.removeItem('cart');
            });
      }
});