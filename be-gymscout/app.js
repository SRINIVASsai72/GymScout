import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import gymRoutes from "./routes/gymRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app =express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

mongoose.set("strictQuery",false);
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/gyms", gymRoutes);
app.use("/gyms/:id/reviews", reviewRoutes);
app.use("/auth", authRoutes);



app.get("/", (req, res) => {
  res.send("hello from gymscout");
});


app.listen(3001, () => {
  console.log("GYMSCOUT BACKEND serving on port 3001");
});