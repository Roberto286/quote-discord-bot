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

const printCommandList = () => {
  commands.forEach((command) => (commandList += command + '\n'));
  return commandList;
};

const findCommand = (msg) => {
  switch (msg) {
    case '/help':
      return printCommandList();

    case '/random':
      return console.log();

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

// const formatQuote = (quote) => {
//   return `${JSON.stringify(quote.quoteText)} ~ ${JSON.stringify(
//     quote.authorName
//   )} ~ ${JSON.stringify(quote.date)}`;
// };

// async function getJSONResponse(body) {
//   let fullBody = '';

//   for await (const data of body) {
//     fullBody += data.toString();
//   }

//   return JSON.parse(fullBody);
// }