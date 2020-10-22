const Akairo = require('discord-akairo')
const {
  Command
} = Akairo
// const Discord = require('discord.js')

class GuildInfoCommand extends Command {
  constructor () {
    super('guildinfo', {
      aliases: ['ginfo', 'guild', 'serverinfo', 'sinfo', 'server'],
      category: 'general',
      channel: 'guild',
      cooldown: 2000,
      ratelimit: 1,
      description: {
        content: 'Get information on the current server.'
      }
    })
  }

  async exec (msg) {
    // Build Embed
    const embed = this.client.util.embed()
      .setColor(process.env.EMBED)
      .setTimestamp()
      .setFooter(`Requested by ${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)
      .setThumbnail(msg.guild.iconURL())
      .addField('Guild Info', [
        `**Name**: ${msg.guild.name}`,
        `**Owner**: ${msg.guild.owner.toString()}`,
        `**Region**: ${msg.guild.region}`,
        `**Members**: ${msg.guild.memberCount}`,
        `**Roles**: ${msg.guild.roles.cache.size}`,
        `**Created:** ${msg.guild.createdAt}`,
        `**IconURL**: ${msg.guild.iconURL()}`
      ])

    msg.channel.send({
      embed
    })
  }
}
module.exports = GuildInfoCommand
