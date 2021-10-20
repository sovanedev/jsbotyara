const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {
        let noargs = new MessageEmbed()
        .setTitle(`<a:no:871662817240039435> Ошибка`)
        .setColor(11608096)
        .setDescription('Вы не в браке')
        .setTimestamp()
        let user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
        let users = await User.findOne({ guildID: message.guild.id, userID: user.marry });
        if (user.marry == 'none') return message.channel.send(noargs)
        let depos = client.users.cache.find(u => u.id === users.userID);

        let deposit = new MessageEmbed()
        .setColor(49695)
        .setDescription(`<@${message.author.id}> и <@${depos.id}> больше не в браке!`)
        message.channel.send(deposit)
        user.marry = 'none'
        users.marry = 'none'
        user.save()
        users.save()
}
