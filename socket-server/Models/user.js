const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require: [true, "User must type name"],
        unique: true,
    },
    token:{
        type: String,
    },
    online:{
        type:Boolean,
        default:false,
    },
});
module.exports = mongoose.model("User", userSchema);