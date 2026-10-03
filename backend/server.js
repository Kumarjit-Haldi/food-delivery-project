const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectdb = require("./config/db");
const orderroutes = require("./routes/orderroutes");
const foodroutes = require("./routes/foodroutes");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectdb();
app.get('/', (req,res)=>{
    res.send("API is working ");
});
app.use("/api/orders",orderroutes);
app.use("/api/foods", foodroutes);
const port = process.env.port;

app.listen(port,()=>{
    console.log("server is running port 5900")
});