const LocalStrategy = require('passport-local').Strategy;
const bcrypt=require('bcrypt');
const User=require("../model/User");
const Laundromat=require("../model/Laundromats");

module.exports=(passport,database)=>{

	passport.serializeUser(function(user, done) {
        done(null, user.ID);
      });
      
    passport.deserializeUser(async (ID, done)=> {
		let res=await User.getCustomerByID(ID);

		//if no customer is found, it must be an owner
		if(!res.length){
			let res2=await Laundromat.getOwnerByID(ID);
			return done(null,res2[0]);
		}

		else{
			return done(null,res[0]);
		}
    });


	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback : true},
		
		async (req,email, password, done)=> {
			let result=await User.getCustomerByEmail(email);		
			if(result.length){
				bcrypt.compare(password,result[0].password,(err,end)=>{
					if(end==true){
						req.flash("message","Welcome!");
						return done(null, result[0]);	
					}
				})
			}
			else{
				let result2=await Laundromat.getOwnerByEmail(email);
				if(!result2.length){
					req.flash("message","Invalid email or password! Please try again!");
					return done(null,false);
				}
				else{
					bcrypt.compare(password,result2[0].password,(err,end)=>{
						if(end==true){
							req.flash("message","Welcome!");
							return done(null, result2[0]);	
						}else{
							req.flash("message","Invalid email or password! Please try again!");
							return done(null,false);
						}
					})
				}
			}
		}
	))
}