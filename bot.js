const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const auth = require('./auth.json');
const util = require('util');

const client = new Commando.Client({
	selfbot: true,
	commandPrefix: '>',
	owner: '357221483291869184'
});

client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on('ready', () => {
		// console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
	})
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnect', () => { console.warn('Reconnecting...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	});

client.registry
	.registerGroup('tags', 'tags')
	.registerDefaults()
	// .registerDefaultCommands({ help: false })
	.registerCommandsIn(path.join(__dirname, 'commands'));


client.setProvider(
	sqlite.open(path.join(__dirname, 'database.sqlite3'))
		.then((db) => { return new Commando.SQLiteProvider(db); })
		.catch(console.error)
);

client.login(process.env.BOT_TOKEN);
