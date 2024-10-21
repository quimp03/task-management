module.exports = async(req, res, next) => {
    if(req.body.title.length == "" ){
        res.json({
            code: "200",
            message: "Vui lòng nhập vào tiêu đề!",
        })
        return;
    }
    const listStatus = ["initial", "doing", "notFinish", "pending", "finish"];
    if(!listStatus.includes(req.body.status)){
        res.json({
            code: "200",
            message: "Trạng thái công việc không hợp lệ!",
        })
        return;
    }
    next();
}