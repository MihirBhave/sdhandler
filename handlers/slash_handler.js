
const {Client , Permissions} = require('discord.js')
const Discord = require('discord.js')
/**
 * @async
 * @param {Client} client
 * @param {Discord} Discord
 */

module.exports = (client) =>{
    client.on('ready' , () => {
        let arrayofCommands = new Array()
        console.log(`\nLogged in as ${client.user.tag} \n`) 
        console.log('*'.repeat(50))

        //Adding the Slash Commands to the Array.

        for (var command of client.slashcommands.entries()) {
            const data = command[1]
            if(!data.type) data.type = Discord.Constants.ApplicationCommandTypes.CHAT_INPUT
            if(data.permissions) data.permissions = [Permissions.FLAGS.SEND_MESSAGES]

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
        if(client.testOnly === true){
            
            console.log("[+] Deployed Guild Commands in : ")
            client.guildID.map(id => {
                var guild = client.guilds.cache.get(id)
                if(guild){
                   guild.commands.set(arrayofCommands)
                    console.log(guild.name)
                }
            })
        }
        else{
            console.log("[+] Deployed Global Commands !")
             client.application.commands.set(arrayofCommands)
        }

        console.log(`Loaded ${client.commands.size} legacy command(s) and ${client.slashcommands.size} slash commands !`)
              
    })
}