const path = require ('path');
const express = require ('express');
const session = require ('express-session');
const exphbs = require ('express-handlebars');

const app = express ();
const PORT = process.env.PORT || 3001;

const sequelize = require ("./config/connection");
const SequelizeStore = require ('connect-session-sequelize') (session.Store);

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
  
const helpers = require ('./utils/helpers');
const hbs = exphbs.create ({helpers: helpers});
  app.engine ('handlebars', hbs.engine);
  app.set ('view engine', 'handlebars');

  app.use (express.json ());
  app.use (express.urlencoded ({ extended: false }));
  app.use (express ["static"] (path.join(__dirname, 'public')));
  // app.use (session (sess));
  // Automatically logout user if they are idle for 5 minutes -  300,000 milliseconds is 5 minutes
  app.use(session({secret:"the ducks are waddling",cookie:{maxAge:300000}}))
  app.use (require ('./controllers/'));

sequelize.sync ({ force: false })
  .then (
    function () 
  {app.listen (PORT, function ()
     { return console.log ('and BOOM goes the dynamite')}
    )}
  );