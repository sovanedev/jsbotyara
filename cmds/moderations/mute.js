const { Client, MessageEmbed, GuildMember } = require('discord.js');
const config = require('../../config.json')
const ms = require('ms');

module.exports.run = async (client, message, args) => {
    const muteRole = message.guild.roles.cache.get('877852969087926294')

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
      return message.channel.send('Укажите пользователя!');
    if (member === message.member)
      return message.channel.send('Вы не можете замутить самого себя!');
    if (member === message.guild.me) return message.channel.send(message, 0, 'Хз');
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send('Я не могу использовать команду mute на него :(');
    if (!args[1])
      return message.channel.send('Укажите время мута, до 14 дней (1s/m/h/d)');
    let time = ms(args[1]);
    if (!time || time > 1209600000) // Cap at 14 days, larger than 24.8 days causes integer overflow
      return message.channel.send('Используйте меньшее количиство времени (1s/m/h/d)');

    let reason = args.slice(2).join(' ');
    if (!reason) reason = '`Не указана`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

    if (member.roles.cache.has(muteRole))
      return message.channel.send('Этот игрок уже замучен');

    // Mute member
    try {
      await member.roles.add(muteRole);
    } catch (err) {
      console.log(err)
      return message.channel.send('Еррорка', err.message);
    }
    const muteEmbed = new MessageEmbed()
      .setTitle('Mute')
      .setDescription(`${member} Был замучен на **${ms(time, { long: true })}**.`)
      .addField('Модератор:', message.member, true)
      .addField('Участник', member, true)
      .addField('Время', `\`${ms(time)}\``, true)
      .addField('Причина', reason)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(muteEmbed);

    // Unmute member
    member.timeout = message.client.setTimeout(async () => {
      try {
        await member.roles.remove(muteRole);
        const unmuteEmbed = new MessageEmbed()
          .setTitle('Mute')
          .setDescription(`${member} был размучен.`)
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(unmuteEmbed);
      } catch (err) {
        console.log(err)
        return message.channel.send('Еррорка', err.message);
      }
    }, time);
}
