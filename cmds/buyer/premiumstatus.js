const { Client, MessageEmbed, GuildMember } = require('discord.js');
const config = require('../../config.json')

module.exports.run = async (client, message, args) => {
  
  // Проверка
    let no = new MessageEmbed()
    .setTitle(`<a:no:871662817240039435> Ошибка`)
    .setColor(`#e74444`)
    .setDescription(`Извиняюсь, вы не преобрели ключ пакета!`)
    .setTimestamp()
    if (!config.buyer.includes(message.author.id)) return message.channel.send(no);
  
  // Команда
  
  let data = await Guild.findOne({ guildID: message.guild.id });
  
  let yes = new MessageEmbed()
  .setTitle(`<a:yes:871662816963198976> Успешно`)
  .setColor(49695)
  .setDescription(`Урааа, вы активировали ключ пакета! Приятного Пользование!`)
  .setTimestamp()
  
  message.channel.send(yes)
  
  data.buy = 'yes'
  data.save()
}
