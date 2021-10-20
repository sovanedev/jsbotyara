  
const { Client, MessageEmbed, GuildMember } = require('discord.js');
const client = new Client();
const fs = require('fs');
const rando_flip = [
    'Орёл',
    'Решка',
    ]

module.exports.run = async(client, message, args) => {
    let embed = new MessageEmbed()
    .setColor()
    .setTitle('Игра')
    .setDescription(`<a:yes:871662816963198976> Вы выиграли ${args[0]*2} <:dollars:871667265093910548>`)
    let embed2 = new MessageEmbed()
    .setColor()
    .setDescription(`<a:no:871662817240039435> Укажите сумму ставки.`)
    let embed5 = new MessageEmbed()
    .setColor()
    .setTitle('Игра')
    .setDescription(`<a:no:871662817240039435> Упс. Вы проиграли ${args[0]} <:dollars:871667265093910548>`)
    let embed6 = new MessageEmbed()
    .setColor()
    .setTitle('Ошибка')
    .setDescription('**Недостаточно монет для ставки.**')
    let result = rando_flip[Math.floor(Math.random() * rando_flip.length)]
    let member = message.guild.member(message.mentions.users.first() || message.author)
    let data = await User.findOne({ guildID: message.guild.id, userID: member.user.id });

    if(!data) return client.nodb(member.user);
    if(isNaN(args[0])) return message.channel.send(embed2);
    if(args[0] < 0) return;
    if (data.money >= args[0]) {
      if (result == 'Орёл') {
         message.channel.send(embed);
         data.money -= Math.floor(parseInt(args[0]));
         data.money += Math.floor(parseInt(args[0]*2));
         data.save()
      } else {
         message.channel.send(embed5);
         data.money -= Math.floor(parseInt(args[0]));
         data.save()
      }
    } else {
         message.channel.send(embed6);
    }
}
