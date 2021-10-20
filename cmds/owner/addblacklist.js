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
    let reason = args.slice(1).join(" ");
    if (!reason) reason = 'Не указана';
    if (!member) return message.channel.send(`Укажите пользователя`);
    let data = await Blacklist.findOne({ userID: member.user.id });
    if(!data) { Blacklist.create({ userID: member.user.id }); client.channels.cache.get('877445301357641739').send(`**\`[✅ BlackList]\` \`${member.user.username}\` Добавлен в чёрный список бота**`); }
    let addblacklist = new MessageEmbed()
    .setTitle(`<a:yes:871662816963198976> Успех`)
    .setColor(`#5be55d`)
    .setDescription(`Администратор бота <@${message.author.id}> занёс <@${member.user.id}> в чёрный список бота \n**Причина:** ${reason}`)
    .setTimestamp()
    message.channel.send(addblacklist);
    data.blacklist = 'yes'
    data.reason = reason
    data.save();
}
