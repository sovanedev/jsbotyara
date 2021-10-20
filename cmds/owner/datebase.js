const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {
    	if (!args[0]) return message.reply('Укажите ID гильди')
        let guild = client.guilds.cache.get(args[0]);
    	let guilde = await Guild.findOne({ guildID: guild.id });
    	if(!guilde) { Guild.create({ guildID: guild.id }); client.channels.cache.get('877445301357641739').send(`**\`[✅ Guild]\` \`${guild}\` Успешно была добавлена в базу-данных**`); }
    	guild.members.cache.array().forEach(async member => {
    		if (member.user.bot) return;
        	let user = await User.findOne({ guildID: guild.id, userID: member.user.id });
        	//let black = await Blacklist.findOne({ userID: member.user.id });
        	if(!user) { User.create({ guildID: guild.id, userID: member.user.id }); client.channels.cache.get('877445301357641739').send(`**\`[✅ Client]\` \`${member.user.username}\` Успешно был(а) добавлен в базу-данных**`) }
        	//if(!black) { Blacklist.create({ userID: member.user.id }); client.channels.cache.get('877445301357641739').send(`**\`[✅ BlackList]\` \`${member.user.username}\` Добавлен в чёрный список бота**`); }
    	});
      message.reply('Гильдия загружается...')
}
