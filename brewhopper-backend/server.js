import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

// Route Imports
import breweryRoutes from "./routes/breweryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import beerRoutes from "./routes/beerRoutes.js";
import passportRoutes from "./routes/passportRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import beerReviewRoutes from "./routes/beerReviewRoutes.js";

dotenv.config();
const port = process.env.PORT || 5001;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/breweries", breweryRoutes);
app.use("/api/beer", beerRoutes);
app.use("/api/beer-review", beerReviewRoutes);
app.use("/api/passport", passportRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
