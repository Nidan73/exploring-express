const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb://Sample-nidan-curd:r67CfrEiLAtFTHy2s@ac-13t8tdg-shard-00-00.mxnfckc.mongodb.net:27017,ac-13t8tdg-shard-00-01.mxnfckc.mongodb.net:27017,ac-13t8tdg-shard-00-02.mxnfckc.mongodb.net:27017/?ssl=true&replicaSet=atlas-yem769-shard-0&authSource=admin&appName=Cluster0";

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

    app.post("/users", (req, res) => {
      const newUser = req.body;
      console.log("POST is been hit", newUser);
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
