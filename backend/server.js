const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
const connectdb = require("./config/db");
const orderroutes = require("./routes/orderroutes");
const foodroutes = require("./routes/foodroutes");
const authroutes = require("./routes/authroutes");
const paymentroutes = require("./routes/paymentroutes");
const aiChatRoutes = require("./routes/aichatroutes");
const reviewRoutes = require("./routes/reviewroutes");
const notificationRoutes = require("./routes/notificationroutes");
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
app.use("/api/notifications", notificationRoutes);

// SOCKET.IO


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {

    console.log("Socket connected:", socket.id);

    // Admin live location
    socket.on("adminLocationUpdate", (location) => {
        console.log("Admin location:", location);

        io.emit("deliveryLocationUpdated", location);
    });
    socket.on("deliveryTrackingStopped", () => {
    console.log("Delivery tracking stopped");

    io.emit("deliveryTrackingStopped");
        });
    // Order status update
    socket.on("orderStatusUpdated", (data) => {
    console.log("Order status updated:", data);

    io.emit("orderStatusUpdated", data);

    //notification refresh
    io.emit("notificationUpdated", data);
        });
    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
    });

});
const port = process.env.port ||5900;

server.listen(port,()=>{
    console.log(`server is running port ${port}`);
});