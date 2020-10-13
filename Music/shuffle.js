module.exports = {
    name: 'shuffle',
    description: 'Cola aleatoria.',
    cooldown: 3,
    execute(message) {

        //Works off the Fisher Yates Algorithm
        function shuffle(queue) {

            for (let i = queue.songs.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * i)
                const temp = queue.songs[i]
                queue.songs[i] = queue.songs[j]
                queue.songs[j] = temp
            }

        }

        //Gets current queue
        serverQueue = message.client.queue.get(message.guild.id)

        //Checks Queue
        if (!serverQueue.songs[0]) return message.channel.send("Actualmente no se reproduce ninguna canción en este servidor")

        //Grabs Voice Channel
        const { channel } = message.member.voice

        //Checks channel
        if (!channel) return message.channel.send("Debes estar en un canal de voz para reproducir música de forma aleatoria")

        //Shuffles Queue and moves to next song
        shuffle(serverQueue);
        serverQueue.connection.dispatcher.end()
        return message.channel.send("La cola ahora está barajada")
    }
};