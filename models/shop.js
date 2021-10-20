const schema = mongoose.Schema({
    guildID: String,
    id: { type: Number},
    role: { type: String},
    price: { type: String},
});

module.exports = mongoose.model("Shop", schema)
