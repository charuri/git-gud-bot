import {
    Discord, discordBot, channelID, config
}
from "../bot.js";

const http = require('http');
const gaussian = require('gaussian');
const distribution = gaussian(0, 3);

var queuedScan;

function cancelScanLoop() {
    clearTimeout(queuedScan);
}

function getRandomPause() {
    return Math.min((Math.abs(distribution.ppf(Math.random())) + 1) * 5000, 25000);
}

function notify(count) {
    discordBot.sendMessage({
        to: channelID,
        message: "<@107720430126661632> <@124045066296623104> <@93461417851621376> GO GET YOUR GUN AT " + config.url
    });

    if (count < 10) {
        console.log("queueing notification");
        setTimeout(function () {
            notify(++count);
        }, 6000);
    }
}

function checkActive(data) {
    if (data.search("includes/languages/english/images/buttons/coming_soon.png") > -1) {
        console.log('not in stock yet');
        refreshScanLoop();
    } else {
        console.log('ACTIVE NOW');
        notify(0);
        cancelScanLoop();
    }
}

function scan() {
    http.get(config.url, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            checkActive(data);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

export default function refreshScanLoop() {
    var pause = getRandomPause();
    console.log("queued scan for " + pause + "ms from now");
    queuedScan = setTimeout(scan, pause);
}
