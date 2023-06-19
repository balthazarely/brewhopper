import express from "express";
// import connectDB from "./config/db.js";

const port = process.env.PORT || 5001;
// connectDB();

const app = express();

// app.listen(port, () => {
//   console.log(`server running on ${port}`);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
