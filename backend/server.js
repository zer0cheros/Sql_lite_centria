const express = require('express');
const { db } = require('./db');
const app = express();
const port = 3000;

// Function to create 'users' table if it doesn't exist
const createUsersTable = async () => {
    try {
        await db.schema.createTable('users', function (table) {
            table.increments();
            table.string('name');
            table.string('email').unique();
            table.string('password');
            table.timestamps();
          });
        console.log("Users table checked/created successfully.");
    } catch (error) {
        console.error("Error creating users table:", error);
    }
};
createUsersTable();


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
