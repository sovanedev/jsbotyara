const { Client, MessageEmbed, GuildMember } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Недостаточно прав на использование команды!');
    if (!args[0]) return message.channel.send(`<a:no:871662817240039435> | Вы должны указать количество сообщений для удаления!`)
    if (args[0] < 1) return message.channel.send(`<a:no:871662817240039435> | Вы должны указать количество сообщений для удаления!`)
    message.channel.bulkDelete(args[0], true).then((_message) => {
        message.channel.send(`<a:yes:871662816963198976> | ${_message.size} сообщий очищены!`).then((sent) => {
            setTimeout(function () {
                sent.delete();
            }, 2500);
        });
    });
}
