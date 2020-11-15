const fetch = require("node-fetch");

const grabTrainer = async () => {
    let trainerUri = "http://pokemasdb.com/trainer"
    return await fetch(trainerUri)
        .then(response => response.json())
        .then(json => json.trainers)
}

grabTrainer().then(console.log)
