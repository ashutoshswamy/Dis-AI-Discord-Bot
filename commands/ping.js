const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check the bot's latency and uptime"),

  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const sent = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    });

    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const uptime = ms(client.uptime, { long: true });

    await interaction.editReply(
      `🏓 Pong!\n**Latency:** ${latency}ms\n**Uptime:** ${uptime}`
    );
  },
};
