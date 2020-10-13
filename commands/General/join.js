const Discord = require('discord.js');
var maintenance = false;
module.exports = {
    name: 'join',
    description: 'Se une al canal de voz actual',
    aliases: ['j'],
    execute(message, args) {
        if (message.member.voice.channel) {
            message.member.voice.channel.join();
            message.react('764930023584170014');

        } else {
            message.reply("Necesitas ingresar a un canal de voz primero")
        }
    }
};
