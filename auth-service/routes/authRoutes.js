const AuthController = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", authMiddleware, AuthController.whoAmI);

module.exports = router;
