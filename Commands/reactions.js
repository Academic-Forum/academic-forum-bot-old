const Discord = require('discord.js');

module.exports = {
  name: 'reactions',
  description: 'Some reaction stuff',
  args: false,
  async execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setTitle('Reaction Roles')
      .setDescription(
        'React to this message depending on the class you are in (by teacher/class not period).'
      )
      .setColor('YELLOW');
    const msgEmbed = await message.channel.send(embed);
    msgEmbed.react('🤯');
  },
};
