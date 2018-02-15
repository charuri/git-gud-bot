import { discordBot, fs, cloudStore, stopword} from "../bot.js";

export function addToCloud(message, userID, channelID) {
	if (channelID == 308643303014793216 || channelID == 349718076360622080) { //main channel or bot_testing
		if (userID != 194260124263514112) {	//not sheepbot
			if (!message.startsWith("WordCloud") && !message.startsWith(".pick")){ //dont take wordcloud messages or flowerpicking
				var filteredMsg = message.replace(/[,.?!#%{}$@:)(\\"-'/]+/g, '').toLowerCase(); //take out all symbols + convert to lowercase
				var filterArr = filteredMsg.split(' '); 
				var strArr = stopword.removeStopwords(filterArr);
				strArr.forEach(function (word) {
					if (isNaN(word) && word.length < 15) { //don't process numbers or anything longer than 15 chars 
						if (!word.length) {
							return;
						}
						//todo: refactor
						if (word.includes("http")) {
							return;
						}
						if (word.startsWith("<@") || word.startsWith("`") || word.endsWith(":")) {
							return;
						}
						if (!cloudStore[word]) {
							// console.log(word);
							cloudStore[word] = {
								"count": 1
							};
							updateCloud();
						} else {
							// console.log(word);
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


export default function generateCloud(channelID, arg) {
	var sort_array = [];
	var count = 0;
	for (var word in cloudStore) {
		sort_array.push({word:word, count:cloudStore[word].count});
		count++;
	}
	sort_array.sort(function(x,y){return y.count - x.count});
	if (!isNaN(arg)) {
		var length = arg >= sort_array.length ? sort_array.length : arg;
		if (length == 0) { //default
			length = sort_array.length >= 30 ? 30 : sort_array.length;
		}
		var msg = "WordCloud: Showing the " + length + " most common words in this channel: \n";

		for (var i=0;i<length;i++) {

		    var wordName = sort_array[i].word;
		    var wordCount = sort_array[i].count;
		    msg += (wordName + ": " + wordCount + ", "); 

		}
		var msgLen = msg.length;

		if (msgLen > 2000) {
			var stopInd = msg.substring(0, 2000).lastIndexOf(", ") + 2;
			discordBot.sendMessage({
			    to: channelID,
			    message: msg.substring(0, stopInd)
			});
			msg = msg.substring(stopInd, msgLen);

			sleep(500).then(() => {
				while (msgLen > 2000) {
					stopInd = msg.substring(0, 2000).lastIndexOf(", ") + 2;
					discordBot.sendMessage({
					    to: channelID,
					    message: msg.substring(0, stopInd)
					});

					msg = msg.substring(stopInd, msgLen);
					msgLen = msg.length;
					sleep(500).then(() => {
						return;
					});
				}

				sleep(500).then(() => {
					discordBot.sendMessage({
					    to: channelID,
					    message: msg.substring(0, msgLen)
					});
				});
				
			});
		} else {
			discordBot.sendMessage({
			    to: channelID,
			    message: msg.substring(0, msgLen)
			});
		}
	} else {
		arg = arg.toLowerCase();
		if (cloudStore[arg]) {
			var wordFreq = cloudStore[arg].count;
			var msg = "WordCloud: The frequency of \"" + arg + "\" in this channel is " + wordFreq + ".";
			discordBot.sendMessage({
			    to: channelID,
			    message: msg
			});
		} else {
			discordBot.sendMessage({
			    to: channelID,
			    message: "Word hasn't been typed"
			});
		}
	}
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
