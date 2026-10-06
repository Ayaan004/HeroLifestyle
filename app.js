/* ==========================================================================
   EXAMPLE TECH — APPLICATION SCRIPT
   Complete interactive engine with full cart, wishlist, modals, search,
   currency conversion, video showcase, order tracking, and live chat.
   ========================================================================== */

// --- PRODUCT DATABASE ---
const PRODUCTS = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    category: "smartphones",
    price: 999,
    oldPrice: 1199,
    discount: "-20%",
    rating: 4.9,
    reviewsCount: 240,
    badge: "BEST SELLER",
    image: "assets/images/iphone_15_pro.jpg",
    thumbs: ["assets/images/iphone_15_pro.jpg", "assets/images/collection_apple.jpg"],
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever with 5x telephoto optical zoom.",
    specs: [
      { label: "Display", value: "6.7\" Super Retina XDR OLED (120Hz ProMotion)" },
      { label: "Processor", value: "Apple A17 Pro (3nm architecture)" },
      { label: "Camera", value: "48MP Main + 12MP Ultra-wide + 12MP 5x Telephoto" },
      { label: "Battery Life", value: "Up to 29 hours video playback" },
      { label: "Build", value: "Aerospace-grade titanium with ceramic shield" }
    ]
  },
  {
    id: "dell-xps-13-plus",
    name: "Dell XPS 13 Plus Laptop",
    brand: "Dell",
    category: "laptops",
    price: 1099,
    oldPrice: 1299,
    discount: "-15%",
    rating: 4.8,
    reviewsCount: 184,
    badge: "HOT DEAL",
    image: "assets/images/dell_xps.jpg",
    thumbs: ["assets/images/dell_xps.jpg", "assets/images/collection_wfh.jpg"],
    description: "Master modern productivity with Dell's minimalist flagship. Featuring zero-lattice keyboard, seamless glass capacitive touch function row, and 13th Gen Intel Core performance.",
    specs: [
      { label: "Processor", value: "Intel Core i7-1360P (12 Cores, up to 5.0 GHz)" },
      { label: "Display", value: "13.4\" 3.5K OLED Touchscreen (400 nits)" },
      { label: "Memory & Storage", value: "16GB LPDDR5 RAM + 1TB PCIe NVMe SSD" },
      { label: "Battery", value: "Up to 14 hours battery + ExpressCharge 80%" }
    ]
  },
  {
    id: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5 Headphones",
    brand: "Sony",
    category: "audio",
    price: 299,
    oldPrice: 399,
    discount: "-25%",
    rating: 4.9,
    reviewsCount: 320,
    badge: "TOP PICK",
    image: "assets/images/sound_moves_headphones.jpg",
    thumbs: ["assets/images/sound_moves_headphones.jpg", "assets/images/mega_deal_headphones.jpg", "assets/images/sony_xm5.jpg"],
    description: "Our industry-leading noise cancellation gets even better. With two processors and eight microphones, the WH-1000XM5 rewrites the rules for distraction-free listening and exceptional call quality.",
    specs: [
      { label: "Noise Cancelling", value: "Dual Processor V1 + HD QN1 Chip" },
      { label: "Audio", value: "Hi-Res Audio Wireless with LDAC & DSEE Extreme" },
      { label: "Battery", value: "30 hours with ANC on (3-min charge = 3 hours)" },
      { label: "Connectivity", value: "Multipoint Bluetooth 5.2 + Swift Pair" }
    ]
  },
  {
    id: "samsung-galaxy-watch-6",
    name: "Samsung Galaxy Watch 6",
    brand: "Samsung",
    category: "smartwatches",
    price: 244,
    oldPrice: 349,
    discount: "-30%",
    rating: 4.7,
    reviewsCount: 412,
    badge: "BEST VALUE",
    image: "assets/images/galaxy_watch6.jpg",
    thumbs: ["assets/images/galaxy_watch6.jpg"],
    description: "Start your everyday wellness journey. Featuring a 20% larger screen, slimmer bezel, personalized HR zones, advanced sleep coaching, and bioactive sensor body composition analysis.",
    specs: [
      { label: "Display", value: "1.5\" Super AMOLED Sapphire Crystal Glass" },
      { label: "Health Sensors", value: "ECG, Blood Pressure, BIA, Sleep Analysis" },
      { label: "Durability", value: "5ATM + IP68 Water & Dust Resistant" },
      { label: "OS", value: "Wear OS Powered by Samsung (One UI 5 Watch)" }
    ]
  },
  {
    id: "bose-soundlink-revolve",
    name: "Bose SoundLink Revolve+",
    brand: "Bose",
    category: "audio",
    price: 263,
    oldPrice: 329,
    discount: "-20%",
    rating: 4.8,
    reviewsCount: 172,
    badge: "TOP AUDIO",
    image: "assets/images/bose_speaker.jpg",
    thumbs: ["assets/images/bose_speaker.jpg"],
    description: "Deep. Loud. And immersive, too. This 360-degree wireless speaker was engineered to spread deep, jaw-dropping sound in every direction. Built with a durable water-resistant design and flexible fabric handle.",
    specs: [
      { label: "Acoustics", value: "True 360-degree omnidirectional acoustic deflector" },
      { label: "Battery", value: "Rechargeable lithium-ion up to 17 hours" },
      { label: "Water Resistance", value: "IP55 dust and water splash resistance" },
      { label: "Wireless Range", value: "Up to 30 ft (9 m) Bluetooth range" }
    ]
  },
  {
    id: "canon-eos-r50",
    name: "Canon EOS R50 Mirrorless Camera",
    brand: "Canon",
    category: "cameras",
    price: 594,
    oldPrice: 699,
    discount: "-15%",
    rating: 4.9,
    reviewsCount: 210,
    badge: "TOP RATED",
    image: "assets/images/camera_canon_eos.jpg",
    thumbs: ["assets/images/camera_canon_eos.jpg", "assets/images/canon_r50.jpg"],
    description: "A compact, lightweight RF-mount camera designed for content creators. Features high-speed Dual Pixel CMOS AF II, uncropped 4K 30p video oversampled from 6K, and Movie for Close-up Demos mode.",
    specs: [
      { label: "Sensor", value: "24.2 Megapixel APS-C CMOS Sensor" },
      { label: "Autofocus", value: "Dual Pixel CMOS AF II with Subject Detection" },
      { label: "Video", value: "6K-oversampled 4K UHD 30p, Full HD 120p slow-mo" },
      { label: "Screen", value: "3.0-inch 1.62M-dot Vari-Angle Touchscreen LCD" }
    ]
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro (2nd Gen)",
    brand: "Apple",
    category: "audio",
    price: 249,
    oldPrice: 299,
    discount: "JUST ARRIVED",
    rating: 4.9,
    reviewsCount: 520,
    badge: "NEW LAUNCH",
    image: "assets/images/airpods_pro_glow.jpg",
    thumbs: ["assets/images/airpods_pro_glow.jpg", "assets/images/airpods_pro.jpg"],
    description: "Rebuilt from the sound up. Up to 2x more Active Noise Cancellation, Adaptive Audio that tailors noise control to your environment, and Personalized Spatial Audio with dynamic head tracking.",
    specs: [
      { label: "Chipset", value: "Apple H2 headphone chip + U1 in MagSafe Case" },
      { label: "Audio Tech", value: "Adaptive Audio, Active Noise Cancellation, Transparency Mode" },
      { label: "Battery", value: "Up to 6 hours listening (up to 30 hours with case)" },
      { label: "Charging", value: "USB-C, MagSafe, Apple Watch charger compatible" }
    ]
  },
  {
    id: "macbook-air-m2",
    name: "Apple MacBook Air M2 13-inch",
    brand: "Apple",
    category: "laptops",
    price: 1099,
    oldPrice: 1299,
    discount: "-15%",
    rating: 4.9,
    reviewsCount: 388,
    badge: "LIMITED OFFER",
    image: "assets/images/macbook_m2_banner.jpg",
    thumbs: ["assets/images/macbook_m2_banner.jpg", "assets/images/macbook.jpg"],
    description: "Strikingly thin and fast. Supercharged by the next-generation M2 chip, MacBook Air combines incredible performance with up to 18 hours of battery life into an all-aluminum unibody enclosure.",
    specs: [
      { label: "Processor", value: "Apple M2 8-core CPU with up to 10-core GPU" },
      { label: "Display", value: "13.6-inch Liquid Retina display with True Tone" },
      { label: "Battery", value: "Up to 18 hours Apple TV app movie playback" },
      { label: "Weight & Ports", value: "2.7 lbs (1.24 kg), MagSafe 3, 2x Thunderbolt ports" }
    ]
  },
  {
    id: "ipad-air-5",
    name: "iPad Air (5th Gen)",
    brand: "Apple",
    category: "tablets",
    price: 599,
    oldPrice: 649,
    discount: "NEW",
    rating: 4.8,
    reviewsCount: 145,
    badge: "NEW",
    image: "assets/images/ipad_air.jpg",
    thumbs: ["assets/images/ipad_air.jpg"],
    description: "Light. Bright. Full of might. Supercharged by the Apple M1 chip with an ultra-fast Neural Engine, 12MP Ultra Wide front camera with Center Stage, and blazing 5G connectivity.",
    specs: [
      { label: "Processor", value: "Apple M1 chip with 8-core CPU and 8-core GPU" },
      { label: "Display", value: "10.9-inch Liquid Retina display with P3 wide color" },
      { label: "Accessories", value: "Compatible with Apple Pencil (2nd gen) & Magic Keyboard" },
      { label: "Security", value: "Touch ID built into the top button" }
    ]
  },
  {
    id: "sony-wh-ch720n",
    name: "Sony WH-CH720N Headphones",
    brand: "Sony",
    category: "audio",
    price: 149,
    oldPrice: 179,
    discount: "NEW",
    rating: 4.7,
    reviewsCount: 210,
    badge: "NEW",
    image: "assets/images/sony_ch720n.jpg",
    thumbs: ["assets/images/sony_ch720n.jpg"],
    description: "Sony's lightest wireless noise-canceling headband ever. Featuring Integrated Processor V1, Dual Noise Sensor technology, and up to 35 hours of battery life with quick charging.",
    specs: [
      { label: "Noise Cancelling", value: "Integrated Processor V1 with dual noise sensor" },
      { label: "Battery", value: "Up to 35 hours battery life (3 min charge = 60 mins)" },
      { label: "Comfort", value: "Ultra-lightweight design at just 192g" },
      { label: "Calls", value: "Precise Voice Pickup technology with beamforming mics" }
    ]
  },
  {
    id: "dji-mini-3",
    name: "DJI Mini 3 Drone",
    brand: "DJI",
    category: "cameras",
    price: 449,
    oldPrice: 529,
    discount: "NEW",
    rating: 4.9,
    reviewsCount: 412,
    badge: "NEW",
    image: "assets/images/dji_mini3.jpg",
    thumbs: ["assets/images/dji_mini3.jpg"],
    description: "So fly. Under 249 g lightweight drone featuring extended battery life, 4K HDR video, True Vertical Shooting for social media, and level-5 wind resistance.",
    specs: [
      { label: "Weight", value: "Under 249 grams (No FAA registration required in many regions)" },
      { label: "Camera", value: "1/1.3-inch CMOS, 4K HDR Video, True Vertical Shooting" },
      { label: "Flight Time", value: "Up to 38 minutes maximum flight time" },
      { label: "Transmission", value: "DJI O2 digital video transmission up to 10 km" }
    ]
  },
  {
    id: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S",
    brand: "Logitech",
    category: "accessories",
    price: 99,
    oldPrice: 119,
    discount: "NEW",
    rating: 4.9,
    reviewsCount: 270,
    badge: "NEW",
    image: "assets/images/mx_master3s.jpg",
    thumbs: ["assets/images/mx_master3s.jpg"],
    description: "An iconic mouse remastered. Feel every moment of your workflow with Quiet Clicks and an 8,000 DPI track-on-glass optical sensor, paired with MagSpeed electromagnetic scrolling.",
    specs: [
      { label: "Sensor", value: "Darkfield high precision 8,000 DPI sensor (works on glass)" },
      { label: "Clicks", value: "Quiet Clicks (90% less click noise)" },
      { label: "Scroll Wheel", value: "MagSpeed electromagnetic scroll wheel (1,000 lines/sec)" },
      { label: "Battery", value: "Up to 70 days on a full charge (1 min charge = 3 hours)" }
    ]
  }
];

// --- APP STATE ---
const state = {
  cart: [],
  wishlist: [],
  currency: "USD",
  currencyRates: {
    USD: { rate: 1, symbol: "$", code: "USD" },
    EUR: { rate: 0.92, symbol: "€", code: "EUR" },
    GBP: { rate: 0.79, symbol: "£", code: "GBP" }
  },
  currentQvProduct: null,
  currentQvQty: 1,
  currentHeroSlide: 1,
  heroSlideInterval: null,
  flashCountdownSeconds: (7 * 3600) + (45 * 60) + 32,
  flashTimerInterval: null
};

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  loadStoredData();
  initHeroCarousel();
  initFlashDealsCountdown();
  initSearch();
  initDropdowns();
  updateCartBadge();
  updateWishlistBadge();
  renderCartDrawer();
  renderWishlistDrawer();
  updateAllPrices();
  initHeroParallax();
});

// --- PERSISTENCE ---
function loadStoredData() {
  try {
    const savedCart = localStorage.getItem("example_cart");
    if (savedCart) state.cart = JSON.parse(savedCart);
    
    const savedWish = localStorage.getItem("example_wishlist");
    if (savedWish) {
      state.wishlist = JSON.parse(savedWish);
      syncWishlistButtons();
    }
  } catch (e) {
    console.error("Storage load error:", e);
  }
}

function saveCart() {
  try {
    localStorage.setItem("example_cart", JSON.stringify(state.cart));
  } catch (e) {}
}

function saveWishlist() {
  try {
    localStorage.setItem("example_wishlist", JSON.stringify(state.wishlist));
  } catch (e) {}
}

// --- CURRENCY CONVERTER ---
function formatPrice(usdAmount) {
  const info = state.currencyRates[state.currency] || state.currencyRates.USD;
  const converted = usdAmount * info.rate;
  return `${info.symbol}${converted.toFixed(2)}`;
}

function updateAllPrices() {
  document.querySelectorAll(".price-val").forEach(el => {
    const usd = parseFloat(el.getAttribute("data-usd"));
    if (!isNaN(usd)) {
      el.textContent = formatPrice(usd);
    }
  });
  renderCartDrawer();
}

// --- CART FUNCTIONALITY ---
function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: qty
    });
  }

  saveCart();
  updateCartBadge();
  renderCartDrawer();
  showToast(`Added "${product.name}" to cart!`, "success");
}

function updateCartQty(productId, change) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.id !== productId);
    showToast(`Removed from cart`, "info");
  }

  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
  updateCartBadge();
  renderCartDrawer();
  showToast("Item removed from cart", "info");
}

function updateCartBadge() {
  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const cartBadge = document.getElementById("cartCount");
  const mobileCartBadge = document.getElementById("mobileCartCount");
  
  if (cartBadge) {
    cartBadge.textContent = totalQty;
    cartBadge.classList.remove("pulse");
    void cartBadge.offsetWidth;
    cartBadge.classList.add("pulse");
  }
  if (mobileCartBadge) {
    mobileCartBadge.textContent = totalQty;
  }
  const drawerCounter = document.getElementById("drawerCartCount");
  if (drawerCounter) {
    drawerCounter.textContent = `${totalQty} item${totalQty === 1 ? '' : 's'}`;
  }
}

function renderCartDrawer() {
  const container = document.getElementById("cartItemsList");
  const emptyState = document.getElementById("emptyCartState");
  const footer = document.getElementById("cartDrawerFooter");
  const bannerMsg = document.getElementById("freeShippingMsg");
  const progressFill = document.getElementById("shippingProgressFill");

  if (!container) return;

  container.innerHTML = "";

  if (state.cart.length === 0) {
    emptyState.style.display = "flex";
    if (footer) footer.style.display = "none";
    if (bannerMsg) bannerMsg.textContent = "Add $100.00 for Free Shipping";
    if (progressFill) progressFill.style.width = "0%";
    return;
  }

  emptyState.style.display = "none";
  if (footer) footer.style.display = "block";

  let subtotal = 0;

  state.cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    const row = document.createElement("div");
    row.className = "cart-item-row";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
      <div class="cart-item-info">
        <h5 class="cart-item-title">${item.name}</h5>
        <div class="cart-item-price">${formatPrice(item.price)} each</div>
        <div class="cart-qty-row">
          <div class="cart-qty-ctrl">
            <button onclick="updateCartQty('${item.id}', -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
          <button class="cart-remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      </div>
    `;
    container.appendChild(row);
  });

  const isFreeShipping = subtotal >= 100;
  const shippingCost = isFreeShipping ? 0 : 15;
  const total = subtotal + shippingCost;

  document.getElementById("cartSubtotal").textContent = formatPrice(subtotal);
  document.getElementById("cartShipping").textContent = isFreeShipping ? "FREE" : formatPrice(15);
  document.getElementById("cartTotal").textContent = formatPrice(total);

  // Shipping banner
  if (isFreeShipping) {
    bannerMsg.innerHTML = "🎉 Congratulations! You unlocked <strong>FREE Shipping!</strong>";
    progressFill.style.width = "100%";
    progressFill.style.background = "#10b981";
  } else {
    const remaining = (100 - subtotal).toFixed(2);
    bannerMsg.textContent = `Add $${remaining} more for Free Shipping`;
    const pct = Math.min(100, (subtotal / 100) * 100);
    progressFill.style.width = `${pct}%`;
    progressFill.style.background = "var(--primary-gradient)";
  }
}

function toggleCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  drawer.classList.toggle("active");
  overlay.classList.toggle("active");
}

document.getElementById("openCartBtn").addEventListener("click", toggleCartDrawer);

// --- WISHLIST FUNCTIONALITY ---
function toggleWishlist(productId, btnElement) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const idx = state.wishlist.indexOf(productId);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    if (btnElement) btnElement.classList.remove("active");
    showToast(`Removed "${product.name}" from Wishlist`, "info");
  } else {
    state.wishlist.push(productId);
    if (btnElement) btnElement.classList.add("active");
    showToast(`Saved "${product.name}" to Wishlist! ❤️`, "success");
  }

  saveWishlist();
  updateWishlistBadge();
  renderWishlistDrawer();
}

function syncWishlistButtons() {
  document.querySelectorAll(".wishlist-toggle-btn").forEach(btn => {
    const card = btn.closest(".product-card");
    if (card) {
      const id = card.getAttribute("data-id");
      if (state.wishlist.includes(id)) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  });
}

function updateWishlistBadge() {
  const count = state.wishlist.length;
  const badge = document.getElementById("wishlistCount");
  if (badge) {
    badge.textContent = count;
    badge.classList.remove("pulse");
    void badge.offsetWidth;
    badge.classList.add("pulse");
  }
  const drawerCount = document.getElementById("drawerWishlistCount");
  if (drawerCount) drawerCount.textContent = `${count} item${count === 1 ? '' : 's'}`;
}

function renderWishlistDrawer() {
  const container = document.getElementById("wishlistItemsList");
  const empty = document.getElementById("emptyWishlistState");
  if (!container) return;

  container.innerHTML = "";

  if (state.wishlist.length === 0) {
    empty.style.display = "flex";
    return;
  }

  empty.style.display = "none";

  state.wishlist.forEach(id => {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const row = document.createElement("div");
    row.className = "cart-item-row";
    row.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="cart-item-thumb">
      <div class="cart-item-info">
        <h5 class="cart-item-title">${product.name}</h5>
        <div class="cart-item-price">${formatPrice(product.price)}</div>
        <div class="cart-qty-row">
          <button class="btn btn-xs btn-purple" onclick="addToCart('${product.id}'); toggleWishlist('${product.id}');">Move to Cart</button>
          <button class="cart-remove-btn" onclick="toggleWishlist('${product.id}')">Remove</button>
        </div>
      </div>
    `;
    container.appendChild(row);
  });
}

function toggleWishlistDrawer() {
  const drawer = document.getElementById("wishlistDrawer");
  const overlay = document.getElementById("wishlistOverlay");
  drawer.classList.toggle("active");
  overlay.classList.toggle("active");
}

document.getElementById("openWishlistBtn").addEventListener("click", toggleWishlistDrawer);

// --- QUICK VIEW MODAL ---
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.currentQvProduct = product;
  state.currentQvQty = 1;

  document.getElementById("qvTitle").textContent = product.name;
  document.getElementById("qvBadge").textContent = product.badge || "FEATURED";
  document.getElementById("qvCurrentPrice").textContent = formatPrice(product.price);
  document.getElementById("qvOldPrice").textContent = product.oldPrice ? formatPrice(product.oldPrice) : "";
  document.getElementById("qvDescription").textContent = product.description;
  document.getElementById("qvRatingText").textContent = `${product.rating} (${product.reviewsCount} reviews)`;
  document.getElementById("qvQtyVal").textContent = state.currentQvQty;

  const mainImg = document.getElementById("qvMainImg");
  mainImg.src = product.image;
  mainImg.alt = product.name;

  const thumbsContainer = document.getElementById("qvThumbs");
  thumbsContainer.innerHTML = "";
  product.thumbs.forEach((src, idx) => {
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.className = `qv-thumb-item ${idx === 0 ? 'active' : ''}`;
    thumb.onclick = () => {
      mainImg.src = src;
      document.querySelectorAll(".qv-thumb-item").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    };
    thumbsContainer.appendChild(thumb);
  });

  const specsList = document.getElementById("qvSpecsList");
  specsList.innerHTML = "";
  product.specs.forEach(s => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${s.label}:</strong> ${s.value}`;
    specsList.appendChild(li);
  });

  const modal = document.getElementById("quickViewModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  const modal = document.getElementById("quickViewModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function incrementQvQty() {
  state.currentQvQty++;
  document.getElementById("qvQtyVal").textContent = state.currentQvQty;
}

function decrementQvQty() {
  if (state.currentQvQty > 1) {
    state.currentQvQty--;
    document.getElementById("qvQtyVal").textContent = state.currentQvQty;
  }
}

function addCurrentQvToCart() {
  if (!state.currentQvProduct) return;
  addToCart(state.currentQvProduct.id, state.currentQvQty);
  closeQuickView();
  toggleCartDrawer();
}

function toggleCurrentQvWishlist() {
  if (!state.currentQvProduct) return;
  toggleWishlist(state.currentQvProduct.id);
}

// --- HERO CAROUSEL ---
function initHeroCarousel() {
  const slides = document.querySelectorAll(".hero-slide");
  const totalSlides = slides.length;
  const prevBtn = document.getElementById("heroPrevBtn");
  const nextBtn = document.getElementById("heroNextBtn");
  const currentNumEl = document.getElementById("slideCurrentNum");
  const progressFill = document.getElementById("progressFill");

  function goToSlide(n) {
    slides.forEach(s => s.classList.remove("active"));
    state.currentHeroSlide = (n > totalSlides) ? 1 : (n < 1) ? totalSlides : n;
    
    const activeSlide = document.querySelector(`.hero-slide[data-slide="${state.currentHeroSlide}"]`);
    if (activeSlide) activeSlide.classList.add("active");

    if (currentNumEl) currentNumEl.textContent = `0${state.currentHeroSlide}`;
    if (progressFill) {
      const pct = (state.currentHeroSlide / totalSlides) * 100;
      progressFill.style.width = `${pct}%`;
    }
  }

  if (prevBtn) prevBtn.addEventListener("click", () => {
    resetHeroTimer();
    goToSlide(state.currentHeroSlide - 1);
  });

  if (nextBtn) nextBtn.addEventListener("click", () => {
    resetHeroTimer();
    goToSlide(state.currentHeroSlide + 1);
  });

  function startHeroTimer() {
    state.heroSlideInterval = setInterval(() => {
      goToSlide(state.currentHeroSlide + 1);
    }, 6500);
  }

  function resetHeroTimer() {
    clearInterval(state.heroSlideInterval);
    startHeroTimer();
  }

  startHeroTimer();

  const heroCard = document.getElementById("heroCard");
  if (heroCard) {
    heroCard.addEventListener("mouseenter", () => clearInterval(state.heroSlideInterval));
    heroCard.addEventListener("mouseleave", startHeroTimer);
  }
}

// 3D Parallax effect on hero image
function initHeroParallax() {
  const heroCard = document.getElementById("heroCard");
  const heroImg = document.getElementById("heroParallaxImg");
  if (!heroCard || !heroImg) return;

  heroCard.addEventListener("mousemove", (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (y / rect.height) * -10;
    const rotY = (x / rect.width) * 10;
    heroImg.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  });

  heroCard.addEventListener("mouseleave", () => {
    heroImg.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  });
}

// --- FLASH DEALS COUNTDOWN TIMER ---
function initFlashDealsCountdown() {
  const hrsEl = document.getElementById("timerHrs");
  const minsEl = document.getElementById("timerMins");
  const secsEl = document.getElementById("timerSecs");

  function update() {
    if (state.flashCountdownSeconds <= 0) {
      state.flashCountdownSeconds = 28800; // Reset to 8 hours
    } else {
      state.flashCountdownSeconds--;
    }

    const hrs = Math.floor(state.flashCountdownSeconds / 3600);
    const mins = Math.floor((state.flashCountdownSeconds % 3600) / 60);
    const secs = state.flashCountdownSeconds % 60;

    if (hrsEl) hrsEl.textContent = hrs.toString().padStart(2, '0');
    if (minsEl) minsEl.textContent = mins.toString().padStart(2, '0');
    if (secsEl) secsEl.textContent = secs.toString().padStart(2, '0');
  }

  update();
  state.flashTimerInterval = setInterval(update, 1000);
}

function showAllFlashDeals() {
  document.getElementById("flash-deals").scrollIntoView({ behavior: "smooth" });
  showToast("Showing all 6 Exclusive Flash Deals!", "info");
}

// --- SEARCH AUTOCOMPLETE & FILTER ---
function initSearch() {
  const input = document.getElementById("searchInput");
  const popup = document.getElementById("searchResultsPopup");
  const list = document.getElementById("searchResultsList");

  if (!input || !popup || !list) return;

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) {
      popup.classList.remove("active");
      return;
    }

    const matches = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );

    list.innerHTML = "";

    if (matches.length === 0) {
      list.innerHTML = `<div style="padding: 14px 18px; color: #94a3b8; font-size: 13px;">No tech devices found matching "${q}"</div>`;
    } else {
      matches.slice(0, 5).forEach(item => {
        const itemEl = document.createElement("div");
        itemEl.className = "search-result-item";
        itemEl.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="search-thumb">
          <div class="search-info">
            <div class="search-title">${item.name}</div>
            <div class="search-price">${formatPrice(item.price)}</div>
          </div>
        `;
        itemEl.addEventListener("click", () => {
          popup.classList.remove("active");
          input.value = "";
          openQuickView(item.id);
        });
        list.appendChild(itemEl);
      });
    }

    popup.classList.add("active");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-bar-wrapper")) {
      popup.classList.remove("active");
    }
  });
}

function handleSearchSubmit() {
  const input = document.getElementById("searchInput");
  const q = input.value.trim().toLowerCase();
  if (!q) return;

  const match = PRODUCTS.find(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  if (match) {
    openQuickView(match.id);
  } else {
    showToast(`Searching for "${q}"... Check categories below`, "info");
    document.getElementById("category-row").scrollIntoView({ behavior: "smooth" });
  }
  document.getElementById("searchResultsPopup").classList.remove("active");
}

// --- CATEGORY & BRAND FILTERING ---
function filterByCategory(categoryKey, btnEl) {
  document.querySelectorAll(".cat-pill-card").forEach(c => c.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  const cards = document.querySelectorAll(".product-card");
  let found = 0;
  cards.forEach(card => {
    const cardCat = card.getAttribute("data-category");
    if (categoryKey === "all" || cardCat === categoryKey) {
      card.style.display = "flex";
      found++;
    } else {
      card.style.display = "none";
    }
  });

  document.getElementById("flash-deals").scrollIntoView({ behavior: "smooth" });
  showToast(`Filtered by "${categoryKey.toUpperCase()}" (${found} items visible)`, "info");
}

function resetCategoryFilter(btnEl) {
  document.querySelectorAll(".cat-pill-card").forEach(c => c.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  document.querySelectorAll(".product-card").forEach(card => {
    card.style.display = "flex";
  });
  showToast("Showing all products across all categories", "info");
}

function filterByBrand(brandName) {
  showToast(`Showing all flagship ${brandName} products`, "info");
  document.getElementById("flash-deals").scrollIntoView({ behavior: "smooth" });
}

// --- CURRENCY & LANGUAGE DROPDOWNS ---
function initDropdowns() {
  // Currency Dropdown
  const currBtn = document.getElementById("currBtn");
  const currDropdown = document.getElementById("currDropdown");
  const currMenu = document.getElementById("currMenu");

  currBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currDropdown.classList.toggle("open");
  });

  currMenu.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => {
      const code = li.getAttribute("data-curr");
      state.currency = code;
      document.getElementById("currentCurrLabel").textContent = `${code} ${state.currencyRates[code].symbol}`;
      currMenu.querySelectorAll("li").forEach(l => l.classList.remove("active"));
      li.classList.add("active");
      currDropdown.classList.remove("open");
      updateAllPrices();
      showToast(`Currency updated to ${code}`, "info");
    });
  });

  // Language Dropdown
  const langBtn = document.getElementById("langBtn");
  const langDropdown = document.getElementById("langDropdown");
  const langMenu = document.getElementById("langMenu");

  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle("open");
  });

  langMenu.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => {
      const lang = li.getAttribute("data-lang");
      document.getElementById("currentLangLabel").textContent = lang;
      langMenu.querySelectorAll("li").forEach(l => l.classList.remove("active"));
      li.classList.add("active");
      langDropdown.classList.remove("open");
      showToast(`Language set to ${lang}`, "info");
    });
  });

  // User Dropdown
  const userMenuBtn = document.getElementById("userMenuBtn");
  const userDropdown = document.getElementById("userDropdown");
  userMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.parentElement.classList.toggle("open");
  });

  // Close dropdowns on outside click
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-wrapper").forEach(w => w.classList.remove("open"));
  });
}

// --- VIDEO SHOWCASE MODAL ---
document.getElementById("heroWatchVideo").addEventListener("click", () => {
  const modal = document.getElementById("videoModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  showToast("Streaming Example Tech Showcase 4K 60FPS", "info");
});

function closeVideoModal() {
  document.getElementById("videoModal").classList.remove("active");
  document.body.style.overflow = "";
}

function toggleSimulatedVideo() {
  showToast("Video paused / resumed", "info");
}

// --- ORDER TRACKING ---
document.getElementById("openTrackOrderBtn").addEventListener("click", () => {
  openModal("trackOrderModal");
});

function simulateOrderTracking() {
  const code = document.getElementById("trackingInput").value.trim();
  const timeline = document.getElementById("trackingTimeline");
  timeline.style.opacity = "0.5";
  setTimeout(() => {
    timeline.style.opacity = "1";
    showToast(`Status updated for order ${code}: Out for delivery!`, "success");
  }, 400);
}

// --- LIVE SUPPORT CHAT ---
document.getElementById("openSupportBtn").addEventListener("click", () => {
  openModal("supportModal");
});

function sendQuickChat(text) {
  addChatMessage(text, "user");
  setTimeout(() => {
    let reply = "Thanks for asking! Our specialized support agent is on it.";
    if (text.includes("order")) {
      reply = "You can track your order using the 'Track Order' option at the top. Order #EX-984210 is currently out for delivery!";
    } else if (text.includes("return")) {
      reply = "We offer a 30-day hassle-free return policy. If you are not satisfied, returns are 100% free.";
    } else if (text.includes("shipping")) {
      reply = "We offer Free Express Shipping on all orders over $100 worldwide!";
    }
    addChatMessage(reply, "bot");
  }, 600);
}

function handleSendChat() {
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();
  if (!msg) return;

  addChatMessage(msg, "user");
  input.value = "";

  setTimeout(() => {
    addChatMessage("Thank you! An Example specialist has logged your request and will follow up shortly.", "bot");
  }, 800);
}

function addChatMessage(msg, sender) {
  const chatBody = document.getElementById("chatBody");
  const el = document.createElement("div");
  el.className = `chat-msg ${sender}`;
  el.innerHTML = `<p>${msg}</p>`;
  chatBody.appendChild(el);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// --- STORE LOCATOR ---
document.getElementById("openStoreLocatorBtn").addEventListener("click", () => {
  openModal("storeLocatorModal");
});

// --- CHECKOUT & ORDER COMPLETION ---
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast("Your cart is empty!", "info");
    return;
  }
  toggleCartDrawer();

  // Populate checkout summary
  const summaryContainer = document.getElementById("checkoutSummaryItems");
  summaryContainer.innerHTML = "";
  let subtotal = 0;

  state.cart.forEach(item => {
    subtotal += item.price * item.qty;
    const row = document.createElement("div");
    row.style.cssText = "display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px;";
    row.innerHTML = `<span>${item.name} × ${item.qty}</span> <strong>${formatPrice(item.price * item.qty)}</strong>`;
    summaryContainer.appendChild(row);
  });

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  document.getElementById("coSubtotal").textContent = formatPrice(subtotal);
  document.getElementById("coTax").textContent = formatPrice(tax);
  document.getElementById("coTotal").textContent = formatPrice(total);
  document.getElementById("checkoutSubmitTotal").textContent = formatPrice(total);

  document.getElementById("checkoutContent").style.display = "grid";
  document.getElementById("orderConfirmedScreen").style.display = "none";

  openModal("checkoutModal");
}

function completeOrder() {
  const randNum = Math.floor(100000 + Math.random() * 900000);
  document.getElementById("confirmedOrderId").textContent = `#EX-${randNum}`;
  document.getElementById("checkoutContent").style.display = "none";
  document.getElementById("orderConfirmedScreen").style.display = "block";

  // Clear cart
  state.cart = [];
  saveCart();
  updateCartBadge();
  renderCartDrawer();

  showToast("🎉 Order placed successfully! Check your email confirmation.", "success");
}

function resetOrderForm() {
  document.getElementById("checkoutContent").style.display = "grid";
  document.getElementById("orderConfirmedScreen").style.display = "none";
}

// --- NEWSLETTER SUBSCRIPTION ---
function handleNewsletter() {
  const emailInput = document.getElementById("newsletterEmail");
  const email = emailInput.value.trim();
  if (!email) return;

  emailInput.value = "";
  showToast(`🎉 You're in! Use promo code "CLUB10" for 10% off your order.`, "success");
}

// --- MODAL UTILITIES ---
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Close modals when clicking backdrop
document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      backdrop.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// ESC key closes modals & drawers
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-backdrop.active").forEach(m => m.classList.remove("active"));
    document.querySelectorAll(".cart-drawer.active").forEach(d => d.classList.remove("active"));
    document.querySelectorAll(".drawer-overlay.active").forEach(o => o.classList.remove("active"));
    document.body.style.overflow = "";
  }
});

// --- TOAST ENGINE ---
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg style="width: 18px; height: 18px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' 
        ? '<polyline points="20 6 9 17 4 12"/>' 
        : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'}
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- MOBILE NAVIGATION DRAWER ---
const mobileBtn = document.getElementById("mobileMenuBtn");
const mobileDrawer = document.getElementById("mobileDrawer");
const mobileOverlay = document.getElementById("mobileDrawerOverlay");
const closeMobileBtn = document.getElementById("closeMobileDrawer");

function toggleMobileNav() {
  mobileDrawer.classList.toggle("active");
  mobileOverlay.classList.toggle("active");
}

function closeMobileNav() {
  mobileDrawer.classList.remove("active");
  mobileOverlay.classList.remove("active");
}

if (mobileBtn) mobileBtn.addEventListener("click", toggleMobileNav);
if (closeMobileBtn) closeMobileBtn.addEventListener("click", closeMobileNav);
if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobileNav);

document.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", closeMobileNav);
});

// --- INFORMATIONAL MODALS ---
function openSecurityModal() {
  showToast("All transactions protected by 256-bit bank-grade encryption", "info");
}

function openShippingModal() {
  showToast("Orders shipped with FedEx & DHL with live tracking", "info");
}

function openReturnsModal() {
  showToast("30-Day Money-Back Guarantee with free prepaid return label", "info");
}

function openWarrantyModal() {
  showToast("Every device includes 1-year or 2-year official brand warranty", "info");
}

function openAboutModal() {
  showToast("Example: Founded in 2026 to deliver cutting-edge technology", "info");
}

function openAccountModal() {
  showToast("Signed in as Robert Fox (robert.fox@example.com)", "info");
}

function openTermsModal() {
  showToast("Terms of Service: Standard consumer protection guaranteed", "info");
}

function openPrivacyModal() {
  showToast("Privacy: We never sell your personal information", "info");
}

function openCookiesModal() {
  showToast("Cookies: Essential performance and security cookies enabled", "info");
}
