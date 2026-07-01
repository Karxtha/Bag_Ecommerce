const products = [
   {
      name: "MetroFlex Daily Backpack",
      category: "Backpack",
      image: "uploaded_img/img1.jpg",
      price: 3490,
      oldPrice: 3290,
      discount: "19% OFF",
      rating: 4.8,
      details: "Water-resistant shell, padded back panel, bottle pocket, and 22L storage."
   },
   {
      name: "Voyager Pro Travel Bag",
      category: "Travel Bag",
      image: "uploaded_img/travels.jpg",
      price: 5990,
      oldPrice: 3290,
      discount: "18% OFF",
      rating: 4.9,
      details: "Cabin-friendly weekender with shoe pocket, trolley sleeve, and wide opening."
   },
   {
      name: "Avenue Soft Tote",
      category: "Tote Bag",
      image: "uploaded_img/stylish_and_modern_fashion_backpack_for_wom_3.jpg",
      price: 2890,
      oldPrice: 2590,
      discount: "20% OFF",
      rating: 4.7,
      details: "Minimal tote with zip closure, inner organizer, and vegan leather accents."
   },
   {
      name: "Axis 15 Laptop Carrier",
      category: "Laptop Bag",
      image: "uploaded_img/lap1.jpg",
      price: 1590,
      oldPrice: 2490,
      discount: "16% OFF",
      rating: 4.8,
      details: "Padded 15.6 inch laptop section, charger pockets, and slim office profile."
   },
   {
      name: "Luna Structured Handbag",
      category: "Handbag",
      image: "uploaded_img/leather1.jpg",
      price: 3790,
      oldPrice: 1690,
      discount: "19% OFF",
      rating: 4.6,
      details: "Structured silhouette with premium texture, detachable strap, and metal feet."
   },
   {
      name: "Pulse Gym Duffel",
      category: "Sports Bag",
      image: "uploaded_img/hik2.jpg",
      price: 2290,
      oldPrice: 3000,
      discount: "18% OFF",
      rating: 4.7,
      details: "Lightweight duffel with ventilated compartment and quick-access side pockets."
   },
   {
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
         <button class="favorite-button" type="button" aria-label="Add ${product.name} to wishlist">
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
         <button class="btn primary-btn add-cart" type="button">
            <i class="fa-solid fa-cart-plus"></i>&nbsp; Add to Cart
         </button>
      </div>
   </article>
`;

const featuredProducts = document.querySelector("#featuredProducts");
const newProducts = document.querySelector("#newProducts");
const cartCount = document.querySelector(".cart-count");
const menuToggle = document.querySelector(".menu-toggle");
const mobilePanel = document.querySelector(".mobile-panel");

featuredProducts.innerHTML = products.slice(0, 8).map(productCard).join("");
newProducts.innerHTML = products.slice(8, 12).map(productCard).join("");

let cartTotal = 0;

document.querySelectorAll(".add-cart").forEach((button) => {
   button.addEventListener("click", () => {
      cartTotal += 1;
      cartCount.textContent = cartTotal;
      button.textContent = "Added";

      window.setTimeout(() => {
         button.innerHTML = '<i class="fa-solid fa-cart-plus"></i>&nbsp; Add to Cart';
      }, 1100);
   });
});

menuToggle.addEventListener("click", () => {
   mobilePanel.classList.toggle("is-open");
});

document.querySelectorAll(".mobile-panel a").forEach((link) => {
   link.addEventListener("click", () => mobilePanel.classList.remove("is-open"));
});

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

document.querySelector(".newsletter-form").addEventListener("submit", (event) => {
   event.preventDefault();
   event.currentTarget.reset();
   alert("Thank you for subscribing to HamroBag updates!");
});
