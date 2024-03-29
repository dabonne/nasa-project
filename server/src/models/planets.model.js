const {parse} = require('csv-parse');
const fs = require('fs');
const path = require('path')

const planets = require('./planet.mongo')


function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData(){
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true
            })).on('data', async (data) => {
            if(isHabitablePlanet(data)){
                //TODO
                await savePlanet(data)
            }})
            .on('error', (error) => {
                console.log(error)
                reject();
            })
            .on('end', async () => {
                const countPlanetFound = (await getAllPlanets()).length;
                console.log(`${countPlanetFound} Habitables planets found`)
                resolve();
            })
    })

}

async function savePlanet(planet){
    try{
        await planets.updateOne({
            keplerName: planet.kepler_name
        }, {
            keplerName: planet.kepler_name
        }, {
            upsert: true
        })
    }catch (error){
        console.error(`Could not save the planet ${error}`)
    }

}

async function getAllPlanets(){
    return await planets.find({}, {'__v':0, '_id':0});
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
}
