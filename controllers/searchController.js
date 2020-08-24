const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = require('url');
const db=require('../db');

//searches for claimed laundromats that matches the given zipcode and renders it
exports.zipcodeSearch=(req,res)=>{

    let sql=`SELECT * FROM claimedLaundromats WHERE zipcode='${req.body.zipcode}'`;

    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(JSON.stringify(result));
        res.render('../views/showLaundromats.hbs',result);
    })

};
    

exports.laundromatSearch=(req,res)=>{

    const laundromatName=req.params.name;
    const laundromatAddress=req.params.address;
    let sql=`SELECT * FROM claimedLaundromats WHERE laundromatName='${laundromatName}';`;
    console.log(sql);
    
    db.query(sql,(err,response)=>{
        let isClaimed=true;
        if (err) throw err
        let a={results:response,isClaimed};
        res.render('../views/laundromats/businessPage.hbs',a);
    });

};