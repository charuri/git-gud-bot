import { Discord, discordBot, channelID, config } from "../bot.js";

export default function betFlipper(channelID, bet) {
        setTimeout(function(){
            // console.log('delay');
            discordBot.sendMessage({
                to: channelID,
                message: ".bf " + bet + " h"
            });
        }, 500);
}