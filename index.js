const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("my first express thing");
});

app.listen(port, () => {
  console.log(`example app listing on port ${port}`);
});
