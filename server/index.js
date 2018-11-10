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
  req.pipe(request(`http://ec2-52-53-209-206.us-west-1.compute.amazonaws.com/similar/rooms/${req.params.id}`)).pipe(res);
});

app.get('/api/rooms/:id', (req, res) => {
  req.pipe(request(`http://ec2-18-188-150-95.us-east-2.compute.amazonaws.com/api/rooms/${req.params.id}`)).pipe(res);
});

app.get('/rooms/:homeid/reviews', (req, res) => {
  req.pipe(request(`http://18.144.35.212/rooms/${req.params.homeid}/reviews`)).pipe(res);
});

app.patch('/rooms/:homeid/reviews/:reviewid', (req, res) => {
  req.pipe(request(`http://18.144.35.212/rooms/${req.params.homeid}/reviews/${req.params.reviewid}`)).pipe(res);
});

app.get('/price/:propertyId', (req, res) => {
  console.log(req);
  req.pipe(request(`http://54.200.6.195/price/${req.params.propertyId}`)).pipe(res);
});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});