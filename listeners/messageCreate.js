const {Client , Message , Collection}  = require('discord.js')
const Discord = require('discord.js')
const { roleChecker } = require('../extras/roleChecking')
const ms = require('ms');

/**
 * 
 * @param {Client} client 
 * @param {Discord} Discord 
 * @param {Message} message
 */

const Timeout = new Collection();

module.exports = async (client ) => {
    client.on('messageCreate' , async (message) => {
    const prefixes = client.prefix
    const prefix = prefixes.filter(p => message.content.startsWith(p))
 
    if(!prefix.length || message.author.bot) return;

    const args = message.content.slice(prefix[0].length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    if(!command) return ;
    // Handing the cooldowns.

    if(command.timeout){
        if(Timeout.has(`${command.name}${message.author.id}`)) return message.reply({content : `Please wait for  \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` to use the \`${command.name}\` command again !`}).then(msg => setTimeout(() => {msg.delete()} , 5000))
        
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + (command.timeout*1000))
            
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.timeout*1000)
    }

    try{
        let perms = [Discord.Permissions.FLAGS.SEND_MESSAGES]
        let count 
        if(!command.permissions)  count =  message.member.permissions.has(perms)
        else{
            count =  command.permissions.filter(perm => !message.member.permissions.has(perm)) 
        }
        if(count.length == 0  || message.guild.OwnerId === message.member.id || count == true ){
            command.execute({client : client , message : message , args : args , prefix : prefix , channel : message.channel});
        }
        else{
            if(command.requiredRoles){
           const response = await roleChecker({member : message.member , command : command})
           if(response) return command.execute({client : client , message : message , args : args , prefix : prefix , channel : message.channel});
            }
          return message.reply({content : "You don't have the appropriate permissions needed."})
        }
    } 
    catch (err){
        message.reply({content : "There was an error trying to execute this command!"});
        console.log(err);
    }
    })
}