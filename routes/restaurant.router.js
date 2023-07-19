const express = require("express");
const router = express.Router();
const Restaurant = require("../controllers/restaurant.controller");

///create a new restaurant
//http://localhost:5000/restaurants
router.post("/restaurants", async (req, res) => {
    try {
        const newRestaurant = req.body;
        console.log (newRestaurant)
        const createRestaurant = await Restaurant.createRestaurant(newRestaurant);
        res.status(201).json(createRestaurant);
    } catch (err) {
      res.status(500).json({error: "Fail to create restaurant "});
    }
})

module.exports = router;