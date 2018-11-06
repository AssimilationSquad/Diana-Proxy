const express = require('express');
const path = require('path');
var request = require('request');

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/rooms', express.static(path.join(__dirname, '..', 'public')));

app.get('/rooms/:id', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

app.get('/similar/rooms/:id', (req, res) => {
  req.pipe(request(`http://localhost:3003/similar/rooms/${req.params.id}`)).pipe(res);
});

app.get('/api/rooms/:id', (req, res) => {
  req.pipe(request(`http://localhost:3004/api/rooms/${req.params.id}`)).pipe(res);
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});