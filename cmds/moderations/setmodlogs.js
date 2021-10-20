const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('Недостаточно прав на использование команды!')
        let data = await Guild.findOne({ guildID: message.guild.id });
        if (data.modlogs == 'none'){
            let chanels = message.guild.channels.cache.get(message.channel.id).id
            message.reply(`Новый канал <#${message.channel.id}>`);
            data.modlogs = chanels;
            data.save();
        } else {
            message.reply(`Канал для логов удален`);
            data.modlogs = 'none';
            data.save();;
        }
}
