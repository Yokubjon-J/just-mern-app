import express from "express";
import PostsDAO from "../data_access_object/postsDAO.js";

const router = express.Router();

router.route("/").get(
    (req, res, next) => {
        return res.status(200).send("<h1>Welcome to Backyard!</h1>");
    }
);

router.route("/post").post(
    async (req, res) => {
      try {
        await PostsDAO.savePost(req, res);
      } catch (error) {
        console.log("error saving post:\n", error)
      }
    }
);

router.route("/posts").get(
  async (req, res) => {
    try {
      await PostsDAO.retrievePosts(req, res);
    } catch (error) {
      console.log("error retrieving posts:\n", error);
    }
  }
);

router.route("/image").get(
  async (req, res, next) => {
      try {
          await PostsDAO.gridfsImageDownload(req, res);
        } catch(error) {
          console.log("error retrieving image from GridFS\n", error);
        }
  }
);

router.route("/imageupload").post(
  async (req, res, next) => {
      try {
          await PostsDAO.gridfsConnection(req, res);
        } catch(error) {
          console.log("error connecting to GridFS\n", error);
        }
  }
);

export default router;