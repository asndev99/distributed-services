const prisma = require("../config/db.config");

class UserController {
  static async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
        select: {
          id: true,
          email: true,
          name: true,
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

  static async getUsers(req, res) {
    try {
      const { userIds } = req.body;
      console.log(userIds);
      const users = await prisma.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
      return res.status(200).json({
        success: true,
        payload: users,
        message: "null",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
