const { Constants , Client , Permissions} = require("discord.js")
const { bold , createColors } = require("colorette")
const { orange , red , cyan } = createColors({ useColor : true })
const Discord = require("discord.js")

/**
* @async
* @param {Client} client
* @param {Discord} discord 
*/

module.exports = (client) => {
    client.on("ready", () => {
        let arraysOfCommands = new Array()
        console.log(bold(orange(`\n Login in as ${client.user.tag} \n`)))
        console.log("*".repeat(50))
        
        for (const commands of client.slashcommands.entries()) {
            const data = commands[1]
            if(!data.type) data.type = Constants.ApplicationCommandTypes.CHAT_INPUT
            if(!data.permissions) data.permissions = [Permissions.FLAGS.SEND_MESSAGES]
            
            
            if(data.type === Constants.ApplicationCommandTypes.USER || data.type === Constants.ApplicationCommandTypes.MESSAGE || data.type === "MESSAGE" || data.type === "USER") {
                delete data.description
                arraysOfCommands.push({
                    name : data.name,
                    options : data.options,
                    type : data.type
                })
            } else {
                arraysOfCommands.push({
                    name : data.name,
                    description : data.description,
                    type : data.type,
                    options : data.options 
                })
            }
        }
        
        if(client.testOnly === true) {
            console.log(red("(/) Deployed Guild Commands in : "))
            client.guildID.map(id => {
                const guild = client.guilds.cache.get(id)
                if(guild) {
                    guild.commands.set(arraysOfCommands)
                    console.log(guild.name)
                }
            })
        } else {
            console.log(orange("(/) Deployed Guilds Commands !"))
            client.application.commands.set(arraysOfCommands)
        }
        
        console.log(cyan(`Loaded (!) ${client.commands.size} legacy commands and (/) ${client.slashcommands.size} slash command`))
        
        client.commands.map(command => {
            if(command.init) command.init(client)
        })
    })
}
