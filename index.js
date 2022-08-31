require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
client.commands = new Discord.Collection();

// LOAD COMMANDS

const commandFiles = fs
  .readdirSync('./Commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);
  client.commands.set(command.name, command);
}

// EVENTS

client.once('ready', () => {
  // Music bot
  require('./evobot/index.js');
  console.log('Ready!');
});

// client.on('messageUpdate', (oldMessage, newMessage) => {
//   if (oldMessage.channel.name.toLowerCase() != 'counting') return;
//   if (oldMessage.content == newMessage.content) return;
//   failsafeSend(
//     oldMessage,
//     "Don't edit messages in #counting.",
//     `${oldMessage.author}, please don't edit messages in ${oldMessage.channel}.`
//   );
// })

client.on('message', async (message) => {
  // counting enforcement {{{
  // WARNING: This must be at the top of this function.
  // NO lines of code should exist above this.
  // do not edit anything inside this block without prior permission from Ved Thiru (PerpetualCreativity)

  // Counting enforcement disabled, because it's handled by the rust bot now
  /*
  console.log(message.channel.type);
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  if (
    message.channel.type == 'text' &&
    message.channel.name.toLowerCase() === 'counting'
  ) {
    if (message.content.match(/^[0-9]+$/)) {
      message.channel.messages.fetch({ limit: 3 }).then((res) => {
        let r = res.array();
        let tlm = r[2]; // third to last message
        let slm = r[1]; // second to last message
        if (Number(message.content) - 1 !== Number(slm.content)) {
          timer(1000).then((_) => message.delete());
          failsafeSend(
            message,
            'Your most recent message in #counting was deleted because it was not exactly 1 higher than the previous number.',
            `${message.author}, your most recent message in ${message.channel} was deleted because it was not exactly 1 higher than the previous number.`
          );
        } else if (
          message.author == slm.author ||
          message.author == tlm.author
        ) {
          timer(1000).then((_) => message.delete());
          failsafeSend(
            message,
            'Your most recent message in #counting was deleted. You need to wait until at least 2 others have counted before you can count again.',
            `${message.author}, your most recent message in ${message.channel} was deleted. You need to wait until at least 2 others have counted before you can count again. (This message was sent here because you only accept direct messages from friends.)`
          );
        }
      });
    } else {
      timer(1000).then((_) => message.delete());
      failsafeSend(
        message,
        'Your most recent message in #counting was deleted because it is not a number.',
        `${message.author}, only numbers are allowed in ${message.channel}. (This message was sent here because you only accept direct messages from friends.)`
      );
    }
    return;
  } else {
    console.log('not a counting message');
  }
  // }}} counting enforcement
  */

  // return if message is not for the bot, or by another bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // get args and commandName
  const cutPrefix = message.content.substring(2, message.content.length);
  const args = cutPrefix.split(' ');
  const args2 = args;
  const commandName = args[0].toLowerCase();

  // get command
  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  // send error if no arguments and command requires arguments
  if (command.args && args.length < 1) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    return message.channel.send(reply);
  }

  try {
    args.shift();
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  // THIS WHOLE EVENT LISTENER BARELY WORKS

  /*if (user.tag == 'ML72#2092') {
      const science2021 = new Discord.MessageEmbed()
        .setTitle('Science')
        .setDescription('React to get roles for your science classes:\n\n:comet: - Physics\n:test_tube: - Chemistry\n:dna: - Biology')
        .setColor('ORANGE');
      const scienceEmbed = await client.channels.cache.get('742605149259825234').send(science2021);

      const math2021 = new Discord.MessageEmbed()
        .setTitle('Math')
        .setDescription('React to get roles for your math classes:\n\n:triangular_ruler: - Precalc\n:chart_with_upwards_trend: - AP Calc\n:straight_ruler: - IB Math')
        .setColor('ORANGE');
      client.channels.cache.get('742605149259825234').send(math2021);

      const ss2021 = new Discord.MessageEmbed()
        .setTitle('Social Studies')
        .setDescription('React to get roles for your social studies classes:\n\n:earth_americas: - AP World\n:statue_of_liberty: - AP US History\n:classical_building: - AP Gov')
        .setColor('ORANGE');
      client.channels.cache.get('742605149259825234').send(ss2021);

      const la2021 = new Discord.MessageEmbed()
        .setTitle('English')
        .setDescription('Currently there is no need for specific English class roles')
        .setColor('ORANGE');
      client.channels.cache.get('742605149259825234').send(la2021);

      const reqel2021 = new Discord.MessageEmbed()
        .setTitle('Required Electives')
        .setDescription('React to get roles for your required electives:\n\n:runner: - Physical Education\n:apple: - Health\n:crystal_ball: - Theory of Knowledge')
        .setColor('ORANGE');
      client.channels.cache.get('742605149259825234').send(reqel2021);

      const language2021 = new Discord.MessageEmbed()
        .setTitle('World Language')
        .setDescription('React to get roles for your foreign language classes:\n\n:flag_es: - Spanish\n:flag_cn: - Chinese\n:flag_fr: - French')
        .setColor('RED');
      client.channels.cache.get('742605149259825234').send(language2021);

      const electives2021 = new Discord.MessageEmbed()
        .setTitle('Electives')
        .setDescription('React to get roles for your other electives:\n\n:computer: - APCS\n:briefcase: - Business Management\n:coin: - Economics\n:art: - Fine Arts\n:violin: - Music (Band/Orchestra)')
        .setColor('RED');
      client.channels.cache.get('742605149259825234').send(electives2021);
    }*/

  // i assume this is reaction setup
  //if (reaction.message.partial) await reaction.message.fetch();
  //if (reaction.partial) await reaction.fetch();

  // exit if the reaction is by a bot or the message isn't sent by this bot
  if (user.bot) return;
  //if (!reaction.message.guild) return;

  console.log(reaction.emoji);
  // year of graduation roles
  if (reaction.message.id == '882424041984634960') {
    console.log(reaction.emoji);
    if (reaction.emoji.name == '😠') {
      console.log('Adding physics role');
      user.addRole('882308879940222977');
      //let johnMember = message.guild.members.get('user ID');
      //johnMember.addRole(mcRole.id);
    } else if (reaction.emoji.name == ':two:') {
      user.role.add('745101177615548417');
    } else if (reaction.emoji.name == ':three:') {
      user.role.add('745101180572663888');
    } else if (reaction.emoji.name == ':four:') {
      user.role.add('745101183303286934');
    }
  }

  // Valid channels:
  // bot-development: 742900413107273798
  const validChannels = [
    '745706733925826680',
    '742900413107273798',
    '748621024047923391',
  ];
  if (validChannels.includes(reaction.message.channel.id)) {
    if (reaction.emoji.name === '🤯') {
      // await console.log(reaction.message.guild.members.cache.first().roles.add('737795693552337077'));
      // await reaction.message.guild.members.cache.get(user.id).roles.add('737795693552337077');
    }
  }
});

client.login(process.env.TOKEN);
