<h1 align="center">Welcome to SDHandler </h1>
<p align="center"><i>A package aimed at making sure that Discord bots are developed more easily !!</i></p>

<div align="center">
    <a href="https://github.com/Mihirbhave/sdhandler/stargazers"><img src="https://img.shields.io/github/stars/MihirBhave/sdhandler" alt="Stars Badge"/></a>
    <a href="https://github.com/Mihirbhave/sdhandler/network/members"><img src="https://img.shields.io/github/forks/MihirBhave/sdhandler" alt="Forks Badge"/></a>
    <a href="https://github.com/Mihirbhave/sdhandler/pulls"><img src="https://img.shields.io/github/issues-pr/MihirBhave/sdhandler" alt="Pull Requests Badge"/></a>
    <a href="https://github.com/Mihirbhave/sdhandler/issues"><img src="https://img.shields.io/github/issues/MihirBhave/sdhandler" alt="Issues Badge"/></a>
    <a href="https://github.com/Mihirbhave/sdhandler/graphs/contributors"><img src="https://img.shields.io/github/contributors/MihirBhave/sdhandler" alt="Contributors Badge"/></a>
    <a href="https://github.com/Mihirbhave/sdhandler/blob/main/LICENSE"><img src="https://img.shields.io/github/license/MihirBhave/sdhandler" alt="LICENSE Badge"/></a>
</div>
<br>
<h2>Introduction</h2>
<p><i>This package was developed to make development of Discord bots using Discord.js package more easy. All the commands ( legacy and slash commands) , Events ( guild and client ) and Buttons are handled by this package. Thus no need to make a event/command handler !</i></p>

<br>

<h2>Usage</h2>
<p>So basically you start by cloning the package in your terminal/cmd</p>
``` js
 git clone MihirBhave/sdhandler
```
<br>
<p>Open your project and bring the package . Next , open your index.js (YOUR MAIN FILE) and import the package </p>
``` js
    const sdhandler = require('./sdhandler')


```
<br>
<p> Now lets use the package !</p>
``` js
const sdhandler = require('./sdhandler')

sdhandler.sdhandler({
    client : client ,//Supply the Client Object 
    testOnly : true,  // Use true if you want to test the slash commands for the guild only 
    guildID : "YOUR-GUILD-ID" , // The GUILD ID if you have set testOnly to true
    commandsDir : "commands-path", // (Optional) The relative path to your commands folder. If nothing is provided ./commands will be taken by default
    eventsDir : "events-path" , // (Optional) The relative path to your events folder . If nothing is given ./events will be taken by default
    token : "YOUR-TOKEN" , // The token of your Bot
    prefix : "PREFIX" , // The prefix of your Bot (For Slash commands). Default is "!" 
    buttonsDir : "buttons-path" // (Optional) The relative path to your buttons folder. If nothing is given , ./buttons will be taken by default
})
```
<br>
<h3 align="center">Commands</h3>
<br>
<p>Alright , So the setup for your bot to work is done. Now lets start test this package out. Go into your commands folder (The one which you supplied to the bot) and lets make a new file called as "ping.js". </p>
<br>
```js
    module.exports = {
        name : 'ping', // The name of your command
        description : 'Replies with a pong !', // A brief description of what your command does
        permissions : [Permissions.FLAGS.SEND_MESSAGES] , // The permission you want the USER to have in order to run the command
        slash : true , // If you want this command to be a slash command as well set it to true.
        async execute({message , interaction}) {
            // CODE-HERE
        }
    }
```
<br>
<p>The execute function  consists of 5 parameters : args (Options of legacy commands) , message (Message Component of Legacy Command) , client(Client Object) , interaction (Interaction Componenent of a slash command) , options(The options of the slash command).</p>
<br>
<p>Lets run the execute function</p>
```js
    async execute({message , interaction }){ // Let us use the parameters we need
        if(message){ // If a Message Component is returned
            await message.reply({content "Pong ! "})
        }

        if(interaction){ // If a Interaction Component is returned
            await interaction.reply({content : 'Pong!' , ephemeral : true})
        }
    }
```
<h3 align="center">Events</h3>
<br>
<p>Let us now test the events ! Go into your events folder , for this example lets make a file called "message.js" . This event will get triggered when someone sends a message int he guild/DM. </p>
```js
    module.exports = {
        name : 'messageCreate' , // Name of the event you want to listen to.
        async run(message) { 
            console.log(`${message.content}`)
        }
    }

```
<br>
<h3 align="center">Buttons</h3>
<p>Now lets try the buttons. Navigate to your Buttons folder and create a nodeJS file. </p>
```
    module.exports = {
        name : 'button-custom-ID' ,// The custom ID of the button 
        async run({client , interaction}){
            // Do whatever you want the button to do.
        }
    }
```
