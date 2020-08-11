const db=require("../db");
exports.newOrderPost=(req,res)=>{
    console.log("ujreahgiohraeioghj");
    console.log(req.body);
    //console.log(req.user.email);
    
    console.log(req.url);
    let address=decodeURI((req.url).split("name=")[1].split("address=")[1]);
    console.log(address);



    let x=`SELECT * FROM claimedLaundromats WHERE laundromatAddress='${address}'`;
    db.query(x,(err,res)=>{
        if(err) throw err;
        console.log(res);

        let laundromatEmail;
        let laundromatName;
        let ID;
        laundromatEmail=res[0].email;
        console.log("email"+laundromatEmail);
        laundromatName=res[0].laundromatName;
        ID=res[0].ID;
        
        console.log("email2"+laundromatEmail);
    
        let sql=`INSERT INTO orders (orderDate,orderTime,preferedDeliveryDate,preferences,userEmail
            ,laundromatEmail,laundromatName,laundromatAddress,orderStatus,ownerID,customerID,customerAddress)
            VALUES('${req.body.orderDate}','${req.body.orderTime}','${req.body.preferedDeliveryDate}','${req.body.preferences}','${req.user.email}',
            '${laundromatEmail}','${laundromatName}','${address}','placed','${ID}','${req.user.ID}','${req.user.address}');`;
    
        db.query(sql,(err,results)=>{
            console.log(sql);
            if(err) throw err;
            console.log("1 ORDER INSERTED");
            console.log(results);

        });

    });


    res.render("../views/sucess/placeOrderSucess.hbs",req.user);





};