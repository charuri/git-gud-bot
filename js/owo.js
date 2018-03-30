import { Discord, discordBot } from "../bot.js";

export default function owo(message, channelID) {
    var input = message.toLowerCase();
    input = input.replace(/r\B/gi, "w");
    input = input.replace(/l\B/gi, "w");
    var output = "";
    var k = Math.floor(Math.random() * 3) + 1;
    for (var i = 0; i < input.length; i++) {

        if (k == 0) {
            output += input[i].toUpperCase();
            k = Math.floor(Math.random() * 3) + 1;
            continue;
        } else if (k > 0) {

            output += input[i];
            k--;
        }
    }

    output = "**```fix\n" + "OwO " + output.substr(5) + " UwU *starts twerking* kawaii!!!!!```**";

    // TODO: figure out how to send event embeds instead of message
    discordBot.sendMessage({
        to: channelID,
        message: output
    });
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
