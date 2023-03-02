const express = require("express");
const app = express();

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/frontpage/frontpage.html")
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

module.exports = app;