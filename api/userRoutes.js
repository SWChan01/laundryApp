const express=require('express');
const router=express.Router();
const db=require("../db");

//routes for /api/userData
router.get('/', (req, res)=> {
    if (req.user === undefined) {
        // The user is not logged in
        res.json({});
    } else {
        res.json({
            userEmail: req.user.email,
            status:req.user.status
        });
    }
});

//routes for api/userData/changeName/:newName/:userID
router.put('/changeName/:newName/:userID',(req,res) => {
    let newName=req.params.newName;
    let ID=req.params.userID;

    let query=`UPDATE User SET name='${newName}' WHERE ID='${ID}'`;
    db.query(query,(err,result)=>{
        if (err) throw err
        if(result.affectedRows>0){
            res.json(result);
        }
        else{
            let query2=`UPDATE claimedLaundromats SET laundromatName='${newName}' WHERE ID='${ID}'`;
            db.query(query2,(err,result)=>{
                res.json(result);
            });
        }

    });


});

//routes for api/userData/changeName/:newName/:userID
router.put('/changeEmail/:newEmail/:userID',(req,res) => {
    let newEmail=req.params.newEmail;
    let ID=req.params.userID;

    let query=`UPDATE User SET email='${newEmail}' WHERE ID='${ID}'`;
    db.query(query,(err,result)=>{
        if (err) throw err
        if(result.affectedRows>0){
            res.json(result);
        }
        else{
            let query2=`UPDATE claimedLaundromats SET email='${newEmail}' WHERE ID='${ID}'`;
            db.query(query2,(err,result)=>{
                res.json(result);
            });
        }

    });


});

//routes for api/userData/changeName/:newName/:userID
router.put('/changeAddress/:newAddress/:userID',(req,res) => {
    let newAddress=req.params.newAddress;
    let ID=req.params.userID;

    let query=`UPDATE User SET address='${newAddress}' WHERE ID='${ID}'`;
    db.query(query,(err,result)=>{
        if (err) throw err
        if(result.affectedRows>0){
            res.json(result);
        }
        else{
            let query2=`UPDATE claimedLaundromats SET laundromatAddress='${newAddress}' WHERE ID='${ID}'`;
            db.query(query2,(err,result)=>{
                res.json(result);
            });
        }

    });


});

//routes for api/userData/changeName/:newName/:userID
router.put('/changePhone/:newPhone/:userID',(req,res) => {
    let newPhone=req.params.newPhone;
    let ID=req.params.userID;

    let query=`UPDATE User SET phone_number='${newPhone}' WHERE ID='${ID}'`;
    db.query(query,(err,result)=>{
        if (err) throw err
        if(result.affectedRows>0){
            res.json(result);
        }
        else{
            let query2=`UPDATE claimedLaundromats SET ownerPhone='${newPhone}' WHERE ID='${ID}'`;
            db.query(query2,(err,result)=>{
                res.json(result);
            });
        }

    });


});



module.exports=router;