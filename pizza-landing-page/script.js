// Menu Data
const menuData = [
    { name: 'Classic Margherita', category: 'pizza', price: 12.99, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80', description: 'Tomato sauce, mozzarella, and fresh basil.' },
    { name: 'Double Pepperoni', category: 'pizza', price: 15.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80', description: 'Loads of pepperoni with extra mozzarella cheese.' },
    { name: 'Gourmet Veggie', category: 'pizza', price: 14.99, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=400&q=80', description: 'Bell peppers, onions, mushrooms, and olives.' },
    { name: 'Spicy BBQ Chicken', category: 'pizza', price: 16.99, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80', description: 'Smoked chicken, BBQ sauce, and red onions.' },
    { name: 'Supreme Pizza', category: 'pizza', price: 17.99, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=400&q=80', description: 'Loaded with veggies, pepperoni, and sausage.' },
    { name: 'Cheese Burst', category: 'pizza', price: 13.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', description: 'Extra cheesy crust with mozzarella and cheddar.' },
    // Specific high-quality 3D assets for other categories
    { name: 'Classic Beef Burger', category: 'burger', price: 10.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', description: 'Juicy beef patty with fresh lettuce and tomato.' },
    { name: 'Golden Fries', category: 'fries', price: 5.99, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=400&q=80', description: 'Crispy salted golden french fries.' },
    { name: 'Chilled Cola', category: 'drinks', price: 2.99, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80', description: 'Ice cold carbonated cola.' }
];

const menuGrid = document.getElementById('menuGrid');
const categoryCards = document.querySelectorAll('.category-card');

function renderMenu(category) {
    menuGrid.innerHTML = '';
    const filteredItems = menuData.filter(item => item.category === category);

    filteredItems.forEach(item => {
        const itemHtml = `
            <div class="menu-item">
                <img src="${item.image}" alt="${item.name}" class="menu-item-img">
                <h3>${item.name}</h3>
                <p style="color: #666; font-size: 14px; margin: 10px 0;">${item.description}</p>
                <div class="price-row">
                    <span class="price">$${item.price}</span>
                    <div class="add-btn">+</div>
                </div>
            </div>
        `;
        menuGrid.innerHTML += itemHtml;
    });
}

// Category Filtering logic
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        // Update active state
        categoryCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // Filter items
        renderMenu(card.dataset.category);
    });
});

// Initial Render
renderMenu('pizza');

// Hero Slider and Parallax stuff...
const pizzas = ['assets/hero_pizza.png', 'assets/margherita.png', 'assets/veggie.png'];
let currentIndex = 0;
const pizzaImg = document.getElementById('heroPizza');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function updatePizza(index) {
    pizzaImg.style.opacity = '0';
    pizzaImg.style.transform = 'scale(0.8) rotate(-20deg)';

    setTimeout(() => {
        pizzaImg.src = pizzas[index];
        pizzaImg.style.opacity = '1';
        pizzaImg.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? pizzas.length - 1 : currentIndex - 1;
        updatePizza(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === pizzas.length - 1) ? 0 : currentIndex + 1;
        updatePizza(currentIndex);
    });
}

document.addEventListener('mousemove', (e) => {
    if (pizzaImg) {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        pizzaImg.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    }
});
