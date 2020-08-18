const LocalStrategy = require('passport-local').Strategy;

module.exports=function(passport,database){

	passport.serializeUser(function(user, done) {
        done(null, user.email);
      });
      
    passport.deserializeUser(function(email, done) {
		const sql="SELECT * FROM User WHERE email='"+email+"';";
		const sql2="SELECT * FROM claimedLaundromats WHERE email='"+email+"';";
		database.query(sql, function (err, result, fields) {
			
			if(!result.length){
				console.log("this is an owner")
				database.query(sql2, function (err, result, fields){
					return done(err,result[0])
				});
			}
		
			else{
				console.log("there is a customer!")
				return done(err, result[0]);	
			}
		});
    });






    passport.use(new LocalStrategy({
            		usernameField: 'email',
            		passwordField: 'password',
					passReqToCallback : true},
					
          	function(req,email, password, done) {
				let sql="SELECT * FROM User WHERE email='"+email+"' AND password='"+password+"';";
				console.log(sql);

				database.query(sql, function (err, result, fields) {
					if (err) throw err;
					
					


					if(result.length){
						req.flash("message","Welcome!");
						console.log(result[0])
						return done(null, result[0]);	
					}


					else{

						let sql="SELECT * FROM claimedLaundromats WHERE email='"+email+"' AND password='"+password+"';";
						console.log(sql);
		
						database.query(sql, function (err, result, fields) {
							if (err) throw err;
							
		
							if(!result.length){
								console.log("iorhgeaio");
								req.flash("message","Invalid email or password! Please try again!")
								return done(null,false);
							}
							
		
							
							
							console.log(result[0])
							return done(null, result[0]);	
		
		
						})
						
					}

            	})
			}
	));
	

			
};