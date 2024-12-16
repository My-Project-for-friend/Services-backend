
const executedSuccess=(res,data,message)=>{
    return res.status(200).json({
        data,
        message,
        success:true
    })
}

module.exports=executedSuccess;