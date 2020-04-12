const express = require("express");
const path = require("path");
const logger = require("morgan");
const favicon = require("serve-favicon");

require("dotenv").config();
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());

// app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

app.use("/users", require("./routes/users"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
