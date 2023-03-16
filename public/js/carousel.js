/* Home */
let currentIndex = 0;
let cards = [];


fetch('/products')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        cards = data.products.map(product => {
            return {
                title: product.title,
                description: product.description,
                image: product.image
            };
        });

        updateCarousel(currentIndex);
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel(currentIndex);
        }, 3000); // change the time interval (in milliseconds) as per your requirement
    })
    .catch(error => console.error(error));

function addCard(card) {
    const template = document.getElementById("card-template").content.cloneNode(true);
    template.querySelector('.card-title').innerText = card.title;
    /* template.querySelector('.card-text').innerText = card.description; */
    template.querySelector('.card-img-top').src = card.image;
    document.querySelector('.carousel-inner').appendChild(template);
/*     template.querySelector('.btn-primary').addEventListener("click", function () {
        alert(`You added ${product.title} for $${product.price} to your cart.`);
        addCart(product.title, product.price)
    }); */
}


function updateCarousel(index) {
    document.querySelector('.carousel-inner').innerHTML = '';
    addCard(cards[index]);
}

document.querySelector('.carousel-prev').addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel(currentIndex);
});

document.querySelector('.carousel-next').addEventListener('click', () => {
    currentIndex = Math.min(cards.length - 1, currentIndex + 1);
    updateCarousel(currentIndex);
});

/* function addCart(productTitle, productPrice) {


    const product = { title: productTitle, price: productPrice };

    // add the item to the cart
    cartItems.push(product);

    // update the content of the shopping cart element in the off-canvas menu
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

} */
/* let cartItems;
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
}); */