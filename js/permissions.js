import { discordBot, users, permissions } from "../bot.js";

export default function checkPermissions (userID, channelID) {
    if (users[userID].permission < 2) {
        return true;
    }
    else {
        discordBot.sendMessage({
            to: channelID,
            message: "```fix\nYou must be an admin or manager to use this command.```"
        });
        return false;
    }
}
