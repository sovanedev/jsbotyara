const { Client, MessageEmbed, GuildMember } = require('discord.js');

module.exports.run = async (client, message, args) =>{
     let data = await Guild.findOne({ guildID: message.guild.id });
     let prefix = data.prefix;
        
        let helping = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#ff9900')
        .setDescription(`Нашел ошибку? Напиши нам! ${prefix}report **<Сообщение>**\nВсего команд: **42**`)
        .addField("**🎭Развлечение**", `**${prefix}help fun\nВсего команд: 9**`, true)
        .addField("**🔊Музыка**", `**${prefix}help music\nВсего команд: 1**`, true)
        .addField("**💰Экономика**", `**${prefix}help economy\nВсего команд: 7**`, true)
        .addField("**⚙Модерация**", `**${prefix}help moderation\nВсего команд: 7**`, true)
        .addField("**🔐Прочие**", `**${prefix}help other\nВсего команд: 2**`, true)
        .addField("**🔧Настройка**", `**${prefix}help config\nВсего команд: 6**`, true)
  
    if (!args[0]) return message.channel.send(helping)

    if (args[0] == 'fun'){
        let fun = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#ff9900')
        .setDescription(`Нашел ошибку? Напиши нам! ${prefix}report **<Сообщение>**\n\n${prefix}8ball - Погадать на игрока!\n${prefix}feed - Покормить игрока\n${prefix}gay - Узнать на сколько гей пользователей\n${prefix}hug - Обнять пользователя\n${prefix}meme - Рандомная шутка\n${prefix}ship - Шиперство пользователей\n${prefix}slap - Ударить пользователя\n${prefix}wasted - Легендарный мем из гта 5 на вашей аватарке!\navatar - Показать аватарку пользователя`)

        message.channel.send(fun)
    }
    if (args[0] == 'music'){
        let music = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#ff9900')
        .setDescription(`Нашел ошибку? Напиши нам! ${prefix}report **<Сообщение>**\n\n${prefix}play - Включить музыку`)
        
        message.channel.send(music)
    }
  
    if (args[0] == 'economy'){
        let economy = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#ff9900')
        .setDescription(`Нашел ошибку? Напиши нам! ${prefix}report **<Сообщение>**\n\n${prefix}flip - Подкинуть монетку\n${prefix}$ - Узнать баланс\n${prefix}top - Показать топ сервера\n${prefix}timely - Ежедневный бонус\n${prefix}work - Сходить на работу\n${prefix}pay - Передать деньги игроку\n${prefix}deposit - Положить денег в банк\n${prefix}withdraw - Снять деньги с банка\n${prefix}marry - Выйти замуж за пользователя\n${prefix}divorce - Подать на развод\n${prefix}dice - Сыграть с пользователем в кости!\n${prefix}shop - Магазин сервера.`)
        
        message.channel.send(economy)
        
    }
    if (args[0] == 'moderation'){
      let moderation = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#ff9900')
        .setDescription(`Нашел ошибку? Напиши нам! ${prefix}report **<Сообщение>**\n\n${prefix}ban - Забанить пользователя\n${prefix}clear - Очистить сообщение\n${prefix}clearwarn - Убрать все варны пользователя\n${prefix}config - Настроить бота под ваш сервер\n${prefix}kick - Выгнать пользователя\n${prefix}mute - Замутить пользователя\n${prefix}warn - Выдать предупреждение пользователю`)
        
      message.channel.send(moderation)
    }
    if (args[0] == 'other'){
      let other = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#ff9900')
        .setDescription(`Нашел ошибку? Напиши нам! ${prefix}report **<Сообщение>**\n\n${prefix}bot - Информация о боте\n${prefix}help - Помощь`)
      
      message.channel.send(other)

    }
     
    if (args[0] == 'config'){
      let config = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#ff9900')
        .setDescription(`Нашел ошибку? Напиши нам! ${prefix}report **<Сообщение>**\n\n${prefix}autorole - Автомотическая Выдача Роли!\n${prefix}setmodlogs - Логи удаленных сообщений!\n${prefix}prefix - Поставить свой префикс для вашего сервера!\n${prefix}setwarns - Устновить Число/Наказание за варны!`)
      
      message.channel.send(config)

    }
     
    if (args[0] == 'все'){
        let fun = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#ff9900')
        .setDescription(`Нашел ошибку? Напиши нам! ${prefix}report **<Сообщение>**\n\n${prefix}8ball - Погадать на игрока!\n${prefix}feed - Покормить игрока\n${prefix}gay - Узнать на сколько гей пользователей\n${prefix}hug - Обнять пользователя\n${prefix}meme - Рандомная шутка\n${prefix}ship - Шиперство пользователей\n${prefix}slap - Ударить пользователя\n${prefix}wasted - Легендарный мем из гта 5 на вашей аватарке!\navatar - Показать аватарку пользователя`)
        
        let economy = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#ff9900')
        .setDescription(`Нашел ошибку? Напиши нам! ${prefix}report **<Сообщение>**\n\n${prefix}flip - Подкинуть монетку\n${prefix}$ - Узнать баланс\n${prefix}top - Показать топ сервера\n${prefix}timely - Ежедневный бонус\n${prefix}work - Сходить на работу\n${prefix}pay - Передать деньги игроку`)
        
        let moderation = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#ff9900')
        .setDescription(`Нашел ошибку? Напиши нам! ${prefix}report **<Сообщение>**\n\n${prefix}ban - Забанить пользователя\n${prefix}clear - Очистить сообщение\n${prefix}clearwarn - Убрать все варны пользователя\n${prefix}config - Настроить бота под ваш сервер\n${prefix}kick - Выгнать пользователя\n${prefix}mute - Замутить пользователя\n${prefix}warn - Выдать предупреждение пользователю`)

        let other = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#ff9900')
        .setDescription(`Нашел ошибку? Напиши нам! ${prefix}report **<Сообщение>**\n\n${prefix}bot - Информация о боте\n${prefix}help - Помощь`)
              
        let config = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#ff9900')
        .setDescription(`Нашел ошибку? Напиши нам! ${prefix}report **<Сообщение>**\n\n${prefix}config - Настроить бота под ваш сервер!`)
            
        
        message.channel.send(fun)
         
        message.channel.send(economy)
         
        message.channel.send(moderation)
         
        message.channel.send(other)
         
        message.channel.send(config) 
    }
};
