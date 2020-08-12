const database=require('../db.js');
exports.register=(req,res)=>{
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