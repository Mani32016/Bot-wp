const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');

const app = express();
let qrCodeData = '';
let isReady = false;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Yahan apni banned/keywords list dalein (lowercase mein)
const bannedWords = ['status'];

client.on('qr', async qr => {
    qrCodeData = await qrcode.toDataURL(qr);
    console.log('New QR generated - visit /qr to scan');
});

client.on('ready', () => {
    isReady = true;
    console.log('Bot ready!');
});

client.on('message', async msg => {
    try {
        const chat = await msg.getChat();
        if (!chat.isGroup) return;

        const text = msg.body.toLowerCase();
        if (bannedWords.some(word => text.includes(word))) {
            await msg.delete(true); // true = delete for everyone (admin required)
            console.log('Deleted a message containing banned word.');
        }
    } catch (e) {
        console.log('Error handling message:', e.message);
    }
});

// QR code dekhne ke liye route
app.get('/qr', (req, res) => {
    if (isReady) return res.send('Already connected!');
    if (!qrCodeData) return res.send('QR generating, refresh in a few seconds...');
    res.send(`<img src="${qrCodeData}" />`);
});

// Uptime pinger ke liye route
app.get('/', (req, res) => res.send('Bot is alive'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started');
});

client.initialize();
