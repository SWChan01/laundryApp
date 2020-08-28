const db=require("../db");

exports.getAllLaundromats=()=>{
    let sql=`SELECT * FROM claimedLaundromats`
    return new Promise((resolve,reject)=>{
        db.query(sql,(err,res)=>{
            if(err) reject(err)
            resolve(res);
        })
    })
}


exports.getOwnerByID=(ID)=>{
    const sql=`SELECT * FROM claimedLaundromats WHERE ID='${ID}';`;
    return new Promise((resolve,reject)=>{
        db.query(sql,(err,res)=>{
            if(err) reject(err)
            resolve(res);
        })
    })
}

exports.getOwnerByEmail=(email)=>{
    const sql=`SELECT * FROM claimedLaundromats WHERE email='${email}';`;
    return new Promise((resolve,reject)=>{
        db.query(sql,(err,res)=>{
            if(err) reject(err)
            resolve(res);
        })
    })
}


exports.getLaundromatsByZipcode=(zipcode)=>{
    const sql=`SELECT * FROM claimedLaundromats WHERE zipcode='${zipcode}';`;
    return new Promise((resolve,reject)=>{
        db.query(sql,(err,res)=>{
            if(err) reject(err)
            resolve(res);
        })
    })
}