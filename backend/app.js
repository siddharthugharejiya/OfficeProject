const express = require('express');
const Server = require('./config/Server');
const ProductRoutes = require('./Route/ProductRoute');
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors())
app.use("/", ProductRoutes)

app.listen(9595, () => {
    console.log("server is running on port");
    Server()

})