const axios = require('axios');



const getProducts = (req, res) => {
    
    axios.get('https://fakestoreapi.com/products') 
        .then(response => {
            console.log(response.data)
            res.status(200).json({success: true, products:[...response.data]})
        })
        .catch(error => {
            res.status(500).json({success: false, message: error.message})
        })
}

function filterProducts(req, res) {
    const category = req.params.category;
  
    const filteredProducts = data.products.filter((product) => {
      if (category === 'all') {
        return true;
      } else {
        return product.category.toLowerCase() === category;
      }
    });
  
}

module.exports = {
    getProducts,
    filterProducts
}