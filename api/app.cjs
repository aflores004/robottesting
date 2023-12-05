// app.js

const express = require('express');
const { connect } = require('/mnt/c/Users/thesa/OneDrive/Documents/Coursework/robotfolder/db/client.cjs');

const robotsApi = require('./allrobots.cjs');
const tasksApi = require('./tasks.cjs');

const app = express();
const port = 3017 ;

app.use(express.json());

// Connect to the database
connect();

// Use the robots and tasks API routers
app.use('/api', robotsApi);
app.use('/api', tasksApi);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
