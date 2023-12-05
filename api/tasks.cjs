// tasksApi.js

const express = require('express');
const { connect } = require('/mnt/c/Users/thesa/OneDrive/Documents/Coursework/robotfolder/db/client.cjs');
const router = express.Router();

router.get('/tasks', async (req, res) => {
let client;
  try {
    console.log("Inside Try Block");
    client = await connect();
    // Query all tasks from the "public" schema in the "robotdatabase" database
    const result = await client.query('SELECT id, name FROM public.Tasks');
    const tasks = result.rows;

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching all tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
