const prisma = require("../config/db.config");

class PostController {
  static async index(req, res, next) {
    try {
      const posts = await prisma.post.findMany();
      return res.status(200).json({
        success: true,
        data: posts,
        message: null,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createPost(req, res, next) {
    try {
      const authUser = req.user;
      console.log(authUser);
      const { title, content } = req.body;
      const post = await prisma.post.create({
        data: {
          user_id: authUser.id,
          title,
          content,
        },
      });
      return res.status(200).json({
        success: true,
        data: post,
        message: "Post Created Successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
