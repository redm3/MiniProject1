//first run 'npm install axios'
const axios = require('axios');

const getProducts = (req, res) => {
    //we can do all kinds of things within our back end, such as calling another API.
    //fetch can be used in the browser, but the axios module is more common in backend apps
    //see https://axios-http.com/docs/example
    
    axios.get('https://fakestoreapi.com/products') //gets a single random cat fact
        .then(response => {
            console.log(response.data)
            //send a successful response including the JSON data
            res.status(200).json({success: true, products:[...response.data]})
        })
        .catch(error => {
            //send an error response including error details as JSON data
            res.status(500).json({success: false, message: error.message})
        })
}

module.exports = {
    getProducts
}