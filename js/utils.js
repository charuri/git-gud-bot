import { fs, parseArgs, config } from "../bot.js";

export default function updateFlagParams() {
    var argkeys = JSON.parse(fs.readFileSync('flag-params.json', 'utf8'));
    var args = parseArgs(process.argv, argkeys);
    console.log("got argkeys");

    config.sassEnabled = args.s;
    config.fishingEnabled = args.f;
    config.pickingEnabled = args.p;
    config.killMode = args.k;
    config.pickThreshold = args.hasOwnProperty('threshold') ? args.threshold : config.pickThreshold;

    console.log("sassy bot: " + config.sassEnabled);
    console.log("autofishing: " + config.fishingEnabled);
    console.log("autopicking: " + config.pickingEnabled);
    console.log("autopicking snipe probability: " + config.pickThreshold);
    console.log("kill mode: " + config.killMode);
}
