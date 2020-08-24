const db=require('../db');

exports.getLaundromatByField=(field,value)=>{
    let sql="SELECT * FROM claimedLaundromats WHERE "+String(field)+"="+"'"+String(value)+"';";
    console.log(sql);

    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        if(!result.length){
            return null;
        }
                
        console.log(result);
        return result; 	


    });
        
};