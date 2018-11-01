const { Command } = require('discord.js-commando');

module.exports = class RemoveTag extends Command {
	constructor(client) {
		super(client, {
			name: 'removetag',
			group: 'tags',
			memberName: 'removetag',
			description: 'Deletes a tag',
			details: 'this is a command to delete a tag',
			examples: ['>removetag <tagname>'],
			args: [
				{
					key: 'tagname',
					label: 'tagname',
					prompt: 'What tag would you like to remove',
					type: 'string',
					infinite: false
				}
			]
		});
	}

	async run(msg, args) {
		let provider = this.client.provider;

		try {
			await provider.remove('global', args.tagname);

			let message = await msg.edit(`Tag ${args.tagname} was removed`);

			return await message.delete(10000);
		} catch (err) {
			console.error(err);
			return 0;
		}
	}
};