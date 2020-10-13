const Discord = require('discord.js');
var maintenance = false;
const parent = require('../../bot.js')
module.exports = {
    name: 'kick',
    description: 'Expulsa a un miembro del servidor',
    aliases: ['kick'],
    async execute(message, args) {
        if (message.member.hasPermission('KICK_MEMBERS')) {
            const member = message.mentions.members.first();
            member.kick();
        } else {
            message.reply('No cuentas con los permisos necesarios para ejecutar el comando')
        }
    }
};
