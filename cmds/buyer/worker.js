const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, message, args) => {
  // Бд
  let data = await Guild.findOne({ guildID: message.guild.id });
  let user = await User.findOne({ guildID: message.guild.id });
  
  // Проверка на премиум статус сервера
  
  let no = new MessageEmbed()
  .setTitle('<a:no:871662817240039435> Ошибка')
  .setDescription('Извините! Данная команда будет доступна только после покупки Premium Status!')
  .setColor(11608096)
  .setFooter('Купить Premium Status можно тут https://discord.gg/XyDrz3t32k', 'https://media.discordapp.net/attachments/869631629956624424/874192823270916096/yupi.png')
  .setTimestamp();
  
  if(data.buy == 'no') return message.channel.send(no)
  
  message.channel.send('Команда В Разработке')
}
