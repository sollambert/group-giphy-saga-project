const express = require('express');

const router = express.Router();
const axios = require('axios');


// INJECT ENV VARIABLES
require('dotenv').config();



router.get('/', (req, res) => {

    req.query.api_key = process.env.GIPHY_API_KEY;

    let params = req.query;

    console.log('params', params)

    axios.get(`https://api.giphy.com/v1/gifs/search`, {params})
        .then(response => {
            res.send({data: response.data, pagination: response.pagination});
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})


module.exports = router;