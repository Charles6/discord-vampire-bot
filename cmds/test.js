module.exports.run = async (bot, message, args, db) => {

    message.channel.send("I am awake now, " +message.author.username);
    console.log("This user's id number is: ", message.author.id);
}

module.exports.help = {
    name: "rise"
}