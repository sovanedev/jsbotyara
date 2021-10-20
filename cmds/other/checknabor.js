const { Client, MessageEmbed, GuildMember } = require('discord.js');
const client = new Client();
const fs = require('fs');

module.exports.run = async(client, message, args) => {
    message.channel.bulkDelete(1)
    
    const not = new MessageEmbed()
    .setTitle('Набор')
    .setDescription(`**Пользователь не найден!**`)
    .setColor(11608096)
    
    const moder = new MessageEmbed()
    .setTitle('Нет Прав')
    .setDescription(`**Эта команда доступно только куратору бота!**`)
    .setColor(14517267)

    //if(!message.member.hasPermission("MANAGE_MESSAGES")) return
    if(!message.member.roles.cache.has('879602505959489537')) return message.channel.send(moder)
    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
    if (!dUser) return message.channel.send(not)
    if (!args[1]) return message.channel.send('Укажите Одобрено | Отказано')

    const channel = new MessageEmbed()
    .setTitle('Результаты Набора')
    .setDescription(``)
    .addField(`Ответ Игроку:`, `${dUser}`, true)
    .addField(`Ответ:`, `${args[1]}`, true)
    .setFooter(`Куратор Бота: ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
    .setColor(49695)
    
    if (args[1] == 'Одобрено'){
        const yes = new MessageEmbed()
        .setTitle('Результат')
        .addField(`Результат Набора: `, `Ваша Заявка Была Одобрена!`, true)
        .setDescription(`**Если мы обнаружим спам командой nabor мы будем вынуждены заблокировать вас!**`)
        .setFooter(`Куратор Бота: ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        .setColor(49695)
        dUser.send(yes)
    }
    
    if (args[1] == 'Отказано'){
        const no = new MessageEmbed()
        .setTitle('Результат')
        .addField(`Результат Набора: `, `Ваша Заявка Была Отказана!`, true)
        .setDescription(`**Если мы обнаружим спам командой nabor мы будем вынуждены заблокировать вас!**`)
        .setFooter(`Куратор Бота: ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        .setColor(11608096)
        dUser.send(no)
    }

    message.channel.send(channel)
}
