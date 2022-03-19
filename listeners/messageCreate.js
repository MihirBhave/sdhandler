const {Client , Message}  = require('discord.js')
const Discord = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {Discord} Discord 
 * @param {Message} message
 */
module.exports = (client ) => {
    client.on('messageCreate' , (message) => {
    const prefixes = client.prefix
    const prefix = prefixes.filter(p => message.content.startsWith(p))
    if(!prefix || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    
    if(!command) return ;

    try{
        let perms = [Discord.Permissions.FLAGS.SEND_MESSAGES]
        let count 
        if(!command.permissions)  count =  message.member.permissions.has(perms)
        else{
            count =  command.permissions.filter(perm => !message.member.permissions.has(perm)) 
        }
        if(count.length == 0  || message.guild.OwnerId === message.member.id || count == true ){
            command.execute({client : client , message : message , args : args , prefix : prefix});
        }
        else{
            message.reply({content : "You don't have the appropriate permissions needed."})
        }
    } 
    catch (err){
        message.reply({content : "There was an error trying to execute this command!"});
        console.log(err);
    }
    })
}