const { Util } = require('discord.js');
const ytdl = require('ytdl-core');
const parent = require('../../bot.js')
const youtubeAPI = parent.client.config.youtubeKey
const { google } = require('googleapis');
const getYoutubePlaylistId = require('get-youtube-playlist-id');
const Youtube = require('simple-youtube-api');
const youtube = new Youtube(youtubeAPI);
const savedPlaylistJSON = require('./playlists.json')


module.exports = {
    name: 'play',
    description: 'Reproduce / pone en cola una nueva canción',
    usage: '[Video URL | Nombre De La Canción | PlaylistURL]',
    args: true,
    cooldown: 3,
    aliases: ['p'],
    async execute(message, args) {


        //Permissions and checks
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('Lo siento, pero debes estar en un canal de voz para reproducir música.!');
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('No puedo conectarme a su canal de voz, asegúrese de tener los permisos adecuados!');
        if (!permissions.has('SPEAK')) return message.channel.send('No puedo hablar en este canal de voz, asegúrese de tener los permisos adecuados!');

        //Defines the requested song based on the args
        req_song = args.join(" ");

        //Regular Expressions to check URL
        urlCheck = new RegExp('^https://www.youtube.com/watch')
        playlistCheck = new RegExp('^https://www.youtube.com/playlist')


        async function playlist_scan(id) {

            //Gets playlist information based off the URL 
            youtube.getPlaylist(id)
                .then(playlist => {
                    playlist.getVideos()
                        .then(videos => {
                            videos.forEach((video) => {
                                const song = {
                                    title: video.title,
                                    url: video.url,
                                    channel: video.channel.title,
                                    duration: video.duration
                                };
                                try {
                                    play(song, true)
                                } catch (err) {
                                    console.log(err)
                                }
                            })
                        })
                })
        }

        async function play(song, isPlaylist) {


            //Creates server queue
            const serverQueue = message.client.queue.get(message.guild.id);

            //If a queue exists then add the song to the end of the queue
            if (serverQueue) {
                serverQueue.songs.push(song);
                if(!isPlaylist) message.channel.send(`** ${song.title} ** ha sido agregado a la cola`)
                console.log(serverQueue.songs);
                return
            }

            //Defines the structure for a queue
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: channel,
                connection: null,
                songs: [],
                volume: 4,
                playing: true
            };

            //Sets queue variable within the client class
            message.client.queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);
            if (isPlaylist) {
                message.channel.send("** Playlist ** ha sido agregado a la cola")
            } else {
                message.channel.send(`** ${song.title} ** ha sido agregado a la cola`)
            }

            //Play
            const play = async song => {
                const queue = message.client.queue.get(message.guild.id);
                if (!song) {
                    queue.voiceChannel.leave()
                    message.client.queue.delete(message.guild.id);
                    return;
                }

                //Streams the song
                const dispatcher = queue.connection.play(ytdl(song.url))

                    //Once completed it moves the queue array
                    .on('finish', () => {
                        queue.songs.shift();
                        play(queue.songs[0]);
                        
                    })


                    .on('disconnect', () => {

                        console.log("Desconectando ...")
                        queue.songs = [];
                        dispatcher.end('¡Se ha utilizado el comando stop!');

                    })


                parent.client.on('voiceStateUpdate', async newState => {

                    try {

                        if (!newState.connection && newState.member.user.bot) {
                            console.log("No conectado a un canal de voz")

                            var serverQueue = message.client.queue.get(message.guild.id)
                            if (!serverQueue) return console.log("No hay canciones en la cola")

                            serverQueue.songs = []
                            dispatcher.end();
                            console.log("La cola se borró porque he sido desconectado del canal de voz")
                        } else {

                            //console.log(`VOICE STATE UPDATED: ${newState.connection.status}`)

                        }

                    } catch (err) {
                        console.log(err)
                    }
                })
                    
                //Sets logarithmic volume
                dispatcher.setVolumeLogarithmic(queue.volume / 5);
                message.channel.send(`🎶 Empezando a sonar: **${song.title}** de **${song.channel}**`)
                    .then(msg => {
                        msg.delete({ timeout: 15000 })
                    }).catch(err => { console.log(err) });
            };

            //Instantiates the queue using the queueConstruct definitons and begins to play songs in the queue
            try {
                const connection = await channel.join();
                queueConstruct.connection = connection;
                play(queueConstruct.songs[0]);
            
            } catch (error) {
                console.error(`No pude unirme al canal de voz: ${error}`);
                message.client.queue.delete(message.guild.id);
                await channel.leave();
                return message.channel.send(`No pude unirme al canal de voz: ${error}`);
            }


            

        };

        async function searchYoutube(song_string) {

            if (urlCheck.test(song_string)) {
                youtube.getVideo(song_string)
                    .then(video => {

                        const song = {

                            title: video.title,
                            url: video.url,
                            channel: video.channel.title,
                            duration: video.duration

                        };

                        try {
                            play(song,false)
                        } catch (err) {
                            console.log(err)
                        }

                    })

                    .catch(err => { console.log(err) });

            } else {

                //Searches through the YouTube API for video

                youtube.searchVideos(req_song, 1)
                    .then(results => {

                        result = results[0];

                        const song = {
                            title: result.title,
                            url: result.url,
                            channel: result.channel.title,
                        }

                        play(song,false)

                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        }

        function playlist(playlist) {
            var id = getYoutubePlaylistId(playlist)
            console.log(`URL : ${playlist} , ID : ${id}`)
            playlist_scan(id);
        }

        if (playlistCheck.test(req_song)) {
                       
            playlist_scan(req_song)

        } else {

            for (i = 0; i < savedPlaylistJSON.playlists.length; i++) {
                if (savedPlaylistJSON.playlists[i].name == req_song) {

                    console.log("ARGUMENTOS ENCONTRADOS EN EL NOMBRE DE LISTA DE REPRODUCCIÓN GUARDADA ... LISTA DE REPRODUCCIÓN INICIAL")
                    return playlist_scan(savedPlaylistJSON.playlists[i].url)
                }
            }

            searchYoutube(req_song)

        }

    }
};



