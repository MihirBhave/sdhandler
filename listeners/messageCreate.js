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
    const prefix = client.prefix
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    
    if(!command) return ;

    try{
        const count =  command.permissions.filter(perm => !message.member.permissions.has(perm))
        if(count.length == 0  || message.guild.OwnerId === message.member.id){
            command.execute({client : client , message : message , args : args});
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