const mongoose = require('mongoose');   

const MemberSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
})

const Member = mongoose.model("Member",MemberSchema)

module.exports = {Member}