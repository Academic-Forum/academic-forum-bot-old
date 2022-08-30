const database = require('../database');
const { average } = require('../utils/averager');
const Discord = require('discord.js');
const { CategoryChannel } = require('discord.js');
module.exports = {
	name: 'grade-data',
    cooldown: 3,
    args: true,
	description: 'Retrieve data for a user',
	async execute(message, args) {

        await database.addUser(`${message.author.tag}`);

        const user = await database.getUser(message.author.tag);

        let weeklyPercentages = [];
        let stats = '';
        user.gradeCheckpoints.forEach((checkpoint) => {
            stats += '\nTimestamp: ' + checkpoint.date;
            stats += '\nGrades: ' + checkpoint.percentages;
            stats += '\nAverage: ' + average(checkpoint.percentages) + '\n';
            weeklyPercentages.push(average(checkpoint.percentages));
        });

        if(stats.length == 0) {
            stats = 'You have not entered any grades in';
        } else {
            stats += '\n\n\nYour overall average is: ' + average(weeklyPercentages);            
        }

        const embed = new Discord.MessageEmbed()
			.setTitle('GRADE STATS FOR ' + message.author.tag)
			.setDescription(stats)
			.setColor('YELLOW');
        
		message.channel.send(embed);
	}
};