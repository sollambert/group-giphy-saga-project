const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  let sqlText = `SELECT "gifs".id, url FROM "gifs"
  ${req.query.category ? `
  JOIN "categories_gifs" ON "categories_gifs".gif_id = "gifs".id
  JOIN "categories" ON "categories_gifs".category_id = "categories".id
  WHERE "categories".name = $1` : ''}
  ORDER BY "gifs".id ASC`
  pool.query(sqlText, req.query.category ? [req.query.category] : undefined)
  .then((dbRes) => {
    res.send(dbRes.rows);
  })
});

// add a new favorite
router.post('/', (req, res) => {
  res.sendStatus(200);
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
