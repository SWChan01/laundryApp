const db=require('../db');
const express=require('express');
const router=express.Router();


//routes for /api/orders, return all orders in db
router.get("/",(req,res)=>{
    let sql=`SELECT * FROM orders;`
    db.query(sql,(err,results)=>{
        if (err) throw err;
        //console.log("this is res: "+JSON.stringify(results));
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


    let sql=`UPDATE orders SET orderStatus='Acceped' WHERE orderID='${ID}'`

    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log("order changed to accepted");
        res.json(result)
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



    

});


router.delete("/cancelOrder/:orderID",(req,res)=>{
    let ID=req.params.orderID;

    let sql=`DELETE FROM orders WHERE orderID=${ID}`;

    db.query(sql,(err,result)=>{
        if (err) throw err;
        console.log("order deleted");
        res.json(result);
    })

    



});






















module.exports=router;

