const express = require("express");
const app = express();
const mime = require('mime');

app.use(express.static("public", {
  setHeaders: (res, path) => {
    res.setHeader('Content-Type', mime.getType(path));
  }
}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/frontpage/frontpage.html")
});

app.listen(8080, () => {
  console.log("Running on port 8080.");
});

module.exports = app;