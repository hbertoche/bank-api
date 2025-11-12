import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL || "mongodb://localhost:27017/bank-api");
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}