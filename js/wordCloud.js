import { discordBot, fs, cloudStore, stopword} from "../bot.js";

export function addToCloud(message, userID, wordStats) {
	//need to remove sheepBot msgs 
	var filteredMsg = stopword.removeStopwords(message).toLowerCase();
	filteredMsg = filteredMsg.replace(/[,.?!]+/, '');
	var strArr = filteredMsg.split(' ');
	strArr.forEach(function (word) {
		if (!word.length) {
			continue;
		}
		if (word.includes("http")) {
			continue;
		}
		if (wordStats[word] === undefined) {
			wordStats[word] = 1;
		} else {
			wordStats[word]++;
		}

	});
	// fs.writeFile('./json/cloudStore.json', message, (error) => {
 //        /* handle error */
 //        if (error) {
 //            console.log("There has been an error updating cloudStore.json: ", error);
 //        }
 //    });
}
export function generateCloud(channelID, wordStats) {
	var sortedWordStatsKeys = Object.keys(wordStats).sort(function (a, b) {
	    return wordStats[b] - wordStats[a];
	});
	var msg = "Showing 30 most commmon words in this channel: \n";
	for (var i = 0; i < 31; i++) {
		var key = sortedWordStatsKeys[i];
		msg += key + ": " + wordStats[key] + ", ";
	}
	// sortedWordStatsKeys.forEach(function (key) { 
		
	// });
	discordBot.sendMessage({
	    to: channelID,
	    message: msg
	});
}