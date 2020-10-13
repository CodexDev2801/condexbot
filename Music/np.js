module.exports = {
	name: 'np',
	description: 'Muestra la canción actual.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('No hay nada sonando.');
        return message.channel.send(`🎶 Sonando: **${serverQueue.songs[0].title}** de **${serverQueue.songs[0].channel}**`);
	}
};
