const homeController = {};
const models = require('../models');

const moment = require('moment');

homeController.showPost = async (req, res) => {
    res.locals.title = "Wave | Home";
    res.locals.fileCSS = "index.css";
    res.locals.layout = "layout";

    const Post = models.Post;
    const posts = await Post.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [
            { model: models.User, as: 'user', attributes: ['Username', 'ProfilePicture'] },
        ],
    });

    // Chuyển đổi thời gian
    const formattedPosts = posts.map(post => {
        const plainPost = post.get({ plain: true });
        plainPost.timeAgo = formatTimeAgo(plainPost.createdAt);
        return plainPost;
    });

    console.log(formattedPosts);

    res.render('index', { posts: formattedPosts });
};

module.exports = homeController;

function formatTimeAgo(createdAt) {
    return moment(createdAt).fromNow(); // Tự động trả về: "6 minutes ago", "2 days ago", ...
}