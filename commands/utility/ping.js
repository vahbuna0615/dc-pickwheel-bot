const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('sends details about the user executing the command')
    .toJSON(),
  async execute(interaction) {
    await interaction.reply(` User details - ${interaction.user}`)
  }
}