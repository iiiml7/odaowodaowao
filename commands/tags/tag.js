const { Command } = require('discord.js-commando');

module.exports = class Tag extends Command {
	constructor(client) {
		super(client, {
			name: 'tag',
			group: 'tags',
			memberName: 'tag',
			description: 'Fetches tag data from database to display in chat',
			examples: ['>tag something'],
			args: [
				{
					key: 'tagname',
					label: 'tagname',
					prompt: 'Enter the name of the tag.',
					type: 'string',
					infinite: false
				}
			]
		});
	}

	async run(msg, args) {
		let provider = this.client.provider;
		try {
			let tagValue = await provider.get('global', args.tagname);

			return await msg.edit(tagValue);
		} catch (err) {
			console.error(err);
		}
	}
};