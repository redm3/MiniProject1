const axios = require('axios');

const getProducts = (req, res) => {
    
    axios.get('https://fakestoreapi.com/products') 
        .then(response => {
            const products = response.data.map(product => {
                return {
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    category: product.category
                }
            });
            res.status(200).json({success: true, products});
        })
        .catch(error => {
            res.status(500).json({success: false, message: error.message})
        })
}

module.exports = {
    getProducts,
}
