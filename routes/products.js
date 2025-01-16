const router = require('express').Router();
const connection = require('../database/configDB');

router.get('/',(req,res)=>{
    const sql = 'SELECT * FROM products';
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.status(200).json(results);
    });
}); 

module.exports=router;
