const database=require('../db.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = require('url');
const bcrypt = require('bcrypt');
const saltRounds = 10;
exports.registerCustomer=(req,res)=>{
    //check if email/address/phone_number is already registered

    let checkEmail=`SELECT * FROM User WHERE email='${req.body.email}'`;
    let checkAddress=`SELECT * FROM User WHERE address='${req.body.address}'`;
    let checkPhone=`SELECT * FROM User WHERE phone_number='${req.body.phone_number}'`;


    //this verifies that there will be no repeated email/address/phone nunmber for the customer using promises
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
                let address=`${req.body.street} ${req.body.apt}, ${req.body.city} , ${req.body.state} , ${req.body.zipcode}`;
                console.log(address);
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    sql="INSERT INTO User (name,password,email,address,phone_number) VALUES ('" + 
                    req.body.name + "', '" + hash  +"', '"+ req.body.email + "', '" + address + "', '" +
                    req.body.phone_number + "')";

                    console.log(sql);
                    database.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("1 record inserted");
                    });
                    req.flash("message","Congratulations! You have successfully signed up as a customer!")
                    res.redirect('/');


                });


            }else{   //owner
                sql=`INSERT INTO claimedLaundromats (laundromatName,laundromatAddress,ownerName,email,password,ownerPhone,zipcode) VALUES ('${req.body.laundromatName}'
                ,'${req.body.laundromatAddress}','${req.body.name}','${req.body.email}','${req.body.password}','${req.body.phone_number}','${req.body.zipcode}');`;
            }

        })
        
        .catch(msg=>{
                req.flash("message",msg);
                res.redirect('/register/registerCustomer');
        });

};



exports.searchLaundromat=(req,res)=>{
    console.log(req.body.zipcode);
    let request=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=laundromats in zipcode ${req.body.zipcode}&key=${process.env.API_KEY}`;
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
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


    //check if email/address/phone_number is already registered

    let checkEmail=`SELECT * FROM claimedLaundromats WHERE email='${req.body.email}'`;
    let checkAddress=`SELECT * FROM claimedLaundromats WHERE laundromatAddress='${req.body.laundromatAddress}'`;
    let checkPhone=`SELECT * FROM claimedLaundromats WHERE ownerPhone='${req.body.phone_number}'`;

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
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                sql=`INSERT INTO claimedLaundromats (laundromatName,laundromatAddress,ownerName,email,password,ownerPhone,zipcode) VALUES ('${req.body.laundromatName}'
                ,'${req.body.laundromatAddress}','${req.body.name}','${req.body.email}','${hash}','${req.body.phone_number}','${req.body.zipcode}');`;

                console.log(sql);
                database.query(sql, function (err, result) {
                    if (err) throw err;
                });
                req.flash("message","Congratulations! You have successfully signed up as a owner!")
                res.redirect('/');
                });
        })
        
        .catch(msg=>{
            console.log(msg)
                req.flash("message",msg);
                res.redirect('/register/pickLaundromat');
        });

};