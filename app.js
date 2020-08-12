const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const passport= require('passport');
const session = require('express-session');
var flash=require("connect-flash");
app.use(flash());
app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false})
);

//set up db

// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'Eric64494897',
//   database : 'laundry app'
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
// });


// module.exports.database=connection;

const connection=require('./db');
require('./config/passport')(passport,connection); //sets up passport 

const searchController=require('./controllers/searchController');
const registerController=require('./controllers/registerController');
const orderController=require('./controllers/orderController');
app.use(bodyParser.urlencoded({ extended: true }));


 
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'layout.hbs'
}));
app.set('view engine', 'hbs');
 
app.use(passport.initialize());
app.use(passport.session());

//handlebars user auth
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});

//handlebars - check if user is a customer or owner
// app.use(function (req, res, next) {
//     let bool;
//     if(req.user.status=="customer")
//         bool=true;
//     else bool=false;
//     res.locals.status =bool;
//     next();
// });

const router=require('./api')
app.use('/api',router);





//routes

app.get('/', function (req, res) {
    res.render('home');
});

app.post('/',searchController.zipcodeSearch);

app.get('/register',(req,res)=>{
    res.render('register',{title:"this is a test "});
});

app.post('/register',registerController.register);




app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/profile',
                                   failureRedirect: '/login',
                                   failureFlash: true, 
                                   session:true               }),

);


app.get('/laundromatPage/:name/:address',searchController.laundromatSearch);



app.get('/newOrder/:laundromatInfo',(req,res)=>{
    res.render('order/newOrder');
});

app.post('/newOrder/:laundromatInfo',orderController.newOrderPost);




app.get('/profile',(req,res)=>{
    //console.log("user:"+JSON.stringify(req.user));
    console.log(req.user);
    res.render('profile/profilePage',req.user);
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


app.get('/myOrders',(req,res)=>{
    res.render('order/myOrders');
});





app.listen(8000);
console.log("lisening to 8000");
