module.exports.run = async (bot, message, args, db) => {

    db.collection('characters').doc(message.author.id).set({
        'username' : message.author.username,
        'userID' : message.author.id
    });

    message.channel.send("This user is added: " +message.author.username);

}

module.exports.help = {
    name: "addMe"
}