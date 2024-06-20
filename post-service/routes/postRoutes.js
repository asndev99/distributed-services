const PostController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const postRouter = require("express").Router();

postRouter.get("/", PostController.index);
postRouter.post("/", authMiddleware, PostController.createPost);

module.exports = postRouter;
