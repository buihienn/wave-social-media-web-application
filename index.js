require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const expressHbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authController = require('./controllers/authController.js');

app.use(express.static(__dirname + "/public"))
app.use('/node_modules', express.static(__dirname + "/node_modules"));

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


// nên xoa trước khi ....
app.get('/create-table', async (req, res) => {
    let models = require('./models');
    models.sequelize.sync({ force: true })
    .then(() => {
        res.send('Table dropped and recreated');
    });
});

// cau hinh cho  phpe doc du lieu ohuong thuc POST
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// cau hinh cookie
app.use(cookieParser(process.env.COOKIE_SECRET || "secret"));
// cai hinh Session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "my secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 20 * 60 * 1000, // 20 min
            httpOnly: true,
            secure: false, // Chỉ bật `true` nếu dùng HTTPS
        },
    })
);

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});


app.use('/', require('./routers/webChatRouter.js'));

app.use((req, res, next)=> {
    res.status(404).send('File not found!');
})
  
app.use((error, req, res, next)=> {
    console.error(error);
    res.status(500).send('Internal server error');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))