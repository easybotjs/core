import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { EasyBot } from "../index.js";

export async function registerCommands(client: EasyBot,guildID: string): Promise<unknown> {


	const commands: any[] = []
	client.slashCommands.forEach((element) => {
		commands.push(element.data.toJSON());
	});

	const rest = new REST({ version: "9" }).setToken(client.botOptions.token);

    if(!client.user?.id) await client.application?.fetch();

	try {
		return await rest.put(
			//@ts-ignore
			Routes.applicationGuildCommands(client.user?.id, guildID),
            { body: commands }
		);
	} catch (error) {
		throw error;
	}
}
