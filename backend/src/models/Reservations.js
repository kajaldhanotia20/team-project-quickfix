const mongoose = require('mongoose');
const schema = mongoose.Schema;

let ReservationSchema = new mongoose.Schema({
    // _id: {type: String, required:false},
    Hotel_id: {type: String, required: true},
    Customer_id: {type: String, required:true},
    Customer_name: {type: String, required: false},
    Hotel_name: {type: String, required: true},
    Rate_per_day: {type: String, required: false},
    Booking_period_days: {type: Number, required: false},
    Booking_start_date: {type: Date, required: true},
    Booking_end_date: {type: Date, required: false},
    Total_cost: {type: String, required: true},
    Amenities:{type: Array, required:false},
    image:{type:String, required:false},
    Guests: {type:String, required:false},
    Rooms: {type:String, required:false},
    RoomType: {type:String, required:false},
    Created_at: {type: Date, required: true},
});

const ReservationsModel = mongoose.model('Reservations', ReservationSchema);
module.exports = ReservationsModel;