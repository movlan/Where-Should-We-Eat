const express = require("express");
const router = express.Router();
const zomatoCtrl = require("../../controllers/zomato");

router.post("/categories", zomatoCtrl.categories);
router.post("/geocode", zomatoCtrl.geocode);
router.post("/cuisines", zomatoCtrl.cuisines);
router.post("/search", zomatoCtrl.search);
router.post("/establishments", zomatoCtrl.establishments);
router.post("/restaurant/:id", zomatoCtrl.restaurant);

module.exports = router;
