const prisma = require("../config/db.config");

class UserController {
  static async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      return res.status(200).json({
        success: true,
        payload: user,
        message: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
