const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const shopRoutes = require('./routes/shop');
const fileRoutes = require('./routes/file');

const app = express();

mongoose.connect('mongodb://localhost:27017/lidoria',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    promiseLibrary: global.Promise,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use('/uploads', express.static('/uploads'));
app.get('/', function(req, res) {
  res.send("Serv Up !");
})
app.use('/api/auth', userRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/file', fileRoutes);

module.exports = app;
