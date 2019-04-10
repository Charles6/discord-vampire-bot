//var dbRef = firebase.database().ref().child("testSpace");
const postData = () => {
    let characterName = document.getElementById("character").value;
    console.log("Data Posted for: " + characterName);
    firebase.database().ref("testSpace/" + characterName).set({
        player: document.getElementById("player").value,
        character: characterName,
        archatype: document.getElementById("archatype").value,
        clan: document.getElementById("clan").value
    });
    document.getElementById("message").innerHTML = "Thank you for your submission of: " + characterName;
}
