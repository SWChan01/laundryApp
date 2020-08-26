const db=require("../db");
const transporter=require("../config/mailer").transporter;
const Order=require('../model/orders');
exports.newOrderPost=(req,res)=>{
    let address=decodeURI((req.url).split("name=")[1].split("address=")[1]);

    let x=`SELECT * FROM claimedLaundromats WHERE laundromatAddress='${address}'`;
    db.query(x,(err,res)=>{
        if(err) throw err;
        console.log(res);

        let laundromatEmail=res[0].email;
        let laundromatName=res[0].laundromatName;
        let ID=res[0].ID;
        let ownerPhone=res[0].ownerPhone;
        
    
        let sql=`INSERT INTO orders (preferedDeliveryDate,preferences,userEmail
            ,laundromatEmail,laundromatName,laundromatAddress,orderStatus,ownerID,customerID,customerAddress,ownerPhone,customerPhone)
            VALUES('${req.body.preferedDeliveryDate}','${req.body.preferences}','${req.user.email}',
            '${laundromatEmail}','${laundromatName}','${address}','placed','${ID}','${req.user.ID}','${req.user.address}','${ownerPhone}','${req.user.phone_number}');`;
    
        db.query(sql,(err,results)=>{
            if(err) throw err;

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


exports.submitReview=(req,res)=>{


    let rating=parseInt(req.body.star,10);
    let ID=req.body.containID;

    let sql=`SELECT * FROM orders WHERE orderID='${ID}'`

    db.query(sql,(err,result)=>{
        if (err) throw err;
        
        let laundromatID=result[0].ownerID;
        let sql2=`SELECT * FROM claimedLaundromats WHERE ID='${laundromatID}'`;

        db.query(sql2,(err,result)=>{
            if (err) throw err;
            let currentRating=result[0].rating;
            let total=result[0].ratingNumbers;
            
            //first rating ever
            if(currentRating==0 && total==0){
                currentRating=rating;
                total++;
                db.query(`UPDATE claimedLaundromats SET rating='${currentRating}',ratingNumbers='${total}' WHERE ID='${laundromatID}'`);
            }

            else{
                //get the total sum of rating
                let total_sum=currentRating*total;

                //add the new review
                total_sum+=rating;


                //divide by the new total
                total++;
                console.log("total sum"+total_sum);
                console.log("total"+total)
                let newRating=total_sum/total;

                //update rating and total ratings
                console.log("new rating:"+newRating)
                db.query(`UPDATE claimedLaundromats SET rating='${newRating}',ratingNumbers='${total}' WHERE ID='${laundromatID}'`);
            }
            
            //delete the order
            db.query(`DELETE FROM orders WHERE orderID='${ID}'`);

            req.flash("message","Thank you for submitting this review!")
            res.redirect("/myOrders");




        });


    });


}


exports.orderDeliveryTime=(req,res)=>{
    console.log(JSON.stringify(req.body));

    //pickup the order,input estimated delivery time
    Order.pickupOrder(req.body.orderID);
    Order.updateDeliveryTimebyID(req.body.estimatedDeliveryTime,req.body.orderID);
    Order.putInPrice(req.body.orderPrice,req.body.orderID);

    res.redirect('/myOrders');

};