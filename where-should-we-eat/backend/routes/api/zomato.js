const express = require("express");
const router = express.Router();
const zomatoCtrl = require("../../controllers/zomato");

router.get("/cats", zomatoCtrl.cats);
router.post("/geocode", zomatoCtrl.geocode);

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}

module.exports = router;
