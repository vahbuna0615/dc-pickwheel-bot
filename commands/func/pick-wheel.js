const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('picker')
    .setDescription('Pick from any of the given options')
    .addStringOption(option =>
      option.setName("choice")
        .setDescription("Comma-separated list of choices")
        .setRequired(true)
      )
    .toJSON(),
  async execute(interaction) {

    const { options } = interaction;

    const params = options.getString('choice');
    const choices = params.split(',').map(choice => choice.trim());

    const randomIndex = Math.floor(Math.random() * choices.length)

    await interaction.reply(`Choices - ${choices}, Final Choice - ${choices[randomIndex]}`);
  
  }
 
}