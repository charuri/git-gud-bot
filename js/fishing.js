import { Discord, discordBot, channelID } from "../bot.js";
var gaussian = require('gaussian');
var distribution = gaussian(0, 15);

function getRandomPause() {
    return Math.min((Math.abs(distribution.ppf(Math.random())) + 1) * 30000, 1500000)
}

// for the "humans"
function shouldSleep() {
    var currentTime = new Date();
    console.log(currentTime.getTime() - startTime.getTime());
    // TODO: implement day/night tracking and daytime periodic sleep
}

// as stated...
export default function getFishy() {
    discordBot.sendMessage({
        to: channelID,
        message: "t!fish"
    });

    console.log('fished');

    var nextInterval = getRandomPause();
    setTimeout(getFishy, nextInterval);

    console.log("queued self to fire in " + nextInterval + "ms");
}
