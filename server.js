const express = require('express');
const mongodbClient = require('./database');
const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  try {
    await mongodbClient.connect();
    const pingResult = await mongodbClient.db("admin").command({ ping: 1 });
    res.send('Database connected successfully: ' + JSON.stringify(pingResult));
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    res.status(500).send('Failed to connect to the database');
  } finally {
    await mongodbClient.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
