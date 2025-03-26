const express = require('express');
const { db } = require('./db');
const cors = require('cors');
const app = express();
const port = 3000;
// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Function to create 'users' table if it doesn't exist
const createUsersTable = async () => {
    try {
        if(!(await db.schema.hasTable('users')))
        {
        await db.schema.createTable('users', function (table) {
            table.increments();
            table.string('name');
            table.string('email').unique();
            table.string('password');
            table.timestamps();
          });
        console.log("Users table checked/created successfully.");
        }
    } catch (error) {
        console.error("Error creating users table:", error);
    }
};
createUsersTable();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/users', async (req, res) => {
    try {
        const result = await db.select().table('users');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching users");
    }
});


app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email) {
        return res.status(400).send("Name and Email are required.");
    }
    try {
        const [id] = await db('users').insert({ name, email, password });
        const newUser = await db('users').where({ id }).first();
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding user");
    }
});



app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send("Both name and email are required for updating.");
    }
    try {
        const result = await db("users").where({ id }).update({ name, email });
        if (result.rowCount === 0) {
            return res.status(404).send("User not found.");
        }
        res.send("User updated successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating user");
    }
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db("users").where({ id }).del();
        if (result.rowCount === 0) {
            return res.status(404).send("User not found.");
        }
        res.send("User deleted successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting user");
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
