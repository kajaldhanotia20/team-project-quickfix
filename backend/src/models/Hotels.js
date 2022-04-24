const mongoose = require('mongoose');
const schema = mongoose.Schema;

let HotelSchema = new mongoose.Schema({
    _id: {type: String, required:true},
    Hotel_name: {type: String, required: true},
    Description: {type: String, required:true},
    Hotel_location: {type: String, required: true},
    Working_hours: {type: String, required: true},
    Phone_number: {type: Number, required: false},
    Email_id: {type: String, required: true},
    Amenities: {type: Map, required: true},
    Room_type_rate_mapping: {type: Map, required: false},
    Reviews: {type: Map, required: true},
    Recommended_rating: {type: Decimal128, required: true},
    Profile_image: {type: String, required: false},
    Created_at: {type: Date, required: true},
});

const HotelsModel = mongoose.model('Hotels', HotelSchema);
module.exports = HotelsModel;