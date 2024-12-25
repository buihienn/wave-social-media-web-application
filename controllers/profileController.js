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
    const { username, name, bio, link, avatarPath } = req.body;

    console.log('Request Body:', req.body);

    try {
        let finalAvatarPath;

        // Kiểm tra nếu không có avatarPath, giữ nguyên avatar hiện tại
        if (!avatarPath) {
            const user = await models.User.findOne({ where: { UserID: userID } });
            finalAvatarPath = user.ProfilePicture;
        } else {
            const tempPath = path.join(__dirname, `../public${avatarPath}`);
            const finalPath = `/avatars/${path.basename(avatarPath)}`;
            const newPath = path.join(__dirname, `../public${finalPath}`);

            if (fs.existsSync(tempPath)) {
                fs.renameSync(tempPath, newPath);
                finalAvatarPath = finalPath;
            } else {
                console.error('Temporary file not found:', tempPath);
            }
        }

        // Kiểm tra tính duy nhất của username
        const existingUser = await models.User.findOne({
            where: {
                Username: username,
                UserID: { [models.Sequelize.Op.ne]: userID }, // Loại trừ người dùng hiện tại
            },
        });

        if (existingUser) {
            return res.render('edit-profile', {
                title: "Wave | Edit Profile",
                fileCSS: "edit-profile.css",
                layout: "layout",
                error: "Username already exists. Please choose a different one.",
                user: { Username: username, Name: name, Bio: bio, Link: link },
            });
        }

        // Cập nhật thông tin người dùng
        console.log('Updating user profile with:', {
            Username: username,
            Name: name,
            Bio: bio,
            Link: link,
            ProfilePicture: finalAvatarPath,
        });

        await models.User.update(
            { Username: username, Name: name, Bio: bio, Link: link, ProfilePicture: finalAvatarPath },
            { where: { UserID: userID } }
        );

        // Cập nhật session
        req.session.user.fullName = name;
        req.session.user.profilePicture = finalAvatarPath;

        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.render('edit-profile', {
            title: "Wave | Edit Profile",
            fileCSS: "edit-profile.css",
            layout: "layout",
            error: "Unable to update profile. Please try again.",
        });
    }
};

module.exports = profileController;

function formatTimeAgo(createdAt) {
    return moment(createdAt).fromNow(); // Tự động trả về: "6 minutes ago", "2 days ago", ...
}