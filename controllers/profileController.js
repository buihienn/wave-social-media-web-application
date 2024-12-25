const profileController = {};
const models = require('../models');

const moment = require('moment');

profileController.showProfile = async (req, res) => {
    res.locals.title = "Wave | Profile";
    res.locals.fileCSS = "profile.css";
    res.locals.layout = "layout";
    res.locals.currentPage = 'profile';

    console.log('Session:', req.session.user);

    // Lấy UserID từ session
    const userID = req.session.user.id;

    const currentUser = await models.User.findOne({
      where: { UserID: userID },
    });

    const currentUserPosts = await models.Post.findAll({
        where: { UserID: userID }, 
        order: [['createdAt', 'DESC']], 
    });

    const formattedPosts = currentUserPosts.map(post => {
        const plainPost = post.get({ plain: true });
        plainPost.timeAgo = formatTimeAgo(plainPost.createdAt);
        plainPost.user = {
            Username: currentUser.Username,
            ProfilePicture: currentUser.ProfilePicture,
        };
        return plainPost;
    });
    
    res.render('profile', { user: currentUser, posts: formattedPosts });
};

module.exports = profileController;

function formatTimeAgo(createdAt) {
    return moment(createdAt).fromNow(); // Tự động trả về: "6 minutes ago", "2 days ago", ...
}