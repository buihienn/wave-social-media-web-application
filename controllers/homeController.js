const homeController = {};

homeController.home = (req, res) => {
    res.locals.title = "Wave | Home";
    res.locals.fileCSS = "index.css";
    res.locals.layout = "layout";


    res.render('index');
};

module.exports = homeController;