require('dotenv').config();
const fetch = require('node-fetch');
const { Client, Intents } = require('discord.js');
const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
});
const token = process.env.TOKEN;
const uknownCommand =
  'Mi dispiace non conosco il comando che mi hai dato, digita /help per la lista dei comandi';

const commands = ['/help', '/random', '/random nome'];

let commandList = 'Ecco la lista dei comandi accettati: \n';

const baseApiURL = 'http://api.robertosaliola.eu/quotes';


const printCommandList = () => {
  commands.forEach((command) => (commandList += command + '\n'));
  return commandList;
};
const formatQuote = (quote) => {
  return `${JSON.stringify(quote.quoteText)} ~ 
  ${JSON.stringify(quote.authorName)} ~ 
  ${JSON.stringify(quote.date)}`;
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

const findCommand = (msg) => {
  switch (msg) {
    case '/help':
      return printCommandList();

    case '/random':
      const data = getRandomQuote().then((data) => {console.log(data);return data});
      return formatQuote(data);

    default:
      return uknownCommand;
  }
};

client.once('ready', () => {
  console.log('BOT IS ONLINE'); //message when bot is online
});
console.log(token);
client.login(token);


client.on('messageCreate', async (message) => {
  if (message.content[0] === '/') {
    message.reply(findCommand(message.content));
  }
});

