import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });
    const projectName = "Tack-Tracker";
    const mongoURL = process.env.DATABASE_URL;

    if (!mongoURL) {
      throw new Error("DATABASE_URL environment variable not set");
    }

    if (mongoURL.endsWith("/")) {
      mongoURL = mongoURL.slice(0, -1);
    }

    await mongoose.connect(`${mongoURL}/${projectName}`);
  } catch (error) {
    console.log("Error connecting MongoDB: ", error);
  }
};

export default connectDB;
