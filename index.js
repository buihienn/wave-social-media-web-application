const express = require('express');
const app = express();
const port = 3000;
const expressHbs = require("express-handlebars");



// app.use(express.static(__dirname + "/html", {index: "index.htm"}))
app.use('/images', express.static(__dirname + "/images"));
app.use('/css',express.static(__dirname + "/css"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/fonts', express.static(__dirname + "/fonts"));

app.engine(
    "hbs",
    expressHbs.engine ({
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
        extname: "hbs",
        defaultLayout: "layout"
    })
);

app.set ("view engine", "hbs");

// app.get("/", (req, res) => res.render("index", {title: "Jeopah ABC"}));
app.get("/", (req, res) => {
    res.render('login', {title: 'Login', fileCSS: 'login.css'});
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', fileCSS: 'login.css'});
});

app.get("/register", (req, res) => {
    res.render("register", { title: "Register", fileCSS: 'register.css' });
});

app.get("/forgot-pass", (req, res) => {
    res.render("forgot-pass", { title: "Forgot password", fileCSS: 'forgot-pass.css' });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

