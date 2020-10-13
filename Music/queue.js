const { MessageEmbed } = require('discord.js');
const colours = require('../../colours.json');
const parent = require('../../bot.js')
module.exports = {
	name: 'queue',
	description: 'Muestra la cola actual.',
    cooldown: 3,
    aliases: ['q'],
    execute(message) {
        currentGuild = message.guild

        function queue_to_text(queue) {
            queueSize = queue.songs.length

            if (queueSize > 10) {
                max_loop = 11
                songsLeft = queueSize - 10
                numberUpcoming = 10
            } else {
                max_loop = queueSize
                songsLeft = queueSize - 1
                numberUpcoming = queueSize
            }
            
            console.log(queue.songs)

            data = new MessageEmbed({type: "rich"})
                .setTitle(`Cola de música`)
                .setColor(colours.gold)
                .setDescription(`Estas son las próximas canciones de la lista de reproducción.`)
                .setThumbnail(currentGuild.iconURL())
                .addField(`**SONANDO AHORA**`, `${queue.songs[0].title} de ${queue.songs[0].channel}\n---------------------------------------------------`)
                .setFooter(`Powered by Condex Music | ${songsLeft} canciones restantes`, parent.client.user.displayAvatarURL())

            for (i = 1; i < max_loop; i++) {
                currentSong = queue.songs[i]
                console.log(currentSong)
                data.addField(`#${i} `, `Titulo: **${currentSong.title}** de **${currentSong.channel}**`)
            }
            return data
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        console.log(!serverQueue)

        if (!serverQueue) return message.channel.send('No hay nada sonando.');
        queue_embed= queue_to_text(serverQueue)
        message.channel.send(queue_embed)
	}
};
