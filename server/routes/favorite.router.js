const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

// return all favorite images
router.get("/", (req, res) => {
	let sqlText = `SELECT "gifs".id, url FROM "gifs"
  ${req.query.category
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
	const selectText = `
	SELECT "url" FROM "gifs"
	`;
	const queryText = `
    INSERT INTO "gifs" ("url") VALUES ($1);
  	`;
	pool.query(selectText)
		.then((dbRes) => {
			// console.log(dbRes.rows, { url: req.body.url })
			if (dbRes.rows.filter((dbResUrl) => {
				if (dbResUrl.url == req.body.url) {
					return dbResUrl;
				}
			}).length == 0) {
				pool.query(queryText, [req.body.url])
					.then(() => {
						res.sendStatus(201);
					})
					.catch((error) => {
						console.log(`Error POST ${queryText}`, error);
						res.sendStatus(500);
					});
			}
		})
});

// update given favorite with a category id
router.post("/:gifId", (req, res) => {
	const queryParams = [
		req.body.category_id, // comes from post data
		req.params.gifId, // comes from url
	];

	const checkText = `
		SELECT * FROM "categories_gifs"
		JOIN "categories" ON "categories".id = "categories_gifs".category_id
		JOIN "gifs" ON "gifs".id = "categories_gifs".gif_id
		WHERE "gifs".id = $2 AND "categories".id = $1;
	`;

	const queryText = `
		INSERT INTO "categories_gifs" ("category_id", "gif_id")
		VALUES ($1, $2);
    `;

	pool.query(checkText, queryParams).then((dbRes) => {
		if (dbRes.rows.length === 0) {
			pool.query(queryText, queryParams)
				.then(() => {
					res.sendStatus(201);
				})
				.catch((error) => {
					console.log(`Error POST category ${queryText}`, error);
					res.sendStatus(500);
				});
		}
	});
});

// delete a favorite
router.delete("/:id", (req, res) => {
	const queryText = 'DELETE FROM gifs WHERE id=$1';
	pool.query(queryText, [req.params.id])
		.then(() => { res.sendStatus(200); })
		.catch((err) => {
			console.log('Error completing DELETE gif query', err);
			res.sendStatus(500);
		});
});

module.exports = router;
