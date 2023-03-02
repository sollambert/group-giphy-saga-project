const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

router.get("/", (req, res) => {
	// return all categories
	const queryText = `SELECT * FROM categories ORDER BY name ASC`;
	pool.query(queryText)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.log(`Error on query ${error}`);
			res.sendStatus(500);
		});
});

router.post("/", (req, res) => {
	const queryText = `
    INSERT INTO "categories" ("name") VALUES ($1);
  `;

	pool.query(queryText, [req.body.name])
		.then(() => {
			res.sendStatus(201);
		})
		.catch((error) => {
			console.log(`Error with POST ${queryText}`, error);
			res.sendStatus(500);
		});
});

module.exports = router;
