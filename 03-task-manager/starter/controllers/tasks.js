
const Task = require('../models/task')

const getAllTasks = async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({'msg': error})
    }
}

const getTask = async (req,res) => {
    try {
        const { id:taskId } = req.params
        // const task = await Task.findById(taskId)
        const task = await Task.findOne({_id: taskId})
        if (task) {
            res.json({success: true, task: task})
        } else {
            res.status(404).json({success: false, msg: `Task ${taskId} not found`})
        }
    } catch (error) {
        res.status(500).json({'msg': error})
    }
}

const createTask = async (req,res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({success: true, data: task})
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const updateTask = async (req,res) => {
    try {
        const { id: taskId } = req.params
    
        const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
            new: true,
            runValidators: true
        } )

        if (!task) {
            return res.status(404).json({ success: false, msg: `Task ${taskId} not found` })
        }
    
        res.json({ task })
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const deleteTask = async (req,res) => {
    try {
        const { id:taskId } = req.params
        // const task = await Task.deleteOne({_id: taskId})
        const task = await Task.findOneAndDelete({_id: taskId})
        // console.log(task)
        if (task) {
            res.status(200).json({success: true})
        } else {
            res.status(404).json({success: false, msg: `Task ${taskId} not found`})
        }
    } catch (error) {
        res.status(500).json({'msg': error})
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}