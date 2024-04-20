import express from 'express';
import {TaskCollection} from '../models/taskModel.js';
import {EntityTask} from '../models/entityModel.js';

const router = express.Router();

const taskModel = new TaskCollection();

router.get('/', (req,res) => {
    taskModel.getTask(req,res);
})

router.get('/:id', (req,res) => {
    const { id } = req.params
    taskModel.getTaskById(req,res, id);
})

router.post('/', (req,res) => {
    const { title, status, date } = req.body;
    const task = new EntityTask(title, status, date);
    console.log(task)
    taskModel.createTask(req,res,task);
})


router.put('/:id', (req,res) => {
    const { id } = req.params;
    const { title, status, date } = req.body;
    const task = new EntityTask(title, status, date);
    
    taskModel.updateTask(req,res, id, task);
    
})

router.delete('/:id', (req,res) => {
    const { id } = req.params;
    taskModel.deleteTask(req,res, id);
})

export {router as routes}