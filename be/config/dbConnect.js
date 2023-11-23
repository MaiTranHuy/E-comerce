import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const dbConnect = async () => {
  try {
    let cnt = await mongoose.connect(process.env.MONGO_URI);
    if (cnt.connection.readyState === 1)
      console.log("DB connection successfully!");
    else console.log("DB connecting!");
  } catch (error) {
    console.log("DB connection error!");
    throw new Error(error);
  }
};

export default dbConnect;
