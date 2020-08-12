const database=require('../db.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = require('url');
exports.registerCustomer=(req,res)=>{
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