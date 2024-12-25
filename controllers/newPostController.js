const newPostController = {};
const models = require('../models');

newPostController.newPost = async (req, res) => {
    res.locals.title = "Wave | New post";
    res.locals.fileCSS = "new-post.css";
    res.locals.layout = "layout";
    res.locals.currentPage = 'new-post';

    // Lấy UserID từ session
    const userID = req.session.user.id;

    const currentUser = await models.User.findOne({
        where: { UserID: userID },
    });
    
    res.render('new-post', { user: currentUser });
}

newPostController.createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const userID = req.session.user.id;
        const picturePath = req.file ? `/images/${req.file.filename}` : null;

        await models.Post.create({
            UserID: userID,
            Content: content,
            PictureURL: picturePath,
        });

        res.redirect('/home');
    } catch (error) {
        console.error('Error creating post:', error);
        res.render('new-post', {
            error: 'Unable to create post. Please try again.',
        });
    }
};

module.exports = newPostController;