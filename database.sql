-- DATABASE NAME = "giphy_search_favorites"

-- You'll need a table for storing each giphy image favorite
-- Each favorite image can be assigned 1 of the following categories as a Foreign Key

CREATE TABLE "categories" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);

INSERT INTO "categories" ("name")
VALUES ('funny'), ('cohort'), ('cartoon'), ('nsfw'), ('meme');

CREATE TABLE "gifs" (
	"id" SERIAL PRIMARY KEY,
	"url" VARCHAR(2048) NOT NULL
);

INSERT INTO "gifs" ("url")
VALUES ('https://media1.giphy.com/media/orW0tBsQHr4WzfYmOG/giphy.gif?cid=dad12ee4768e611a09bcae16cb471d14f77d5c702a61bedd&rid=giphy.gif&ct=g');

CREATE TABLE "categories_gifs" (
	"id" SERIAL PRIMARY KEY,
	"category_id" INT REFERENCES "categories",
	"gif_id" INT REFERENCES "gifs"
);

INSERT INTO "categories_gifs" ("category_id", "gif_id")
VALUES (1, 1);

