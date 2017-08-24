import { Discord, discordBot, channelID, config } from "../bot.js";

// heck
export default function getSassy(channelID) {
    discordBot.sendMessage({
        to: channelID,
        message: "no."
    });
    console.log("sassed");
}
