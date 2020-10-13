playlistsJSON = require('./playlists.json')
const { MessageEmbed } = require ('discord.js')
const colours = require('../../colours.json')
module.exports = {
    name: 'playlists',
    description: 'Muestra listas de reproducción guardadas.',
    cooldown: 5,
    execute(message, args) {

        if (!args) {
            page = 0
        } else {
            page = args[0]
        }
                       
        playlistSize = playlistsJSON.playlists.length
        maxPage = playlistSize / 10
        maxPage = maxPage.toFixed(0)

        if (page > maxPage) return message.channel.send(`Lo sentimos, ese número es demasiado alto para el límite de páginas de ${maxPage}`)
        if (playlistSize < 1) return message.channel.send("ERROR: No se pudo detectar ninguna lista de reproducción guardada para este servidor");

        if (playlistSize > 10) {
            listLength = 10
        } else {
            listLength = playlistSize
        }
        

        const playlistsEmbed = new MessageEmbed()
            .setTitle('Listas de reproducción guardadas')
            .setColor(colours.gold)
            .setDescription(`Listas de reproducción guardadas para ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL())
            .setFooter(message.client.footerMSG, message.client.user.displayAvatarURL())


        for (i = 0; i < listLength; i++) {
            playlistsEmbed.addField(`#${i+1}`, `Nombre: **${playlistsJSON.playlists[i].name}** || URL: **${playlistsJSON.playlists[i].url}**`)
        }

        message.channel.send(playlistsEmbed)
    }
};
