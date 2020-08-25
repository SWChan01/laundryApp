const db=require("../db");


exports.updateNameByID=(newValue,ID)=>{
    let sql=`UPDATE User SET name='${newValue}' WHERE ID='${ID}'`;
    db.query(sql,(err,res)=>{
        if(err) throw err;
        if(res.affectedRowss>0){
            return res;
        }
        else{
            let sql=`UPDATE claimedLaundromats SET ownerName='${newValue}' WHERE ID='${ID}'`;
            db.query(sql,(err,res)=>{
                if(err) throw err;
                if(res.affectedRows>0) return res;
            })

        }
    });

    console.log("returning null...");
    return null;
}


exports.updateEmailByID=(newValue,ID)=>{
    let sql=`UPDATE User SET email='${newValue}' WHERE ID='${ID}'`;
    db.query(sql,(err,res)=>{
        if(err) throw err;
        if(res.affectedRowss>0){
            return res;
        }
        else{
            let sql=`UPDATE claimedLaundromats SET email='${newValue}' WHERE ID='${ID}'`;
            db.query(sql,(err,res)=>{
                if(err) throw err;
                if(res.affectedRows>0) return res;
            })

        }
    });
    return null;
}

exports.updateAddressByID=(newValue,ID)=>{
    let sql=`UPDATE User SET address='${newValue}' WHERE ID='${ID}'`;
    db.query(sql,(err,res)=>{
        if(err) throw err;
        if(res.affectedRowss>0){
            return res;
        }
        else{
            let sql=`UPDATE claimedLaundromats SET laundromatAddress='${newValue}' WHERE ID='${ID}'`;
            db.query(sql,(err,res)=>{
                if(err) throw err;
                if(res.affectedRows>0) return res;
            })

        }
    });
    return null;
}

exports.updatePhoneByID=(newValue,ID)=>{
    let sql=`UPDATE User SET phone_number='${newValue}' WHERE ID='${ID}'`;
    db.query(sql,(err,res)=>{
        if(err) throw err;
        if(res.affectedRowss>0){
            return res;
        }
        else{
            let sql=`UPDATE claimedLaundromats SET ownerPhone='${newValue}' WHERE ID='${ID}'`;
            db.query(sql,(err,res)=>{
                if(err) throw err;
                if(res.affectedRows>0) return res;
            })

        }
    });
    return null;
}