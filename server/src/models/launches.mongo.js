const mogoose = require('mongoose')

const launchesSchema = new mogoose.Schema({
    flightNumber : {
        type: Number,
        require: true,
    },
    mission: {
        type: String,
        require: true
    },
    rocket: {
        type: String,
        require: true
    },
    launchDate: {
        type: String
    },
    target: {
        type: String,
        require: true
    },
    upcoming: {
        type: Boolean,
        require: true
    },
    success: {
        type: Boolean,
        require: true,
        default: true
    },
    customers: [String],

});

module.exports = mogoose.model('Launch', launchesSchema);


