const { Client, MessageEmbed, GuildMember } = require('discord.js');
const config = require('../../config.json')

module.exports.run = (client, message, args) => {
    if (!config.owners.includes(message.author.id)) return;
    const servers = message.client.guilds.cache.array().map(guild => {
      return `\`${guild.id}\` - **${guild.name}** - \`${guild.members.cache.size}\` участника(ов)`;
    });

    const embed = new MessageEmbed()
      .setTitle('Лист Серверов')
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor('#ffa500');

    if (servers.length <= 10) {
      const range = (servers.length == 1) ? '[1]' : `[1 - ${servers.length}]`;
      message.channel.send(embed.setTitle(`Лист Серверов ${range}`).setDescription(servers.join('\n')));
    } else {
      //new ReactionMenu(message.client, message.channel, message.member, embed, servers);
    }
}
