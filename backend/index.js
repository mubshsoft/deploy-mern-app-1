const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require("./routes/AuthRouter");
const ProductRouter = require("./routes/ProductRouter");
require('dotenv').config();
require('./models/db');




const PORT = process.env.PORT || 7000



app.get('/ping',(req,res)=>{
    res.send('pong');
})


app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


app.use('/auth',AuthRouter);
app.use('/products', ProductRouter);



app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
})