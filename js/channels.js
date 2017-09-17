import { discordBot, fs, channels, users, permissions } from "../bot.js";
import checkPermissions from "./permissions.js";


export default function handleChannels(channelID, userID, message) {
    // console.log("in handle channels");

    // enable
    if (message === "$enable") {
        if (checkPermissions(userID, channelID)) {
            enable(channelID);
        }
    }

    // disable
    if (message === "$disable") {
        if (checkPermissions(userID, channelID)) {
            disable(channelID);
        }
    }

}

function enable (channelID) {
    // console.log("in channel enable");

    if (isEnabled(channelID)) {
        // console.log("channel is already enabled");
        discordBot.sendMessage({
            to: channelID,
            message: "```fix\nThis channel has already been enabled.```"
        });
    }
    else {
        channels[channelID] = "enabled";
        update();
        discordBot.sendMessage({
            to: channelID,
            message: "```fix\nThis channel has been enabled.```"
        });
        // console.log("channels ", channels);
        // console.log("channel enabled");
    }
}

function disable (channelID) {
    // console.log("in channel disable");
    if (isEnabled(channelID)) {
        discordBot.sendMessage({
            to: channelID,
            message: "```fix\nThis channel has been disabled.```"
        });
        channels[channelID] = "disabled";
        update();
        // console.log("channels ", channels);
        // console.log("channel enabled");
    }
    else {
        // console.log("channel is already disabled/doesn't exist");
        discordBot.sendMessage({
            to: channelID,
            message: "```fix\nThis channel has not been enabled yet.```"
        });
    }
}

function isEnabled (channelID) {
    if (channels[channelID] === "enabled") {
        return true;
    }
    else {
        return false;
    }
}

function update () {
    var updateFile = { channels: channels };
    fs.writeFile('./json/channels.json', JSON.stringify(updateFile, null, 4), (error) => { /* handle error */
        if (error) {
            console.log("There has been an error updating channels.json: ", error);
        }
    });
}
