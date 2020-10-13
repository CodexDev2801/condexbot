const playlistsJSONRaw = require('./playlists.json')
const fs = require('fs')

module.exports = {
    name: 'addplaylist',
    description: 'Guarda la lista de reproducción usando el nombre y PlaylistURL.',
    cooldown: 5,
    usage: `<playlist , playlistURL> NOTA : Sin espacios en la lista de reproducción`, 
    aliases: ['playlistadd', 'saveplaylist', 'save'],
    execute(message, args) {


        // args = [BestOfSongs, www.youtube.com//wadawdawdawd]

        playlistName = args[0]
        playlistURL = args[1]
        playlistCheck = new RegExp('^https://www.youtube.com/playlist');

        if (!playlistCheck.test(playlistURL)) return message.channel.send("Ingresa una URL de lista de reproducción válida. Asegúrese de que el nombre no tenga espacios");

        //Checks for possible duplicates
        for (i = 0; i < playlistsJSONRaw.playlists.length; i++) {

            if (playlistsJSONRaw.playlists[i].name == playlistName || playlistsJSONRaw.playlists[i].url == playlistURL) {
                return message.channel.send(`ERROR: Ya existe una lista de reproducción con ese nombre / URL`)
            }

        }

        //Creates playlist structure
        playlist = {
            name: playlistName,
            url: playlistURL
        }


        console.log(`Información de la lista de reproducción recopilada como: ${playlist}`)


        //Defines

        let obj = playlistsJSONRaw

        obj.playlists.push(playlist)
        console.log(obj)
        var json = JSON.stringify(obj);

        /*fs.writeFile('Commands/Music/playlists.json', json, 'utf8', function callback(err) {

            if (err) console.log(err)

        });*/

        fs.readFile('Commands/Music/playlists.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data); //now it an object
                //console.log(`Playlists Array gathered : ( ${obj.playlists} )`)
                obj.playlists.push(playlist); //add some data
                //console.log(`Playlists Array updated : ( ${obj.playlists} )`)
                json = JSON.stringify(obj); //convert it back to json
                //console.log(`Converted to JSON : ( ${json} )`)
                fs.writeFile('Commands/Music/playlists.json', json, 'utf8', function callback(err) {

                    if(err) console.log(err)
                }); // write it back 
            }
        });

    }
};