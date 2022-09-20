const exp = require('express');
const cors = require('cors');
const app = exp();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const router = require('express').Router();

//routes
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const commentRoute = require('./routes/comment')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('common'));
dotenv.config();
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log('Database connect successfully!');
}).catch(err => console.log(err));

//routes
app.use('/api/v2/categories', categoryRoute);
app.use('/api/v2/products', productRoute);
app.use('/api/v2/comments', commentRoute);

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Sever is running...!');
})
