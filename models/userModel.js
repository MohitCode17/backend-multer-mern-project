import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    imgpath: {
        type: String,
        required: true
    },
    date: {
        type: Date
    }
});

const userModel = new mongoose.model("user", userSchema);
export default userModel;