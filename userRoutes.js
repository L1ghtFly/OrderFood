const express = require('express');
const router = express.Router();
const { createUser } = require('userController');

router.post('/users', async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
