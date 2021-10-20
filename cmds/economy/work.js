const { Client, MessageEmbed, GuildMember } = require('discord.js');
const client = new Client();
const fs = require('fs');
const ms = require('ms');

module.exports.run = async(client, message, args) => {
  
        let zp = Math.floor(Math.random() * 2000 + 1)
        let user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
        let guild = await Guild.findOne({ guildID: message.guild.id });

        let no = new MessageEmbed()
        .setColor(11608096)
        .setDescription(`<@${message.author.id}>, вы сможете пойти на работу через **${ms('21600000' - (Date.now() - user.time))}**`)

        let works = [
          `<@${message.author.id}>, тебя приняли на стажировку в бар но ты облажался! Получи свои ${zp} <:dollars:871667265093910548> за день работы...`,
          `<@${message.author.id}>, ты нарисовал портрет человека и продал его на Авито, получив ${zp} <:dollars:871667265093910548>!`,
          `<@${message.author.id}>, придя на работу тебя заставили мыть пол! Это были самые тяжелые ${zp} <:dollars:871667265093910548> в твоей жизни...`,
          `<@${message.author.id}>, весь день ты позировал для первокурсников Художественного Университета и получил за это ${zp} <:dollars:871667265093910548>!`,
          `<@${message.author.id}>, ты развесил свою анкету "Хожу за вас на стрелки" на местный сайт разовых работ. Тебя позвали на стрелку. Ты отвесил люлей 5-классникам и получил ${zp} <:dollars:871667265093910548>!`,
          `<@${message.author.id}>, ты снялся в порнографии и получил ${zp} <:dollars:871667265093910548>!`
        ]
        let work = works[Math.floor(Math.random() * works.length)];

        if(user.time !== null && '21600000' - (Date.now() - user.time) > 0) return message.channel.send(no)

        let r = new MessageEmbed()
        .setColor(49695)
        .setDescription(work)
        message.channel.send(r);

        user.time = Date.now();
        user.money += zp;
        user.save()
}
