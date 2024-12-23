const express = require('express');
const app = express();
const port = 3000;
const expressHbs = require("express-handlebars");

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

// xóa và tạo lại bảng
app.get('/create-table', async (req, res) => {
    let models = require('./models');
    models.sequelize.sync({ force: true })
      .then(() => {
        res.send('Table dropped and recreated');
      });
  });
  

app.set ("view engine", "hbs");

app.use('/', require('./routers/webChatRouter.js'));

app.use('/home', require('./routers/homeRouter.js'));
app.use('/post', require('./routers/postRouter.js'));
app.use('/noti', require('./routers/notiRouter.js'));
app.use('/new-post', require('./routers/newPostRouter.js'));
app.use('/follow-list', require('./routers/followListRouter.js'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`))