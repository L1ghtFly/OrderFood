const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // bodyParser.json() встроен в Express с версии 4.16+

const PORT = process.env.PORT || 3000;
require('dotenv').config();

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Определение схемы и модели пользователя
const UserSchema = new mongoose.Schema({
    name: String,
    phone: String
});
const User = mongoose.model('User', UserSchema);

// Роут для регистрации пользователя
app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).send({ success: true, message: 'User registered', data: savedUser });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
