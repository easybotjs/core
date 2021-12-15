import { EasyBot } from "../dist/index.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { jest } from "@jest/globals";
import { registerCommands } from "../dist/util/registerCommands.js";

jest.setTimeout(30000);


const bot = new EasyBot({
	token: process.env.DISCORD_TOKEN,
	prefix: "!",
	intents: ["GUILDS", "GUILD_INTEGRATIONS"]
});

describe("Core", () => {
	test("Creates a bot with token and prefix", () => {
		const bot = new EasyBot({
			token: "token",
			prefix: "!",
			intents: ["GUILDS", "GUILD_INTEGRATIONS"]
		});
		expect(bot.botOptions.token).toBe("token");
		expect(bot.botOptions.prefix).toBe("!");
		bot.destroy();
	});

	test("Succesfully log bot into discord", async () => {
        expect(await bot.start()).toBe(true);
        bot.destroy();
	});

	test("add a ping command to the bot", () => {
		bot.addCommand({
			data: new SlashCommandBuilder()
				.setName("ping")
				.setDescription("Ping the bot"),
			execute: async (Interaction) => {
				await Interaction.reply("Pong!");
			}
		});
		expect(bot.slashCommands.get("ping")).toBeDefined();
		bot.destroy();
	});

	test("test the registerCommands Function", async () => {
		bot.addCommand({
			data: new SlashCommandBuilder()
				.setName("ping")
				.setDescription("Ping the bot"),
			execute: async (Interaction) => {
				await Interaction.reply("Pong!");
			}
		});
		expect(await registerCommands(bot, "877337067158392863")).toBeTruthy();
	});
});
