const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectdb = require("./config/db");
const orderroutes = require("./routes/orderroutes");
const foodroutes = require("./routes/foodroutes");
const authroutes = require("./routes/authroutes");
const paymentroutes = require("./routes/paymentroutes");
const aiChatRoutes = require("./routes/aichatroutes");
const reviewRoutes = require("./routes/reviewroutes");
const app = express();
app.use(cors());
app.use(express.json());
connectdb();
app.get('/', (req,res)=>{
    res.send("API is working ");
});
app.use("/api/orders",orderroutes);
app.use("/api/foods", foodroutes);
app.use("/api/auth", authroutes);
app.use("/api/payment", paymentroutes);
app.use("/api/ai", aiChatRoutes);
app.use("/api/reviews", reviewRoutes);
const port = process.env.port ||5900;

app.listen(port,()=>{
    console.log(`server is running port ${port}`);
});