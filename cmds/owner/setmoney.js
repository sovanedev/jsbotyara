const { Client, MessageEmbed, GuildMember } = require('discord.js');
const config = require('../../config.json')

module.exports.run = async (client, message, args) => {
    
    let moder = new MessageEmbed()
    .setTitle('Ошибка')
    .setDescription(`**Вы не относитесь к Модераторам Экономики!**`)
    .setColor(233425)
    
    // Настройка доступа - сколько выдать, какому пользователю.
    if (!config.moderations.includes(message.author.id)) return message.channel.send(moder);
    if(!args[1]) return message.reply(`Укажите сколько нужно установить человеку.`)
    if(isNaN(args[1])) return message.reply(`Укажите корректное значение.`)
    let reason = args.slice(2).join(" ");
    if(!reason) return message.channel.send('Укажите причину выдачи!')
    let member = message.guild.member(message.mentions.users.first());
    if (!member) return message.channel.send(`Укажите пользователя`);
    
    // Дата
    let data = await User.findOne({ guildID: message.guild.id, userID: member.user.id });
    
    // Embed
    let givem = new MessageEmbed()
    .setTitle(`<a:yes:871662816963198976> Успех`)
    .setColor(11608096)
    .setDescription(`Модератор бота <@${message.author.id}> Установил Денег Игроку: <@${member.id}> \n**Количество:** ${args[1]} \n**По Причине:** ${reason}`)
    .setTimestamp()
    message.channel.send(givem);
    
    // Выдача денег
    data.money = Math.floor(parseInt(args[1]));
    data.save();
    
    // Сообщение Пользователя
    
    let memchan = new MessageEmbed()
    .setTitle(`Уважаемый игрок`)
    .addField(`Модератор: `, `${message.author}`, true)
    .addField(`Установил Вам Денег: `, `${args[1]}`, true)
    .addField(`По Причине: `, `${reason}`, true)
    .setColor(11608096)
    .setTimestamp()
    
    member.send(memchan)
}
