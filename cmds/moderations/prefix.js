const { Client, MessageEmbed, GuildMember } = require('discord.js');

module.exports.run = async (client, message, args) =>{
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('У вас нету прав на изменение prefix.')
    let data = await Guild.findOne({ guildID: message.guild.id });
    let arg = args.slice(1).join(` `);

    if (!arg) return message.reply('Не указан префикс');
    message.reply(`Новый префикс: ${arg}`);
    data.prefix = arg;
    data.save();

};
