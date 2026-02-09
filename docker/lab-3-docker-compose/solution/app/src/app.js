import express from 'express';
import { createClient } from 'redis';

const app = express();

const client = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

client.on('error', err => console.log('Redis Error', err));

await client.connect();

app.get('/', async (req, res) => {
    const visits = await client.incr('visits');
    res.send(`<h1> ${visits} </h1>`);
});

app.listen(
    process.env.APP_PORT,
    () => console.log(`Server running on port ${process.env.APP_PORT}`)
);