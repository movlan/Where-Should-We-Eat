const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");
const auth = require("../middleware/auth");

router.post("/", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.post("/logout", auth, usersCtrl.logout);
router.post("/logout/all", auth, usersCtrl.logoutAll);
router.get("/me", auth, usersCtrl.myProfile);
router.get("/:id", usersCtrl.getUserById);
router.patch("/me", auth, usersCtrl.update);
router.delete("/me", auth, usersCtrl.delete);
router.patch("/favorite", auth, usersCtrl.addFavorite);
router.patch("/remove-favorite", auth, usersCtrl.removeFavorite);

module.exports = router;
