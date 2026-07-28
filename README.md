# WhatsApp Group Bot

## Setup on Render
1. Upload these files to a new GitHub repo (index.js, package.json, .gitignore)
2. On Render: New -> Web Service -> connect this repo
3. Build Command: npm install
4. Start Command: npm start
5. Instance Type: Free
6. After deploy, visit https://YOUR-RENDER-URL/qr to scan the QR code from WhatsApp (Linked Devices)
7. Set up UptimeRobot to ping https://YOUR-RENDER-URL/ every 5 minutes so it stays awake

## Notes
- Edit the "bannedWords" list in index.js to add/remove keywords
- The bot account must be admin in each group for delete-for-everyone to work
