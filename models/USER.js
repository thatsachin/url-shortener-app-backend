import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountCreationDate: {
        type: Date,
        default: Date.now
    }
})

const USER = mongoose.model("USER", userSchema);

export default USER;