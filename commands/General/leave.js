const Discord = require('discord.js');
var maintenance = false;
module.exports = {
    name: 'leave',
    description: 'Sale del canal de voz actual',
    execute(message, args) {
        if (message.member.voice.channel) {
            

            const serverQueue = message.client.queue.get(message.guild.id);

            if (!serverQueue || typeof serverQueue === 'undefined') {
                console.log("No se ha detectado una cola ")
                message.member.voice.channel.leave();
                message.react('764930023584170014');

            } else {

                serverQueue.songs = [];
                serverQueue.connection.dispatcher.end()

            }
        } else {
            message.reply("No puedes expulsarme si no estas en un canal de VC primero.")
        }
    }
};
