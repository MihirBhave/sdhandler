
const {Client } = require('discord.js')
const Discord = require('discord.js')
/**
 * @async
 * @param {Client} client
 */

module.exports = (client) =>{
    client.on('ready' , () => {
        let arrayofCommands = new Array()
        const commandsArray = []
        let commands
        console.log(`\nLogged in as ${client.user.tag} \n`) 
        console.log('*'.repeat(50))

        //Adding the Slash Commands to the Array.

        for (var command of client.slashcommands.entries()) {
            const data = command[1]
            if(!data.type) data.type = Discord.Constants.ApplicationCommandTypes.CHAT_INPUT //return console.log(`Please specify the "type" for ${command[0]} slash command.`)

            //Checking the type of the slash command.
            if(data.type == Discord.Constants.ApplicationCommandTypes.USER || data.type == Discord.Constants.ApplicationCommandTypes.MESSAGE || data.type == "MESSAGE" || data.type == "USER"){
                delete data.description
                arrayofCommands.push({
                    name : data.name,
                    options : data.options,
                    type : data.type
                })
            }
            else{
                arrayofCommands.push({
                    name : data.name,
                    description : data.description,
                    type : data.type,
                    options : data.options
                })
            }
        }
        if(client.testOnly == true){
            /*
            const guild = client.guilds.cache.get(client.guildID)
            if(!guild) return console.log(`Guild with ID '${client.guildID} not found.`)
            commands = guild.commands
            */
            // Support for multiple guilds.
        
            client.guildID.map(id => {
                var guild = client.guilds.cache.get(id)
                if(guild){
                    commandsArray.push(guild.commands)
                    console.log(guild.name)
                }
            })
        }
        else{
            
            commands = client.application.commands
        }
        try{
            //
            commandsArray.map(command => command.set(arrayofCommands)) || commands.set(arrayofCommands)
            //commands.set(arrayofCommands)
        }
        catch(err){
            console.log(err)
        }
        console.log(`Loaded ${client.commands.size} command(s).`)
              
    })
}