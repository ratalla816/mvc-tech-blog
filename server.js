var path = require('path');

var express = require('express');

var session = require('express-session');

var exphbs = require('express-handlebars');

var app = express();
var PORT = process.env.PORT || 3001;

var sequelize = require("./config/connection");

var SequelizeStore = require('connect-session-sequelize')(session.Store);

var sess = {
  secret: 'the duck is waddling',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

var helpers = require('./utils/helpers');

var hbs = exphbs.create({
  helpers: helpers
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, 'public')));
app.use(require('./controllers/'));
sequelize.sync({
  force: false
}).then(function () {
  app.listen(PORT, function () {
    return console.log('Now listening');
  });
});