const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {
        let noargs = new MessageEmbed()
        .setTitle(`<a:no:871662817240039435> Ошибка`)
        .setColor(11608096)
        .setDescription('Укажите пользователя')
        .setTimestamp()
        let nobot = new MessageEmbed()
        .setTitle(`<a:no:871662817240039435> Ошибка`)
        .setColor(11608096)
        .setDescription('Нельзя играть с ботом')
        .setTimestamp()
        let nosum = new MessageEmbed()
        .setTitle(`<a:no:871662817240039435> Ошибка`)
        .setColor(11608096)
        .setDescription('Укажите сумму ставки')
        .setTimestamp()
        let nosumy = new MessageEmbed()
        .setTitle(`<a:no:871662817240039435> Ошибка`)
        .setColor(11608096)
        .setDescription('У пользователя нету столько денег')
        .setTimestamp()
        let nosummy = new MessageEmbed()
        .setTitle(`<a:no:871662817240039435> Ошибка`)
        .setColor(11608096)
        .setDescription('У вас нету столько денег')
        .setTimestamp()
        let nomy = new MessageEmbed()
        .setTitle(`<a:no:871662817240039435> Ошибка`)
        .setColor(11608096)
        .setDescription('Так нельзя')
        .setTimestamp()
        let member = message.guild.member(message.mentions.users.first())
        if (!member) return message.channel.send(noargs)
        if (member.user.bot) return message.channel.send(nobot)
        if (!args[1]) return message.channel.send(nosum)
        if (isNaN(args[1])) return message.channel.send(nosum)
        if (args[1] < 1) return message.channel.send(nosum)
        let use = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
        let users = await User.findOne({ guildID: message.guild.id, userID: member.user.id });
        let data = await Guild.findOne({ guildID: message.guild.id });
        if (use.money < args[1]) return message.channel.send(nosummy)
        if (users.money < args[1]) return message.channel.send(nosumy)
        if (message.author.id == member.user.id) return message.channel.send(nomy)

        let marry = new MessageEmbed()
        .setColor(49695)
        .setDescription(`**<@${message.author.id}>** бросает вам вызов в ролле!\n**Ставка: ${args[1]}** <:dollars:871667265093910548>\n✅ - принять\n❌ - отказать`)

        var RollMessage = await message.channel.send(marry);
        RollMessage.react("✅");
        RollMessage.react("❌");

        const filter = (reaction, user) => user.id == member.user.id;
        var collector = RollMessage.createReactionCollector(filter, {
          time: 60000 // 1 минута
        });

        collector.on("collect", (reaction, user) => {
          switch (reaction.emoji.name) {
            case "✅":
                let one = Math.floor(Math.random() * 100 + 1)
                let tho = Math.floor(Math.random() * 100 + 1)
                if (one > tho) {
                    let roll = new MessageEmbed()
                    .setColor(49695)
                    .setDescription(`**Победа <@${message.author.id}>**\n\nу <@${message.author.id}> выпало **${one}**\nу <@${member.user.id}> выпало **${tho}**`)
                    message.channel.send(roll)
                    use.money += Math.floor(parseInt(args[1]));
                    users.money -= Math.floor(parseInt(args[1]));
                    use.save()
                    users.save()
                } else {
                    let roll = new MessageEmbed()
                    .setColor(49695)
                    .setDescription(`**Победа <@${member.user.id}>**\n\nу <@${message.author.id}> выпало **${one}**\nу <@${member.user.id}> выпало **${tho}**`)
                    message.channel.send(roll)
                    use.money -= Math.floor(parseInt(args[1]));
                    users.money += Math.floor(parseInt(args[1]));
                    use.save()
                    users.save()
                }
                collector.stop();
            break;
            case "❌":
                message.channel.send(`<@${member.user.id}> отклонил ваше предложение.`)
                collector.stop();
            break;
          }
        });

        collector.on("end", (_, reason) => {
            if (reason === "time") {
                return message.reply(`**время ожидания истекло.**`)
            }
        });
}
