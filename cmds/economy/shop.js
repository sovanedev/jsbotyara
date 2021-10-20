const { Client, MessageEmbed, GuildMember } = require('discord.js');
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {
    let guild = await Guild.findOne({ guildID: message.guild.id });
    let user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
    let member = message.guild.member(message.mentions.users.first() || message.author)
    
    let add = new MessageEmbed()
    .setTitle('Магазин')
    .setDescription(`В магазине пусто...\nИспользуйте ${guild.prefix}shop add <Роль> Цена`)
    .setColor(11608096)

    if (!args[0]) {
        let res = await Shop.find({ guildID: message.guild.id })
        let text = ``;
        let embed = new MessageEmbed().setColor(49695)
        if (res.length === 0) return message.channel.send(add) //Если нет ничего в магазине
        for (i = 0; i < res.length; i++) {
            let role = message.guild.roles.cache.find((r) => r.name == res[i].role) || message.guild.roles.cache.find((r) => r.id == res[i].role) || message.mentions.roles.first();
            text += `\`${i + 1}\` <@&${role.id}> Цена: ${res[i].price} <:dollars:871667265093910548>` + `\n`
        }
        let embedss = new MessageEmbed()
        .setColor(49695)
        .setDescription(text)
        message.channel.send(embedss)
    } else if (args[0] == `add`) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Недостаточно прав на использование команды!');
        if (!args[1]) return message.reply(`Укажите роль`)
        if (!args[2]) return message.reply(`Укажите цену`)
        if (isNaN(args[2])) return message.reply(`Укажите правильно цену`)
        let roles = message.guild.roles.cache.find((r) => r.name == args[1]) || message.guild.roles.cache.find((r) => r.id == args[1]) || message.mentions.roles.first();
        let data = await Shop.find({ guildID: message.guild.id })
        let ShopCount = await data.length + 1
        let Shops = await Shop.findOne({ role: roles.id });
        if (!Shops) {
            const newShop = new Shop({
                guildID: message.guild.id,
                id: ShopCount,
                role: roles.id,
                price: Math.floor(args[2]),
            });
            await newShop.save().catch(()=>{});
            message.channel.send(`Роль <@&${roles.id}> была успешно добавлена в магазин за ${args[2]} <:dollars:871667265093910548>`)
        } else  {
            message.channel.send(`Роль <@&${roles.id}> уже сеществует`)
        }
    } else if (args[0] == `remove`) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Недостаточно прав на использование команды!');
        if (!args[1]) return message.channel.send(`Укажите ID роли`)
        message.channel.send('Магазин успешно очищен!')
        await Shop.deleteOne({ guildID: message.guild.id, id: args[1] });
        let data = await Shop.find({ guildID: message.guild.id })
        for (i = 0; i < data.length; i++) {
            data[i].id = 1 + i
            data[i].save()
        }
    } else if (args[0] == `buy` ) {
        let notargs = new MessageEmbed()
        .setTitle('Магазин')
        .setDescription(`Укажите ID роли которую хотите купить!`)
        .setColor(11608096)

        let roleehe = new MessageEmbed()
        .setTitle('Магазин')
        .setDescription(`У вас уже есть эта роль!`)
        .setColor(11608096)

        let shop = await Shop.findOne({ guildID: message.guild.id, id: args[1] });

        if (user.money < shop.price) return message.channel.send('У вас нет денег!')
        if(!args[1]) return message.channel.send(notargs)
        if(member.roles.cache.has(shop.role)) return message.channel.send(roleehe)
        let roless = message.guild.roles.cache.find((r) => r.name == shop.role) || message.guild.roles.cache.find((r) => r.id == shop.role) || message.mentions.roles.first();
        let buyer = new MessageEmbed()
        .setTitle('Магазин')
        .setDescription(`Вы успешно купили роль: <@&${roless.id}> за ${shop.price} <:dollars:871667265093910548>!`)
        .setColor(11608096)

        message.channel.send(buyer)

        member.roles.add(roless.id);

        user.money -= shop.price
        user.save()
    }
}
