const db=require('../db');
const express=require('express');
const router=express.Router();
const transporter=require("../config/mailer").transporter;
const Orders=require("../model/orders");

//routes for /api/orders, return all orders in db
router.get("/",async (req,res)=>{
    let result=await Orders.getAllOrders();
    res.json(result);
});

//routes for /api/orders/userID,return all orders of that user
router.get("/userOrder", async (req,res)=>{

    Orders.getOrderByUserID(req.user.ID).then((results)=>{
        res.json(results);
    })



});

//routes for /api/orders/acceptOrder,accepts a order based on its ID field
router.put("/acceptOrder/:orderID",async (req,res)=>{

    let ID=req.params.orderID;



    let result =await Orders.getOrderByOrderID(ID);

    //if order is accepted, can not be accepted again
    if(result[0].orderStatus=="Accepted"){
        req.flash("message","Action failed ! Order is already accepted!");
        return res.redirect('/myOrders');
    }

    //if order is picked up, can not accept it
    else if(result[0].orderStatus=="Picked up"){
        req.flash("message","Action failed ! Order is already picked up!");
        return res.redirect('/myOrders');
    }

    else if(result[0].orderStatus=="Placed"){
        let result=await Orders.acceptOrder(ID);
    

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
        
        req.flash("message","Success! Order is accepted");
        res.json(result);
    
    
    }




});

//routes for /api/orders/notifyOrder/:orderID,notify pickup on a order based on its ID field
router.put("/notifyPickup/:orderID",async (req,res)=>{
    let ID=req.params.orderID;


    let result= await Orders.getOrderByOrderID(ID);


    if(result[0].orderStatus=="Picked up"){
        req.flash("message","Action failed ! Order is already picked up!");
        return res.redirect('/myOrders');
    }

    //order is not accepted yet
    else if(result[0].orderStatus=="Placed"){
        req.flash("message","Action failed ! Order is not accepted yet! Please accept it first!");
        return res.redirect('/myOrders');
    }

    
    else if(result[0].orderStatus=="Accepted"){
        //Orders.pickupOrder(ID);
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
        res.json(result);

       

    }





});

//routes for /api/orders/cancelOrder/:orderID,deletes an order based on ID
router.delete("/cancelOrder/:orderID",async (req,res)=>{
    let ID=req.params.orderID;

    let result=await Orders.getOrderByOrderID(ID);

    if(result[0].orderStatus=="Accepted"){
        req.flash("message","Action failed ! You can not cancel an order that is already accepted!");
        return res.redirect('/myOrders');
    }

    else if(result[0].orderStatus=="Picked up"){
        req.flash("message","Action failed ! You can not cancel an order that is already picked up!");
        return res.redirect('/myOrders');
    }

    else if(result[0].orderStatus=="Delivered"){
        req.flash("message","Action failed ! You can not cancel an order that is already delivered!");
        return res.redirect('/myOrders');
    }

    else if(result[0].orderStatus=="Placed"){
        //find ID of owner and customer then send mail to notify picked up order
        
        let customrEmail=result[0].userEmail;
        let ownerEmail=result[0].laundromatEmail;
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
            to:ownerEmail,
            subject:"Your order has been sucessfully canceled",
            text:"Dear user, your order has been canceled ",
            html:""
        });

        //DELETE the row
        let results= await Orders.deleteOrderByID(ID);
        req.flash("message","Success!");
        res.json(results);

    }

});

//routes for /api/orders/orderDelivered/:orderID,change order status to delivered based on ID
router.put("/orderDelivered/:orderID", async(req,res)=>{
    let ID=req.params.orderID;




    let result=await Orders.getOrderByOrderID(ID);
    if(result[0].orderStatus=="Accepted"){
        req.flash("message","Action failed ! Please pick up the laundry first and deliver it once service is done!");
        return res.redirect('/myOrders');
    }

    else if(result[0].orderStatus=="Placed"){
        req.flash("message","Action failed ! Please accept the order then pick it up and then deliver once service is finished!");
        return res.redirect('/myOrders');
    }
    else if(result[0].orderStatus=="Picked up"){
       
        Orders.deliverOrder(ID);


        let customrEmail=result[0].userEmail;
        let ownerEmail=result[0].laundromatEmail;
        let laundromatName=result[0].laundromatName;


        //send mail to customer
        transporter.sendMail({
            from:"laundryApp",
            to:customrEmail,
            subject:"Your order has been delivered!",
            text:"Dear customer, your order has been delivered! Please rate the service in the orders page ",
            html:""
        });
        req.flash("message","Success!");
        res.json(result);

            
    }








});
//routes for /api/orders/rateOrder/:orderID,prompts the user to rate order and verifies correct order status
router.put("/rateOrder/:orderID",async(req,res)=>{
    let ID=req.params.orderID;

    let result=await Orders.getOrderByOrderID(ID);
    if(result[0].orderStatus!="Delivered"){
        req.flash("message","Action failed ! You can not rate this order until it is delivered!");
        return res.redirect('/myOrders');
    }
    else{
        res.json(result);
    }
    



});


module.exports=router;

