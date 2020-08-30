const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = require('url');
const db=require('../db');
const Laundromat=require("../model/Laundromats");

//searches for claimed laundromats that matches the given zipcode and renders it
exports.zipcodeSearch=async (req,res)=>{


    let result=await Laundromat.getLaundromatsByZipcode(req.body.zipcode);
    res.render('../views/showLaundromats.hbs',result);
    

};
    

exports.laundromatSearch=(req,res)=>{

    const laundromatName=req.params.name;
    let sql=`SELECT * FROM claimedLaundromats WHERE laundromatName='${laundromatName}';`;
    
    db.query(sql,(err,response)=>{
        let isClaimed=true;
        if (err) throw err
        let a={results:response,isClaimed};
        res.render('../views/laundromats/businessPage.hbs',a);
    });

};