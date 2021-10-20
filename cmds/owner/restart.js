const { Client, MessageEmbed, GuildMember } = require('discord.js');
const config = require('../../config.json')

module.exports.run = async (client, message, args) => {
    if (!config.owners.includes(message.author.id)) return;
    await message.channel.send(`Перезапуск...`)
    process.exit();
}
