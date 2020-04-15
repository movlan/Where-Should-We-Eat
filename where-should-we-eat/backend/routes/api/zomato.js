const express = require("express");
const router = express.Router();
const zomatoCtrl = require("../../controllers/zomato");

router.post("/categories", zomatoCtrl.categories);
router.post("/geocode", zomatoCtrl.geocode);
router.post("/cuisines", zomatoCtrl.cuisines);
router.post("/search", zomatoCtrl.search);

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}

module.exports = router;
