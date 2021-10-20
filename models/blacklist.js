  
const schema = mongoose.Schema({
    userID: String,
    blacklist: {type: String, default: "no"},
    reason: {type: String, default: "no"},
});
module.exports = mongoose.model("Blacklist", schema)
