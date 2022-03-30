import express from "express";
const app = express();
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Connected to mongodb");
  return client;
}

const client = await createConnection();

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.get("/api/mobiles", async (req, res) => {
  //   res.json(mobiles);
  const mobiles = await client
    .db("mobile-ecom")
    .collection("mobiles")
    .find({})
    .toArray();
  res.json(mobiles);
});

app.post("/api/mobiles", async (req, res) => {
  const data = req.body;
  console.log(data);
  const result = await client
    .db("mobile-ecom")
    .collection("mobiles")
    .insertMany(data);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
