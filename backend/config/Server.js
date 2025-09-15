
const mongoose = require('mongoose')

const Server =async () =>{

   await mongoose.connect('mongodb+srv://multiera95_db_user:12345@cluster0.l24hhyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log("Server Conntected ");
    
}

module.exports = Server