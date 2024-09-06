const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.post('/register', (req, res) => {
    const userData = req.body; // получаем данные пользователя из тела запроса
    console.log(userData); // выводим данные в консоль для проверки

    // Здесь добавьте логику для сохранения данных в базу данных
    // Например, код для сохранения данных в MongoDB

    res.status(201).send({ success: true, message: 'User registered', data: userData });
});
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    name: String,
    phone: String
});

const User = mongoose.model('User', UserSchema);
app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).send({ success: true, message: 'User registered', data: savedUser });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});
