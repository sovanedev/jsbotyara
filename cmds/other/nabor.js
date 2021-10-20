const { Client, MessageEmbed, GuildMember, Message } = require('discord.js');
const client = new Client();
const fs = require('fs');

module.exports.run = async (client, message, args) => {
  
  let not = new MessageEmbed()
  .setTitle('Набор В Модераторов')
  .setDescription('Успользуйте следуйщие указание:\nВаше Имя:\nВаш Возраст:\nОпишите себя:\nПочему вы хотите стать модератором:')
  .setColor(11608096)
  
  let naborChannel = client.channels.cache.get('879691713814351872')
  
  let zaivka = args.slice(0).join(" ");
  if(!zaivka) return message.channel.send(not);
  
  let textx = new MessageEmbed()
  .setTitle('Заявка')
  .addField('Игрок:', `${message.author}`, true)
  .addField('Остальное:', `${zaivka}`, true)
  .addField('Ответить На Заявку:', '.checknabor @UserID Одобрено | Отказано', true)
  .setColor(49695)
  
  let kaknado = new MessageEmbed()
  .setTitle('Как Должна Выглядить Заявка')
  .addField('Ваше Имя: ', 'Имя Игрока', true)
  .addField('Ваш Возраст: ', 'Возраст', true)
  .addField('Опишите Себя: ', 'Описание Игрока', true)
  .addField('Почему Вы Хотите Стать Модератором: ', 'Пояснение', true)
  .addField('Если Заявка Не По Форме: ', 'Отказ', true)
  .addField('На заявки может отвечать только: ', 'BOT CURATOR', true)
  .setColor(11608096)
  
  naborChannel.send(`<@&879602505959489537>`)
  
  naborChannel.send(textx)
  
  naborChannel.send(kaknado)
  
}
