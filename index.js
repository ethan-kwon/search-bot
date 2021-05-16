const Discord = require("discord.js")
const client = new Discord.Client()
const prefix = '$';
var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
      headless: true,
    },
  });

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'top') {
        const image_query = args.join(' ');
        if(!image_query) return message.channel.send('Please enter an image name');

        (async () => {
            const image_results = await google.scrape(image_query, 1);
            message.channel.send(image_results[0].url);
        })();
    }

    if (command ==='search') {
        const image_query = args.join(' ');
        if(!image_query) return message.channel.send('Please enter an image name');

        (async () => {
            const image_results = await google.scrape(image_query, 20);
            message.channel.send(image_results[Math.floor((Math.random()*19)+1)].url);
        })();
    }

});

client.login('TOKEN');
