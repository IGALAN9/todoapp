require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models'); 
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/todos', todoRoutes);

// test route
app.get('/', (req, res) => {
    res.send('API is working');
});

// console.log("Isi DB:", db);

// Sync database and start server
db.sequelize.sync({ alter: true }).then(() => {
    console.log('Database Connected and Synced');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch( error => {
    console.error('Unable to connect to the database:', error);
});