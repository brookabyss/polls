const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PollSchema = mongoose.Schema({
    question: {
        type:String,
        required: [true, "question cannot be empty"],
        minlength:[5,"Question needs to be at least 8 characters in length"]
    },
    options:{
        1: {
            content: {type: String,required:[true,"Options are required"],minlength:[3,"Option needs to be at least 3 characters"]},
             votes: {type: Number, default: 0},},
        2: {
            content: {type: String,required:[true,"Options are required"],minlength:[3,"Option needs to be at least 3 characters"]},
             votes: {type: Number, default: 0},
        },
        3: {
            content: {type: String,required:[true,"Options are required"],minlength:[3,"Option needs to be at least 3 characters"]},
             votes: {type: Number, default: 0},
        },
        4:  {
            content: {type: String,required:[true,"Options are required"],minlength:[3,"Option needs to be at least 3 characters"]},
             votes: {type: Number, default: 0},
        },
    },
   
    
    _creator:{type: Schema.Types.ObjectId, ref: 'User'},
   
}, { timestamps: true})

mongoose.model("Poll", PollSchema)