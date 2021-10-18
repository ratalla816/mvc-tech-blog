const path=require("path"),express=require("express"),session=require("express-session"),exphbs=require("express-handlebars"),app=express(),PORT=process.env.PORT||3001,sequelize=require("./config/connection"),SequelizeStore=require("connect-session-sequelize")(session.Store);

const sess = {
  secret: 'the ducks are waddling',
//            _
//        .__(.)< (QUACK)
//         \___)   
//  ~~~~~~~~~~~~~~~~~~
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore ({db: sequelize})
};
  
const helpers=require("./utils/helpers"),hbs=exphbs.create({helpers:helpers});app.engine("handlebars",hbs.engine),app.set("view engine","handlebars"),app.use(express.json()),app.use(express.urlencoded({extended:!1})),app.use(express.static(path.join(__dirname,"public"))),app.use(session({secret:"the ducks are waddling",cookie:{maxAge:3e5}})),app.use(require("./controllers/")),sequelize.sync({force:!1}).then(function(){app.listen(PORT,function(){return console.log("and BOOM goes the dynamite")})});