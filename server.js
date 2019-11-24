const express = require('express')
const open = require('open');
const app = express()
const port = 3001

app.use(express.static('public'));

app.listen(port, async () => {
    await open(`http://localhost:${port}`);
})
