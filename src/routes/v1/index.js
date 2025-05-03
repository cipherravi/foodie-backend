const express = require("express");
const router = express.Router();
const { restaurants, restaurantMenu, test } = require("../../controllers");

router.get("/restaurants", restaurants.fetchInitialData);
router.get("/restaurants/:restaurantId", restaurantMenu.menuData);
router.post("/restaurants/update", restaurants.fetchNextData);

module.exports = router;
