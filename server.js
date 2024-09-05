const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; // Установите порт

// Тут подключение маршрутов
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
