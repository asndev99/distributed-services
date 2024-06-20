const bcrypt = require("bcrypt");
const prisma = require("../config/db.config");
const { UnauthorizedError } = require("../customErrors");
const jwt = require("jsonwebtoken");

class AuthController {
  static async register(req, res, next) {
    try {
      const { payload } = req.body;
      const salt = bcrypt.genSaltSync(10);
      payload.password = bcrypt.hashSync(payload.password, salt);
      const user = await prisma.user.create({
        data: payload,
      });
      return res.status(200).json({
        success: true,
        payload: user,
      });
    } catch (error) {
      console.log(error);
      next(new Error(error));
    }
  }

  static async login(req, res, next) {
    try {
      const { payload } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (!user || !payload.password) {
        throw new UnauthorizedError("email or password is incorrect");
      }
      if (!bcrypt.compareSync(payload.password, user.password)) {
        throw new UnauthorizedError("email or password is incorrect");
      }
      const jwtPayload = {
        id: user.id,
        email: user.email,
        name: user.email,
      };

      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      return res.status(200).json({
        success: true,
        payload: {
          ...user,
          access_token: `Bearer ${token}`,
        },
        message: "Logged in successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async whoAmI(req, res, next) {
    return res
      .status(200)
      .json({ success: true, payload: req.user, message: null });
  }
}

module.exports = AuthController;
