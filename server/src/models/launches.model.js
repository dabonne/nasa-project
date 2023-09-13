const launchesDatabase = require('./launches.mongo')

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
}

saveLaunch(launch);


function existsLaunchWithId(launch){
    return launches.has(launch)
}
async function getAllLaunches(){
    return launchesDatabase.find({}, {'__v': 0, '_id': 0});
}

async function saveLaunch(launch){
    try {
        await launchesDatabase.updateOne(
            {flightNumber: launch.flightNumber},
            {launch},
            { upsert: true }
        )
    }catch (error){
        console.error(error)
    }
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customer: ['ZTM', 'NASA'],
        upcoming: true,
        success: true
    }))
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById
}