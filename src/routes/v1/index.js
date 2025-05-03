const express = require("express");
const router = express.Router();
const { restaurants, restaurantMenu } = require("../../controllers");

router.get("/restaurants", restaurants.fetchData);
router.get("/restaurants/:restaurantId", restaurantMenu.menuData);
router.post("/restaurants/update", restaurants.fetchNextOffSetData);

module.exports = router;
