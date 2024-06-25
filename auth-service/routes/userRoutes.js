const UserController = require("../controller/userController");
const userRouter = require("express").Router();

userRouter.get("/all", UserController.getUsers);
userRouter.get("/:id", UserController.getUser);

module.exports = userRouter;
