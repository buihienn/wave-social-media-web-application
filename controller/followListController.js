const followListController = {};

followListController.followList = (req, res) => {
    res.locals.title = "Wave | Follow List";
    res.locals.fileCSS = "follow-list.css";
    res.locals.layout = "layout";

    res.render('follow-list');
};

module.exports = followListController;