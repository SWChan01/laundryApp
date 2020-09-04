const db=require("../db");

exports.getAllLaundromats=()=>{
    let sql=`SELECT * FROM claimedLaundromats`
    return new Promise((resolve,reject)=>{
        db.query(sql,(err,res)=>{
            if(err) reject(err)
            resolve(res);
        })
    }).catch(err=>{console.log(err)});
}


exports.getOwnerByID=(ID)=>{
    const sql=`SELECT * FROM claimedLaundromats WHERE ID='${ID}';`;
    return new Promise((resolve,reject)=>{
        db.query(sql,(err,res)=>{
            if(err) reject(err)
            resolve(res);
        })
    }).catch(err=>{console.log(err)});
}

exports.getOwnerByEmail=(email)=>{
    const sql=`SELECT * FROM claimedLaundromats WHERE email='${email}';`;
    return new Promise((resolve,reject)=>{
        db.query(sql,(err,res)=>{
            if(err) reject(err)
            resolve(res);
        })
    }).catch(err=>{console.log(err)});
}


exports.getLaundromatsByZipcode=(zipcode)=>{
    const sql=`SELECT * FROM claimedLaundromats WHERE zipcode='${zipcode}';`;
    return new Promise((resolve,reject)=>{
        db.query(sql,(err,res)=>{
            if(err) reject(err)
            resolve(res);
        })
    }).catch(err=>{console.log(err)});
}