const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/robotdatabase';

async function connect() {
  const client = new Client({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  });

  try {
    await client.connect();
    console.log('Connected to the database');
    return client;
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
}

async function disconnect(client) {
  try {
    await client.end();
    console.log('Disconnected from the database');
  } catch (error) {
    console.error('Error disconnecting from the database', error);
  }
}

module.exports = { connect, disconnect };
