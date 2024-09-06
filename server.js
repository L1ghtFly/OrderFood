const express = require('express');
const app = express();
const PORT = 3000;

// Импорт клиента MongoDB
const client = require('database');

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const pingResult = await client.db("admin").command({ ping: 1 });
    res.send('Database connected successfully!');
    await client.close();
  } catch (error) {
    res.status(500).send('Failed to connect to the database');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
