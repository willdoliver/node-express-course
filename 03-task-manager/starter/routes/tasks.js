const express = require('express')
const router = express.Router();

const {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks')


router.get('/', getAllTasks)
router.post('/', createTask)
router.get('/:id', getTask)
// Put update partial data and reset others
// Patch update partial data and keep other fields
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router