import express from "express";
import { MongoClient } from "mongodb";
import gridfsConnection from "../middleware/upload.js";

const uri = 'mongodb+srv://justadmin:justadminn@cluster0.pvwjg.mongodb.net/blogsDB?retryWrites=true&w=majority'

const router = express.Router();
const client = new MongoClient(uri);

router.route("/").get(
    (req, res) => {
        return res.status(200).send("<h1>Welcome to Backyard!</h1>");
    }
);

router.route("/post").post(
    async (req, res) => {
        try {
            await client.connect();
            const database = client.db("blogsDB");
            // Specifying a Schema is optional, but it enables type hints on
            // finds and inserts
            const haiku = database.collection("posts");
            const result = await haiku.insertOne({
              title: req.body.title,
              content: req.body.content,
            });
            console.log(`A document was inserted, ${req.body}`);
          } finally {
            await client.close();
            return res.status(200).send("POST request fulfilled!");//this will be sent to client. To access this message on the client, you must write "res.data" in your react code.
          }
    }
);

router.route("/imageupload").post(
  async (req, res) => {
      try {
          console.log("req is: ", req.body)
          gridfsConnection(req, res)
        } catch(error) {
          console.log("error connecting to GridFS: ", error);
        }
  }
);

export default router;