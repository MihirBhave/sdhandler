const { existsSync, lstatSync, readdirSync }  = require('fs')

module.exports = (client) =>{
    if(!existsSync(client.commandsPath)) return ;

    if(!lstatSync(client.commandsPath).isDirectory()) return ;
    const contents = readdirSync(`${client.commandsPath}`)
    const categories = contents.filter(c => lstatSync(`${client.commandsPath}/${c}`).isDirectory())
    if(categories.length > 0){
        
        for(const category of categories){
            const commandFiles = readdirSync(`${client.commandsPath}/${category}`).filter(file => file.endsWith('.js'))
            console.log(`\nCommands \n`)
            for(const file of commandFiles){
                const command = require(`${client.commandsPath}/${category}/${file}`)
                
                if(command.name){
                    client.commands.set(command.name , command)
                    console.log(`${command.name} : ✅`)
                    if(command.slash){
                        if(command.slash == true){
                            client.slashcommands.set(command.name , command)
                        }
                    }
                }
                else{
                    continue;
                }
            }
        }
    }
    else{
        const commandFiles = readdirSync(`${client.commandsPath}`).filter(file => file.endsWith('.js'))
            for(const file of commandFiles){
                const command = require(`${client.commandsPath}/${file}`)
    
                if(command.name){
                    client.commands.set(command.name , command)
                    console.log(`${command.name} : ✅`)
                    if(command.slash){
                        if(command.slash == true){
                            client.slashcommands.set(command.name , command)
                        }
                    }

                }
                else{
                    continue;
                }
            }
    }

}
