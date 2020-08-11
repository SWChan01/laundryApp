const express=require('express');
const router=express.Router();

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



module.exports=router;