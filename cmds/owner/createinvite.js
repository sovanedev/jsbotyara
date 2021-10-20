const { Client, MessageEmbed, GuildMember } = require('discord.js');
const config = require('../../config.json')

module.exports.run = (client, message, args) => {
  if (!config.owners.includes(message.author.id)) return;
  let guild = client.guilds.cache.get(args[0]);
  if (!guild) return message.reply("Укажите ID гильдии");
  let invitechannels = guild.channels.cache.filter(c=> c.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'))

  invitechannels.random().createInvite()
    .then(invite=> message.channel.send('Инвайт:\n' + invite.code))
}
