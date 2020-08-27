const express=require('express');
const router=express.Router();
const db=require("../db");
const User=require("../model/User");

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
router.put('/changeName/:newName/:userID',async (req,res) => {
    let newName=req.params.newName;
    let ID=req.params.userID;


    let result= User.updateNameByID(newName,ID);
    res.json(result);


});

//routes for api/userData/changeEmail/:newEmail/:userID
router.put('/changeEmail/:newEmail/:userID',(req,res) => {
    let newEmail=req.params.newEmail;
    let ID=req.params.userID;


    let result= User.updateEmailByID(newEmail,ID);
    res.json(result);


});

//routes for api/userData/changeAddress/:newAddress/:userID
router.put('/changeAddress/:newAddress/:userID',(req,res) => {
    let newAddress=req.params.newAddress;
    let ID=req.params.userID;


    let result= User.updateAddressByID(newAddress,ID);
    res.json(result);


});

//routes for api/userData/changePhone/:newPhone/:userID
router.put('/changePhone/:newPhone/:userID',(req,res) => {
    let newPhone=req.params.newPhone;
    let ID=req.params.userID;

    let result= User.updatePhoneByID(newPhone,ID);
    res.json(result);


});



module.exports=router;