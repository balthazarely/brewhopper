import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

// Route Imports
import breweryRoutes from "./routes/breweryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import beerRoutes from "./routes/beerRoutes.js";
import passportRoutes from "./routes/passportRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import uploadRoutesCloudinary from "./routes/uploadRoutesCloudinary.js";
import beerReviewRoutes from "./routes/beerReviewRoutes.js";
import achievementsRoutes from "./routes/achievementsRoutes.js";

dotenv.config();
const port = process.env.PORT || 5001;
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUDINDARY_CLOUD_NAME,
  api_key: process.env.CLOUDINDARY_API_KEY,
  api_secret: process.env.CLOUDINDARY_API_SECRET,
});

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/breweries", breweryRoutes);
app.use("/api/beer", beerRoutes);
app.use("/api/beer-review", beerReviewRoutes);
app.use("/api/passport", passportRoutes);
app.use("/api/achievements", achievementsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/upload-cloud", uploadRoutesCloudinary);

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   // app.use('/uploads', express.static('/var/data/uploads'));
//   // app.use(express.static(path.join(__dirname, "/brewhopper-frontend/dist")));

//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "brewhopper-frontend", "dist", "index.html")
//     )
//   );
// } else {
//   const __dirname = path.resolve();
//   // app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   });
// }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
