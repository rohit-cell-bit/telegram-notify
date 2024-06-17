const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const botToken = '7365493370:AAE1itMZSI84NR2SDNmCnHy3Hmi8NxVp1Nk';
const chatId = '265513408';

app.use(cors()); // Enable CORS

app.get('/notify', (req, res) => {
    sendTelegramNotification();
    res.send('Notification sent!');
});

function sendTelegramNotification() {
    const message = 'Someone clicked the button!';

    axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message
    })
    .then(response => {
        console.log('Message sent:', response.data);
    })
    .catch(error => {
        console.error('Error sending message:', error.response.data);
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
