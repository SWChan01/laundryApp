const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const passport= require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var flash=require("connect-flash");
app.use(flash());
app.use(cookieParser('secret'));
app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false})
);
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
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

//handlebars - check if user is a customer or owner,true=owner,false=customer, used to deny owners for placing an order
app.use(function (req, res, next) {
    let bool;
    if(req.user){
        bool=true;
        if(req.user.status=="customer") bool=false;
    }
    res.locals.status=bool;
    next();
});

const router=require('./api')
app.use('/api',router);





//routes

app.get('/', function (req, res) {
    res.render('home',{message:req.flash("message")});
});



app.get('/searchRegisteredLaundromat', function (req, res) {
    res.render('order/searchRegisteredLaundromat');
});
app.post('/searchRegisteredLaundromat',searchController.zipcodeSearch);





//register
app.get('/register',(req,res)=>{
    res.render('register/askCustomerOrOwner');
});

app.get('/register/registerCustomer',(req,res)=>{
    res.render('register/register_customer',{message:req.flash("message")});
});
app.post('/register/registerCustomer',registerController.registerCustomer);

app.get('/register/pickLaundromat',(req,res)=>{
    res.render('register/pickLaundromat');
});

app.post('/register/pickLaundromat',registerController.searchLaundromat);

app.get('/register/ownerRegister/:laundromatName/:laundromatAddress',(req,res)=>{
    res.render('register/register_owner');
});

app.post('/register/ownerRegister/:laundromatName/:laundromatAddress',registerController.registerOwner);



//login

app.get('/login',(req,res)=>{
    res.render('login',{message:req.flash("message")});
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: 'Invalid username or password!', 
                                   session:true})

);


app.get('/laundromatPage/:name/:address',searchController.laundromatSearch);



app.get('/newOrder/:laundromatInfo',(req,res)=>{
    res.render('order/newOrder');
});

app.post('/newOrder/:laundromatInfo',orderController.newOrderPost);




app.get('/profile',(req,res)=>{
    res.render('profile/profilePage',req.user);
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


app.get('/myOrders',(req,res)=>{
    res.render('order/myOrders',{message:req.flash("message")});
});

app.post("/myOrders",orderController.submitReview);





app.listen(8000);
console.log("lisening to 8000");
