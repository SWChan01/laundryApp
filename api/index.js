'use strict';
const express = require("express");
const router = express.Router();

// const customerRoutes=require('./userRoutes');
// const laundromatRoutes=require('./laundromatRoutes');
const orderRoutes=require('./orderRoutes');
const userRoutes=require('./userRoutes');

// // Auth middleware
// router.use((req, res, next) => {
//     // TODO: Use a proper authentication method, but for now, we will just be checking a base64 encoded value in the header
    
//     // Check for "x-api-key" in the header
//     if (req.headers.hasOwnProperty("x-api-key")) {
//         const key = req.headers["x-api-key"];

//         // Decode via base64 
//         const values = new Buffer(key, "base64").toString().split(":");
//         if (values[0] === "elana@pathfinder.vet" && values[1] === "pathfinder") {
//             return next();
//         }
//     }

//     return res.sendStatus(403); // Forbidden
// });

// Routes
// router.use("/laundromats", laundromatRoutes);
// router.use("/customers", customerRoutes);
router.use("/orders",orderRoutes);
router.use('/userData',userRoutes);

module.exports =router;
