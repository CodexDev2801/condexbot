module.exports = {
	name: 'resume',
	description: 'Reanuda la musica.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Reanude la música por ti!');
		}
		return message.channel.send('No hay nada sonando.');
	}
};
