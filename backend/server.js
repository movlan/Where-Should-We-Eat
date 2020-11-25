const express = require("express");
const path = require("path");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const usersRouter = require("./routers/users");
const zomatoRouter = require("./routers/api/zomato");

// Load environment variables
require("dotenv").config();

//load database
require("./config/database");

// Get port variable from env
const port = process.env.PORT || 3001;

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(favicon(path.join(__dirname, "../build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "../build")));

// Routers
app.use("/users", usersRouter);
app.use("/api/zomato", zomatoRouter);

// this here serves the React app
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// Listen
app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
