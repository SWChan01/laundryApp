const LocalStrategy = require('passport-local').Strategy;
const bcrypt=require('bcrypt');

module.exports=function(passport,database){

	passport.serializeUser(function(user, done) {
        done(null, user.ID);
      });
      
    passport.deserializeUser(function(ID, done) {
		const sql="SELECT * FROM User WHERE ID='"+ID+"';";
		const sql2="SELECT * FROM claimedLaundromats WHERE ID='"+ID+"';";
		database.query(sql, function (err, result, fields) {
			
			if(!result.length){
				database.query(sql2, function (err, result, fields){
					return done(err,result[0])
				});
			}
		
			else{
				return done(err, result[0]);	
			}
		});
    });






    passport.use(new LocalStrategy({
            		usernameField: 'email',
            		passwordField: 'password',
					passReqToCallback : true},
					
          	function(req,email, password, done) {
				let sql=`SELECT * FROM User WHERE email='${email}'`;
				console.log(sql);

				database.query(sql, function (err, result, fields) {
					if (err) throw err;
					
					


					if(result.length){
						bcrypt.compare(password,result[0].password,(err,end)=>{
							if(end==true){
								req.flash("message","Welcome!");
								console.log(result[0])
								return done(null, result[0]);	
							}
						})
					}


					else{

						let sql=`SELECT * FROM claimedLaundromats WHERE email='${email}'`
						console.log(sql);
		
						database.query(sql, function (err, result, fields) {
							if (err) throw err;
							
		
							if(!result.length){
								console.log("iorhgeaio");
								req.flash("message","Invalid email or password! Please try again!");
								return done(null,false);
							}
							else{
								bcrypt.compare(password,result[0].password,(err,end)=>{
									if(end==true){
										req.flash("message","Welcome!");
										console.log(result[0])
										return done(null, result[0]);	
									}else{
										req.flash("message","Invalid email or password! Please try again!");
										return done(null,false);
									}
								})
							}



	
		
		
						})
						
					}

            	})
			}
	));
	

			
};