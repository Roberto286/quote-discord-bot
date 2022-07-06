require('dotenv').config(); //to start process from .env file
const { request } = require('undici');

const { Client, Intents } = require('discord.js');
const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
});

const isCommandRandomQuote = (msg) => {
  return msg.content === '/random';
};

async function getJSONResponse(body) {
  let fullBody = '';

  for await (const data of body) {
    fullBody += data.toString();
  }

  return JSON.parse(fullBody);
}

client.once('ready', () => {
  console.log('BOT IS ONLINE'); //message when bot is online
});

client.login(process.env.TOKEN);

// client.on('messageCreate', async (message) => {
//   if (isCommandRandomQuote(message)) {
//     const quoteResult = await request(
//       'http://api.robertosaliola.eu/quotes/random'
//     );
//     const quoteJSON = await getJSONResponse(quoteResult.body);

//     console.log(quoteJSON);
//     message.reply(`${JSON.stringify(quoteJSON[0].quoteText)}`);
//   }
// });
