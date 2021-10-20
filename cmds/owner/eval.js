const { Client, MessageEmbed, GuildMember } = require('discord.js');
const config = require('../../config.json')

module.exports.run = async (client, message, args) => {
    if (!config.owners.includes(message.author.id)) return;
    const embed = new MessageEmbed()
        .setTitle('Оценивание...')
    const msg = await message.channel.send(embed);
    try {
        const data = eval(args.join(' ').replace(/```/g, ''));
        const embed = new MessageEmbed()
            .setTitle('Выход: ')
            .setDescription(await data)
        await msg.edit(embed)
        await msg.react('✅')
        await msg.react('❌')
        const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
        msg.awaitReactions(filter, { max: 1 })
            .then((collected) => {
                collected.map((emoji) => {
                    switch (emoji._emoji.name) {
                        case '✅':
                            msg.reactions.removeAll();
                            break;
                        case '❌':
                            msg.delete()
                            break;
                    }
                })
            })
    } catch (e) {
        const embed = new MessageEmbed()
            .setTitle('Произошла ошибка')
        return await msg.edit(embed);
    }
}
