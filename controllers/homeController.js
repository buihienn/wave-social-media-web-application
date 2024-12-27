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
   
  const formattedPosts = await Promise.all(posts.map(async post => {
      const plainPost = post.get({ plain: true });
      plainPost.timeAgo = formatTimeAgo(plainPost.createdAt);
      plainPost.liked = post.likes.some(like => like.UserID === userID); // Kiểm tra xem user đã like post này chưa

      // Kiểm tra xem người dùng hiện tại có theo dõi user của post hay không
      const isFollowing = await models.Follower.findOne({
        where: {
          FollowerID: userID,
          FolloweeID: plainPost.user.UserID,
        }
      });

      plainPost.isFollowing = !!isFollowing; // Chuyển đổi kết quả thành boolean
      return plainPost;
  }));

  // Trả về JSON nếu là yêu cầu AJAX
  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.json({ posts: formattedPosts, currentUserID: userID });
  }

  // Render view nếu không phải AJAX
  res.render('index', { posts: formattedPosts, currentUserID: userID });
};

homeController.showPostFollowing = async (req, res) => {
  res.locals.title = "Wave | Following";
  res.locals.fileCSS = "index.css";
  res.locals.layout = "layout";
  res.locals.currentPage = 'following';

  // Lấy UserID từ session
  const userID = req.session.user.id;

  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    // Lấy danh sách người dùng mà user hiện tại đang follow
    const followingUsers = await models.Follower.findAll({
      where: { FollowerID: userID },
      attributes: ['FolloweeID'],
    });

    const followingIDs = followingUsers.map(f => f.FolloweeID);

    if (followingIDs.length === 0) {
      // Không theo dõi ai -> Trả về danh sách rỗng
      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        return res.json({ posts: [], currentUserID: userID });
      }
      return res.render('index', { posts: [], currentUserID: userID });
    }

    // Lấy bài đăng từ các user đang follow
    const posts = await models.Post.findAll({
      where: { UserID: followingIDs },
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

    const formattedPosts = await Promise.all(
      posts.map(async post => {
        const plainPost = post.get({ plain: true });
        plainPost.timeAgo = formatTimeAgo(plainPost.createdAt);
        plainPost.liked = post.likes.some(like => like.UserID === userID); // Kiểm tra xem user đã like post này chưa

        // Đặt `isFollowing` là `true` vì đã lọc bài đăng chỉ của người đang follow
        plainPost.isFollowing = true;
        return plainPost;
      })
    );

    // Trả về JSON nếu là yêu cầu AJAX
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.json({ posts: formattedPosts, currentUserID: userID });
    }

    // Render view nếu không phải AJAX
    res.render('index', { posts: formattedPosts, currentUserID: userID });
  } catch (error) {
    console.error('Error fetching following posts:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = homeController;

function formatTimeAgo(createdAt) {
    return moment(createdAt).fromNow(); // Tự động trả về: "6 minutes ago", "2 days ago", ...
}