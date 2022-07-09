require('dotenv').config();
const fetch = require('node-fetch');
const { Client, Intents } = require('discord.js');
const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
});
const token = process.env.TOKEN;
const unknownCommand =
  'Mi dispiace non conosco il comando che mi hai dato, digita /help per la lista dei comandi';

const commands = ['/help', '/random', '/random nome'];

let commandList = 'Ecco la lista dei comandi accettati: \n';

const baseApiURL = 'http://api.robertosaliola.eu/quotes';

const printCommandList = () => {
  commands.forEach((command) => (commandList += command + '\n'));
  return commandList;
};
const formatQuote = (quote) => {
  console.log(quote['quote'][0].quoteText);
  return ` ${quote['quote'][0].quoteText} ~
  ${quote['quote'][0].authorName} ~
  ${quote['quote'][0].date}`;
};


const getRandomQuote = async () => {
  try{
    const res = await fetch(baseApiURL + '/random');
    const data = await res.json();
    return data;
  }catch(e){
    console.error(e);
  }
};

const findCommandAndReply = (msg) => {
  switch (msg.content) {
    case '/help':
      return msg.reply(printCommandList()); 

    case '/random':
      return getRandomQuote().then((data) => {
        msg.reply(formatQuote(data));                      
      })
               
    default:
      return msg.reply(unknownCommand);
  }
};

client.once('ready', () => {
  console.log('BOT IS ONLINE'); //message when bot is online
});

client.login(token);


client.on('messageCreate', (message) => {
  if (message.content[0] === '/') {
    findCommandAndReply(message);
  }
});

