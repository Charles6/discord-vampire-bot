module.exports.run = async (bot, message, args, db) => {

    db.collection('users').doc(message.author.id).set({
        'userName' : message.author.username + '#' + message.author.discriminator,
        'userID' : message.author.id,
        'characterName' : args
    });

    var charactersRef = db.collection('gameCharacters');
    var test = charactersRef.where("characterName", "==", args[0]);

    message.channel.send(message.author.username + ' has been added as "' + args + '"');

}

module.exports.help = {
    name: "addMe"
}