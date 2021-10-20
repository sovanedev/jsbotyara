const { Client, MessageEmbed, GuildMember, Message } = require('discord.js');
const client = new Client();
const fs = require('fs');

module.exports.run = async(client, message, args) => {

    const i = new MessageEmbed()
    .setTitle('**Reports System**')
    .setDescription(`Укажите причину!`)
    .setColor(11608096)

    let reason = args.slice(0).join(" ");
    if(!reason) return message.channel.send(i);

    let reportChannel = client.channels.cache.get('877443981368233984')

    const embed = new MessageEmbed()
    .setTitle('**Reports System**')
    .setDescription('')
    .addField(`Суть Репорта`, `${reason}`)
    .addField(`Игрок`, `<@${message.author.id}>`)
    .addField(`Ответить на репорт`, `Используйте команду .ticket Игрок Ответ`)
    .setColor(49695)

    const report = new MessageEmbed()
    .setTitle('**Reports System**')
    .setDescription(`**Уважаемый <@${message.author.id}>\nСпасибо за вашу жалобу! В скором времени мы ее рассмотрим!\nЕсли мы обнаружим спам командой report мы будем вынуждены заблокировать вас**`)
    .setColor(49695)

    message.channel.send(report);
    reportChannel.send(embed);
}
