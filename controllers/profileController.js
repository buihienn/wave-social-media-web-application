const profileController = {};
const models = require('../models');

const moment = require('moment');
const path = require('path');
const fs = require('fs');

profileController.showProfile = async (req, res) => {
    res.locals.title = "Wave | Profile";
    res.locals.fileCSS = "profile.css";
    res.locals.layout = "layout";
    res.locals.currentPage = 'profile';

    // Lấy UserID từ session
    const userID = req.session.user.id;

    const currentUser = await models.User.findOne({
      where: { UserID: userID },
    });

    const currentUserPosts = await models.Post.findAll({
        where: { UserID: userID }, 
        order: [['createdAt', 'DESC']], 
        include: [
            { model: models.User, as: 'user', attributes: ['Username', 'ProfilePicture'] },
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

    const formattedPosts = currentUserPosts.map(post => {
        const plainPost = post.get({ plain: true });
        plainPost.timeAgo = formatTimeAgo(plainPost.createdAt);
        plainPost.user = {
            Username: currentUser.Username,
            ProfilePicture: currentUser.ProfilePicture,
        };
        plainPost.liked = post.likes.some(like => like.UserID === userID); // Kiểm tra xem user đã like post này chưa
        return plainPost;
    });
    
    res.render('profile', { user: currentUser, posts: formattedPosts });
};

profileController.showEditProfile = async (req, res) => {
    res.locals.title = "Wave | Edit Profile";
    res.locals.fileCSS = "edit-profile.css";
    res.locals.layout = "layout";

    const userID = req.session.user.id;
    const currentUser = await models.User.findOne({
        where: { UserID: userID },
    });
 
    res.render('edit-profile', { user: currentUser });
};

profileController.uploadAvatarTemp = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Trả về đường dẫn tạm thời của ảnh
    res.json({ avatarPath: `/avatars/temp/${req.file.filename}` });
};

profileController.updateProfile = async (req, res) => {
    const userID = req.session.user.id;
    const { username, name, bio, link } = req.body;

    try {
        let avatarPath;

        // Kiểm tra nếu có file upload
        if (req.file) {
            avatarPath = `/avatars/${req.file.filename}`; // Đường dẫn ảnh
        } else {
            // Nếu không upload ảnh mới, giữ nguyên avatar hiện tại
            const user = await models.User.findOne({ where: { UserID: userID } });
            avatarPath = user.ProfilePicture;
        }

        // Cập nhật thông tin người dùng
        await models.User.update(
            { Username: username, Name: name, Bio: bio, Link: link, ProfilePicture: avatarPath },
            { where: { UserID: userID } }
        );

        // Cập nhật session
        req.session.user.fullName = name;
        req.session.user.profilePicture = avatarPath;

        res.redirect('/profile');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.render('edit-profile', {
            title: "Edit Profile",
            error: "Unable to update profile. Please try again.",
        });
    }
};

module.exports = profileController;

function formatTimeAgo(createdAt) {
    return moment(createdAt).fromNow(); // Tự động trả về: "6 minutes ago", "2 days ago", ...
}