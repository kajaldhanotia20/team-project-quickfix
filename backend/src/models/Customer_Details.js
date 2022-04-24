const mongoose = require('mongoose');
const schema = mongoose.Schema;

let CustomerDetailsSchema = new mongoose.Schema({
    _id: {type: String, required:true},
    Customer_name: {type: String, required: true},
    Customer_Address: {type: String, required:true},
    Phone_Number: {type: Number, required: true},
    Rewards: {type: Map, required: true},
    Profile_image: {type: String, required: false},
    Customer_loyalty: {type: Decimal128, required: true},
    Created_at: {type: Date, required: true},
});

const CustomerDetailsModel = mongoose.model('Customer_Details', CustomerDetailsSchema);
module.exports = CustomerDetailsModel;