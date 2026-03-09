document.addEventListener('DOMContentLoaded', () => {
    const cartTrigger = document.getElementById('cart-trigger');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');

    if (cartTrigger) {
        cartTrigger.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop scrolling
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // Resume scrolling
        });
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Add To Cart Animation
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Animation logic (optional: show a small plus floating up)
            const plus = document.createElement('div');
            plus.innerHTML = '+1';
            plus.style.position = 'absolute';
            plus.style.left = `${e.clientX}px`;
            plus.style.top = `${e.clientY}px`;
            plus.style.color = 'var(--primary)';
            plus.style.fontWeight = '800';
            plus.style.transition = 'all 0.8s ease-out';
            document.body.appendChild(plus);

            setTimeout(() => {
                plus.style.transform = 'translateY(-50px)';
                plus.style.opacity = '0';
            }, 10);

            setTimeout(() => {
                plus.remove();
            }, 800);

            // Trigger sidebar
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
        });
    });
});
