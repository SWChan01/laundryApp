const db=require("../db");

exports.getAllOrders=()=>{
    return new Promise ((resolve,reject)=>{
        db.query("SELECT * FROM orders",(err,res)=>{
            if(err) reject(err);
            resolve(res);
        })
    }).catch(err=>{console.log(err)});
}

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
    }).catch(err=>{console.log(err)});

}

exports.getOrderByOrderID=(ID)=>{
    let sql=`SELECT * FROM orders WHERE orderID='${ID}'`;
    return new Promise ((resolve,reject)=>{
        db.query(sql, (err, results) => {
            if (err) reject (err);
            else resolve(results);
        });
            
    }).catch(err=>{console.log(err)});
}


exports.acceptOrder=(ID)=>{
    let sql=`UPDATE orders SET orderStatus='Accepted' WHERE orderID='${ID}'`

    return new Promise((resolve,reject)=>{
        db.query(sql,(err,result)=>{
            if(err) reject(err);
            resolve(result);
        });
    }).catch(err=>{console.log(err)});
}


exports.pickupOrder=(ID)=>{
    let sql=`UPDATE orders SET orderStatus='Picked up' WHERE orderID='${ID}'`

    return new Promise((resolve,reject)=>{
        db.query(sql,(err,result)=>{
            if(err) reject(err);
            resolve(result);
        });
    }).catch(err=>{console.log(err)});
}

exports.deleteOrderByID=(ID)=>{
    let sql=`DELETE FROM orders WHERE orderID=${ID}`;
    return new Promise((resolve,reject)=>{
        db.query(sql,(err,result)=>{
            if(err) reject (err);
            resolve(result);
        });
    }).catch(err=>{console.log(err)});
}

exports.deliverOrder=(ID)=>{
    let sql=`UPDATE orders SET orderStatus='Delivered' WHERE orderID='${ID}'`;
    return new Promise((resolve,reject)=>{
        db.query(sql,(err,result)=>{
            if(err) reject (err);
            resolve(result);
        })
    }).catch(err=>{console.log(err)});
}

exports.updateDeliveryTimebyID=(time,ID)=>{
    let sql=`UPDATE orders SET estimatedDeliveryTime='${time}' WHERE orderID='${ID}'`
    return new Promise((resolve,reject)=>{
        db.query(sql,(err,result)=>{
            if(err) reject(err);
            resolve(result);
        })
    }).catch(err=>{console.log(err)});
}


exports.putInPrice=(price,ID)=>{
    let sql=`UPDATE orders SET orderPrice='${price}' WHERE orderID='${ID}'`;
    return new Promise((resolve,reject)=>{
        db.query(sql,(err,result)=>{
            if(err) reject(err);
            resolve(result);
        })
    }).catch(err=>{console.log(err)});
}
