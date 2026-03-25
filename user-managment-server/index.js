const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("this is my first express code");
});

app.listen(port, () => {
  console.log(`the server is running on this port : ${port}`);
});
