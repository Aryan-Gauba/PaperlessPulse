Clone the repo: 
```
git clone https://github.com/yourusername/PaperlessPulse.git
```

Install dependencies:
```
cd client && npm install
```
```
cd ../server && npm install
```

Create local .env: They must manually create a .env in the server folder with their own PostgreSQL credentials (since we ignored yours for safety).

Run the App:
```
npm run dev 
```
(in client)
```
node server.js 
```
(in server)
