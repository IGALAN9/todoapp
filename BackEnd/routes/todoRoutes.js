const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const todo = require('../models/todo');

router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.toggleTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;