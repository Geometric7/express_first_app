const express = require('express');
const path = require('path');
const app = express();
const hbs = require('express-handlebars');

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use('/user', (req, res, next) => {
 res.render('forbidden');
})

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(7000, () => {
  console.log('Server is running on port: 7000');
});
