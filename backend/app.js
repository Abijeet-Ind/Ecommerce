const express = require('express');
const cors = require("cors");
const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");
const path = require("path")

const userRouter = require('./route/userRouter');
const productRouter = require('./route/productRouter');

app.use(express.json({extended: true}))

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}  

app.use(express.static(path.join(__dirname, "uploads")));

app.use(cookieParser());
app.use('/api/v1/products', cors(corsOptions), productRouter);
app.use('/api/v1/user', cors(corsOptions), userRouter); 

app.listen(port, () => {
    console.log("server is running at port ", port);
})