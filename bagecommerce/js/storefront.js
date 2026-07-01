// Local sample product data. No database or backend is required.
const products = [
   {
      id: 1,
      name: "MetroFlex Daily Backpack",
      category: "Backpack",
      image: "uploaded_img/img1.jpg",
      price: 3490,
      oldPrice: 4290,
      discount: "19% OFF",
      rating: 4.8,
      details: "Water-resistant shell, padded back panel, bottle pocket, and 22L storage."
   },
   {
      id: 2,
      name: "Voyager Pro Travel Bag",
      category: "Travel Bag",
      image: "uploaded_img/travels.jpg",
      price: 5990,
      oldPrice: 7290,
      discount: "18% OFF",
      rating: 4.9,
      details: "Cabin-friendly weekender with shoe pocket, trolley sleeve, and wide opening."
   },
   {
      id: 3,
      name: "Avenue Soft Tote",
      category: "Tote Bag",
      image: "uploaded_img/stylish_and_modern_fashion_backpack_for_wom_3.jpg",
      price: 2890,
      oldPrice: 3590,
      discount: "20% OFF",
      rating: 4.7,
      details: "Minimal tote with zip closure, inner organizer, and vegan leather accents."
   },
   {
      id: 4,
      name: "Axis 15 Laptop Carrier",
      category: "Laptop Bag",
      image: "uploaded_img/lap1.jpg",
      price: 4590,
      oldPrice: 5490,
      discount: "16% OFF",
      rating: 4.8,
      details: "Padded 15.6 inch laptop section, charger pockets, and slim office profile."
   },
   {
      id: 5,
      name: "Luna Structured Handbag",
      category: "Handbag",
      image: "uploaded_img/leather1.jpg",
      price: 3790,
      oldPrice: 4690,
      discount: "19% OFF",
      rating: 4.6,
      details: "Structured silhouette with premium texture, detachable strap, and metal feet."
   },
   {
      id: 6,
      name: "Pulse Gym Duffel",
      category: "Sports Bag",
      image: "uploaded_img/hik2.jpg",
      price: 3290,
      oldPrice: 3990,
      discount: "18% OFF",
      rating: 4.7,
      details: "Lightweight duffel with ventilated compartment and quick-access side pockets."
   },
   {
      id: 7,
      name: "TrailLite Hiking Pack",
      category: "Backpack",
      image: "uploaded_img/hik1.jpg",
      price: 4990,
      oldPrice: 6290,
      discount: "21% OFF",
      rating: 4.9,
      details: "Outdoor-ready backpack with chest strap, rain cover, and 32L capacity."
   },
   {
      id: 8,
      name: "Nomad Carry-On Weekender",
      category: "Travel Bag",
      image: "uploaded_img/bri1.jpg",
      price: 6490,
      oldPrice: 7990,
      discount: "19% OFF",
      rating: 4.8,
      details: "Premium travel holdall with durable handles, smart compartments, and soft lining."
   },
   {
      id: 9,
      name: "City Canvas Tote",
      category: "Tote Bag",
      image: "uploaded_img/casual.jpg",
      price: 2390,
      oldPrice: 2990,
      discount: "20% OFF",
      rating: 4.5,
      details: "Everyday canvas tote with reinforced base and enough room for daily essentials."
   },
   {
      id: 10,
      name: "Executive Tech Brief",
      category: "Laptop Bag",
      image: "uploaded_img/lap3.jpg",
      price: 5290,
      oldPrice: 6490,
      discount: "18% OFF",
      rating: 4.9,
      details: "Professional laptop brief with document divider, RFID pocket, and premium finish."
   },
   {
      id: 11,
      name: "Serene Crossbody Handbag",
      category: "Handbag",
      image: "uploaded_img/leather3.jpg",
      price: 3190,
      oldPrice: 3890,
      discount: "18% OFF",
      rating: 4.6,
      details: "Compact crossbody handbag with soft-touch texture and secure zipper pockets."
   },
   {
      id: 12,
      name: "Enduro Training Duffel",
      category: "Sports Bag",
      image: "uploaded_img/hik3.jpg",
      price: 3590,
      oldPrice: 4490,
      discount: "20% OFF",
      rating: 4.7,
      details: "Sporty duffel with wet item storage, padded strap, and abrasion-resistant base."
   }
];

const featuredProducts = document.querySelector("#featuredProducts");
const newProducts = document.querySelector("#newProducts");
const cartCount = document.querySelector(".cart-count");
const mobilePanel = document.querySelector(".mobile-panel");
const cartDrawer = document.querySelector("#cartDrawer");
const cartOverlay = document.querySelector("#cartOverlay");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const toast = document.querySelector("#toast");
const productSearch = document.querySelector("#productSearch");

let cart = [];
let activeCategory = "All";

const formatPrice = (value) => `NRs. ${value.toLocaleString("en-IN")}`;

const ratingStars = (rating) => {
   const fullStars = Math.floor(rating);
   const emptyStars = 5 - fullStars;
   const filled = '<i class="fa-solid fa-star"></i>'.repeat(fullStars);
   const empty = '<i class="fa-regular fa-star"></i>'.repeat(emptyStars);
   return `${filled}${empty} <span>${rating}</span>`;
};

const productCard = (product) => `
   <article class="product-card">
      <div class="product-image-wrap">
         <img src="${product.image}" alt="${product.name}">
         <span class="product-badge">${product.discount}</span>
         <button class="favorite-button" type="button" aria-label="Add ${product.name} to wishlist" onclick="toggleFavorite(this)">
            <i class="fa-regular fa-heart"></i>
         </button>
      </div>
      <div class="product-info">
         <div class="product-topline">
            <span>${product.category}</span>
            <span class="rating">${ratingStars(product.rating)}</span>
         </div>
         <h3>${product.name}</h3>
         <p>${product.details}</p>
         <div class="price-row">
            <span class="price">${formatPrice(product.price)}</span>
            <span class="old-price">${formatPrice(product.oldPrice)}</span>
         </div>
         <button class="btn primary-btn add-cart" type="button" onclick="addToCart(${product.id}, this)">
            <i class="fa-solid fa-cart-plus"></i>&nbsp; Add to Cart
         </button>
      </div>
   </article>
`;

const renderProducts = () => {
   const searchTerm = productSearch.value.trim().toLowerCase();
   const filtered = products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const searchableText = `${product.name} ${product.category} ${product.details}`.toLowerCase();
      return matchesCategory && searchableText.includes(searchTerm);
   });

   featuredProducts.innerHTML = filtered.slice(0, 8).map(productCard).join("") || '<p class="empty-state">No bags found. Try another search or category.</p>';
   newProducts.innerHTML = filtered.slice(8, 12).map(productCard).join("");
};

const renderCart = () => {
   const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
   const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

   cartCount.textContent = totalItems;
   cartTotal.textContent = formatPrice(totalPrice);

   if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">Your cart is empty. Add a bag to get started.</p>';
      return;
   }

   cartItems.innerHTML = cart.map((item) => `
      <div class="cart-item">
         <img src="${item.image}" alt="${item.name}">
         <div>
            <h3>${item.name}</h3>
            <span>${formatPrice(item.price)} x ${item.qty}</span>
         </div>
         <button class="icon-button" type="button" aria-label="Remove ${item.name}" onclick="removeFromCart(${item.id})">
            <i class="fa-solid fa-trash"></i>
         </button>
      </div>
   `).join("");
};

const showToast = (message) => {
   toast.textContent = message;
   toast.classList.add("is-visible");

   window.setTimeout(() => {
      toast.classList.remove("is-visible");
   }, 1800);
};

window.toggleMobileMenu = function toggleMobileMenu() {
   mobilePanel.classList.toggle("is-open");
};

window.closeMobileMenu = function closeMobileMenu() {
   mobilePanel.classList.remove("is-open");
};

window.toggleCart = function toggleCart(forceOpen) {
   const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !cartDrawer.classList.contains("is-open");
   cartDrawer.classList.toggle("is-open", shouldOpen);
   cartOverlay.classList.toggle("is-open", shouldOpen);
};

window.addToCart = function addToCart(productId, button) {
   const product = products.find((item) => item.id === productId);
   const existingItem = cart.find((item) => item.id === productId);

   if (existingItem) {
      existingItem.qty += 1;
   } else {
      cart.push({ ...product, qty: 1 });
   }

   renderCart();
   button.innerHTML = '<i class="fa-solid fa-check"></i>&nbsp; Added';
   showToast(`${product.name} added to cart`);

   window.setTimeout(() => {
      button.innerHTML = '<i class="fa-solid fa-cart-plus"></i>&nbsp; Add to Cart';
   }, 1100);
};

window.removeFromCart = function removeFromCart(productId) {
   cart = cart.filter((item) => item.id !== productId);
   renderCart();
   showToast("Item removed from cart");
};

window.toggleFavorite = function toggleFavorite(button) {
   const icon = button.querySelector("i");
   icon.classList.toggle("fa-regular");
   icon.classList.toggle("fa-solid");
   button.classList.toggle("is-active");
   showToast(button.classList.contains("is-active") ? "Added to wishlist" : "Removed from wishlist");
};

window.filterByCategory = function filterByCategory(category, card) {
   activeCategory = category;
   productSearch.value = "";
   document.querySelectorAll(".category-card").forEach((item) => item.classList.remove("is-active"));
   card.classList.add("is-active");
   renderProducts();
};

window.showAllProducts = function showAllProducts() {
   activeCategory = "All";
   productSearch.value = "";
   document.querySelectorAll(".category-card").forEach((item) => item.classList.remove("is-active"));
   renderProducts();
};

window.handleSearch = function handleSearch(event) {
   event.preventDefault();
   activeCategory = "All";
   document.querySelectorAll(".category-card").forEach((item) => item.classList.remove("is-active"));
   renderProducts();
};

window.scrollToSection = function scrollToSection(id) {
   document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

window.subscribeNewsletter = function subscribeNewsletter(event) {
   event.preventDefault();
   event.currentTarget.reset();
   showToast("Thank you for subscribing to HamroBag updates!");
};

window.checkoutCart = function checkoutCart() {
   showToast(cart.length ? "Checkout is ready for local demo mode." : "Your cart is empty.");
};

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries) => {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         entry.target.classList.add("is-visible");
      }
   });
}, { threshold: 0.14 });

document.querySelectorAll(".section-reveal").forEach((section) => {
   revealObserver.observe(section);
});

renderProducts();
renderCart();
