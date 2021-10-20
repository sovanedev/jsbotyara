const { Client, MessageEmbed, GuildMember } = require('discord.js');

module.exports.run = async (client, message, args) =>{
    let noargs = new MessageEmbed()
    .setTitle(`<a:no:871662817240039435> Ошибка`)
    .setColor(`#e74444`)
    .setDescription('Не указан пользователь')
    .setTimestamp()
    let nome = new MessageEmbed()
    .setTitle(`<a:no:871662817240039435> Ошибка`)
    .setColor(`#e74444`)
    .setDescription('Нельзя самого себя')
    .setTimestamp()
    let nobot = new MessageEmbed()
    .setTitle(`<a:no:871662817240039435> Ошибка`)
    .setColor(`#e74444`)
    .setDescription('Это бот')
    .setTimestamp()
    let nores = new MessageEmbed()
    .setTitle(`<a:no:871662817240039435> Ошибка`)
    .setColor(`#e74444`)
    .setDescription('Не указана причина')
    .setTimestamp()
    let reason = args.slice(1).join(` `);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('Недостаточно прав на использование команды!')
    if(!reason) return message.channel.send(nores)
    let member = message.guild.member(message.mentions.users.first())
    if(!member) return message.channel.send(noargs)
    if(member.user.id == message.author.id) return message.channel.send(nome)
    if(member.user.bot) return message.channel.send(nobot)

    let datas = await Guild.findOne({ guildID: message.guild.id });
    let data = await User.findOne({ guildID: message.guild.id, userID: member.id });
    if(!data) return client.nodb(member.user);

    let warn = new MessageEmbed()
    .setColor(`#5be55d`)
    .setDescription(`<@${message.author.id}> выдал варн <@${member.user.id}> по причине **${reason}**`)
    message.channel.send(warn); data.warn += 1;
    if (data.warn >= datas.warn) {
        if (datas.warns == 'kick') {
            data.warn = 0;
            message.guild.member(member).kick(reason)
            message.channel.send(`<a:yes:871662816963198976> | был автоматически исключен, потому что он достигли более чем ${datas.warn} предупреждений!`)
            //console.log('kick')

        }
        if (datas.warns == 'ban'){
            data.warn = 0;
            message.guild.member(member).ban({
              reason: (reason),
            })
            message.channel.send(`<a:yes:871662816963198976> | был автоматически исключен, потому что он достигли более чем ${datas.warn} предупреждений!`)
            //console.log('ban')
        }
    } data.save()
};
