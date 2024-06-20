const postRouter = require("./postRoutes");
const rootRouter = require("express").Router();

rootRouter.use("/post", postRouter);
module.exports = rootRouter;
