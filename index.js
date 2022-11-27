const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const phones = client.db("assigement12").collection("phones");
    const userCollection = client.db("assigement12").collection("user");
    const googleUsersCollection = client
      .db("assigement12")
      .collection("googleUsers");
    // brands start
    //=============
    app.get("/brands", async (req, res) => {
      const query = {};
      const brands = await brand.find(query).toArray();
      res.send(brands);
    });
    // brands end
    //=============

    //brand details start
    //============
    app.get("/brand-details/:id", async (req, res) => {
      const brand = req.params.id;
      const brandQuery = { brandName: brand };
      const result = await phones.find(brandQuery).toArray();

      res.send(result);
    });
    //brand details end
    //============

    // phone details start
    //===================
    app.get("/phone-details/:id", async (req, res) => {
      //   console.log(req.params.id);
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const phoneDetails = await phones.find(query).toArray();

      res.send(phoneDetails);
    });
    // phone details end
    //===================

    //.........user info start.............
    //===============================
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    //.........user info end.............
    //===============================

    // ..........find a user...........
    //=================================
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { email: id };
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });
    //............find a user...........
    //==================================

    // .........Add Google User.........
    //=================================
    app.post("/googleuser", async (req, res) => {
      const email = req.body.email;
      const query = { email: email };
      const find = await googleUsersCollection.findOne(query);
      if (find) {
        return;
      }
      const GoogleUser = req.body;
      const result = await googleUsersCollection.insertOne(GoogleUser);
      res.send(result);
    });
    //..........Add Google User...........
    //=====================================

    // ...........Google user.............//
    //===================================//
    app.get("/user/google/:id", async (req, res) => {
      const paramsEmail = req.params.id;
      const query = { email: paramsEmail };
      const result = await googleUsersCollection.find(query).toArray();
      res.send(result);
    });
    //...............Google User...........//
    //====================================//
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
