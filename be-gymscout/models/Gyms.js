import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GymSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  image: String,

  coordinates: {
    lat: Number,
    lng: Number,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

export default mongoose.model("Gym", GymSchema);