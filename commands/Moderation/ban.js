const Discord = require('discord.js');
var maintenance = false;
const parent = require('../../bot.js')
module.exports = {
    name: 'ban',
    description: 'Banea a un usuario',
    aliases: ['ban'],
    usage: "[usuario]",
    async execute(message, args) {
        if (message.member.hasPermission('BAN_MEMBERS')) {
            const member = message.mentions.members.first();
            if (member.id == parent.client.config.botID) {
                message.reply("No puedes banearte a ti mismo")
            } else {

                message.guild.members.ban(member);

            }
        } else {
            message.reply('No cuentas con los permisos necesarios para ejecutar el comando')
        }
    }
};
