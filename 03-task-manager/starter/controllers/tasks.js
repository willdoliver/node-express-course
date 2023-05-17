
const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper( async (req,res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

const getTask = asyncWrapper( async (req,res) => {
    const { id:taskId } = req.params
    // const task = await Task.findById(taskId)
    const task = await Task.findOne({_id: taskId})
    if (task) {
        res.json({success: true, task: task})
    } else {
        return next(createCustomError( `Task ${taskId} not found`, 404 ))
    }
})

const createTask = asyncWrapper( async (req,res) => {
    const task = await Task.create(req.body)
    res.status(201).json({success: true, data: task})
})

const updateTask = asyncWrapper( async (req,res) => {
    const { id: taskId } = req.params

    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true
    } )

    if (!task) {
        return next(createCustomError( `Task ${taskId} not found`, 404 ))
    }

    res.json({ task })
})

const deleteTask = asyncWrapper( async (req,res) => {
    const { id:taskId } = req.params
    // const task = await Task.deleteOne({_id: taskId})
    const task = await Task.findOneAndDelete({_id: taskId})

    if (task) {
        res.status(200).json({success: true})
    } else {
        return next(createCustomError( `Task ${taskId} not found`, 404 ))
    }
})

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}
