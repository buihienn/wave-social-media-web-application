const homeController = {};
const models = require('../models');

const moment = require('moment');

homeController.showPost = async (req, res) => {
    res.locals.title = "Wave | Home";
    res.locals.fileCSS = "index.css";
    res.locals.layout = "layout";
    res.locals.currentPage = 'home';

    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const posts = await models.Post.findAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        { model: models.User, as: 'user', attributes: ['Username', 'ProfilePicture'] },
      ],
    });

    const formattedPosts = posts.map(post => {
      const plainPost = post.get({ plain: true });
      plainPost.timeAgo = formatTimeAgo(plainPost.createdAt);
      return plainPost;
    });

    // Trả về JSON nếu là yêu cầu AJAX
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.json({ posts: formattedPosts });
    }

    // Render view nếu không phải AJAX
    res.render('index', { posts: formattedPosts });
};

module.exports = homeController;

function formatTimeAgo(createdAt) {
    return moment(createdAt).fromNow(); // Tự động trả về: "6 minutes ago", "2 days ago", ...
}