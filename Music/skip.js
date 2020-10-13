module.exports = {
    name: 'skip',
    description: 'Saltar las siguientes N canciones.',
    cooldown: 5,
    execute(message, args) {

        let toSkip = 1 // Default 1
        indexString = args[0]
        var index_to_skip = parseInt(indexString, 10)

        console.log(`Tipo de argumento: ${typeof index_to_skip}`)
        if (typeof index_to_skip !== "number") {
            return message.channel.send("Ingrese solo valores enteros")
        } else {
            const { channel } = message.member.voice;
            if (!channel) return message.channel.send('Lo siento, pero debes estar en un canal de voz para reproducir música.!');
            const serverQueue = message.client.queue.get(message.guild.id);

            var queueSize = serverQueue.songs.length
            if (index_to_skip > queueSize) {
                console.log("ERROR: El usuario intentó omitir más de la longitud de la cola")
                message.channel.send(`Error: No se puede omitir más de la longitud actual de la cola de ${queueSize}`)
            } else {
                if (!serverQueue) return message.channel.send('No hay nada sonando que pueda saltar por ti.');

                serverQueue.songs.splice(0, index_to_skip)
                serverQueue.connection.dispatcher.end()

            }
            
        }

    }

};
