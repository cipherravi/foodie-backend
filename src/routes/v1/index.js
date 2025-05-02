const express = require("express");
const router = express.Router();
const { restaurant, restaurantMenu } = require("../../controllers");

router.get("/restaurant", restaurant.data);
router.get("/restaurant/:restaurantId", restaurantMenu.menuData);

module.exports = router;
