var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Planys', new Schema({
    description: String,
        imageId: String,
        markerId: String
}))