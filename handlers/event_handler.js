const { existsSync, readdirSync } = require('fs')
const { join } = require('path')


/**
 *  
 */

module.exports = (client) => {
    console.log('EVENTS \n')
    if(!existsSync(client.eventsPath)) return ;
    const load_dir = (dirs) =>{
        const event_files = readdirSync(join(client.eventsPath , `${dirs}`)).filter(file => file.endsWith('.js'))

        for(const file of event_files){
            const event = require(`${client.eventsPath}/${dirs}/${file}`)
            client.events.set(event.name , event)
            client.on(event.name , (...args) => event.run(client , ...args))
            console.log(`${event.name} : ✅`)
        }
      
    }
    const load_events = (client) =>{
           
            const event_files = readdirSync(`${client.eventsPath}`).filter(file => file.endsWith('.js'))
    
            for(const file of event_files){
                const event = require(`${client.eventsPath}/${file}`)
                client.events.set(event.name , event)
                client.on(event.name , (...args) => event.run(client , ...args))
                console.log(`${event.name} : ✅`)
            }

            console.log(`Loaded ${client.events.size} events....`)        
    }
    const events = ['client' , 'guild']

    if(existsSync(join(client.eventsPath , 'client')) && existsSync(join(client.eventsPath , 'guild'))){

        events.forEach(e => load_dir(e))
        console.log(`Loaded ${client.events.size} events. \n`)
        console.log('*'.repeat(50))
    }
    else{
        load_events(client)
    }
}
