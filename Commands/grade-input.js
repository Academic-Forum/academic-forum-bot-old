const database = require('../database');
const { average } = require('../utils/averager');
const { CategoryChannel } = require('discord.js');
module.exports = {
  name: 'grade-input',
  cooldown: 3,
  args: true,
  description: 'Input a grade checkpoint into the database',
  async execute(message, args) {
    try {
      for (var i = 0; i < args.length; i++) {
        args[i] = parseFloat(args[i], 10);
        if (isNaN(args[i])) {
          throw 'Invalid input';
        }
        if (args[i] > 100) {
          args[i] = 100;
        }
      }
    } catch (err) {
      message.channel.send(
        'Execution error, check input validity and try again'
      );
      return;
    }

    database.addUser(`${message.author.tag}`);
    database.addCheckpoint(`${message.author.tag}`, args);

    message.channel.send(
      `Your grades have been inserted into the database, ${message.author.tag}`
    );
    message.channel.send(`Your average this week is ${average(args)}`);
  },
};
