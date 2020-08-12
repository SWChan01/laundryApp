const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = require('url');
const db=require('../db');
exports.zipcodeSearch=(req,res)=>{
    //searches for claimed laundromats that matches the given zipcode
    console.log(req.body.zipcode);
        // let request="https://maps.googleapis.com/maps/api/place/textsearch/json?query=laundromats+"+req.body.zipcode+"&key=AIzaSyBJRlJ4RTJ3IAa3aCPuI0AxL13xNQHeKOQ";
        // const xmlHttp = new XMLHttpRequest();
        // console.log("readyState = " + this.readyState + ", status = " + this.status);
        // xmlHttp.onreadystatechange = function() { 
        //     console.log("readyState = " + this.readyState + ", status = " + this.status);
        // if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        //     let result=JSON.parse(xmlHttp.responseText);
        //     console.log(result);
        //     res.render('../views/showLaundromats.hbs',result);
        // }
        // }

        //  xmlHttp.open("GET",request, true); // true for asynchronous 
        //  xmlHttp.send(null);










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






    //let request="https://maps.googleapis.com/maps/api/place/textsearch/json?query=laundromats+"+query+"&key=AIzaSyBJRlJ4RTJ3IAa3aCPuI0AxL13xNQHeKOQ";
    //const xmlHttp = new XMLHttpRequest();
    // console.log("readyState = " + this.readyState + ", status = " + this.status);
    // xmlHttp.onreadystatechange = function() { 
    //     console.log("readyState = " + this.readyState + ", status = " + this.status);
    //     if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
    //         let info=JSON.parse(xmlHttp.responseText).results;
            
    //         let Lname=String(info[0].name);
            
    //         let sql=`SELECT * FROM claimedLaundromats WHERE laundromatName=${"'"+Lname+"'"};`;
    //         console.log(sql);

    //         db.query(sql, function (err, result, fields) {
    //             let isClaimed=false;
    //             if (err) throw err;
    //             if(!result.length){
    //                 console.log("not found");
    //                 isClaimed=false;
                    
    //             }
    //             else{
    //                 console.log("found");
    //                 console.log(result);
    //                 isClaimed=true;
    //             }

    //             console.log("isclaimed: " +isClaimed);


    //             let a={results:result,isClaimed};
    
    
    //             console.log(result);
    //             res.render('../views/laundromats/businessPage.hbs',a);
            
    //         });

    //     }
    // }
    // xmlHttp.open("GET",request, true); // true for asynchronous 
    // xmlHttp.send(null);
    


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