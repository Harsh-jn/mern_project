import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  from: {
    type: String,
    default: "Mumbai",
    required: true,
  },
  to: {
    type: String,
    default: "Chennai",
    required: true,
  },
  departure: {
    type: Date,
    required: true,
    default: Date.now,
  },
  flight_no: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Flight", flightSchema);
