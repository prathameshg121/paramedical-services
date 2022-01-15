const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const morgan = require('morgan');
const router = express.Router();
mongoose.connect('mongodb+srv://admin:4vlZxifrsp3ihXCz@pmcluster.wbsdh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const AppliRoutes = require('./api/routes/AppliRoute')
const UserRoutes = require('./api/routes/UserRoute')
const Services = require('./api/routes/ServiceRoute')
const CovidVaccin = require('./api/routes/covidVaccRoute')
const Request_ser = require('./api/routes/RequestRoute')

const app = express();
// Log request data
app.use(morgan('dev'));

// Setup static files path
app.use('/uploads', express.static('uploads'));

// Use body parser middleware to parse body of incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // Setup CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use('/appli', AppliRoutes);
app.use('/user', UserRoutes);
app.use('/service', Services);
app.use('/covidservice',CovidVaccin)
app.use('/request', Request_ser);




// Handle Error Requests
app.use((req, res, next) => {
    const error = new Error();
    error.message = 'Not Found law';
    error.status = 404;
    next(error);
});




app.get("/", function(req, res){
    res.send("server is running on port 5000");
})




app.listen(5000, function(){
    console.log("server is running at port 5000")
});
