const { Client, MessageEmbed, GuildMember } = require('discord.js');
const client = new Client();
const fs = require('fs');

module.exports.run = async(client, message, args) => {

let data = await User.find({ guildID: message.guild.id }).sort([['money','descending']]).exec((err,res) => {
 let embed = new MessageEmbed().setColor(49695)
 if(res.length === 0){ embed.setDescription('К сожелению таблица данного сервера пуста.') }
 else if (res.length < 10){ for(i = 0; i < res.length; i++){
     let name = client.users.cache.get(res[i].userID) || "Неизвестно"
     if(name == "Неизвестно"){
         embed.addField(`Топ ${i + 1}.`, `${name} **Монет**: ${res[i].money}💸`)
     }else{
         embed.addField(`Топ ${i + 1}.`, `${name} **Монет**: ${res[i].money}💸`)
     }
 }
 }else{
     for(i = 0; i < 10; i++){
         let name = client.users.cache.get(res[i].userID) || "Неизвестно"
         if(name == "Пусто"){
             embed.addField(`Топ ${i + 1}.`, `${name} **Монет**: ${res[i].money}💸`)
         }else{
             embed.addField(`Топ ${i + 1}.`, `${name} **Монет**: ${res[i].money}💸`)
             }
         }
     }
     message.channel.send(embed)
 });
}
