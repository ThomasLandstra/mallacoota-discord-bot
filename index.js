// Requirements
require("dotenv").config();
const { Client, MessageEmbed, Channel } = require("discord.js");

// Create required variables
const client = new Client({partials: ["MESSAGE"]});
const prefix = ".";

// Start Message
client.on('ready', () => {
    console.log("Mallacoota is online @ " + client.readyAt + ".");
});

// Commands
client.on('message', async message => {
    if (message.author.bot) return; // If message was sent by a got ignore
    if (message.content.startsWith(prefix)){ // If the message was sent with the prefix
        // Split Command
        const [cmd, ...args] = message.content.trim().substring(prefix.length).split(/\s+/);

        //Ping Command
        if(cmd === "ping"){
            try {
                message.channel.send(`<@${message.author.id}> 🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
            } catch (error) {
                try {
                    message.channel.send("Something went wrong");
                } catch (error){
                    console.log("Error sending error message for ping command: " + Date());
                    console.log(error);
                }
                console.log("Error sending message for ping command: " + Date());
                console.log(`Author: ${message.author.id}, In: ${message.channel.id}`);
                console.log(error);
            }
        }
    }
})
