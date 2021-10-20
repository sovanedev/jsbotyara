//Global
const { Client, MessageEmbed, GuildMember, Collection } = require('discord.js');
const client = new Client();
let config = require('./config.json');
const fs = require('fs');
let token = config.token;
const talkedRecently = new Set();
client.queue = new Map();
//Register Token
client.login(token);
//MongoDB
global.mongoose = require('mongoose');
global.Guild = require('./models/guild.js');
global.User = require('./models/user.js');
global.Shop = require('./models/shop.js');
global.Blacklist = require('./models/blacklist.js');
mongoose.connect(config.dataURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
  console.log('[✅ DataBase] Connected!')
})
//Loading Folders Command
const commands = {};
fs.readdirSync('./cmds').forEach(module => {
    const commandFiles = fs.readdirSync(`./cmds/${module}/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const cname = file.toLowerCase().substring(0, file.length-3);
        const command = require(`./cmds/${module}/${file}`);
        command.category = module;
        commands[cname] = command;
    }
})
//Starting Bot
client.on('ready', async () => {
    //Set Status
    client.user.setPresence({
        status: 'online',
        activity: {
            name: `.help | .bot`,
            type: "PLAYING",
        }
    });
    //Status Log
    let start = new MessageEmbed()
    .setTitle('Yupi')
    .setDescription(`Бот был запущен\nИмя: ${client.user.username}`)
    .setTimestamp()
    .setColor(49695)
    
    let logsChannel = client.channels.cache.get('900463957180031036')
    
    logsChannel.send(start)
    
    console.log(`Бот включен ${client.user.username}`);
});

//Check Message
client.on('message', async msg=>{
    //Security
    if(msg.author.bot) return;
    if(msg.channel.type == "dm") return;
    //MongoDB
    client.nodb = (user) => msg.channel.send(new MessageEmbed().setColor().setDescription(`К сожалению **${user.tag}** нету в базе-данных.`));
    let user = await User.findOne({ guildID: msg.guild.id, userID: msg.author.id });
    let guild = await Guild.findOne({ guildID: msg.guild.id });
    let black = await Blacklist.findOne({ userID: msg.author.id });
    if(!user) { User.create({ guildID: msg.guild.id, userID: msg.author.id }); client.channels.cache.get(config.logs.data).send(`**\`[✅ Client]\` \`${msg.author.username}\` Успешно был(а) добавлен в базу-данных**`) }
    if(!guild) { Guild.create({ guildID: msg.guild.id }); client.channels.cache.get(config.logs.data).send(`**\`[✅ Guild]\` \`${msg.guild.name}\` Успешно была добавлена в базу-данных**`); }
    if(!black) { Blacklist.create({ userID: msg.author.id }); }
    //Security
    //Security
    if(msg.author.bot || msg.channel.type != "text") return;
    if (talkedRecently.has(msg.author.id)) return;
    //Commands
    if(msg.content.startsWith(guild.prefix)) {
         if (black.blacklist == 'no') {
            let cmdLine = msg.content.slice(guild.prefix.length, msg.content.length);
            let cmd = cmdLine;
            if(cmdLine.indexOf(' ') != -1)
            {
                cmd = cmdLine.slice(0,cmdLine.indexOf(' '));
            }
            for(let cname in commands){
                if(cname == cmd)
                {
                    let args = cmdLine.slice(cname.length+1).split(' ').filter(Boolean);
                    commands[cname].run(client, msg, args);
                }
            }
           talkedRecently.add(msg.author.id);
           setTimeout(() => {
              talkedRecently.delete(msg.author.id);
           }, 2000);
        } else {
            let blacks = new MessageEmbed()
            .setTitle(`<a:no:871662817240039435> Ошибка`)
            .setColor(`#e74444`)
            .setDescription(`Администрация занесла вас в чёрный список по причине **${black.reason}**`)
            .setTimestamp()
            msg.channel.send(blacks);
        }
     }
    //Filter
    if (msg.guild.id == config.owners_guild) {
      const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`, `bittys.xyz`, `bittys. xyz`, `bittys .xyz`, `bittys.xyz/`, `bittys.xyz /`, `bittys. xyz/`, `bittys. xyz /`, `bittys .xyz/`, `bittys .xyz /`]
      try {
          if (bannedWords.some(word => msg.content.toLowerCase().includes(word))) {
              if (msg.author.id === msg.guild.ownerID) return;
              await msg.delete();
          }
      } catch (e) {
          console.log(e);
      }
    }
});
//New Moderators
client.on("guildMemberUpdate", (oldMember, newMember) => {
  const embed = new MessageEmbed()
  .setTitle('Добро пожаловать в ряды модераторов бота Yupi. Это справка по использованию бота в целях ответа на тикеты.')
  .setDescription(`**Для начала дам тебе главные правила:**\n> 1. Игнор тикетов = Снятие! \n> 2. Неадекватное поведение в тикетах = Снятие! \n> 3. Угроза блокировкой команд = Снятие!\n\n**Теперь давай рассмотрим ответы на тикеты:**\n> Зайти в канал 📘・reports\n> Ввести .ticket [@user/id] [ваш ответ]\n> Отправить ответ на тикет\n\n**Как получить ID пользователя:**\n> Зайдите в настройки дискорда\n> Найдите вкладку Расширенные\n> В этой вкладке включите режим разработчика\n> Теперь при нажатии ПКМ у вас есть кнопка 'Копировать ID'\n\n**Как упоминуть пользователя через UserID**\n> Сначала Скопируй UserID\n> Используй <@>\n> После @ Вставь UserID`)
  .setColor('#ff6238')
  if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
    if (!oldMember.roles.cache.has("877442936940396545") && newMember.roles.cache.has("877442936940396545")) {
        newMember.send(embed);
    }
  }
});
//Register MongoDB
client.on("guildCreate", async (guild) => {
    let guilds = await Guild.findOne({ guildID: guild.id });
    if(!guilds) { Guild.create({ guildID: guild.id }); client.channels.cache.get(config.logs.data).send(`**\`[✅ Guild]\` \`${guild}\` Успешно была добавлена в базу-данных**`); }
    guild.members.cache.array().forEach(async member => {
        if(member.user.bot) return;
        let user = await User.findOne({ guildID: guild.id, userID: member.user.id });
        let black = await Blacklist.findOne({ userID: member.user.id });
        if(!user) { User.create({ guildID: guild.id, userID: member.user.id }); client.channels.cache.get(config.logs.data).send(`**\`[✅ Client]\` \`${member.user.username}\` Успешно был(а) добавлен в базу-данных**`) }
        if(!black) { Blacklist.create({ userID: member.user.id }); }
    });
});

//Auto-Role
client.on("guildMemberAdd", async (member) => {
    let guild = await Guild.findOne({ guildID: member.guild.id });
    if (guild.autorole == 'none') return
    member.roles.add(guild.autorole)
});

//join

client.on("guildMemberAdd", async (member) => {
  let guild = await Guild.findOne({ guildID: member.guild.id });
  if (guild.modlogs == 'none') return;
  
      let newplayer = new MessageEmbed()
       .setTitle('Новый Пользователь')
       .setDescription(`Пользователь: <@${member.id}> Зашел в дискорд сервер.`)
       .setColor(0xf04747)
       .setTimestamp()
      
      client.channels.cache.get(guild.modlogs).send(newplayer)
})

//remove

client.on("guildMemberRemove", async (member) => {
  let guild = await Guild.findOne({ guildID: member.guild.id });
  if(guild.modlogs == 'none') return
  
      let dis = new MessageEmbed()
       .setTitle('Пользователь вышел')
       .setDescription(`Пользователь: <@${member.id}> Покинул дискорд сервер.`)
       .setColor(0xf04747)
       .setTimestamp()
      
      client.channels.cache.get(guild.modlogs).send(dis)
})

//ModLogs

client.on("messageDelete", async message => {
  let guild = await Guild.findOne({ guildID: message.guild.id });
  
  if(guild.modlogs == 'none') return
  
  let embed = new MessageEmbed()
      .setAuthor('Сообщение удалено', message.guild.iconURL)
      .addField('Отправитель', message.member, true)
      .addField('Канал', message.channel, true)
      .addField('Содержание', message.content, true)
      .setColor(0xf04747)
      .setTimestamp()
  
  client.channels.cache.get(guild.modlogs).send(embed)
  
});
