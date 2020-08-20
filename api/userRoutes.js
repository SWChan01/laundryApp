const express=require('express');
const router=express.Router();
const db=require("../db");

//routes for /api/userData
router.get('/', (req, res)=> {
    console.log("reiohsgniojreiosjgijo");
    if (req.user === undefined) {
        // The user is not logged in
        console.log("USER NOT LOGGED IN")
        res.json({});
    } else {
        console.log("email is "+req.user.email)
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
    console.log(query);
    db.query(query,(err,result)=>{
        if (err) throw err
        console.log(res);
        res.json(result);
    });


});

//routes for api/userData/changeName/:newName/:userID
router.put('/changeEmail/:newEmail/:userID',(req,res) => {
    let newEmail=req.params.newEmail;
    let ID=req.params.userID;

    let query=`UPDATE User SET email='${newEmail}' WHERE ID='${ID}'`;
    console.log(query);
    db.query(query,(err,result)=>{
        if (err) throw err
        console.log(res);
        res.json(result);
    });


});

//routes for api/userData/changeName/:newName/:userID
router.put('/changeAddress/:newAddress/:userID',(req,res) => {
    let newAddress=req.params.newAddress;
    let ID=req.params.userID;

    let query=`UPDATE User SET address='${newAddress}' WHERE ID='${ID}'`;
    console.log(query);
    db.query(query,(err,result)=>{
        if (err) throw err
        console.log(res);
        res.json(result);
    });


});

//routes for api/userData/changeName/:newName/:userID
router.put('/changePhone/:newPhone/:userID',(req,res) => {
    let newPhone=req.params.newPhone;
    let ID=req.params.userID;

    let query=`UPDATE User SET phone_number='${newPhone}' WHERE ID='${ID}'`;
    console.log(query);
    db.query(query,(err,result)=>{
        if (err) throw err
        console.log(res);
        res.json(result);
    });


});



module.exports=router;