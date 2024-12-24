const notiController = {};

notiController.noti = (req, res) => {
    res.locals.title = "Wave | Notification";
    res.locals.fileCSS = "notification.css";
    res.locals.layout = "layout";

    res.render('notification');
}

module.exports = notiController;