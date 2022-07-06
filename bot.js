require('dotenv').config(); //to start process from .env file

const { Client, Intents } = require('discord.js');
const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
});

const isCommandRandomQuote = (msg) => {
  return msg.content === '/random';
};

client.once('ready', () => {
  console.log('BOT IS ONLINE'); //message when bot is online
});

client.login(process.env.TOKEN);
