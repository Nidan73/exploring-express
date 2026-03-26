const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb://Sample-nidan-curd:Nidan@ac-13t8tdg-shard-00-00.mxnfckc.mongodb.net:27017,ac-13t8tdg-shard-00-01.mxnfckc.mongodb.net:27017,ac-13t8tdg-shard-00-02.mxnfckc.mongodb.net:27017/?ssl=true&replicaSet=atlas-yem769-shard-0&authSource=admin&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("My express is Running");
});

async function run() {
  try {
    await client.connect();
    const myDB = client.db("usersDB");
    const myCollection = myDB.collection("users");

    app.get("/users", async (req, res) => {
      const cursor = myCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      //   console.log("found id is ", id);
      const query = { _id: new ObjectId(id) };
      const result = await myCollection.findOne(query);
      res.send(result);
    });
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      console.log("POST is been hit", newUser);
      const result = await myCollection.insertOne(newUser);
      res.send(result);
    });

    app.patch("/users/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const query = { _id: new ObjectId(id) };
      console.log(updatedUser, query);
      const update = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
        },
      };
      const option = {};
      const result = await myCollection.updateOne(query, update, option);
      res.send(result);
    });
    app.delete("/users/:id", async (req, res) => {
      //   console.log("hitted id", req.params.id);
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await myCollection.deleteOne(query);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
