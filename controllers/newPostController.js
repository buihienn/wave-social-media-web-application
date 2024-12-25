const newPostController = {};

newPostController.newPost = (req, res) => {
    res.locals.title = "Wave | New post";
    res.locals.fileCSS = "new-post.css";
    res.locals.layout = "layout";
    res.locals.currentPage = 'new-post';
    
    res.render('new-post');
}

module.exports = newPostController;