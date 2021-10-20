const { Client, MessageEmbed, GuildMember } = require('discord.js');
const client = new Client();
const fs = require('fs');
const config = require('../../config.json')

module.exports.run = async(client, message, args) => {
    const not = new MessageEmbed()
    .setTitle('ticket')
    .setDescription(`**Пользователь не найден!**`)
    .setColor(11608096)
    
    const moder = new MessageEmbed()
    .setTitle('Ошибка')
    .setDescription(`**Эта команда доступна только модераторам бота!**`)
    .setColor(11608096)

    //if(!message.member.hasPermission("MANAGE_MESSAGES")) return
    if (!config.ticket.includes(message.author.id)) return message.channel.send(moder);
    let member = message.guild.member(message.mentions.users.first())
    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
    if (!dUser) return message.channel.send(not)
    let dMessage = args.join(" ").slice(22);
    if(dMessage.length < 1) return message.reply('Вы должны отправить ответ!')

    const embed = new MessageEmbed()
    .setTitle('Report System')
    .setDescription(`**Ответ: ${dMessage}**\nЕсли мы обнаружим спам командой report мы будем вынуждены заблокировать вас!`)
    .setFooter(`Модератор: ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
    .setColor(49695)

    const channel = new MessageEmbed()
    .setTitle('Ответ Пользователю')
    .setDescription(``)
    .addField(`Ответ Игроку:`, `${dUser}`)
    .addField(`Сообщение:`, `${dMessage}`)
    .setFooter(`Модератор: ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
    .setColor(49695)
    


    dUser.send(embed)


    message.channel.send(channel)
}
