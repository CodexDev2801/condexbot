const Discord = require('discord.js');
var maintenance = false;
const parent = require('../../bot.js')
module.exports = {
    name: 'add role',
    description: 'Agrega un rol a un usuario',
    aliases: ['addrole'],
    async execute(message, args) {
        if (message.member.hasPermission('MANAGE_ROLES')) {
            var mentionedRole = message.mentions.roles.first();
            var roleMember = message.mentions.members.first();
            if (!mentionedRole) return message.reply(`No puedo encontrar el rol: ${mentionedRole}`);

           roleMember.roles.add(mentionedRole).then(message.channel.send("Rol agregado exitosamente.")).catch(console.error);
        } else {
            message.reply('No cuentas con los permisos necesarios para ejecutar el comando')
        }
    }
};
