const Task = require("../model/task.model")
module.exports.index = async(req, res) => {
    const find = {
        deleted: false
    }
    //filters
    if(req.query.status){
        find.status = req.query.status
    }
    //sort
    const sort = {}
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }
    //pagination
    const pagination = {
        limit: 5,
        currentPage: 1
    }
    if(req.query.page){
        pagination.currentPage = parseInt(req.query.page)
    }
    if(req.query.limit){
        pagination.limit = parseInt(req.query.limit)
    }
    pagination.skip = (pagination.currentPage - 1) * (pagination.limit)
    //keyword
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i")
        find.title = regex
    }
    const tasks = await Task.find(find).sort(sort).skip(pagination.skip).limit(pagination.limit)
    res.json(tasks)
}
module.exports.detail = async(req, res) => {
    const id = req.params.id
    const task = await Task.findOne({
        _id: id,
        deleted: false
    })
    res.json(task)
}