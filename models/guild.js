const config = require('../config.json')
const schema = mongoose.Schema({
    guildID: String,
    prefix: { type: String, default: config.prefix },
    warn: { type: Number, default: 3 },
    warns: {type: String, default: "none"},
    autorole: {type: String, default: "none"},
    _autorole: {type: String, default: "off"},
    modlogs: {type: String, default: "none"},
    buy: {type: String, default: "no"}
});
module.exports = mongoose.model("Guild", schema)
