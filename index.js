const express = require("express");
require('dotenv').config()

const app = express();
const port = process.env.PORT ||  8000;  

//Middlewares
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const currenyRoutes = require("./routes/CurrencyExchange");
app.use("/api",currenyRoutes);
app.get("/" , (req,res) => {
    return res.send("hello there");
})

app.listen(port, () =>{
    console.log("Server is up and runing")
})
