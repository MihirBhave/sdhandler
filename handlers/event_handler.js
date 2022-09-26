const fs = require('fs')
const path = require('path')
const { bold, blue } = require("colorette")


/**
 *  
 */

module.exports = async (client) => {
    console.log(bold(blue('EVENTS \n')))
    if(!fs.existsSync(client.eventsPath)) return ;
    const load_dir = async(dirs) =>{
        const event_files = fs.readdirSync(path.join(client.eventsPath , `${dirs}`)).filter(file => file.endsWith('.js'))

        for(const file of event_files){
            const event = require(`${client.eventsPath}/${dirs}/${file}`)
            client.events.set(event.name , event)
            client.on(event.name , (...args) => event.run(client , ...args))
            console.log(`${event.name} : ✅`)
        }
      
    }
    const load_events = async (client) =>{
           
            const event_files = fs.readdirSync(`${client.eventsPath}`).filter(file => file.endsWith('.js'))
    
            for(const file of event_files){
                const event = require(`${client.eventsPath}/${file}`)
                client.events.set(event.name , event)
                client.on(event.name , (...args) => event.run(client , ...args))
                console.log(`${event.name} : ✅`)
            }

            console.log(`Loaded ${client.events.size} events....`)        
    }
    const events = ['client' , 'guild']

    if(fs.existsSync(path.join(client.eventsPath , 'client')) && fs.existsSync(path.join(client.eventsPath , 'guild'))){

        events.forEach(e => load_dir(e))
        console.log(`Loaded ${client.events.size} events. \n`)
        console.log('*'.repeat(50))
    }
    else{
        load_events(client)
    }
}
