import express from 'express';

const app = express();

app.get('/ads', (require, response) => {
    return response.json([
        { id: 1, name: ' Yasuhei' },
        { id: 2, name: ' Yasuhei 2' },
        { id: 3, name: ' Yasuhei 3' },
        { id: 4, name: ' Yasuhei 4' },
    ])
})

app.listen(3333)