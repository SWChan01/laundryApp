const database=require('../db.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = require('url');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function changePhone(number){
    return`${number.substring(0,3)}-${number.substring(3,6)}-${number.substring(6,10)}`;
}


exports.register=(req,res)=>{

    //check to see if it is owner register or cusotmer register
    let link=url.parse(req.url,true).pathname;
    console.log(link);


    //check if email/address/phone_number is already registered
    let address;
    let realNumber=changePhone(req.body.phone_number);
    if(req.body.laundromatAdress) address=req.body.laundromatAddress;
    else address=`${req.body.street} ${req.body.apt}, ${req.body.city} , ${req.body.state} , ${req.body.zipcode}`;


    let checkEmail=`SELECT * FROM User WHERE email='${req.body.email}'`;
    let checkAddress=`SELECT * FROM User WHERE address='${address}'`;
    let checkPhone=`SELECT * FROM User WHERE phone_number='${realNumber}'`;

    let checkEmail2=`SELECT * FROM claimedLaundromats WHERE email='${req.body.email}'`;
    let checkAddress2=`SELECT * FROM claimedLaundromats WHERE laundromatAddress='${address}'`;
    let checkPhone2=`SELECT * FROM claimedLaundromats WHERE ownerPhone='${realNumber}'`;


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
                database.query(checkAddress,(err,result)=>{
                    if(result.length==0) resolve(result);
                    else reject("Address is already used! Please try a different address");
                });
            
            });
        })
        .then(()=>{
            return new Promise((resolve,reject)=>{
                database.query(checkPhone,(err,result)=>{
                    if(result.length==0) resolve(result);
                    else reject("Phone Number is alread used! Please try a different phone number");
                })
            })
        })
        .then(()=>{
            return new Promise((resolve,reject)=>{
                database.query(checkEmail2,(err,result)=>{
                    if(result.length==0) resolve(result)
                    else reject("Email is already used! Please try a different email")
                })
            })
        })
        .then(()=>{
            return new Promise((resolve,reject)=>{
                database.query(checkAddress2,(err,result)=>{
                    if(result.length==0) resolve(result);
                    else reject("Address is already used! Please try a different address");
                });
            
            });
        })
        .then(()=>{
            return new Promise((resolve,reject)=>{
                database.query(checkPhone2,(err,result)=>{
                    if(result.length==0) resolve(result);
                    else reject("Phone Number is alread used! Please try a different phone number");
                })
            })
        })
        .then(()=>{
            
            bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
                if(link=='/register/registerCustomer'){
                    let sql="INSERT INTO User (name,password,email,address,phone_number) VALUES ('" + 
                    req.body.name + "', '" + hash  +"', '"+ req.body.email + "', '" + address + "', '" +
                    realNumber + "')";

                    database.query(sql, function (err, result) {
                        if (err) throw err;
                    });
                    req.flash("message","Congratulations! You have successfully signed up as a customer!")
                    res.redirect('/');
                }
                else {
                    let  sql=`INSERT INTO claimedLaundromats (laundromatName,laundromatAddress,ownerName,email,password,ownerPhone,zipcode) VALUES ('${req.body.laundromatName}'
                    ,'${req.body.laundromatAddress}','${req.body.name}','${req.body.email}','${hash}','${realNumber}','${req.body.zipcode}');`;

                    database.query(sql, function (err, result) {
                        if (err) throw err;
                    });
                    req.flash("message","Congratulations! You have successfully signed up as a owner!")
                    res.redirect('/');
           
                }


            });

        })
        
        .catch(msg=>{
                req.flash("message",msg);
                res.redirect('/register/registerCustomer');
        });

};



exports.searchLaundromat=(req,res)=>{
    let request=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=laundromats in zipcode ${req.body.zipcode}&key=${process.env.API_KEY}`;
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            let result=JSON.parse(xmlHttp.responseText);
            res.render('../views/showLaundromats2.hbs',result);
        }
    }

        xmlHttp.open("GET",request, true); // true for asynchronous 
        xmlHttp.send(null);


};
