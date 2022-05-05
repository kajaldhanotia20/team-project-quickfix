const ReservationsModel = require("../models/Reservations");
const mongoose = require('mongoose');
exports.createBooking = async function (req, res) {
    console.log("__________________________________"+ req);
    const data = req.body;
    try{
        let newBooking = new ReservationsModel({
                Hotel_id : data.hotel_id,
                Customer_id: data.cust_id,
                Hotel_name: data.hotel_name,
                Customer_name: data.cust_name,
                Rate_per_day: data.rate_per_day,
                Booking_period_days: data.booking_days,
                Booking_start_date: data.booking_start_date,
                Booking_end_date: data.booking_end_date,
                Total_cost: data.total_cost,
                Created_at: data.created_at,
                // _id : mongoose.Schema.ObjectId
            });
        newBooking.save((err, res) => {
            console.log("errrrrrrrrr"+ err);
            console.log("ressssssss"+ res)
            if (err) {
                console.error("Error in creating booking : " + err);
                // res(null,{ response_code: 500, response_data: "Something went wrong!", err: err});
                res
                    .status(500)
                    .send(JSON.stringify({message: 'Something went wrong!'}));
            } else {

                res.status(200).setHeader("Content-Type", "text/plain").end(JSON.stringify(data));

                // res.statusCode = 200;
                // res.setHeader("Content-Type", "text/plain");
                // res.send(JSON.stringify(data));
            }
        });
    }catch(err){
    console.error("Error in createJobPostings : " + err);
    res(null,{ response_code: 500, response_data: "Something went wrong!", err: err});
}
}
