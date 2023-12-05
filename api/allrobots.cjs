const express = require('express');
const { connect, disconnect } = require('/mnt/c/Users/thesa/OneDrive/Documents/Coursework/robotfolder/db/client.cjs');
const router = express.Router();

router.get('/allrobots', async (req, res) => {
  let client; // Declare the client variable here

  try {
    // Establish a connection to the database
    client = await connect();

    // Log the client object to check if it's defined
    console.log(client);
// Query all robots from the "public" schema in the "robotdatabase" database
const result = await client.query('SELECT id, name, model, imgUrl FROM public.Robots');
const robots = result.rows;


    // Send the response with the retrieved robots
    res.json(robots);
  } catch (error) {
    console.error('Error fetching all robots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Disconnect from the database after the query is executed
    if (client) {
      await disconnect(client);
    }
  }
});

router.get('/onerobot/:id', async (req, res) => {
  const { id } = req.params;
  let client; // Declare the client variable here

  try {
    // Establish a connection to the database
    client = await connect();

    // Query a specific robot and its associated tasks from the database
    const robotResult = await client.query('SELECT * FROM public.Robots WHERE id = $1', [id]);
    const tasksResult = await client.query('SELECT public.Tasks.* FROM public.Robot_Tasks JOIN public.Tasks ON public.Robot_Tasks.task_id = public.Tasks.id WHERE public.Robot_Tasks.robot_id = $1', [id]);

    if (robotResult.rows.length === 0) {
      return res.status(404).json({ error: 'Robot not found' });
    }

    const robot = robotResult.rows[0];
    const tasks = tasksResult.rows;

    res.json({ robot, tasks });
  } catch (error) {
    console.error('Error fetching one robot:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Disconnect from the database after the query is executed
    if (client) {
      await disconnect(client);
    }
  }
});


module.exports = router;
