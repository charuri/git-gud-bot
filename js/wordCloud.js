import { discordBot, fs, cloudStore, stopword} from "../bot.js";

export function addToCloud(message, userID, channelID) {
	if (channelID == 308643303014793216) {
		if (userID != 194260124263514112) {
			if (!message.startsWith("WordCloud") && !message.startsWith(".pick")){
				var filteredMsg = message.replace(/[,.?!$:]+/g, '').toLowerCase();
				var filterArr = filteredMsg.split(' ');
				var strArr = stopword.removeStopwords(filterArr);
				strArr.forEach(function (word) {
					if (isNaN(word)) {
						if (!word.length) {
							return;
						}
						if (word.includes("http")) {
							return;
						}
						if (word.startsWith("<@") || word.startsWith("`") || word.endsWith(":")) {
							return;
						}
						if (!cloudStore[word]) {
							//console.log(word);
							cloudStore[word] = {
								"count": 1
							};
							updateCloud();
						} else {
							var prev = cloudStore[word].count;
							cloudStore[word] = {
								"count": prev + 1
							};
							//console.log(word + " " + (prev + 1));
							updateCloud();
						}
					}
				});
			}
		}
	}
	
	
}
export function updateCloud () {
	var updateFile = {cloudStore: cloudStore};
	fs.writeFile('./json/cloudStore.json', JSON.stringify(updateFile, null, 4), (error) => {
		if (error) {
			console.log("There has been an error updating cloudStore.json: ", error);
		}
	});
}

export function clearCloud () {
	var blank = {};
	var updateFile = {cloudStore: blank};
	fs.writeFile('./json/cloudStore.json', JSON.stringify(updateFile, null, 4), (error) => {
		if (error) {
			console.log("There has been an error updating cloudStore.json: ", error);
		}
	});
}


export default function generateCloud(channelID, num) {
	var sort_array = [];
	for (var word in cloudStore) {
		sort_array.push({word:word, count:cloudStore[word].count});
	}
	sort_array.sort(function(x,y){return y.count - x.count});
	// sort_array.forEach(function(wordObj) {
	// 	console.log(wordObj.word + " "+ wordObj.count)
	// });
	var length = num >= sort_array.length ? sort_array.length : num;
	if (length == 0) { //default
		length = sort_array.length >= 30 ? 30 : sort_array.length;
	}
	var msg = "WordCloud: Showing the " + length + " most common words in this channel: \n";
	for (var i=0;i<length;i++) {
		//console.log(sort_array[i]);
	    var wordName = sort_array[i].word;
	    var wordCount = sort_array[i].count;
	    msg += (wordName + ": " + wordCount + ", "); 
	}
	discordBot.sendMessage({
	    to: channelID,
	    message: msg
	});
}