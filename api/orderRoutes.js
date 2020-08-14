const db=require('../db');
const express=require('express');
const router=express.Router();
const transporter=require("../config/mailer").transporter;

//routes for /api/orders, return all orders in db
router.get("/",(req,res)=>{
    let sql=`SELECT * FROM orders;`
    db.query(sql,(err,results)=>{
        if (err) throw err;
        res.json(results);
    });
});

//routes for /api/orders/userID,return all orders of that user
router.get("/userOrder",(req,res)=>{
    let sql=`SELECT * FROM orders WHERE customerID='${req.user.ID}'`;
    db.query(sql,(err,results)=>{
        if (err) throw err;
      //  console.log("this is res: "+JSON.stringify(results));

        //user is an owner
        if(!results.length){
            let sql=`SELECT * FROM orders WHERE ownerID='${req.user.ID}'`;
            db.query(sql,(err,results)=>{
                if(err) throw err;
                res.json(results);
            });

        }

        else{
            res.json(results);
        }
    });
});

//routes for /api/orders/acceptOrder,accepts a order based on its ID field
router.put("/acceptOrder/:orderID",(req,res)=>{

    let ID=req.params.orderID;
    let query=`SELECT * FROM orders WHERE orderID=${ID}`
    db.query(query,(err,result)=>{
        if(err) throw err;

        if(result[0].orderStatus=="Accepted"){
           // console.log("erioahgioejraiogjieoraqjgiopehrtsiopghiopertghioper!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11")
            req.flash("message","Action failed ! Order is already accepted!");
            return res.redirect('/login');
            
        }

        else if(result[0].orderStatus=="Picked up"){
            req.flash("message","Action failed ! Order is already picked up!");
            return res.redirect('/login');
        }

        else if(result[0].orderStatus=="placed"){
            let sql=`UPDATE orders SET orderStatus='Accepted' WHERE orderID='${ID}'`

            db.query(sql,(err,result)=>{
                if(err) throw err;
                console.log("order changed to accepted");
                console.log("this is result "+JSON.stringify(result));
                res.json(result);
            });
        
            //find ID of owner and customer then send mail to notify acceped order
        
            let sql2=`SELECT * FROM orders WHERE orderID='${ID}'`
        
            db.query(sql2,(err,result)=>{
                if(err) throw err;
                console.log("this is result "+JSON.stringify(result));
                let customrEmail=result[0].userEmail;
                let ownerEmail=result[0].ownerEmail;
                let laundromatName=result[0].laundromatName;
        
                
                //send mail to customer
                transporter.sendMail({
                    from:"laundryApp",
                    to:customrEmail,
                    subject:"Your order has been accepted!",
                    text:"Dear customer, your order has been accepted by "+laundromatName,
                    html:""
                });
        
        
        
            });
        }



    });



});

//routes for /api/orders/acceptOrder,notify pickup on a order based on its ID field
router.put("/notifyPickup/:orderID",(req,res)=>{
    let ID=req.params.orderID;


    let sql=`UPDATE orders SET orderStatus='Picked up' WHERE orderID='${ID}'`

    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log("order changed to accepted");
        res.json(result);
    });


    //find ID of owner and customer then send mail to notify picked up order
    let sql2=`SELECT * FROM orders WHERE orderID='${ID}'`
    db.query(sql2,(err,result)=>{
        if(err) throw err;
        console.log("this is result "+JSON.stringify(result));
        let customrEmail=result[0].userEmail;
        let ownerEmail=result[0].ownerEmail;
        let laundromatName=result[0].laundromatName;

        
        //send mail to customer
        transporter.sendMail({
            from:"laundryApp",
            to:customrEmail,
            subject:"Your order has been picked up!",
            text:"Dear customer, your order has been picked up by "+laundromatName,
            html:""
        });



    });


    

});


router.delete("/cancelOrder/:orderID",(req,res)=>{
    let ID=req.params.orderID;
    //find ID of owner and customer then send mail to notify picked up order
    let sql2=`SELECT * FROM orders WHERE orderID='${ID}'`
    db.query(sql2,(err,result)=>{
        if(err) throw err;
        console.log("this is result "+JSON.stringify(result));
        let customrEmail=result[0].userEmail;
        let ownerEmail=result[0].ownerEmail;
        let laundromatName=result[0].laundromatName;

        
        //send mail to customer
        transporter.sendMail({
            from:"laundryApp",
            to:customrEmail,
            subject:"Your order has been sucessfully canceled",
            text:"Dear user, your order has been canceled ",
            html:""
        });

        //send mail to owner
        transporter.sendMail({
            from:"laundryApp",
            to:customrEmail,
            subject:"Your order has been sucessfully canceled",
            text:"Dear user, your order has been canceled ",
            html:""
        });



    });


    let sql=`DELETE FROM orders WHERE orderID=${ID}`;

    db.query(sql,(err,result)=>{
        if (err) throw err;
        console.log("order deleted");
        res.json(result);
    });

    



});






















module.exports=router;

