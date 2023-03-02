const express = require('express');

const router = express.Router();
const axios = require('axios');


// INJECT ENV VARIABLES
require('dotenv').config();



router.get('/', (req, res) => {

    req.query.api_key = process.env.GIPHY_API_KEY;
    req.query.offset = 0;
    req.query.limit = 10;

    let params = req.query;

    console.log('params', params)

    axios.get(`https://api.giphy.com/v1/gifs/search`, {params})
        .then(response => {
            // console.log(response.data);
            res.send(response.data);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})


module.exports = router;