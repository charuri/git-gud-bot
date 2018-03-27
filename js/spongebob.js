import { Discord, discordBot } from "../bot.js";

// mock mock mock
export default function mockify(message, channelID) {
    var input = message.toLowerCase();
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

    output = "<:spongemock:337308048156786688>***```fix\n" + output.substr(6) + "```***";

    // TODO: figure out how to send event embeds instead of message
    discordBot.sendMessage({
        to: channelID,
        message: output
    });
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
