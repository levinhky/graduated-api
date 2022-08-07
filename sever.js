const exp = require('express');
const cors = require('cors');
const app = exp();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const timeout = require('connect-timeout');

//routes
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');

const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) {
    next();
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('common'));
dotenv.config();
app.use(timeout('5s'));
app.use(haltOnTimedout);

mongoose.connect('mongodb+srv://rock02:z-rock02@cluster0.7umb5gs.mongodb.net/?retryWrites=true&w=majority', () => {
  console.log('Database connect successfully!');
}).catch(err => console.log(err));

//routes
app.use('/api/v2/category', categoryRoute);
app.use('/api/v2/product', productRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log('Sever is running...!');
})