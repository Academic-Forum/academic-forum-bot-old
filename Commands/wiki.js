const wiki = require('wikijs').default;

module.exports = {
  name: 'wiki',
  description: 'Haha all knowledge is mine',
  args: true,
  execute(message, args) {
    console.log(args);
    wiki()
      .page(args.join(' '))
      .then((page) => page.summary())
      .then((info) => {
        if (info.length > 200) {
          info = info.substring(0, 200) + '...';
        }
        console.log(info);
        message.channel.send(info);
      });
  },
};
