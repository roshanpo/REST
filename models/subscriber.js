//Creating a model for database. It maps the data into the data according to schema defined in code.
const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    subscribedToChannel :{
        type: String,
        required : true
    },
    subscribeDate:{
        type: Date,
        required: true,
        default : Date.now
    }
})

//exporting this model of database. Now we can use these module in our routes to get, post the data.
module.exports = mongoose.model('subscriber', subscriberSchema);