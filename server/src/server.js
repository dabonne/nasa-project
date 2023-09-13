const PORT = process.env.PORT || 6000;
const http = require('http');
const app = require('./app');
const mongoose = require('mongoose')
const MONGO_URL = 'mongodb+srv://nasa-api:a9dTm1Epmd69iMBo@nasacluster.ka436b4.mongodb.net/nasa?retryWrites=true&w=majority'

const { loadPlanetsData } = require('./models/planets.model')


const server = http.createServer(app)

mongoose.connection.once('open', ()=> {
    console.log('MongoDB connection ready')
})

mongoose.connection.on('error', (error) => {
    console.log(error)
})

async function startServer(){
    await mongoose.connect(MONGO_URL)
    await loadPlanetsData();
    server.listen(PORT, ()=>{
        console.log(`Server is listening on PORT ${PORT}`)
    });
}

startServer();





