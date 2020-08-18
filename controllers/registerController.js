const database=require('../db.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = require('url');
exports.registerCustomer=(req,res)=>{


    //check if email/address/phone_number is already registered

    let checkEmail=`SELECT * FROM User WHERE email='${req.body.email}'`;
    let checkAddress=`SELECT * FROM User WHERE address='${req.body.address}'`;
    let checkPhone=`SELECT * FROM User WHERE phone_number='${req.body.phone_number}'`;

    const promise=
        new Promise((resolve,reject)=>{
            database.query(checkEmail,(err,result)=>{
                if (result.length==0) resolve(result);
                else reject("Email address is already used! Please try a different email address");
            });
        })
        .then(()=>{
            return new Promise((resolve,reject)=>{
                database.query(checkAddress,(err,result2)=>{
                    if(result2.length==0) resolve(result2);
                    else reject("Address is already used! Please try a different address");
                });
            
            });
        })
        .then(()=>{
            return new Promise((resolve,reject)=>{
                database.query(checkPhone,(err,result3)=>{
                    if(result3.length==0) resolve(result3);
                    else reject("Phone Number is alread used! Please try a different phone number");
                })
            })
        })
        .then(()=>{
            console.log(req.body);

            let sql;
            //customer
            if(!req.body.laundromatName){
                sql="INSERT INTO User (name,password,email,address,phone_number) VALUES ('" + 
                req.body.name + "', '" + req.body.password  +"', '"+ req.body.email + "', '" + req.body.address + "', '" +
                req.body.phone_number + "')";
            }else{   //owner
                sql=`INSERT INTO claimedLaundromats (laundromatName,laundromatAddress,ownerName,email,password,ownerPhone,zipcode) VALUES ('${req.body.laundromatName}'
                ,'${req.body.laundromatAddress}','${req.body.name}','${req.body.email}','${req.body.password}','${req.body.phone_number}','${req.body.zipcode}');`;
            }

            console.log(sql);
            database.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
            req.flash("message","Congratulations! You have successfully signed up as a customer!")
            res.redirect('/');
        })
        
        .catch(msg=>{
                console.log("it got here");
                req.flash("message",msg);
                res.redirect('/register/registerCustomer');
        });



    //res.render('/');

};



exports.searchLaundromat=(req,res)=>{
    console.log(req.body.zipcode);
    let request=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=laundromats+"+req.body.zipcode+"&key=${process.env.API_KEY}`;
    const xmlHttp = new XMLHttpRequest();
    console.log("readyState = " + this.readyState + ", status = " + this.status);
    xmlHttp.onreadystatechange = function() { 
        console.log("readyState = " + this.readyState + ", status = " + this.status);
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            let result=JSON.parse(xmlHttp.responseText);
            console.log(result);
            res.render('../views/showLaundromats2.hbs',result);
        }
    }

        xmlHttp.open("GET",request, true); // true for asynchronous 
        xmlHttp.send(null);


};


exports.registerOwner=(req,res)=>{
    sql=`INSERT INTO claimedLaundromats (laundromatName,laundromatAddress,ownerName,email,password,ownerPhone,zipcode) VALUES ('${req.body.laundromatName}'
    ,'${req.body.laundromatAddress}','${req.body.name}','${req.body.email}','${req.body.password}','${req.body.phone_number}','${req.body.zipcode}');`;

    database.query(sql, function (err, result) {
        if (err) throw err;
        console.log(" 1 laundromat inserted! ");
    });

}