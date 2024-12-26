const homeController = {};
const models = require('../models');

const moment = require('moment');

homeController.showPost = async (req, res) => {
  res.locals.title = "Wave | Home";
  res.locals.fileCSS = "index.css";
  res.locals.layout = "layout";
  res.locals.currentPage = 'home';

  // Lấy UserID từ session
  const userID = req.session.user.id;

  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  const posts = await models.Post.findAll({
    limit,
    offset,
    order: [['createdAt', 'DESC']],
    include: [
      { model: models.User, as: 'user', attributes: ['Username', 'ProfilePicture', 'UserID'] },
      {
        model: models.Like,
        as: 'likes',
        attributes: ['LikeID', 'UserID'], 
      },
      {
        model: models.Comment,
        as: 'comments',
        attributes: ['CommentID'], 
      },
    ],
  });
   
  const formattedPosts = posts.map(post => {
      const plainPost = post.get({ plain: true });
      plainPost.timeAgo = formatTimeAgo(plainPost.createdAt);
      plainPost.liked = post.likes.some(like => like.UserID === userID); // Kiểm tra xem user đã like post này chưa
      return plainPost;
  });

  // Trả về JSON nếu là yêu cầu AJAX
  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.json({ posts: formattedPosts, currentUserID: userID });
  }

  // Render view nếu không phải AJAX
  res.render('index', { posts: formattedPosts, currentUserID: userID });
};

module.exports = homeController;

function formatTimeAgo(createdAt) {
    return moment(createdAt).fromNow(); // Tự động trả về: "6 minutes ago", "2 days ago", ...
}