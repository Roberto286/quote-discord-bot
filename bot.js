require('dotenv').config(); //to start process from .env file
const { request } = require('undici');
const { Client, Intents } = require('discord.js');
const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
});
const uknownCommand =
  'Mi dispiace non conosco il comando che mi hai dato, digita /help per la lista dei comandi';

const commands = ['/help', '/random', '/random nome'];

let commandList = 'Ecco la lista dei comandi accettati: \n';

const apiURL = 'http://api.robertosaliola.eu/quotes';

let quoteResult;

const printCommandList = () => {
  commands.forEach((command) => (commandList += command + '\n'));
  return commandList;
};
const formatQuote = (quote) => {
  return `${JSON.stringify(quote.quoteText)} ~ 
  ${JSON.stringify(quote.authorName)} ~ 
  ${JSON.stringify(quote.date)}`;
};

const getJSONResponse = async (body) => {
  let fullBody = '';

  for await (const data of body) {
    fullBody += data.toString();
  }

  return JSON.parse(fullBody);
};

const getRandomQuote = async () => {
  const quoteReqRes = await request(apiURL + '/random');
  console.log(apiURL + '/random');
  return await getJSONResponse(quoteReqRes.body);
};

const findCommand = (msg) => {
  switch (msg) {
    case '/help':
      return printCommandList();

    case '/random':
      return getRandomQuote().then((quote) => {
        // console.log(typeof quote);
        return formatQuote(quote);
      });

    default:
      return uknownCommand;
  }
};

client.once('ready', () => {
  console.log('BOT IS ONLINE'); //message when bot is online
});

client.login(process.env.TOKEN);

client.on('messageCreate', async (message) => {
  if (message.content[0] === '/') {
    message.reply(findCommand(message.content));
  }
});

