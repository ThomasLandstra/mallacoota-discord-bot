// Requirements
require("dotenv").config();
const { Client, MessageEmbed, Channel } = require("discord.js");
const fetch = require('node-fetch');

// Create required variables
const client = new Client({partials: ["MESSAGE"]});
const prefix = ".";
const bugListID = "6070f74555ec8e82fbae4684";
const bugLabelID = "6070f73dda9ba96c3e7ced5f";

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
                message.channel.send(`<@${message.author.id}> 🏓 API Latency is ${Math.round(client.ws.ping)}ms`);
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
        } else if(cmd == "bug"){
            try {
                message.channel.send(`<@${message.author.id}>, attempting to add bug to Trello.`);
            } catch (error) {
                try {
                    message.channel.send("Something went wrong");
                } catch (error){
                    console.log("Error sending error message for bug command: " + Date());
                    console.log(error);
                }
                console.log("Error sending message for bug command: " + Date());
                console.log(`Author: ${message.author.id}, In: ${message.channel.id}`);
                console.log(error);
            }
            fetch(`https://api.trello.com/1/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}&name=${args.join(" ")}&pos=top&idList=${bugListID}&idLabels=${bugLabelID}`, {
                method: 'POST'
            })
            .then(response => {
                console.log(
                `Response for adding card to trello: ${response.status} ${response.statusText}`
                );
                try {
                    message.channel.send(`<@${message.author.id}>, bug added to Trello.`);
                } catch (error) {
                    try {
                        message.channel.send("Something went wrong. Bug added to Trello tho so...");
                    } catch (error){
                        console.log("Error sending error message for bug command success: " + Date());
                        console.log(error);
                    }
                    console.log("Error sending message for bug command success: " + Date());
                    console.log(`Author: ${message.author.id}, In: ${message.channel.id}`);
                    console.log(error);
                }
                return response.text();
            })
            .then(text => console.log(text))
            .catch(err => {
                console.error(err);
                try {
                    message.channel.send("Something went wrong. Bug not added to Trello.");
                } catch (error){
                    console.log("Error sending error message for bug command Trello Failure: " + Date());
                    console.log(error);
                }
                console.log("Error sending message for bug command Trello Failure: " + Date());
                console.log(`Author: ${message.author.id}, In: ${message.channel.id}`);
                console.log(error);
            });
        }
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN);