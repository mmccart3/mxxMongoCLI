const yargs = require("yargs");
const { client, connect } = require("./db/connection");
const Movie = require("./utils");

async function app(yargsObject) {
    const movieCollection = await connect();
    if (yargsObject.create) {
        console.log("Entering Create");
        const newMovie = new Movie(yargsObject.title, yargsObject.actor);
        await newMovie.add(movieCollection);
        // code to add movie
    } else if (yargsObject.read) {
        console.log("Entering Read");
        const results = await movieCollection.find({}).toArray();
        console.table (results);
        // code for read
    } else if (yargsObject.update) {
        console.log("Entering Update");
        // code for update
    } else if (yargsObject.delete) {
        console.log("Entering Delete");
        // code for delete
    } else {
        console.log("Command not recognised!");
    };
    await client.close();
};

app(yargs.argv);
