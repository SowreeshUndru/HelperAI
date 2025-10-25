import mongoose from "mongoose";
export async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("✅ MongoDB Connected");
    }
    catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
}
;
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    token: { type: String, required: true },
    age: Number,
});
export const User = mongoose.model("User", userSchema);
// Example
//# sourceMappingURL=db.js.map