//aei file ta use kora hoeache mongo db ar songe connectiona ar code alaada kore rakhar jonno


const mongoose = require("mongoose");//mongoose holo package ,jeta Node.js ar songe mongodb ar songe connection koararjonno

const connectdb = async()=> { //async deoa hoeache mongo db te connectio hote somoy lagte pare

    await mongoose.connect(process.env.dburl);// mongoose.connect       mongodb te connection cretae kore,.env file thke mongourl ar value nei
    console.log("mongodb connected");//await connnect create na hoea obdi poer line jaoar age  wait kore
}

module.exports = connectdb;