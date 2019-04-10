console.log("Charles this pinged");

// require packages
const Discord = require('discord.js');
const fs = require('fs');
require('dotenv/config');

// initialise are bot
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// import bot setting (data)
let prefix;
const owner = process.env.OWNER;
const token = process.env.TOKEN;

// initialize database (firebase)
const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

let db = admin.firestore();

//read commands files
fs.readdir('./cmds', (err,files) => {
    if (err) {
        console.log(err);
    }

    let cmdFiles = files.filter(f => f.split(".").pop() === "js");

    if (cmdFiles.length === 0){
        console.log("No files found");
        return;
    }

    cmdFiles.forEach((f,i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}: ${f} loaded`);
        bot.commands.set(props.help.name, props);
    })
})





bot.on('ready', async () => {
    console.log("vampBot is online");

});


bot.on('message',msg => {
    db.collection('guilds').doc(msg.guild.id).get().then((q) => {
        if (q.exists) {
            prefix = q.data().prefix;
        }
    }).then(() => {
        if (msg.channel.type === "dm") return;
        if (msg.author.bot) return;

        let msg_array = msg.content.split(" ");
        let command = msg_array[0];
        let args = msg_array.slice(1);

        if (!command.startsWith(prefix)) return;

        if (bot.commands.get(command.slice(prefix.length))){
            let cmd = bot.commands.get(command.slice(prefix.length));
                if (cmd){
                    cmd.run(bot,msg,args,db);
                }
        }
    })
});

bot.on('guildCreate', async gData => {
    db.collection('guilds').doc(gData.id).set({
        'guildID' : gData.id,
        'guildName' : gData.name,
        'guildOwner' :  gData.owner.user.username,
        'guildOwnerID' : gData.owner.id,
        'guildMemberCount' : gData.memberCount,
        'prefix' : '$'
    });
});


// Bot login
bot.login(token);