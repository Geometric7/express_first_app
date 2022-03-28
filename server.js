const express = require('express');
const path = require('path');
const app = express();
const hbs = require('express-handlebars');
const multer = require('multer');

const upload = multer ({
  dest: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
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

app.post('/contact/send-message', upload.single('uploadFile'), (req, res) => {

  const {author, sender, title, message } = req.body;
  const uploadFile = req.file;

  if(author && sender && title && uploadFile && message) {
    res.render('contact', { isSent: true, name: uploadFile.originalname});
  } else {
    res.render('contact', { isError: true });
  }
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(7000, () => {
  console.log('Server is running on port: 7000');
});
