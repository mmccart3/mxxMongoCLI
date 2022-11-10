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
        // OPTION 1
        // --------
        // const searchObj = new Movie(yargsObject.title,yargsObject.actor);
        // const updateObj = { actor : yargsObject.newActor };
        // await searchObj.update(movieCollection,updateObj);
        // OPTION 2
        // --------
        await movieCollection.updateOne({title: yargsObject.title}, {$set: {actor: yargsObject.actor}});
    } else if (yargsObject.delete) {
        console.log("Entering Delete");
        // OPTION 1
        // --------
        // const deleteObject = new Movie(yargsObject.title, yargsObject.actor );
        // await deleteObject.delete(movieCollection);
        // OPTION 2
        // --------
        await movieCollection.deleteOne({title: yargsObject.title});
    } else {
        console.log("Command not recognised!");
    };
    await client.close();
};

app(yargs.argv);
