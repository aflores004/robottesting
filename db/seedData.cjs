 const { client, connect, disconnect } = require('./client.cjs');


 async function dropTables(client) {
  try {
    // Drop tables in reverse order to avoid foreign key constraints
    await client.query('DROP TABLE IF EXISTS Robots_Customers;');
    await client.query('DROP TABLE IF EXISTS Robot_Tasks;');
    await client.query('DROP TABLE IF EXISTS Customers;');
    await client.query('DROP TABLE IF EXISTS Tasks;');
    await client.query('DROP TABLE IF EXISTS Robots;');

    console.log('Tables dropped successfully.');
  } catch (error) {
    console.error('Error dropping tables:', error);
  }
}

 async function seedData(client) {
  try {
    // Create tables if they don't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS Robots (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        model VARCHAR(50) NOT NULL,
        company VARCHAR(100) NOT NULL,
        imgUrl VARCHAR(255),
        warranty_months INTEGER,
        is_child_safe BOOLEAN,
        release_date DATE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS Tasks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS Customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `);

    // Insert data into Robots table
    await client.query(`
      INSERT INTO Robots (name, model, company, imgUrl, warranty_months, is_child_safe, release_date)
      VALUES
        ('RoboTech Alpha', 'RT-1000', 'RoboTech Industries', 'http://example.com/robot1.jpg', 12, true, '2023-03-15'),
        ('CyberGuard X', 'CGX-2000', 'Cyber Dynamics', 'http://example.com/robot2.jpg', 24, false, '2023-04-20'),
        ('FutureBot Delta', 'FD-500', 'Future Innovations', 'http://example.com/robot3.jpg', 18, true, '2023-05-10'),
        ('Quantum Android', 'QA-900', 'Quantum Robotics', 'http://example.com/robot4.jpg', 36, false, '2023-06-25'),
        ('AstroBuddy', 'AB-300', 'Galactic Tech', 'http://example.com/robot5.jpg', 15, true, '2023-07-05');
    `);

    // Insert data into Tasks table
    await client.query(`
      INSERT INTO Tasks (name)
      VALUES
        ('CodeOptimizationAlgorithm'),
        ('AutomatedTestingSuiteDevelopment'),
        ('DataAnalysisScriptForSensorData'),
        ('ObjectDetectionImageRecognitionAlgorithm'),
        ('AutonomousNavigationSystemCalibration');
    `);

    // Insert data into Customers table
    await client.query(`
      INSERT INTO Customers (name, email)
      VALUES
        ('John Doe', 'john.doe@example.com'),
        ('Jane Smith', 'jane.smith@example.com'),
        ('Bob Johnson', 'bob.johnson@example.com'),
        ('Alice Brown', 'alice.brown@example.com'),
        ('Charlie Wilson', 'charlie.wilson@example.com');
    `);

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}


async function rebuild() {
  let client;

  try {
    client = await connect();

    // Drop existing tables
    await dropTables(client);

    // Seed data and recreate tables
    await seedData(client);

  } finally {
    if (client) {
      await disconnect(client);
    }
  }
}




module.exports = { seedData, dropTables, rebuild};