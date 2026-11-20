 // ==========================================
// SHOPORA - E-COMMERCE WEBSITE
// Frontend College Project
// HTML + CSS + JavaScript
// ==========================================


// PRODUCT DATA

const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        cat: "Electronics",
        price: 1499,
        old: 2199,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=85"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        cat: "Electronics",
        price: 2299,
        old: 3499,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=85"
    },
    {
        id: 3,
        name: "Portable Bluetooth Speaker",
        cat: "Electronics",
        price: 999,
        old: 1499,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=85"
    },
    {
        id: 4,
        name: "Running Sports Shoes",
        cat: "Fashion",
        price: 1899,
        old: 2799,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=85"
    },
    {
        id: 5,
        name: "Classic Cotton T-Shirt",
        cat: "Fashion",
        price: 499,
        old: 799,
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=85"
    },
    {
        id: 6,
        name: "Travel Backpack",
        cat: "Fashion",
        price: 1299,
        old: 1899,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=85"
    },
    {
        id: 7,
        name: "Elegant Coffee Mug Set",
        cat: "Home",
        price: 699,
        old: 999,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&auto=format&fit=crop&q=85"
    },
    {
        id: 8,
        name: "Modern Table Lamp",
        cat: "Home",
        price: 1199,
        old: 1699,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=85"
    },
    {
        id: 9,
        name: "Decorative Indoor Plant",
        cat: "Home",
        price: 399,
        old: 599,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=85"
    },
    {
        id: 10,
        name: "Refreshing Face Wash",
        cat: "Beauty",
        price: 249,
        old: 349,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600&auto=format&fit=crop&q=85"
    },
    {
        id: 11,
        name: "Premium Skin Care Kit",
        cat: "Beauty",
        price: 899,
        old: 1299,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop&q=85"
    },
    {
        id: 12,
        name: "Healthy Mixed Dry Fruits",
        cat: "Grocery",
        price: 599,
        old: 799,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&auto=format&fit=crop&q=85"
    },
    {
        id: 13,
        name: "Reusable Water Bottle",
        cat: "Home",
        price: 549,
        old: 799,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=85"
    },
    {
        id: 14,
        name: "Non-Slip Yoga Mat",
        cat: "Sports",
        price: 799,
        old: 1199,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600&auto=format&fit=crop&q=85"
    },
    {
        id: 15,
        name: "Professional Cricket Bat",
        cat: "Sports",
        price: 1599,
        old: 2199,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=85"
    }
];


// ==========================================
// GLOBAL VARIABLES
// ==========================================

function readStorage(key, fallback) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value ?? fallback;
    } catch (error) {
        return fallback;
    }
}

let cart = readStorage("shoporaCart", []);
let wishlist = readStorage("shoporaWishlist", []);
let orders = readStorage("shoporaOrders", []);
let couponApplied = false;

const money = amount =>
    "₹" + amount.toLocaleString("en-IN");


// ==========================================
// SAVE DATA
// ==========================================

function saveCart() {
    localStorage.setItem("shoporaCart", JSON.stringify(cart));

    const count = cart.reduce(
        (sum, item) => sum + item.qty,
        0
    );

    document.getElementById("cartCount").textContent = count;
    document.getElementById("drawerCount").textContent = `(${count})`;
}

function saveWishlist() {
    localStorage.setItem(
        "shoporaWishlist",
        JSON.stringify(wishlist)
    );
}

function saveOrders() {
    localStorage.setItem(
        "shoporaOrders",
        JSON.stringify(orders)
    );
}


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function render() {

    const search = document
        .getElementById("searchInput")
        .value.trim()
        .toLowerCase();

    const category =
        document.getElementById("searchCat").value;

    const sort =
        document.getElementById("sort").value;

    let filtered = products.filter(product => {

        const matchesCategory =
            category === "All" ||
            product.cat === category;

        const matchesSearch =
            product.name.toLowerCase().includes(search) ||
            product.cat.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;
    });

    // SORT PRODUCTS

    if (sort === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    // UPDATE HEADING

    const heading = document.getElementById("productHeading");

    if (search || category !== "All") {
        heading.textContent = "Search Results";
    } else if (sort === "rating") {
        heading.textContent = "Top Rated Products";
    } else {
        heading.textContent = "Recommended For You";
    }

    document.getElementById("resultCount").textContent =
        `${filtered.length} products available`;

    const grid = document.getElementById("productGrid");

    // NO PRODUCTS FOUND

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <h3>No products found</h3>
                <p>Try another product name or category.</p>
                <br>
                <button class="add" onclick="resetShop()">Show All Products</button>
            </div>
        `;
        return;
    }

    // PRODUCT CARDS

    grid.innerHTML = filtered.map(product => {

        const discount = Math.round(
            (1 - product.price / product.old) * 100
        );

        const isWishlisted = wishlist.includes(product.id);

        return `
            <article class="card">

                <div class="photo">

                    <span class="discount">
                        ${discount}% OFF
                    </span>

                    <button
                        class="wishlist ${isWishlisted ? "active" : ""}"
                        onclick="toggleWishlist(${product.id})"
                        aria-label="Add to wishlist">
                        ${isWishlisted ? "♥" : "♡"}
                    </button>

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="this.onerror=null;this.src='https://placehold.co/600x500/f2f2f2/555?text=Shopora+Product';">

                </div>

                <div class="product-category">
                    ${product.cat}
                </div>

                <h3>${product.name}</h3>

                <div class="stars">
                    ★★★★★
                    <span>${product.rating} / 5</span>
                </div>

                <div class="price">
                    ${money(product.price)}
                </div>

                <div class="old">
                    MRP: ${money(product.old)}
                </div>

                <div class="delivery">
                    FREE delivery on eligible orders
                </div>

                <button class="add"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </article>
        `;

    }).join("");
}


// ==========================================
// SEARCH
// ==========================================

document.getElementById("searchInput")
    .addEventListener("input", render);

document.getElementById("searchCat")
    .addEventListener("change", render);


// ==========================================
// CATEGORY FILTER
// ==========================================

function pick(category) {

    document.getElementById("searchCat").value = category;
    document.getElementById("searchInput").value = "";

    render();

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}


// RESET SHOP

function resetShop() {

    document.getElementById("searchCat").value = "All";
    document.getElementById("searchInput").value = "";
    document.getElementById("sort").value = "featured";

    render();
}


// BEST SELLERS

function sortByRating() {

    document.getElementById("searchCat").value = "All";
    document.getElementById("searchInput").value = "";
    document.getElementById("sort").value = "rating";

    render();

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}


// ==========================================
// WISHLIST
// ==========================================

function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist = wishlist.filter(item => item !== id);

        toast("Removed from wishlist!");

    } else {

        wishlist.push(id);

        toast("Added to wishlist!");
    }

    saveWishlist();
    render();
}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(id) {

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            id: id,
            qty: 1
        });
    }

    couponApplied = false;

    saveCart();
    renderCart();

    toast("Product added to cart!");
}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQty(id, amount) {

    const item = cart.find(x => x.id === id);

    if (!item) return;

    item.qty += amount;

    if (item.qty <= 0) {
        cart = cart.filter(x => x.id !== id);
    }

    couponApplied = false;

    saveCart();
    renderCart();
}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    couponApplied = false;

    saveCart();
    renderCart();

    toast("Product removed from cart!");
}


// ==========================================
// CALCULATE CART TOTAL
// ==========================================

function calculateSubtotal() {

    return cart.reduce((sum, item) => {

        const product = products.find(
            p => p.id === item.id
        );

        if (!product) return sum;

        return sum + product.price * item.qty;

    }, 0);
}


// ==========================================
// COUPON SYSTEM
// ==========================================

function applyCoupon() {

    const input = document.getElementById("couponInput");

    if (!input) return;

    const code = input.value.trim().toUpperCase();

    if (code === "SAVE10") {

        if (calculateSubtotal() === 0) {
            toast("Your cart is empty!");
            return;
        }

        couponApplied = true;

        renderCart();

        toast("Coupon applied! 10% discount added.");

    } else {

        couponApplied = false;

        renderCart();

        toast("Invalid coupon code!");
    }
}


// ==========================================
// DISPLAY CART
// ==========================================

function renderCart() {

    const cartList = document.getElementById("cartList");
    const cartFoot = document.getElementById("cartFoot");

    const validCart = cart.filter(item =>
        products.some(product => product.id === item.id)
    );

    if (validCart.length !== cart.length) {
        cart = validCart;
        saveCart();
    }

    if (cart.length === 0) {

        couponApplied = false;

        cartList.innerHTML = `
            <div class="empty">
                <strong>Your cart is empty</strong>
                Looks like you haven't added anything yet.
                <br><br>
                Start exploring Shopora!
            </div>
        `;

        cartFoot.innerHTML = "";
        return;
    }

    // CART ITEMS

    cartList.innerHTML = cart.map(item => {

        const product = products.find(
            p => p.id === item.id
        );

        return `
            <div class="cartline">

                <div class="cartpic">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        onerror="this.onerror=null;this.src='https://placehold.co/100x100/f2f2f2/555?text=Product';">
                </div>

                <div>
                    <b>${product.name}</b>

                    <small>${money(product.price)}</small>

                    <div class="qty">

                        <button onclick="changeQty(${product.id}, -1)">−</button>

                        <span>${item.qty}</span>

                        <button onclick="changeQty(${product.id}, 1)">+</button>

                        <button class="remove"
                            onclick="removeItem(${product.id})">
                            Delete
                        </button>

                    </div>
                </div>

                <b>${money(product.price * item.qty)}</b>

            </div>
        `;

    }).join("");


    // TOTAL CALCULATION

    const subtotal = calculateSubtotal();

    const discount = couponApplied
        ? Math.round(subtotal * 0.10)
        : 0;

    const total = subtotal - discount;


    // CART FOOTER

    cartFoot.innerHTML = `

        <div class="coupon-area">
            <input
                type="text"
                id="couponInput"
                placeholder="Enter coupon code"
                value="${couponApplied ? "SAVE10" : ""}"
            >

            <button onclick="applyCoupon()">Apply</button>
        </div>

        ${couponApplied
            ? `<p class="coupon-message">✓ SAVE10 applied successfully</p>`
            : `<p class="coupon-message" style="color:#777">Try coupon code SAVE10 for 10% off</p>`
        }

        <div class="total-row">
            <span>Subtotal</span>
            <span>${money(subtotal)}</span>
        </div>

        ${couponApplied ? `
            <div class="total-row">
                <span>Coupon Discount</span>
                <span style="color:green">- ${money(discount)}</span>
            </div>
        ` : ""}

        <div class="total">
            <span>Total Amount</span>
            <span>${money(total)}</span>
        </div>

        <button class="checkout" onclick="openCheckout()">
            Proceed to Buy →
        </button>
    `;
}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    document.getElementById("overlay")
        .classList.add("show");

    document.getElementById("drawer")
        .classList.add("show");

    document.body.style.overflow = "hidden";

    renderCart();
}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

    document.getElementById("overlay")
        .classList.remove("show");

    document.getElementById("drawer")
        .classList.remove("show");

    document.body.style.overflow = "";
}


// ==========================================
// CHECKOUT
// ==========================================

function openCheckout() {

    if (cart.length === 0) {
        toast("Your cart is empty!");
        return;
    }

    closeCart();

    document.getElementById("checkout")
        .classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeCheckout() {

    document.getElementById("checkout")
        .classList.remove("show");

    document.body.style.overflow = "";
}


// ==========================================
// PLACE DEMO ORDER
// ==========================================

function placeOrder(event) {

    event.preventDefault();

    if (cart.length === 0) {
        toast("Your cart is empty!");
        closeCheckout();
        return;
    }

    const formData = new FormData(event.target);

    const orderId = "SH" +
        Date.now().toString().slice(-8);

    const orderItems = cart.map(item => {

        const product = products.find(
            p => p.id === item.id
        );

        return {
            id: item.id,
            name: product.name,
            price: product.price,
            qty: item.qty
        };
    });

    const subtotal = calculateSubtotal();

    const discount = couponApplied
        ? Math.round(subtotal * 0.10)
        : 0;

    const order = {
        orderId: orderId,
        customer: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        address: formData.get("address"),
        city: formData.get("city"),
        pin: formData.get("pin"),
        items: orderItems,
        total: subtotal - discount,
        date: new Date().toLocaleString("en-IN")
    };

    // SAVE ORDER HISTORY

    orders.unshift(order);

    saveOrders();

    // EMPTY CART

    cart = [];
    couponApplied = false;

    saveCart();
    renderCart();

    // CLOSE MODAL

    closeCheckout();

    event.target.reset();

    toast("Order placed successfully! ID: " + orderId);
}


// ==========================================
// ACCOUNT - DEMO
// ==========================================

function showAccount() {

    toast("Login system ke liye backend required hai.");
}


// ==========================================
// ORDER HISTORY
// ==========================================

function showOrders() {

    if (orders.length === 0) {

        toast("Abhi koi demo order nahi hai.");

        return;
    }

    const latestOrder = orders[0];

    toast(
        "Last Order: " +
        latestOrder.orderId +
        " | Total: " +
        money(latestOrder.total)
    );
}


// ==========================================
// TOAST NOTIFICATION
// ==========================================

let toastTimer;

function toast(message) {

    const box = document.getElementById("toast");

    box.textContent = message;

    box.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        box.classList.remove("show");

    }, 2800);
}


// ==========================================
// KEYBOARD SUPPORT
// ==========================================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeCart();
        closeCheckout();
    }

});


// ==========================================
// INITIALIZE WEBSITE
// ==========================================

render();

saveCart();

renderCart();