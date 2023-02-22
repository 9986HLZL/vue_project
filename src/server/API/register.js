let db = require('../db/index')

exports.get = (req,res) => {
    var sql = 'insert into user values(?,?,?,?,?)'
    db.query(sql,[req.query.user,req.query.pass,req.query.phone,req.query.province,req.query.address],(err,data) =>{
        if(err){
            return res.send('错误：' + err.message)
        }
        res.send({
            status:200,
            message:'注册成功'
        })
    })
}