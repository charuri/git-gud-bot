import { discordBot, fs, cloudStore, stopword} from "../bot.js";

export function addToCloud(message) {
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
		if (!cloudStore[word]) {
			cloudStore[word] = {
				"count": 1;
			};
			updateCloud();
		} else {
			var prev = cloudStore[word].count;
			cloudStore[word] = {
				"count": prev + 1;
			};
			updateCloud();
		}

	});
}
export function updateCloud () {
	var updateFile = {cloudStore: cloudStore};
	fs.writeFile('./json/cloudStore.json', JSON.stringify(updateFile, null, 4), (error) => {
		if (error) {
			console.log("There has been an error updating cloudStore.json: ", error);
		}
	});
}


export function generateCloud(channelID) {
	var sort_array = [];
	for (var word in cloudStore) {
		sort_array.push({word:word, count:cloudStore[word].count});
	}
	sort_array.sort(function(x,y){return x.count - y.count});

	var msg = "Showing 30 most commmon words in this channel: \n";
	for (var i=0;i<31;i++) {
	    var wordName = sort_array[i].word;
	    var wordCount = sort_array[i].count;
	    msg += (wordName + ": " + wordCount + ", "); 
	}
	discordBot.sendMessage({
	    to: channelID,
	    message: msg
	});
}