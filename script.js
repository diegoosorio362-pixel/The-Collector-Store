// Datos de productos
const products = [
    {
        id: 1,
        name: "Goku Super Saiyan",
        description: "Figura de acción articulada de Goku en forma Super Saiyan",
        price: 899.99,
        image: "Dragon Ball.jpg",
        category: "figuras",
        stock: 15
    },
    {
        id: 2,
        name: "Vegeta Prince",
        description: "Figura premium de Vegeta con detalles únicos",
        price: 1299.99,
        image: "Dragon Ball.png",
        category: "estatuas",
        stock: 8
    },
    {
        id: 3,
        name: "Esfera del Dragón",
        description: "Esfera del dragón de 7 estrellas coleccionable",
        price: 299.99,
        image: "esfera-dragon.png",
        category: "accesorios",
        stock: 25
    },
    {
        id: 4,
        name: "Cápsula Hoi-Poi",
        description: "Cápsula Hoi-Poi funcional con luz LED",
        price: 199.99,
        image: "capsula.jpg",
        category: "accesorios",
        stock: 12
    },
    {
        id: 5,
        name: "Piccolo Namekiano",
        description: "Figura articulada de Piccolo con capa",
        price: 799.99,
        image: "Dragon Ball.jpg",
        category: "figuras",
        stock: 10
    },
    {
        id: 6,
        name: "Freezer Final Form",
        description: "Estatua premium de Freezer en su forma final",
        price: 1599.99,
        image: "Dragon Ball.png",
        category: "estatuas",
        stock: 5
    }
];

// Estado del carrito
let cart = [];
let currentFilter = 'all';

// Elementos del DOM
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const productsGrid = document.getElementById('productsGrid');
const loginModal = document.getElementById('loginModal');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    loadProducts();
    updateCartDisplay();
}

function setupEventListeners() {
    // Carrito
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', toggleCart);
    
    // Login
    document.getElementById('loginBtn').addEventListener('click', toggleLogin);
    document.getElementById('closeLogin').addEventListener('click', toggleLogin);
    
    // Hamburger menu
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            toggleLogin();
        }
    });
    
    // Formulario de login
    document.querySelector('.login-form').addEventListener('submit', handleLogin);
}

function loadProducts() {
    productsGrid.innerHTML = '';
    
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(product => product.category === currentFilter);
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> Agregar al Carrito
            </button>
        </div>
    `;
    return card;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            showNotification('No hay suficiente stock disponible', 'warning');
            return;
        }
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(`${product.name} agregado al carrito`, 'success');
    
    // Animación del botón
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showNotification('Producto eliminado del carrito', 'info');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    if (newQuantity > item.stock) {
        showNotification('No hay suficiente stock disponible', 'warning');
        return;
    }
    
    item.quantity = newQuantity;
    updateCartDisplay();
}

function updateCartDisplay() {
    // Actualizar contador del carrito
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Actualizar items del carrito
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})" style="background: none; border: none; color: var(--text-light); cursor: pointer; padding: 0.5rem;">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    // Actualizar total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function toggleCart() {
    cartSidebar.classList.toggle('active');
    document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : 'auto';
}

function toggleLogin() {
    loginModal.classList.toggle('active');
    document.body.style.overflow = loginModal.classList.contains('active') ? 'hidden' : 'auto';
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function filterProducts(category) {
    currentFilter = category;
    loadProducts();
    
    // Actualizar botones de categoría
    document.querySelectorAll('.category-card').forEach(card => {
        card.style.borderColor = 'transparent';
    });
    
    if (category !== 'all') {
        event.currentTarget.style.borderColor = 'var(--primary-color)';
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulación de login
    if (email && password) {
        showNotification('¡Inicio de sesión exitoso!', 'success');
        toggleLogin();
        document.querySelector('.login-form').reset();
    } else {
        showNotification('Por favor completa todos los campos', 'error');
    }
}

function showNotification(message, type = 'info') {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1003;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Funciones de utilidad
function formatPrice(price) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(price);
}

// Smooth scrolling para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto parallax en hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.product-card, .category-card').forEach(el => {
    observer.observe(el);
});

// Búsqueda de productos
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Event listener para búsqueda
document.addEventListener('keyup', function(e) {
    if (e.target.matches('#searchInput')) {
        searchProducts(e.target.value);
    }
});

// Funcionalidad de checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'warning');
        return;
    }
    
    // Simulación de checkout
    showNotification('Redirigiendo al proceso de pago...', 'info');
    
    setTimeout(() => {
        showNotification('¡Compra realizada con éxito!', 'success');
        cart = [];
        updateCartDisplay();
        toggleCart();
    }, 2000);
}

// Agregar event listener al botón de checkout
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
});

// Funcionalidad de wishlist (favoritos)
let wishlist = [];

function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const isInWishlist = wishlist.includes(productId);
    
    if (isInWishlist) {
        wishlist = wishlist.filter(id => id !== productId);
        showNotification(`${product.name} removido de favoritos`, 'info');
    } else {
        wishlist.push(productId);
        showNotification(`${product.name} agregado a favoritos`, 'success');
    }
    
    updateWishlistDisplay();
}

function updateWishlistDisplay() {
    // Actualizar iconos de wishlist en las tarjetas de productos
    document.querySelectorAll('.product-card').forEach(card => {
        const productId = parseInt(card.dataset.productId);
        const wishlistBtn = card.querySelector('.wishlist-btn');
        
        if (wishlistBtn) {
            if (wishlist.includes(productId)) {
                wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
                wishlistBtn.style.color = 'var(--primary-color)';
            } else {
                wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
                wishlistBtn.style.color = 'var(--text-light)';
            }
        }
    });
}

// Mejorar la función createProductCard para incluir wishlist
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.dataset.productId = product.id;
    card.innerHTML = `
        <div class="product-image-container" style="position: relative;">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <button class="wishlist-btn" onclick="toggleWishlist(${product.id})" style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; transition: var(--transition);">
                <i class="far fa-heart"></i>
            </button>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> Agregar al Carrito
            </button>
        </div>
    `;
    return card;
}
