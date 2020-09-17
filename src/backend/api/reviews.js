const express = require("express");
const router = express.Router();
const knex = require("../database");
const { request } = require("express");

// GET all reviews
router.get("/", async(request, response) => {
    try {
        const allReviews = await knex("reviews").select("*");
        response.json(allReviews);
    } catch (error) {
        throw error;
    }
});

// POST creating new review
const createReview = async({ body }) => {
    const { title, description, stars, created_date, meal_id } = body;
    return await knex("reviews").insert({
        title,
        description,
        stars,
        created_date,
        meal_id,
    });
};
router.post("/", async(request, response) => {
    createReview({
            body: request.body,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

// GET a reservation by it id
const getReviewById = async({ body, id }) => {
    try {
        return await knex("reviews")
            .where({
                id: id,
            })
            .select("*");
    } catch (error) {
        console.log(error);
    }
};
router.get("/:id", async(request, response) => {
    getReviewById({
            body: request.body,
            id: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

//  Update (PUT)
router.put("/:id", async(request, response) => {
    updateReview({
            body: request.body,
            id: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

const updateReview = async({ body, id }) => {
    const { title, description, stars, created_date, meal_id } = body;
    const meals = await knex.from("reviews").select("*").where({
        id: id,
    });
    if (meals.length === 0) {
        throw new HttpError("Bad request", `review is not found: ID ${id}!`, 404);
    }
    const queryDto = { title, description, stars, created_date, meal_id };
    if (Object.keys(queryDto).length !== 0) {
        return await knex("reviews")
            .where({
                id: id,
            })
            .update(queryDto);
    } else return "Nothing updated!";
};

// // DELETE
router.delete("/:id", async(request, response) => {
    deleteReview({
            body: request.body,
            id: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

const deleteReview = async({ body, id }) => {
    const concerts = await knex.from("reviews").select("*").where({
        id: id,
    });
    if (concerts.length === 0) {
        throw new HttpError("Bad request", `review  not found: ID ${id}!`, 404);
    }
    if (Object.keys(id).length !== 0) {
        return await knex("reviews")
            .where({
                id: id,
            })
            .del(id);
    } else return "Nothing updated!";
};

module.exports = router;