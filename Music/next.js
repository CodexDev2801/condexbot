const { Util } = require('discord.js');
const ytdl = require('ytdl-core');
const parent = require('../../bot.js')
const youtubeAPI = parent.client.config.youtubeKey
const { google } = require('googleapis');
const getYoutubePlaylistId = require('get-youtube-playlist-id');
const Youtube = require('simple-youtube-api');
const youtube = new Youtube(youtubeAPI);

module.exports = {
    name: 'next',
    description: 'Agrega una canción.',
    cooldown: 5,
    usage: 'Título / URL del video',
    async execute(message, args) {

        urlCheck = new RegExp('^https://www.youtube.com/watch')
        playlistCheck = new RegExp('^https://www.youtube.com/playlist')

        req_song = args.join(' ')

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('No hay nada sonando.');


        if (playlistCheck.test(req_song)) {

            return message.channel.send("Lo siento, no puedo agregar una lista de reproducción a la siguiente en la cola")

        } else {

            if (urlCheck.test(req_song)) {

                console.log("URL")
                youtube.getVideo(req_song)
                    .then(video => {

                        const song = {

                            title: video.title,
                            url: video.url,
                            channel: video.channel.title,
                            duration: video.duration

                        };

                        serverQueue.splice(1, 0, song);

                    })

                    .catch(err => { console.log(err) });

            } else {

                console.log("Titulo")

                //Searches through the YouTube API for video

                youtube.searchVideos(req_song, 1)
                    .then(results => {

                        result = results[0];

                        const song = {
                            title: result.title,
                            url: result.url,
                            channel: result.channel.title,
                        }

                        console.log(`CANCIÓN ENCONTRADA: ${song.title} de ${song.channel}`)

                        try {
                            serverQueue.songs.splice(1, 0, song)
                            message.channel.send(`${song.title} Se ha añadido a la cola`)
                                .then((msg) => {
                                    msg.delete({ timeout: 5000 })
                                })
                        } catch {
                            message.channel.send("Hubo un error al agregar esta canción.")
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    });
            }


        }

    }
};
