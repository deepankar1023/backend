const express = require("express");
const cors = require('cors');
require("dotenv").config();
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const addItems = require('./routes/addItems');
const getItemsRoutes = require('./routes/getitems'); 
const cartRoutes = require('./routes/cartRoutes');// Renamed to avoid confusion
const userRouter = require('./routes/user');
const productRoutes = require('./routes/search');
const products = require('./routes/product')
const paymentRoutes = require('./routes/payment')
//notification
// const admin = require('firebase-admin');
const ordersRoute = require('./routes/orders');
// admin.initializeApp({
//     credential: admin.credential.cert(require('./serviceAccountKey.json')),
//   });
  //notification

// Load config from env file
const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON request body
app.use(express.json());
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});
app.use('/', authRoutes);//signup and login route
app.use('/', addItems);
app.use('/', getItemsRoutes); // Use the renamed route variable
app.use('/api', cartRoutes);//add or get cart route
app.use('/api/products', productRoutes);//searching route
app.use('/api/products', products);//get individual food item from productlist
app.use(userRouter);
//notification
app.use(bodyParser.json());
app.use('/orders', ordersRoute);
//notification
app.use('/api/payment', paymentRoutes);//payment

// let corsOptions = {
//     origin: 'http://localhost:3000', 
//     optionsSuccessStatus: 200                       
// };

// app.use(cors(corsOptions));

// Start server
app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
})

// Connect to the database
const dbConnect = require("./config/database");
dbConnect();

// Default Route
app.get("/", (req, res) => {
    res.send(`<h1>This is the HOMEPAGE</h1>`);
});
