const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const botToken = '7365493370:AAE1itMZSI84NR2SDNmCnHy3Hmi8NxVp1Nk';
const chatId = '265513408';

// Enable CORS
app.use(cors());

// Route to serve the HTML content
app.get('/', (req, res) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Notify Me Button</title>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </head>
    <body>
        <button id="notifyButton">I Miss You Baby!!!</button>

        <script>
            $(document).ready(function() {
                $('#notifyButton').click(function() {
                    $.ajax({
                        url: 'http://localhost:${port}/notify',
                        method: 'GET',
                        success: function(response) {
                            alert('Notification sent!');
                        },
                        error: function(xhr, status, error) {
                            console.error('Error sending notification:', error);
                        }
                    });
                });
            });
        </script>
    </body>
    </html>
    `;
    res.send(htmlContent);
});

// Route to handle the notification
app.get('/notify', (req, res) => {
    sendTelegramNotification()
        .then(() => {
            res.send('Notification sent!');
        })
        .catch((error) => {
            res.status(500).send('Error sending notification');
        });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

function sendTelegramNotification() {
    const message = 'I Miss You Baby!!!';
    return axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message
    })
    .then(response => {
        console.log('Message sent:', response.data);
    })
    .catch(error => {
        console.error('Error sending message:', error.response.data);
        throw error;
    });
}
