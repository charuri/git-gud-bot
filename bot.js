// require
require('babel-register');

export var Discord = require('discord.io');
export var fs = require('fs');
export var parseArgs = require('minimist');

import updateFlagParams from "./js/utils.js";
import getFishy from "./js/fishing.js";
import getSassy from "./js/sassing.js";
import pickFlower from "./js/flowerPicking.js";
import mockify from "./js/spongebob.js";

// default config
export var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// bots
export var discordBot;
var creds = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
console.log("got credentials");

// discord client config
var discordToken = creds.token;
export var channelID = creds.channelID;

// cmdline args
updateFlagParams();

// bot uptime tracking
var startTime = new Date();

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

        // begin fishing
        console.log('starting to fish');
        getFishy();
        startMessageWatchers();
    });
}

// start message watchers
function startMessageWatchers() {
    discordBot.on('message', function(user, userID, channelID, message, event) {
        // logging
        // console.log("user ", user);
        // console.log("userID ", userID);
        // console.log("channelID ", channelID);
        // console.log("message ", message);
        // console.log("event mentions ", event.d.mentions);
        // console.log("event embeds" , event.d.embeds);
        // console.log("\n");

        // sass when ppl mention user
        if (config.sassEnabled) {
            var mentions = event.d.mentions;
            mentions.forEach(function (mention) {
                // console.log(mention.username);
                if (mention.username === discordBot.username) {
                    getSassy(channelID);
                }
            });
        }

        // take their life and their dreams
        if (config.pickingEnabled) {
            if (message.endsWith("`.pick`")) {
                pickFlower(channelID);
            }
        }

        // $mock
        if (message.startsWith("$mock")) {
            mockify(message, channelID);
        }
    });
}
