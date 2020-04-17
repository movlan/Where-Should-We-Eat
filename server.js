const express = require("express");
const path = require("path");
const logger = require("morgan");
const favicon = require("serve-favicon");

require("dotenv").config();
require("./backend/config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

app.use("/users", require("./backend/routes/users"));

// Mount our custom auth middleware to protect routes below it
// app.use(require("./backend/config/auth"));
app.use("/api/zomato", require("./backend/routes/api/zomato"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});

/*--- Use following to protect routes in routes ---*/

// router.post('/', checkAuth, scoresCtrl.create);

// /*----- Helper Functions -----*/
// function checkAuth(req, res, next) {
//   if (req.user) return next();
//   return res.status(401).json({msg: 'Not Authorized'});
// }
