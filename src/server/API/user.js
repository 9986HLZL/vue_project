let db = require('../db/index')

exports.get = (req,res) => {
    var sql = 'select * from user where name = ? and password = ?'
    db.query(sql,[req.query.user,req.query.pass],(err,data) =>{
        if(err){
            return res.send('错误：' + err.message)
        }
        if(data.length>0){
            res.send({
                status:200,
                user:data,
                message:'登录成功'
            })
        }else{
            res.send({
                status:202,
                message:'删除失败'
            })
        }
    })
}
exports.userGet = (req,res) => {
    var sql = 'select * from user'
    db.query(sql,(err,data) =>{
        if(err){
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}