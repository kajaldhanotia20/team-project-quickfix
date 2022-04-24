const mongoose = require('mongoose');
const schema = mongoose.Schema;

let ReservationSchema = new mongoose.Schema({
    _id: {type: String, required:true},
    Hotel_id: {type: String, required: true},
    Customer_id: {type: String, required:true},
    Hotel_name: {type: String, required: true},
    Customer_name: {type: String, required: true},
    Rate_per_day: {type: Decimal128, required: false},
    Booking_period_days: {type: Number, required: true},
    Booking_start_date: {type: Date, required: true},
    Booking_end_date: {type: Date, required: false},
    Total_cost: {type: Decimal128, required: true},
    Created_at: {type: Date, required: true},
});

const ReservationsModel = mongoose.model('Reservations', ReservationSchema);
module.exports = ReservationsModel;