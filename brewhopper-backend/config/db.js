import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const string =
      "mongodb+srv://balthazarelyj:GCTf6D8O77qb4ijA@cluster0.4qkrhad.mongodb.net/test";
    // const conn = await mongoose.connect(process.env.MONGO_URI);
    const conn = await mongoose.connect(string);

    console.log(`Monogodb connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
