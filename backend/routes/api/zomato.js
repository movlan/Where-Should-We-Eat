const express = require("express");
const router = express.Router();
const zomatoCtrl = require("../../controllers/zomato");

router.post("/categories", checkAuth, zomatoCtrl.categories);
router.post("/geocode", zomatoCtrl.geocode);
router.post("/cuisines", checkAuth, zomatoCtrl.cuisines);
router.post("/search", checkAuth, zomatoCtrl.search);
router.post("/establishments", checkAuth, zomatoCtrl.establishments);

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}

module.exports = router;
