const { Client, MessageEmbed, GuildMember } = require('discord.js');

module.exports.run = async (client, message, args) =>{
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('Недостаточно прав на использование команды!')
    if(!args[0]) return message.channel.send('<a:no:871662817240039435> | Укажите санкцию между `kick` и `ban`')
    let count = args.slice(1).join(` `);
    if(!count) return message.channel.send('<a:no:871662817240039435> | Укажите число!')

    let data = await Guild.findOne({ guildID: message.guild.id });
    if (args[0] == 'kick') {
        message.channel.send(`<a:yes:871662816963198976> |  \`${count}\` предупреждений приведут к исключению! \n\n:arrow_right_hook: Send \`+config info\` чтобы увидеть обновленную конфигурацию!`)
        data.warn = count
        data.warns = args[0]
    }
    if (args[0] == 'ban') {
        message.channel.send(`<a:yes:871662816963198976> |  \`${count}\` предупреждений приведут к бану! \n\n:arrow_right_hook: Send \`+config info\` чтобы увидеть обновленную конфигурацию!`)
        data.warn = count
        data.warns = args[0]
    }
    data.save()
};
