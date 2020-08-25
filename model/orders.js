const db=require("../db");


exports.getOrderByUserID=(ID)=>{
    let sql=`SELECT * FROM orders WHERE customerID='${ID}'`;

    return new Promise ((resolve,reject)=>{
        db.query(sql, (err, results) => {
            if (err)
                reject (err);
    
    
            //the user is an owner
            if (!results.length) {
                let sql = `SELECT * FROM orders WHERE ownerID='${ID}'`;
                db.query(sql, (err, results) => {
                    if (err) throw err;
                    resolve(results);
                });
    
            }
            else {
                resolve(results);
            }
        });
    });

}

exports.getOrderByOrderID=(ID)=>{
    let sql=`SELECT * FROM orders WHERE orderID='${ID}'`;
    return new Promise ((resolve,reject)=>{
        db.query(sql, (err, results) => {
            if (err) reject (err);
            else resolve(results);
        });
            
    });
}


exports.acceptOrder=(ID)=>{
    let sql=`UPDATE orders SET orderStatus='Accepted' WHERE orderID='${ID}'`

    return new Promise((resolve,reject)=>{
        db.query(sql,(err,result)=>{
            if(err) reject(err);
            resolve(result);
        });
    });
}


exports.pickupOrder=(ID)=>{
    let sql=`UPDATE orders SET orderStatus='Picked up' WHERE orderID='${ID}'`

    return new Promise((resolve,reject)=>{
        db.query(sql,(err,result)=>{
            if(err) reject(err);
            resolve(result);
        });
    });
}

exports.deleteOrderByID=(ID)=>{
    let sql=`DELETE FROM orders WHERE orderID=${ID}`;
    return new Promise((resolve,reject)=>{
        db.query(sql,(err,result)=>{
            if(err) reject (err);
            resolve(result);
        });
    });
}

exports.deliverOrder=(ID)=>{
    let sql=`UPDATE orders SET orderStatus='Delivered' WHERE orderID='${ID}'`;
    return new Promise((resolve,reject)=>{
        db.query(sql,(err,result)=>{
            if(err) reject (err);
            resolve(result);
        })
    })
}