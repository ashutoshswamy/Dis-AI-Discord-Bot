require("dotenv").config();
const discord = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("ask-ai")
    .setDescription("Ask the AI a question")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Your question to AI")
        .setRequired(true)
    ),

  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const question = interaction.options.getString("question");

    await interaction.deferReply();

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent(question);
      const response = result.response.text();

      await interaction.editReply({
        content:
          response.length > 2000 ? response.slice(0, 1997) + "..." : response,
      });
    } catch (error) {
      console.error("Gemini API Error:", error);
      await interaction.editReply({
        content: "Sorry, something went wrong with the AI request.",
      });
    }
  },
};
