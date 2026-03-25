const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("this is my first express code");
});

const users = [
  {
    id: 1,
    name: "shabana",
    email: "shabana@gmail.com",
  },
  {
    id: 2,
    name: "Sokinna",
    email: "Sokina@gmail.com",
  },
  {
    id: 3,
    name: "Katrina",
    email: "Katrina@gmail.com",
  },
];

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  console.log("post is working", req.body);
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.send(newUser);
});

app.listen(port, () => {
  console.log(`the server is running on this port : ${port}`);
});
