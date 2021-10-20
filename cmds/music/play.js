  
const { Client, MessageEmbed, GuildMember } = require('discord.js');
const { play } = require("../../modules/play.js");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader").default
const https = require("https");
const { youtube_api_key, soundcloud_client_id, default_volume, prefix, config } = require("../../config.json");
const youtube = new YouTubeAPI(youtube_api_key);

module.exports.run = async (client, message, args) =>{
  
    
    const golos = new MessageEmbed()
    .setTitle('Music')
    .setDescription('Сначала вам нужно присоединиться к голосовому каналу!')
    .setColor(11608096)
    
    const totje = new MessageEmbed()
    .setTitle('Music')
    .setDescription(`Вы должны быть на том же канале, что и ${message.client.user}`)
    .setColor(11608096)
    
    const pod = new MessageEmbed()
    .setTitle('Music')
    .setDescription(`Используйте: ${prefix}play <YouTube URL | Название видео | Soundcloud URL>`)
    .setColor(11608096)
    
    const erorka = new MessageEmbed()
    .setTitle('Music')
    .setDescription('Не удается подключиться к голосовому каналу, отсутствуют соответствующие разрешение')
    .setColor(11608096)
    
    const erorkaa = new MessageEmbed()
    .setTitle('Music')
    .setDescription(`Я не могу говорить в этом голосовом канале, убедитесь, что у меня есть соответствующие разрешения!`)
    .setColor(11608096)
    
    //const ownerslist = new MessageEmbed()
    //.setTitle('Music')
    //.setDescription(`Команда Доступна Только разработчикам!`)
    
    
    //if (!config.owners.includes(message.author.id)) return message.channel.send(ownerslist)
    
    
    const { channel } = message.member.voice;

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!channel) return message.channel.send(golos).catch(console.error);
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message
        .channel.send(totje)
        .catch(console.error);

    if (!args.length)
      return message
        .channel.send(pod)
        .catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) return message.channel.send(erorka);
    if (!permissions.has("SPEAK")) return message.channel.send(erorkaa);

    const search = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    const mobileScRegex = /^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$/;
    const url = args[0];
    const urlValid = videoPattern.test(args[0]);

    // Start the playlist if playlist url was provided
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.client.commands.get("playlist").execute(message, args);
    } else if (scdl.isValidUrl(url) && url.includes("/sets/")) {
      return message.client.commands.get("playlist").execute(message, args);
    }

    if (mobileScRegex.test(url)) {
      try {
        https.get(url, function (res) {
          if (res.statusCode == "302") {
            return message.client.commands.get("play").execute(message, [res.headers.location]);
          } else {
            return message.channel.send("No content could be found at that url.").catch(console.error);
          }
        });
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
      return message.channel.send("Following url redirection...").catch(console.error);
    }

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: default_volume || 100,
      playing: true
    };

    let songInfo = null;
    let song = null;

    if (urlValid) {
      try {
        songInfo = await ytdl.getInfo(url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    } else if (scRegex.test(url)) {
      try {
        const trackInfo = await scdl.getInfo(url, soundcloud_client_id);
        song = {
          title: trackInfo.title,
          url: trackInfo.permalink_url,
          duration: Math.ceil(trackInfo.duration / 1000)
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    } else {
      try {
        const results = await youtube.searchVideos(search, 1, { part: "snippet" });
        // PATCH 1 : avoid cases when there are nothing on the search results.
        if (results.length <= 0) {
          // No video results.
          message.reply(`Audio Not Found`).catch(console.error);
          return;
        }
        songInfo = await ytdl.getInfo(results[0].url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);
      return serverQueue.textChannel
        .send(`"✅ **${song.title}** был добавлен в очередь ${message.author}`)
        .catch(console.error);
    }

    queueConstruct.songs.push(song);
    message.client.queue.set(message.guild.id, queueConstruct);

    try {
      queueConstruct.connection = await channel.join();
      await queueConstruct.connection.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0], message);
    } catch (error) {
      console.error(error);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message.channel.send(`Не удалось присоединиться к каналу: ${error}`).catch(console.error);
    }
};
