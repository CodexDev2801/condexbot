const Discord = require('discord.js');
var maintenance = false;
module.exports = {
	name: 'prune',
    description: 'Elimina los N mensajes más recientes',
    cooldown: 5,
    aliases: ['pr', 'del'],
    usage: "[Numero de mensajes]",
	execute(message, args) {
    const amount = parseInt(args[0]);

    if (isNaN(amount) || (amount < 2 || amount > 100)){
      return message.reply('Ingrese un número entero válido entre 2 y 100');
    } else {
      message.channel.bulkDelete(amount, true).catch(err => {
        console.error(err);
        message.channel.send('Se produjo un error al intentar eliminar los mensajes en este canal.!')
      });
    }
	}
};
