const express = require('express');
const app = express();
const port = 3001;

// Log all incoming requests
app.use((req, res, next) => {
    console.log('📥 Request received:');
    console.log('🔗 Method:', req.method);
    console.log('📄 URL:', req.originalUrl);
    console.log('🔍 Query Params:', req.query);
    console.log('📦 Headers:', req.headers);
    console.log('🕵️ IP:', req.ip);
    next();
});

// Example route
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
