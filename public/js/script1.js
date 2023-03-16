/* offcanvas */
let iso = null;
let data = [];

fetch('/products')
    .then(response => response.json())
    .then(productData => {
        data = productData;
        data.products.forEach((product) => {
            addCard(product);
        });

        iso = new Isotope('#card-list', {
            itemSelector: '.col-12',
            layoutMode: 'fitRows',

        });
    })
    .catch(error => console.error(error));

function addCard(product) {
    const template = document.getElementById("card-template").content.cloneNode(true);
    template.querySelector('.card-title').innerText = product.title;
    template.querySelector('.card-text').innerText = product.description;
    template.querySelector('.card-img-top').src = product.image;
    template.querySelector('.card-price').innerText = `$${product.price}`;
    template.querySelector('.btn-primary').addEventListener("click", function () {
        alert(`You added ${product.title} for $${product.price} to your cart.`);
        addCart(product.title, product.price)
    });

    const category = product.category.toLowerCase();
    const $card = $(template.querySelector('.col-12'));
    $card.attr('data-category', category); // add the category as a custom attribute to the card element
    document.querySelector('#card-list').appendChild($card[0]);
}


function filterProducts(category) {
    const filteredProducts = data.products.filter((product) => {
        if (category === "all") {
            return true;
        } else {
            return product.category.toLowerCase() === category;
        }
    });

    iso.arrange({ filter: category === "all" ? "*" : `[data-category="${category}"]` }); // use custom attribute to filter the cards

    document.querySelectorAll('.btn').forEach((btn) => {
        btn.classList.remove('active');
    });

    document.querySelector(`#${category}-btn`).classList.add('active');
}

document.getElementById("all-btn").addEventListener("click", function () {
    filterProducts("all");
});

document.getElementById("women-btn").addEventListener("click", function () {
    filterProducts("women's clothing");
});

document.getElementById("men-btn").addEventListener("click", function () {
    filterProducts("men's clothing");
});

document.getElementById("jewelery-btn").addEventListener("click", function () {
    filterProducts("jewelery");
});

document.getElementById("electronics-btn").addEventListener("click", function () {
    filterProducts("electronics");
});

window.onload = function () {
    var grid = document.querySelector('.grid');
    var iso = new Isotope(grid, {
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });
};
function addCart(productTitle, productPrice) {

    /* const productTitle = this.closest('.card').querySelector('.card-title').innerText; */
        /* const productPrice = parseFloat(this.closest('.card').querySelector('.card-price').innerText.slice(1)) */;
    const product = { title: productTitle, price: productPrice };

    // add the item to the cart
    cartItems.push(product);

    // update the content of the shopping cart element in the off-canvas menu
    /*  cartElement.innerHTML = ''; */
    if (cartItems.length === 0) {
        cartElement.innerText = 'Your shopping cart is empty.';
    } else {
        cartElement.innerText = "";
        const cartList = document.createElement('ul');
        cartList.classList.add('list-group');
        cartItems.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            listItem.innerHTML = `${item.title}<span class="badge bg-primary rounded-pill">$${item.price}</span>`;
            cartList.appendChild(listItem);
        });
        cartElement.appendChild(cartList);

        const cartTotal = document.createElement('div');
        cartTotal.classList.add('text-end', 'mt-3');
        cartTotal.innerHTML = `<strong>Total:</strong> $${cartItems.reduce((total, item) => total + item.price, 0)}`;
        cartElement.appendChild(cartTotal);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

}
let cartItems;
// create an array to store the items in the cart
if (localStorage.getItem("cartItems")) {
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
} else {
    cartItems = [];
}

// get a reference to the shopping cart element in the off-canvas menu
const cartElement = document.querySelector('#offcanvasMenu .offcanvas-body');


// add a click event listener to all "Add to Cart" buttons
document.querySelectorAll('.btn-primary').forEach((button) => {
    button.addEventListener('click', function () {

        const productTitle = this.closest('.card').querySelector('.card-title').innerText;
        const productPrice = parseFloat(this.closest('.card').querySelector('.card-price').innerText.slice(1));
        const product = { title: productTitle, price: productPrice };

        // add the item to the cart
        cartItems.push(product);

        // update the content of the shopping cart element in the off-canvas menu
        /*  cartElement.innerHTML = ''; */
        if (cartItems.length === 0) {
            cartElement.innerText = 'Your shopping cart is empty.';
        } else {
            const cartList = document.createElement('ul');
            cartList.classList.add('list-group');
            cartItems.forEach((item) => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                listItem.innerHTML = `${item.title}<span class="badge bg-primary rounded-pill">$${item.price}</span>`;
                cartList.appendChild(listItem);
            });
            cartElement.appendChild(cartList);

            const cartTotal = document.createElement('div');
            cartTotal.classList.add('text-end', 'mt-3');
            cartTotal.innerHTML = `<strong>Total:</strong> $${cartItems.reduce((total, item) => total + item.price, 0)}`;
            cartElement.appendChild(cartTotal);
        }
    });
});
/* 
const clearStorageBtn = document.querySelector('#clear-storage-btn');
clearStorageBtn.addEventListener('click', function() {
  localStorage.clear();
  alert('Cart has been cleared!');
}); */