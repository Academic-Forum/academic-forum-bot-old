const database = require('../database');

module.exports = {
  name: 'grades',
  cooldown: 3,
  description: 'To add a user to the grade database',
  execute(message, args) {
    database.addUser(`${message.author.tag}`);
    message.channel.send(
      `You have been added to the database, ${message.author.tag}!`
    );
  },
};
