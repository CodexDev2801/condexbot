module.exports = {
	name: 'stop',
	description: 'Deten la música',
    cooldown: 5,
    aliases: ['clear', 'quit', 's'],
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Lo siento, pero debes estar en un canal de voz para reproducir música.!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('No hay nada jugando que pueda parar por ti.');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end()
	}
};
