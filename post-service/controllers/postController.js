const { default: axios } = require("axios");
const prisma = require("../config/db.config");
const { post } = require("../routes");

class PostController {
  static async index(req, res, next) {
    try {
      const posts = await prisma.post.findMany();
      const userIds = posts.map((post) => post.user_id);

      // METHOD 1: LESS OPTIMIZED
      // let postWithUsers = await Promise.all(
      //   posts.map(async (post) => {
      //     const res = await axios.get(
      //       `${process.env.AUTH_MICRO_URL}/api/user/${post.user_id}`
      //     );
      //     return {
      //       ...post,
      //       user: { ...res.data.payload },
      //     };
      //   })
      // );

      let {
        data: { payload },
      } = await axios.get(
        `${process.env.AUTH_MICRO_URL}/api/user/all`,
        userIds
      );

      let users = {};
      payload.forEach((item) => {
        users[item.id] = item;
      });

      let postWithUsers = posts.map((post) => {
        const user = users[post.user_id];
        return {
          ...post,
          user,
        };
      });

      return res.status(200).json({
        success: true,
        data: postWithUsers,
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
