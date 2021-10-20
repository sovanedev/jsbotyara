const { Client, MessageEmbed, GuildMember } = require('discord.js');
const client = new Client();
const fs = require('fs');

module.exports.run = async(client, message, args) => {
  const embed = new MessageEmbed()
  .setTitle('Информация о боте')
  .setAuthor(message.author.username, message.author.avatarURL())
  .setDescription(`> <:profile:871665900024102912> •** Участников**: ${client.users.cache.size}\n> <:programmer:871665899873140757> •** Серверов**: ${client.guilds.cache.size}\n> <:codes:871665899906662400> •** Комманд**: 42\n\n**Ссылки**\n:book: • Пригласить бота: [Пригласить](https://discord.com/api/oauth2/authorize?client_id=871668247055982602&permissions=8&scope=bot)\n🔖 • Discord Group: [Дискорд](https://discord.gg/XyDrz3t32k)\n🔖 • Top.GG: [Голосовать](https://top.gg/bot/871668247055982602)`)
  .setFooter('Yupi', 'https://cdn.discordapp.com/avatars/871668247055982602/0a69ce8b042acb6511ec1df12d12a4a1.webp?size=4096');
  message.channel.send(embed)
}
