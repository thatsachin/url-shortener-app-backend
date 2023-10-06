import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
    destinationUrl: {
        type: String,
        required: true
    },
      shortUrlId: {
        type: String,
        required: true,
        unique: true
    },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER'
    },
      totalClicks: {
        type: Number,
        default: 0
    },
      creationDate: {
        type: Date,
        default: Date.now,
    },
})

const URL = mongoose.model("URL", urlSchema);

export default URL;