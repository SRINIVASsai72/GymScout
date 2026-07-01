import mongoose from "mongoose";
import cities from "./cities.js";
import { names, descriptors } from "./seedHelpers.js";
import Gym from "../models/Gyms.js";

mongoose.connect("mongodb://localhost:27017/gym-scout");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const gymImages = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1200&q=80",
];

const seedDB = async () => {
  await Gym.deleteMany({});

  for (let i = 0; i < 25; i++) {
    const randomCity = Math.floor(Math.random() * cities.length);
    const price = Math.floor(Math.random() * 5000) + 1000;

    const gym = new Gym({
      title: `${sample(descriptors)} ${sample(names)}`,
      location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
      description:
        "A modern fitness center with quality equipment, expert trainers, and flexible membership plans.",
      price,
      image: sample(gymImages),
    });

    await gym.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});