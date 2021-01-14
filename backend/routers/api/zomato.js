const express = require("express");
const router = express.Router();
const zomatoCtrl = require("../../controllers/zomato");

router.post("/categories", zomatoCtrl.categories);
router.post("/geocode", zomatoCtrl.geocode);
router.post("/cuisines", zomatoCtrl.cuisines);
router.post("/search/restaurant", zomatoCtrl.searchRestaurant);
router.post("/search/city", zomatoCtrl.searchCity);
router.post("/restaurants", zomatoCtrl.restaurants);
router.post("/restaurant/:id", zomatoCtrl.restaurant);

module.exports = router;
