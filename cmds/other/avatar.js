const { Client, MessageEmbed, GuildMember } = require('discord.js');
const client = new Client();
const fs = require('fs');

module.exports.run = async (client, message, arg) => {

    const embed = new MessageEmbed()
    .setDescription(`Аватарка Пользователя: <@${message.author.id}>`)
    .setImage(message.author.displayAvatarURL())
    .setColor('')
    
    message.channel.send(embed)
    
}
