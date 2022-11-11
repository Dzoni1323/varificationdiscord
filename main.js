const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
const fetch = require("node-fetch")

client.once('ready', () => {
    client.user.setStatus('online')
    console.log('Bot is online!');
    client.user.setActivity('Youtube',{
        type:"WATCHING"
    })
    console.log("Servers:")
    client.guilds.cache.forEach((guild) => {
        console.log('-' + guild.name)
    })
});

const fs = require('fs');
const { METHODS } = require('http');

client.commands = new Discord.Collection();



//prefix za komande
const prefix = "-";

client.on('message',async (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const channel = message.member.voice.channel;
    const args = message.content.slice(prefix.length).split('/ +/');
    const command = args.shift().toLowerCase();

    const ChannelName = message.channel.name;

    

    if (command === 'reactionrole') {
        const channel = '1032696488054227084';
        const Member = message.guild.roles.cache.find(role => role.name === "Member");

        const checkmark = '✅';
        //const embed = new Discord.MessageEmbed()
        //    .setColor('#FFFFFF')
         //   .setDescription('I agree with the Rules!')
        //const messageEmbed = await message.channel.send(embed);
        //messageEmbed.react(checkmark);

        message.client.channels.fetch("1032696488054227084").then(channel => {
        channel.messages.fetch("1032708007466913793").then(message => {
            message.react(checkmark);
        })
        })

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            
            

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === checkmark) {

                    await reaction.message.guild.members.cache.get(user.id).roles.add(Member);
                    reaction.users.remove(reaction.message.guild.members.cache.get(user.id));
                 
                }
            } else {
                return;
            }
 
        });
    }
});







client.login("OTUzMzMwMDAxMDE1NjIzNzUw.GWE9za.vJLbNN-7pDjMtLUHvYIXYj4mjiwEi9foUmJwMY");