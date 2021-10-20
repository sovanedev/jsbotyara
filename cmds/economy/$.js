  
const { Client, MessageEmbed, GuildMember } = require('discord.js');
const client = new Client();
const fs = require('fs');

module.exports.run = async (client, message, arg) => {
    let member = message.guild.member(message.mentions.users.first() || message.author)
    let data = await User.findOne({ guildID: message.guild.id, userID: member.user.id });
    const embed = new MessageEmbed()
    .setDescription(`Баланс пользователя <@${member.id}> - ${data.money} <:dollars:871667265093910548> в банке ${data.bank} <:money:871667265089703936>`)
    .setColor()
    
    message.channel.send(embed)
}
