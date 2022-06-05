import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: false },
    avatar: { type: String, required: false },
    activated: { type: Boolean, default: false },
    password: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model("User", UserSchema, "users")