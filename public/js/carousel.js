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
                image: product.image,
                rating: product.rating
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
        template.querySelector('.card-img-top').src = card.image;
      
        const cardStars = template.querySelector('.card-stars');
        const rating = Math.floor(Math.random() * 5) + 1; // for demo purposes, generate a random rating between 1 and 5
        cardStars.classList.add(`card-rating-${rating}`);
      
        for (let i = 0; i < 5; i++) {
          const star = document.createElement('i');
          star.classList.add('fas', 'fa-star');
          if (i < rating) {
            star.classList.add('star-filled');
          } else {
            star.classList.add('star-empty');
          }
          cardStars.appendChild(star);
        }
      
        document.querySelector('.carousel-inner').appendChild(template);
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

