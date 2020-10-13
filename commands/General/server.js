const Discord = require('discord.js');
var maintenance = false;
colours = require('../../colours.json');
const parent = require('../../bot.js');
module.exports = {
	name: 'server',
	description: 'Muestra la información del servidor',
	execute(message, args) {
    const sembed = new Discord.MessageEmbed()
        .setTitle('Información del servidor')
        .setThumbnail(message.guild.iconURL())
        .setDescription(`Information on ${message.guild.name}`)
        .setColor(colours.gold)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL())
        .addField(`**Nombre Del Servidor**`, `${message.guild.name}`, true)
        .addField(`**Dueño Del Servidor**`, `${message.guild.owner}`, true)
        .addField(`**Numero de Miembros**`, `${message.guild.memberCount}`, true)
        .addField(`**Rol Más Alto**`, `${message.guild.roles.highest}`, true)
        .addField(`**Region**`, `${message.guild.region}`, true)
        .addField(`**Creación Del Server**`, `${message.guild.createdAt}`, true)
        .setFooter(`By Codex | Footer`, parent.client.user.displayAvatarURL());
        message.channel.send(sembed);
	}   
};
