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
    const product = { title: productTitle, price: productPrice };
    // add the item to the cart
    cartItems.push(product);
    // update the content of the shopping cart element in the off-canvas menu
    cartElement.innerHTML = '';

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

        const checkoutBtn = document.createElement('button');
        checkoutBtn.classList.add('btn', 'btn-success', 'mt-3', 'me-3');
        checkoutBtn.innerText = 'Checkout';
        checkoutBtn.addEventListener('click', () => {
            // create the checkout modal
            const modal = document.createElement('div');
            modal.classList.add('modal', 'fade');
            modal.setAttribute('id', 'checkoutModal');
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('aria-hidden', 'true');

            // create the modal dialog
            const modalDialog = document.createElement('div');
            modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');

            // create the modal content
            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');

            // create the modal header
            const modalHeader = document.createElement('div');
            modalHeader.classList.add('modal-header');
            modalHeader.innerHTML = `
            <h5 class="modal-title">Checkout</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          `;
            modalContent.appendChild(modalHeader);

            // create the modal body
            const modalBody = document.createElement('div');
            modalBody.classList.add('modal-body');
            modalBody.innerHTML = `
          <form>
          <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" required>
          </div>
          <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" required>
          </div>
          <div class="mb-3">
              <label for="card-number" class="form-label">Card Number</label>
              <input type="text" class="form-control" id="card-number" required>
          </div>
          <div class="mb-3">
              <label for="expiration-date" class="form-label">Expiration Date</label>
              <input type="text" class="form-control" id="expiration-date" required>
          </div>
          <div class="mb-3">
              <label for="cvv" class="form-label">CVV</label>
              <input type="text" class="form-control" id="cvv" required>
          </div>
      </form>
  </div>
</div>
</div>
`;
            modalContent.appendChild(modalBody);

            // create the modal footer
            const modalFooter = document.createElement('div');
            modalFooter.classList.add('modal-footer');
            modalFooter.innerHTML = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" onclick="processPayment()">Pay</button>
          `;
            modalContent.appendChild(modalFooter);

            modalDialog.appendChild(modalContent);
            modal.appendChild(modalDialog);

            document.body.appendChild(modal);

            // show the modal
            const checkoutModal = new bootstrap.Modal(modal);
            checkoutModal.show();
        });

        cartElement.appendChild(checkoutBtn);

        const clearBtn = document.createElement('button');
        clearBtn.classList.add('btn', 'btn-danger', 'mt-3');
        clearBtn.innerText = 'Clear Cart';
        clearBtn.addEventListener('click', () => {
            cartItems = [];
            localStorage.removeItem('cartItems');
            cartElement.innerText = 'Your shopping cart is empty.';
        });
        cartElement.appendChild(clearBtn);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.cartItems = cartItems;
}

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// create an array to store the items in the cart
if (localStorage.getItem('cartItems')) {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
    // display items from local storage in the cart
    if (cartItems.length > 0) {
        for (let i = 0; i < cartItems.length; i++) {
            // display each item in the cart
        }
    }
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
        addCart(productTitle, productPrice);
    });
});

$(document).ready(function () {
    $(".nav-link").click(function () {
        $(".spinner-border").removeClass("d-none");
    });

    $(window).on("load", function () {
        $(".spinner-border").addClass("d-none");
    });

    var offcanvas = document.getElementById('offcanvasMenu');
    offcanvas.addEventListener('hidden.bs.offcanvas', function () {
        $(".spinner-border").addClass("d-none");
    })
});


// update the content of the shopping cart element in the off-canvas menu
function updateCart() {
    cartElement.innerHTML = '';

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
        cartElement.appendChild(checkoutBtn);

        const clearBtn = document.createElement('button');
        clearBtn.classList.add('btn', 'btn-danger', 'mt-3');
        clearBtn.innerText = 'Clear Cart';
        clearBtn.addEventListener('click', () => {
            cartItems = [];
            localStorage.removeItem('cartItems');
            updateCart();
        });
        cartElement.appendChild(clearBtn);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.cartItems = cartItems;
}

// display items from local storage in the cart on page load
window.addEventListener('load', () => {
    updateCart();
});

// add a click event listener to all "Add to Cart" buttons
document.querySelectorAll('.btn-primary').forEach((button) => {
    button.addEventListener('click', function () {
        const productTitle = this.closest('.card').querySelector('.card-title').innerText;
        const productPrice = parseFloat(this.closest('.card').querySelector('.card-price').innerText.slice(1));
        const product = { title: productTitle, price: productPrice };
        // add the item to the cart
        cartItems.push(product);
        updateCart();
    });
});