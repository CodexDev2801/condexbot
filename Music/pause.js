module.exports = {
	name: 'pause',
	description: 'Pausa la musica.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Pausó la música por ti!');
		}
		return message.channel.send('No hay nada sonando.');
	}
};
