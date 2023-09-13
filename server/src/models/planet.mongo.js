const mogoose = require('mongoose')

const planetSchema = new mogoose.Schema({
    keplerName: {
        type: String,
        required: true
    }
});

module.exports = mogoose.model('Planet', planetSchema);