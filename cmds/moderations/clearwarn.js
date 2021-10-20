const { Client, MessageEmbed, GuildMember } = require('discord.js');

module.exports.run = async (client, message, args) =>{
    let noargs = new MessageEmbed()
    .setTitle(`<a:no:871662817240039435> Ошибка`)
    .setColor(`#e74444`)
    .setDescription('Укажите существующего пользователя')
    .setTimestamp()
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('Недостаточно прав на использование команды!')
    let member = message.guild.member(message.mentions.users.first())
    if(!member) return message.channel.send(noargs)

    let data = await User.findOne({ guildID: message.guild.id, userID: member.id });
    if(!data) return client.nodb(member.user);

    let clear = new MessageEmbed()
    .setTitle(`<a:yes:871662816963198976> Успех`)
    .setColor(`#5be55d`)
    .setDescription(`<@${message.author.id}> очистил предупреждения <@${member.user.id}>`)
    .setTimestamp()
    message.channel.send(clear)
    data.warn = 0
    data.save()
};
