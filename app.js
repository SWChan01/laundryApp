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



app.get('/searchRegisteredLaundromat', function (req, res) {
    res.render('order/searchRegisteredLaundromat');
});
app.post('/searchRegisteredLaundromat',searchController.zipcodeSearch);





//register
app.get('/register',(req,res)=>{
    res.render('register/askCustomerOrOwner',{title:"this is a test "});
});

app.get('/register/registerCustomer',(req,res)=>{
    res.render('register/register_customer')
});
app.post('/register/registerCustomer',registerController.registerCustomer);

app.get('/register/pickLaundromat',(req,res)=>{
    res.render('register/pickLaundromat');
});

app.post('/register/pickLaundromat',registerController.searchLaundromat);

app.get('/register/ownerRegister/:laundromatName/:laundromatAddress',(req,res)=>{
    res.render('register/register_owner');
});

app.post('/ownerRegister/:laundromatName/:laundromatAddress',registerController.registerOwner);



//login

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
