const Restaurant = require("../models/restaurant.model")

///insert data
Restaurant.createRestaurant = async (newRestaurant) => {
    try {
        const createRestaurant = await Restaurant.create(newRestaurant);
        console.log("created restaurant :", createRestaurant.toJSON());
        return createRestaurant.toJSON();
    } catch (error) {
        console.log("err", err);
        throw err;
    }
}

module.exports = Restaurant