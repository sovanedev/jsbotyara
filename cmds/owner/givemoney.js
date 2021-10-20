const { Client, MessageEmbed, GuildMember } = require('discord.js');
const config = require('../../config.json')

module.exports.run = async (client, message, args) => {
    
    let moder = new MessageEmbed()
    .setTitle('Ошибка')
    .setDescription(`**Вы не относетесь к Модераторам Экономики!**`)
    .setColor(233425)
    
    // Настройка доступа - сколько выдать, какому пользователю.
    if (!config.moderations.includes(message.author.id)) return message.channel.send(moder);
    if(!args[1]) return message.reply(`Укажите сколько нужно выдать человеку.`)
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
    .setColor(`#5be55d`)
    .setDescription(`Модератор бота <@${message.author.id}> Выдал Денег Игроку: <@${member.id}> \n**Количество:** ${args[1]} \n**По Причине:** ${reason}`)
    .setTimestamp(49695)
    message.channel.send(givem);
    
    // Выдача денег
    data.money += Math.floor(parseInt(args[1]));
    data.save();
    
    // Сообщение Пользователя
    
    let memchan = new MessageEmbed()
    .setTitle(`Уважаемый игрок`)
    .setColor(`#5be55d`)
    .addField(`Модератор: `, `${message.author}`, true)
    .addField(`Выдал вам денег в количестве: `, `${args[1]}`, true)
    .addField(`По Причине: `, `${reason}`, true)
    .setTimestamp(49695)
    
    member.send(memchan)
}
