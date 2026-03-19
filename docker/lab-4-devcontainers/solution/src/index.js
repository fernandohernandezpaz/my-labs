const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => res.json({ message: 'Hello from inside the DevContainer!' }));

app.listen(PORT, () => console.log(`The server is running on http://localhost:${PORT}`));
