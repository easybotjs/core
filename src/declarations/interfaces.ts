import type { Client, ClientOptions, Interaction } from "discord.js";

export interface BotOptions extends ClientOptions {
    token: string;
    prefix: string;
}

export interface SlashCommand {
    data: any,
    execute: (client: Client, interaction: Interaction) => void | Promise<void>,
}