const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {
        let user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
        let member = message.guild.member(message.mentions.users.first())
        if (!member) {
            if (user.marry == 'none') {
                const embed = new MessageEmbed()
                .setTitle(`Игровой профиль`)
                .setColor(49695)
                .addField(`Информация`,`> 📓 • Имя: ${message.author.username}\n> <:dollars:871667265093910548> • Денег: ${user.money}$\n> <:money:871667265089703936> • Банк: ${user.bank}$\n> ⭐ • Уровень: ${user.level}\n> 💍 • Брак: Нету`)
                .setThumbnail(message.author.avatarURL())
                .setTimestamp()
                message.channel.send(embed)
            } else {
                let mery = client.users.cache.find(u => u.id === user.marry);
                const embed = new MessageEmbed()
                .setTitle(`Игровой профиль`)
                .setColor(49695)
                .addField(`Информация`,`> 📓 • Имя: ${message.author.username}\n> <:dollars:871667265093910548> • Денег: ${user.money}$\n> <:money:871667265089703936> • Банк: ${user.bank}$\n> ⭐ • Уровень: ${user.level}\n> 💍 • Брак: ${mery.username}`)
                .setThumbnail(message.author.avatarURL())
                .setTimestamp()
                message.channel.send(embed)
            }
        } else {
            let users = await User.findOne({ guildID: message.guild.id, userID: member.user.id });
            if (users.marry == 'none') {
                const embed = new MessageEmbed()
                .setTitle(`Игровой профиль`)
                .setColor(49695)
                .addField(`Информация`,`> 📓 • Имя: ${member.user.username}\n> <:dollars:871667265093910548> • Денег: ${users.money}$\n> <:money:871667265089703936> • Банк: ${users.bank}$\n> ⭐ • Уровень: ${users.level}\n> 💍 • Брак: Нету`)
                .setThumbnail(member.user.avatarURL())
                .setTimestamp()
                message.channel.send(embed)
            } else {
                let mery = client.users.cache.find(u => u.id === users.marry);
                const embed = new MessageEmbed()
                .setTitle(`Игровой профиль`)
                .setColor(49695)
                .addField(`Информация`,`> 📓 • Имя: ${member.user.username}\n> <:dollars:871667265093910548> • Денег: ${users.money}$\n> <:money:871667265089703936> • Банк: ${users.bank}$\n> ⭐ • Уровень: ${users.level}\n> 💍 • Брак: ${mery.username}`)
                .setThumbnail(member.user.avatarURL())
                .setTimestamp()
                message.channel.send(embed)
            }
      }
}
