const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

// return all favorite images
router.get("/", (req, res) => {
	let sqlText = `SELECT "gifs".id, url FROM "gifs"
  ${
		req.query.category
			? `
  JOIN "categories_gifs" ON "categories_gifs".gif_id = "gifs".id
  JOIN "categories" ON "categories_gifs".category_id = "categories".id
  WHERE "categories".name = $1`
			: ""
  }
  ORDER BY "gifs".id ASC`;
	pool.query(
		sqlText,
		req.query.category ? [req.query.category] : undefined
	).then((dbRes) => {
		res.send(dbRes.rows);
	});
});

// add a new favorite
router.post("/", (req, res) => {
	const queryText = `
    INSERT INTO "gifs" ("url") VALUES ($1);
  `;

	pool.query(queryText, [req.body.url])
		.then(() => {
			res.sendStatus(201);
		})
		.catch((error) => {
			console.log(`Error POST ${queryText}`, error);
			res.sendStatus(500);
		});
});

// update given favorite with a category id
router.put("/:favId", (req, res) => {
	// req.body should contain a category_id to add to this favorite image
	console.log(req.body);

	const queryText = `
	UPDATE "categories_gifs" 
	SET category_id = "categories".id
	FROM "categories"
	WHERE "categories".name = $1 AND gif_id = $2;
	`
	pool.query(queryText, [req.body])
		.then(() => {
			res.sendStatus(201);
		})
		.catch((error) => {
			console.log(`Error PUT category ${queryText}`, error);
		});

	res.sendStatus(200);
});

// delete a favorite
router.delete("/", (req, res) => {
	const queryText = 'DELETE FROM gifs WHERE id=$1';
  	pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing DELETE gif query', err);
      res.sendStatus(500);
    });
});

module.exports = router;
