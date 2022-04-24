const mongoose = require('mongoose');
const schema = mongoose.Schema;

let jobPostingsSchema = new mongoose.Schema({
    _id: {type: schema.ObjectId, required:true},
    Hotel_name: {type: String, required: true},
    Description: {type: String, required:true},
    Hotel_Location: {type: String, required: true},
    Working_hours: {type: String, required: true},
    Phone_Number: {type: Number, required: false},
    Email_id: {type: String, required: true},
    Amenities: {type: Map, required: true},
    Room_Type_Rate_Mapping: {type: Map, required: false},
    Reviews: {type: Map, required: true},
    Recommended_Rating: {type: Decimal128, required: true},
    Profile_image: {type: String, required: false},
    job_created_at: {type: Date, required: true},
});

const jobPostingsModel = mongoose.model('jobPostings', jobPostingsSchema);
module.exports = jobPostingsModel;