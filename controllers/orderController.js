const db=require("../db");
const transporter=require("../config/mailer").transporter;
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
        ownerPhone=res[0].ownerPhone;
        
        console.log("email2"+laundromatEmail);
    
        let sql=`INSERT INTO orders (orderDate,orderTime,preferedDeliveryDate,preferences,userEmail
            ,laundromatEmail,laundromatName,laundromatAddress,orderStatus,ownerID,customerID,customerAddress,ownerPhone,customerPhone)
            VALUES('${req.body.orderDate}','${req.body.orderTime}','${req.body.preferedDeliveryDate}','${req.body.preferences}','${req.user.email}',
            '${laundromatEmail}','${laundromatName}','${address}','placed','${ID}','${req.user.ID}','${req.user.address}','${ownerPhone}','${req.user.phone_number}');`;
    
        db.query(sql,(err,results)=>{
            console.log(sql);
            if(err) throw err;
            console.log("1 ORDER INSERTED");
            console.log(results);

            //send email to owner
            transporter.sendMail({
                from:"laundryApp",
                to:laundromatEmail,
                subject:"You have a new order",
                text:"Dear owner of "+laundromatName+", a new laundromat order has been posted",
                html:""
            });

            //send email to customer
            transporter.sendMail({
                from:"laundryApp",
                to:req.user.email,
                subject:"You have sucessfully placed an order",
                text:"Dear "+req.user.name+", you have sucessfully placed a drop off request to "+laundromatName,
                html:""
            });

        });

    });


    res.render("../views/sucess/placeOrderSucess.hbs",req.user);





};