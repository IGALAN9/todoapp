const { todo } = require('../models');

// get all data
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await todo.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch todos" });
    }
};

// Create new todo
exports.createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const newTodo = await todo.create({
            title: title,
            isDone: false
        });
        res.status(201).json(newTodo)
    } catch (error) {
        res.status(500).json({ message: "Failed to create todo"})
    }
};

// Update todo status (by id)
exports.toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await todo.findByPk(id);
    if (!todos) return res.status(404).json({ message: "Not found" });

    // Toggle true/false
    await todos.update({ isDone: !todos.isDone });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Todo (by id)
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await todo.destroy({ where: { id}});
        res.json({ message: "todo deleted"});
    } catch (error) {
        res.status(500).json({ message: "Failed to delete todo"});
    }
};