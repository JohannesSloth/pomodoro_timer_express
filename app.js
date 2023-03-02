const express = require("express");
const app = express();

// Set MIME type for CSS files
app.get("*.css", function(req, res, next) {
  res.header("Content-Type", "text/css");
  next();
});

// Set MIME type for JavaScript files
app.get("*.js", function(req, res, next) {
  res.header("Content-Type", "text/javascript");
  next();
});

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/frontpage/frontpage.html")
});

app.listen(8080, () => {
  console.log("Running on port 8080.");
});

module.exports = app;