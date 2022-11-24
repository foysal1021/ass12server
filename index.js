const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
// midlewere
app.use(cors());
app.use(express.json());

// mongoDB conect start
//=====================
const uri = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.uvaek7y.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// mongoDB conect end
//===================

// CRUD start
//===========
async function run() {
  try {
    const brand = client.db("assigement12").collection("phonesBrand");
    // brands start
    //=============
    app.get("/brands", async (req, res) => {
      const query = {};
      const brands = await brand.find(query).toArray();
      res.send(brands);
      console.log(brands);
    });
    // brands end
    //=============
  } finally {
  }
}
run().catch(console.dir);
//============
// CRUD end

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(port, () => {
  console.log(`server running port on ${port}`);
});
