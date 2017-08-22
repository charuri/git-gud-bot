// require
var Discord = require('discord.io');
var fs = require('fs');

// bots
var discordBot;
var creds = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
console.log("got credentials");

// discord client params
var discordToken = creds.token;
var channelID = creds.channelID;

// gogogogogogo
init();

// init client
function init() {
    createDiscordBot();
}

// init discord bot
function createDiscordBot() {
    // get discord client
    console.log("initializing discord bot");
    discordBot = new Discord.Client({
        autorun: true,
        token: discordToken
    })
    console.log("-> discord bot initialized");  

    // start bot
    discordBot.on('ready', function (event) {
        console.log('-> logged in as %s - %s\n', discordBot.username, discordBot.id);
        
        // begin shitpost loop
        console.log('starting to fish');
        getFishy();
    });
    
    discordBot.on('message', function(user, userID, channelID, message, event) {
        // do nothing...
    });
}

// as stated...
function getFishy() {
    discordBot.sendMessage({
        to: channelID,
        message: "t!fish"
    });
    
    console.log('fished');
    
    setTimeout(getFishy, 30000);
    console.log("queued self");
}