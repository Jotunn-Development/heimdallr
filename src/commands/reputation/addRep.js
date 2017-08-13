const { Command } = require('discord-akairo');
const Reputation = require('../../models/reputations');

class AddRepCommand extends Command {
	constructor() {
		super('addRep', {
			aliases: ['addRep', 'add-rep', 'rep', '++'],
			category: 'reputation',
			channelRestriction: 'guild',
			split: 'quoted',
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: msg => `${msg.author} **::** Which user do you want to add reputation to?`,
						retry: msg => `${msg.author} **::** You did not supply a valid user. Please try again.`
					}
				},
				{
					id: 'reason',
					match: 'rest'
				}
			]
		});
	}

	async exec(message, { member, reason }) {
		if (message.author.id === member.id) {
			return message.util.reply('You cannot give reputation to yourself!');
		}

		const previous = await Reputation.findOne({
			where: {
				sourceID: message.author.id,
				targetID: member.id,
				guildID: message.guild.id
			}
		});

		if (previous) {
			await Reputation.update({ reason }, {
				where: {
					sourceID: message.author.id,
					targetID: member.id,
					guildID: message.guild.id
				}
			});

			// eslint-disable-next-line max-len
			return message.util.reply(`You have added reputation to ${member} with the reason: ${reason}\nThis replaced the previous reason: ${previous.reason}`);
		}

		await Reputation.create({
			reason,
			sourceID: message.author.id,
			targetID: member.id,
			guildID: message.guild.id
		});

		return message.util.reply(`You have added reputation to ${member} with the reason: ${reason}`);
	}
}

module.exports = AddRepCommand;
