const { rebuild } = require('./seedData.cjs');

async function runSeed() {
  try {
    await rebuild();
  } catch (error) {
    console.error('Error running seed:', error);
  }
}

// Run the seed operation
runSeed();