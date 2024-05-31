const { REST, Routes } = require('discord.js');
require('dotenv').config();
const token = process.env.TOKEN;
const clientId = process.env.APP_ID;
const fs = require('fs');
const path = require('path');

const commands = []

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      commands.push(command.data);
    } else {
      console.log(`The command at ${filePath} is missing required data or execute property`)
    }
  }
}

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application commands`);

    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    )

    console.log(`Successfully reloaded ${data.length} application commands`)
  } catch (error) {
    console.log(error);
  }
})();