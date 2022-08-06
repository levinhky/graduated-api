const exp = require('express');
const cors = require('cors');
const app = exp();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

//routes
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('common'));
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log('Database connect successfully!');
}).catch(err => console.log(err));

//routes
app.use('/api/v2/category', categoryRoute);
app.use('/api/v2/product', productRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log('Sever is running...!');
})