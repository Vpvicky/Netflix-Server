const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const port = 3003;
const uri =
  'mongodb+srv://vicknesh25279:Vicky1997@netflix.v1r8l.mongodb.net/?retryWrites=true&w=majority&appName=Netflix';
mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error On Connecting DB' + err.message);
  });

const authRoute = require('./routes/auth');

app.use('/auth', authRoute);
app.use('/', (res) => {
  res.send('Welcome To NetFlix');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
