const {Client , Interaction, Permissions} = require('discord.js')
const { roleChecker } = require('../extras/roleChecking')

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction
 */

module.exports = async(client) => {
    client.on('interactionCreate' , async(interaction) => {
        
        if(interaction.isCommand() || interaction.isApplicationCommand()){
            if(client.slashcommands.has(interaction.commandName)){
                
                const command = client.slashcommands.get(interaction.commandName)
                const arr = command.permissions.filter(perm => !interaction.member.permissions.has(perm))
            
                if(arr.length == 0 || interaction.guild.ownerId === interaction.member.id){
                    command.execute({interaction : interaction , options : interaction.options , client : client , channel : interaction.channel})
                }
                else{
                    if(command.requiredRoles){
                        const response = await roleChecker({member : interaction.member , command : command})
                        if(response) return command.execute({interaction : interaction , options : interaction.options , client : client , channel : interaction.channel});
                         }
                       
                    return interaction.reply({content : 'You do not have the permission to run this command.' , ephemeral : true})
                }
            }
        }

        if(interaction.isButton()){
            if(client.buttons.has(interaction.customId)){

                const button = client.buttons.get(interaction.customId)
                button.run({interaction : interaction , client : client , channel : interaction.channel})
            }
        }
    })
}
