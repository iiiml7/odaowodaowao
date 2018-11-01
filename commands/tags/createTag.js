const { Command } = require('discord.js-commando');

module.exports = class CreateTag extends Command {
	constructor(client) {
		super(client, {
			name: 'createtag',
			group: 'tags',
			memberName: 'createtag',
			description: 'Creates a new tag for later usage',
			details: 'this is a command to create a new tag for later usage',
			examples: ['>createTag <tagname> <insert tag text/code here>'],
			args: [
				{
					key: 'tagname',
					label: 'tagname',
					prompt: 'What would you like to name this tag',
					type: 'string',
					infinite: false
				},
				{
					key: 'tagvalue',
					label: 'tagvalue',
					prompt: 'What would you like to output when the tag is used',
					type: 'string',
					infinite: false
				}
			]
		});
	}

	async run(msg, args) {
		let provider = this.client.provider;
		try {
			let newValue = await provider.set('global', args.tagname, args.tagvalue);

			let message = await msg.edit(`Tag ${args.tagname} was successfully created`);

			return await message.delete(10000);
		} catch (err) {
			console.error(`oops something happened :${err}`);
		}
	}
};