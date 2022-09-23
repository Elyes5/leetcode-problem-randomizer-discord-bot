import fetch from 'node-fetch';
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv'
dotenv.config();
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});
var problem = "";
const getRandomProblem = (data) => {
    const randomNumber = Math.floor(Math.random() * (data.stat_status_pairs.length));
    if (data.stat_status_pairs[randomNumber].paid_only)
        getRandomProblem(data);
    else 
    {
        const channel = client.channels.cache.find(channel => channel.name === 'problem-solving');
        channel.send("https://leetcode.com/problems/"+data.stat_status_pairs[randomNumber].stat.question__title_slug);
    }

}
client.on("messageCreate", async (message) =>{
if (message.content === "-leetcode start") {

    fetch("https://leetcode.com/api/problems/all/").then(response => response.json())
    .then(data => {
        getRandomProblem(data);

    })
}

})
client.login(process.env.ENV_VARIABLE);
