const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET all reservations
router.get("/", async(request, response) => {
    try {
        const reservations = await knex("reservations").select("*");
        response.json(reservations);
    } catch (error) {
        throw error;
    }
});

// POST creating new reservation
const createReservation = async({ body }) => {
    const {
        number_of_guests,
        created_date,
        contact_phonenumber,
        contact_name,
        contact_email,
        meal_id,
    } = body;
    return await knex("meal_sharing_app.reservations").insert({
        number_of_guests: number_of_guests,
        created_date: created_date,
        contact_phonenumber: contact_phonenumber,
        contact_name: contact_name,
        contact_email: contact_email,
        meal_id: meal_id,
    });
};
router.post("/", async(request, response) => {
    createReservation({
            body: request.body,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});
// GET a reservation by it id
const getReservationById = async({ body, id }) => {
    try {
        return await knex("reservations")
            .where({
                id: id,
            })
            .select("*");
    } catch (error) {
        console.log(error);
    }
};
router.get("/:id", async(request, response) => {
    getReservationById({
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
    updateReservation({
            body: request.body,
            id: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

const updateReservation = async({ body, id }) => {
    const {
        number_of_guests,
        created_date,
        contact_phonenumber,
        contact_name,
        contact_email,
        meal_id,
    } = body;
    const meals = await knex.from("reservations").select("*").where({
        id: id,
    });
    if (meals.length === 0) {
        throw new HttpError(
            "Bad request",
            `reservation is not found: ID ${id}!`,
            404
        );
    }
    const queryDto = {
        number_of_guests,
        created_date,
        contact_phonenumber,
        contact_name,
        contact_email,
        meal_id,
    };
    if (Object.keys(queryDto).length !== 0) {
        return await knex("reservations")
            .where({
                id: id,
            })
            .update(queryDto);
    } else return "Nothing updated!";
};

// // DELETE
router.delete("/:id", async(request, response) => {
    deleteReservation({
            body: request.body,
            id: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

const deleteReservation = async({ body, id }) => {
    const concerts = await knex.from("reservations").select("*").where({
        id: id,
    });
    if (concerts.length === 0) {
        throw new HttpError(
            "Bad request",
            `reservation  not found: ID ${id}!`,
            404
        );
    }
    if (Object.keys(id).length !== 0) {
        return await knex("reservations")
            .where({
                id: id,
            })
            .del(id);
    } else return "Nothing updated!";
};

module.exports = router;