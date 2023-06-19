import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Route Imports
import breweryRoutes from "./routes/breweryRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 5001;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongo pass : naUKzQdproVHV4Wa
// monog: BrewTime1989

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/breweries", breweryRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
