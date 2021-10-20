const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {
         let noargs = new MessageEmbed()
        .setTitle(`<a:no:871662817240039435> Ошибка`)
        .setColor(11608096)
        .setDescription('Вы должны упомянуть кого-то')
        .setTimestamp()
        let non = new MessageEmbed()
        .setTitle(`<a:no:871662817240039435> Ошибка`)
        .setColor(11608096)
        .setDescription('Вы уже в барке')
        .setTimestamp()
        let member = message.guild.member(message.mentions.users.first())
        if (!member) return message.channel.send(noargs)
        if (member.user.bot) return message.reply(`Не женитесь на ботах. У них нет чувств... поверьте мне...`)
        let use = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
        let users = await User.findOne({ guildID: message.guild.id, userID: member.user.id });
        if (use.marry != 'none') return message.channel.send(non)
        if (message.author.id == member.user.id) return message.reply(`Иногда действительно так бывает...`)

        let marry = new MessageEmbed()
        .setColor(49695)
        .setDescription(`<@${member.user.id}>, <@${message.author.id}> просит вашей руки и сердца, вы согласны?`)

        var MarryMessage = await message.channel.send(marry);
        MarryMessage.react("✅");
        MarryMessage.react("❌");

        const filter = (reaction, user) => user.id == member.user.id;
        var collector = MarryMessage.createReactionCollector(filter, {
          time: 60000 // 1 минута
        });

        collector.on("collect", (reaction, user) => {
          switch (reaction.emoji.name) {
            case "✅":
                let marr = new MessageEmbed()
                .setColor(49695)
                .setDescription(`<@${member.user.id}> и <@${message.author.id}> заключили брак`)
                .setImage(`https://images-ext-1.discordapp.net/external/nJ3_i2SEoWBnOWoix3DmiSKQgvlQAq-bq6bHS7Lg3Pc/https/media.giphy.com/media/vTfFCC3rSfKco/giphy.gif`)
                message.channel.send(marr)
                use.marry = member.user.id
                users.marry = message.author.id
                use.save()
                users.save()
                collector.stop();
            break;
            case "❌":
                message.channel.send(`Сожалею <@${message.author.id}>, <@${member.user.id}> отклонил ваше предложение.`)
                collector.stop();
            break;
          }
        });

        collector.on("end", (_, reason) => {
            if (reason === "time") {
                return message.channel.send(`Сожалею <@${message.author.id}>, человек, которому вы предложили, не ответил, попробуйте позже.`)
            }
        });
}
