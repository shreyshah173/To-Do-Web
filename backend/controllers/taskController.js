const Task = require('../models/Task');

exports.addTask = async (req, res) => {
    try {
        const { text } = req.body;
        const newTask = new Task({ text });
        await newTask.save();
        res.json(newTask);
    } catch (err) {
        res.status(500).json({ message: 'Error adding task', error: err });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks', error: err });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, { text: req.body.text }, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: 'Error updating task', error: err });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task', error: err });
    }
};

exports.toggleTaskCompletion = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        task.isCompleted = !task.isCompleted;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Error toggling task completion', error: err });
    }
};
