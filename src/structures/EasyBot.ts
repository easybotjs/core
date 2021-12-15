import { Client, Collection, CommandInteraction, Interaction } from "discord.js";
import { registerCommands } from "../util/registerCommands.js";
import type { BotOptions, SlashCommand } from "../declarations/interfaces";

export class EasyBot extends Client {
	readonly botOptions: BotOptions;
	slashCommands = new Collection<string, SlashCommand>();
	constructor(options: BotOptions) {
		super(options);

		this.botOptions = options;

		if (!this.botOptions.token) {
			console.warn("No token provided, bot will not start");
		}

		if (!this.botOptions.prefix) {
			console.warn(
				"No prefix provided, the bot will not be able to respond to messages"
			);
		}

		this.on("interactionCreate", (interaction) => {
			if (interaction.isCommand()) {
				this.handleCommand(interaction);
			}
		});

	}

	async start(): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			this.on("ready", async () => {
				await this.registerCommands();
				resolve(true);
            });
            await this.login(this.botOptions.token).catch((err) => {reject(err)});
        });
	}

	addCommand(command: SlashCommand): void {
		this.slashCommands.set(command.data.name, command);
	}

	async handleCommand(interaction: CommandInteraction): Promise<void> {
		const command = this.slashCommands.get(interaction.commandName);

		if (!command) {
			return;
		}

		await command.execute(this, interaction);
	}

	async registerCommands(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			if (this.slashCommands.size === 0) {
				return resolve();
			}

			(await this.guilds.fetch()).forEach(async (guild) => {
				await registerCommands(this, guild.id).then(() => {resolve()}).catch((err) => {reject(err)});
			});
		});
	}


}
