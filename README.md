# E Shop
Mini project 1
![home1](https://user-images.githubusercontent.com/56494159/224615675-adb1dc30-72ec-4e51-b099-490ba777b2f8.png)

#Home
In this JavaScript script for the Home page, product information is loaded from an API and displayed in a carousel. Users can add items to a shopping cart, which is stored in local storage. The fetch() method retrieves product information from the API, which is parsed as JSON and stored in an array of objects. The carousel is updated with functions and event listeners are added to the "Previous" and "Next" buttons.

#Shop & Cart
For the Shop & Cart page, this JavaScript script fetches data from the fake store API and creates a product card layout. Users can filter products by category and add them to a shopping cart. The script uses the addCard function to dynamically create product cards, which include a click event listener to add products to the cart. The filterProducts function filters the products based on the selected category and updates the product cards' visibility. The Isotope library is used to arrange the product cards. Click event listeners are added for each category button and a window.onload event listener initializes the product card layout. The addCart function adds products to the cart and saves the shopping cart data to local storage.
