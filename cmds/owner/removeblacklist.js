const { Client, MessageEmbed, GuildMember } = require('discord.js');
const config = require('../../config.json')

module.exports.run = async (client, message, args) => {
    let no = new MessageEmbed()
    .setTitle(`<a:no:871662817240039435> Ошибка`)
    .setColor(`#e74444`)
    .setDescription(`Доступно только администрации бота: ItzShengou: <@402358666759766017> MurKote: <@582580063963316244> Zombiz: <@828007305306963999>`)
    .setTimestamp()
    if (!config.owners.includes(message.author.id)) return message.channel.send(no);
    let member = message.guild.member(message.mentions.users.first());
    let data = await Blacklist.findOne({ userID: member.user.id });
    if (!member) return message.channel.send(`Укажите пользователя`);
    let addblacklist = new MessageEmbed()
    .setTitle(`<a:yes:871662816963198976> Успех`)
    .setColor(`#5be55d`)
    .setDescription(`Администратор бота <@${message.author.id}> вынес <@${member.user.id}> из чёрного списка бота`)
    .setTimestamp()
    message.channel.send(addblacklist);
    data.blacklist = 'no'
    data.save();
}
