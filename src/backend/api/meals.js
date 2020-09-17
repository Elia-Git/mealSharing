const { request, response, query } = require("express");
const { sum, limit, select, groupBy } = require("../database");
const express = require("express");
const router = express.Router();
const knex = require("../database");

// Getting all meals
router.get("/", async(request, response) => {
    try {
        // knex syntax for selecting things. Look up the documentation for knex for further info
        const allMeals = await knex("meals").select("meals.title");
        response.json(allMeals);
    } catch (error) {
        throw error;
    }
});
// POST creating new meal
const createMeal = async({ body }) => {
    const {
        title,
        description,
        location,
        when,
        max_reservations,
        price,
        created_date,
    } = body;
    return await knex("meals").insert({
        title: title,
        description: description,
        location: location,
        when: when,
        max_reservations: max_reservations,
        price: price,
        created_date: created_date,
    });
};
router.post("/", async(request, response) => {
    createMeal({
            body: request.body,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

// GET a meal by it id
const getMealById = async({ body, id }) => {
    try {
        return await knex("meals")
            .where({
                id: id,
            })
            .select("*");
    } catch (error) {
        console.log(error);
    }
};
router.get("/:id", async(request, response) => {
    getMealById({
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
    updateMeal({
            body: request.body,
            id: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

const updateMeal = async({ body, id }) => {
    const {
        title,
        description,
        location,
        when,
        max_reservations,
        price,
        created_date,
    } = body;
    const meals = await knex.from("meals").select("*").where({
        id: id,
    });
    if (meals.length === 0) {
        throw new HttpError("Bad request", `meal is not found: ID ${id}!`, 404);
    }
    const queryDto = {
        title,
        description,
        location,
        when,
        max_reservations,
        price,
        created_date,
    };
    if (Object.keys(queryDto).length !== 0) {
        return await knex("meals")
            .where({
                id: id,
            })
            .update(queryDto);
    } else return "Nothing updated!";
};

// // DELETE
router.delete("/:id", async(request, response) => {
    deleteMeal({
            body: request.body,
            id: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

const deleteMeal = async({ body, id }) => {
    const concerts = await knex.from("meals").select("*").where({
        id: id,
    });
    if (concerts.length === 0) {
        throw new HttpError("Bad request", `meals not found: ID ${id}!`, 404);
    }
    if (Object.keys(id).length !== 0) {
        return await knex("meals")
            .where({
                id: id,
            })
            .del(id);
    } else return "Nothing updated!";
};

//** GET api/meals/ query parameters */

router.get("/", async(request, response) => {
    const {
        maxPrice,
        availableReservations,
        title,
        createdAfter,
        limit,
    } = request.query;

    let queriedMeals = knex("meals");
    // Meals with price smaller than maxPrice
    if (maxPrice) {
        const givenMaxPrice = Number(request.query.maxPrice);
        queriedMeals.where("price", "<", givenMaxPrice);
    }
    // Title matches
    if (title) {
        queriedMeals.where("title", "like", `%${title}%`);
    }
    //  Reservations available ??
    if (availableReservations === "true") {
        queriedMeals
            .join("reservations", "meals.id", "=", "reservations.meal_id")
            .where("meals.max_reservations", ">", "reservations.number_of_guests");
    }
    //Meals created after a given time/date
    if (createdAfter) {
        queriedMeals.where("created_date", ">", new Date(createdAfter));
    }
    // Get limited number of meals
    if (limit) {
        queriedMeals = queriedMeals.limit(Number(request.query.limit));
    }
    const meals = await queriedMeals.select("*");
    if (meals.length === 0 || availableReservations === "false") {
        response.status(200).send("Meal not found in your database, empty");
    }
});

module.exports = router;