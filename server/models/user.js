const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = mongoose.Schema({
    name: {
        type:String,
        unique: [true, "Change your name"],
        required: [true, "name cannot be empty"]
    },
    _created_polls:[{type: Schema.Types.ObjectId, ref: 'Poll'}],

}, { timestamps: true})

mongoose.model("User", UserSchema)