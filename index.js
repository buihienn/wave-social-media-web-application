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

app.use('/', require('./routers/webChatRouter.js'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

