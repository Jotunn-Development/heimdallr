const { Command } = require('discord-akairo')
const { get } = require('snekfetch')

class AvatarCommand extends Command {
  constructor () {
    super('avatar', {
      aliases: ['avatar'],
      category: 'nsfw',
      description: {
        content: 'Get a random avatar, NSFW available in appropriate channels.'
      },
      cooldown: 3000,
      ratelimit: 2
    })
  }

  async exec (msg) {
    const loading = await this.client.emojis.get('541151509946171402')
    let m = await msg.channel.send(`${loading} **Searching the worlds.**`)

    const { body } = await get(`https://nekos.life/api/v2/img/${msg.channel.nsfw || msg.channel.name.startsWith('nsfw-') || msg.channel.name.startsWith('nsfw_') ? 'nsfw_' : ''}avatar`)

    const embed = this.client.util.embed()
      .setTitle('Image didn\'t load click here.')
      .setURL(body.url)
      .setColor(process.env.EMBED)
      .setTimestamp()
      .setImage(body.url)
      .setFooter(`Requested by ${msg.author.tag} | Neko.life API`, `${msg.author.displayAvatarURL()}`)

    m.edit({ embed }).then(msg.delete())
  }
}
module.exports = AvatarCommand