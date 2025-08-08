
const express = require('express');
const app = express();
const fs = require('fs');

const DB_PASSWORD = 'superSecret123';

app.get('/user', (req, res) => {
    const userId = req.query.id;
    const query = `SELECT * FROM users WHERE id = '${userId}'`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

let tempData = "This is never used";
try {
    fs.readFileSync('/important/data.txt');
} catch (e) {
}

const buffer = new Buffer('Hello');

app.listen(3000, () => {
    console.log('App running on port 3000');
});
