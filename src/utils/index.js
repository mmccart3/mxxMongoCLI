const { Collection } = require("mongodb");

class Movie {
    constructor(title, actor = "Not specified") {
        this.title = title;
        this.actor = actor;
    };
    async add(movieCollection) {
        console.log("Entering add within index.js")
        // code to save into database
        await movieCollection.insertOne(this);
    };
    async update(movieCollection, updateObj) {
        await movieCollection.updateOne(this,{$set: updateObj});
    };
    async delete(movieCollection) {
        await movieCollection.deleteOne(this);
    };
};

module.exports = Movie;