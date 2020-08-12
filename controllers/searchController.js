const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = require('url');
const db=require('../db');
exports.zipcodeSearch=(req,res)=>{
    //searches for claimed laundromats that matches the given zipcode
    console.log(req.body.zipcode);


    let sql=`SELECT * FROM claimedLaundromats WHERE zipcode='${req.body.zipcode}'`;

    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(JSON.stringify(result));
        res.render('../views/showLaundromats.hbs',result);
    })





    
};
    

exports.laundromatSearch=(req,res)=>{
    //var url_parts = url.parse(req.url);
    //console.log(url_parts);
    //console.log(url_parts.pathname);
    //console.log(url_parts.pathname.replace("/laundromatPage",""));
    //const query= decodeURI(url_parts.pathname).replace("/laundromatPage/","");
    //console.log("query is"+query);


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