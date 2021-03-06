const mongoose = require('mongoose');
const schema = mongoose.Schema;

let HotelSchema = new mongoose.Schema({
    _id: {type: String, required:true},
    Hotel_name: {type: String, required: true},
    Description: {type: String, required:true},
    Hotel_location: {type: String, required: false},
    Working_hours: {type: String, required: false},
    Phone_number: {type: Number, required: true},
    Email_id: {type: String, required: true},
    Amenities: {type: Array, required: false},
    Room_type_rate_mapping: {type: Object, required: false},
    Reviews: {type: Object, required: false},
    Recommended_rating: {type: String, required: false},
    Profile_image: {type: String, required: false},
    Created_at: {type: Date, required: true},
});

const HotelsModel = mongoose.model('Hotels', HotelSchema);
module.exports = HotelsModel;