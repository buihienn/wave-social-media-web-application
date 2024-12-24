const postController = {};

postController.index = (req, res) => {
    res.locals.title = "Wave | Post";
    res.locals.fileCSS = "post.css";
    res.locals.layout = "layout";
    res.locals.currentPage = 'home';

    res.render('post');
};

module.exports = postController;