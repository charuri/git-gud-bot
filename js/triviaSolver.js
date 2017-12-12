import { Discord, discordBot, fs, _, config, triviaQuestions} from "../bot.js";


export default function triviaSolver(channelID, event) {
    event.d.embeds.forEach((embed) => {
        //console.log(embed);
        if (embed.title=="Trivia Game" && embed.fields) {
            var temp = embed.fields[1].value;
            var question = temp.replace(/\\/g,'');
            //console.log(question);
            var tqLen = triviaQuestions.length;
            for (var i = 0; i < tqLen; i++) {
                if (triviaQuestions[i].Question.replace(/\\/g,'') == question) {
                    discordBot.sendMessage({
                        to: channelID,
                        message: triviaQuestions[i].Answer.replace(/\\/g,'')
                    });
                    return;
                }
            }
            
        }
        if (embed.title == "Final Results") {
            discordBot.sendMessage({
                to: channelID,
                message: '.t'
            });
        }
    });
}
