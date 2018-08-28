require("dotenv").config();

var dotenv = require("dotenv");
var fs = require("fs");
var keys = require("./keys.js");
var moment = require("moment");
var request = require("request");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var arguments = process.argv;
var command = process.argv[2];
var userInput = [];

for (var i = 3; i < arguments.length; i++) {
    userInput.push(arguments[i])
}

function concertLife() {
    
    var concert = userInput.join("+");
    if (concert === "") {
        concert = "Ed Sheeran";
    }
    console.log(concert);
    request("https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp", function (error, response, body) {
        var concertObject = JSON.parse(body);
        for (var j = 0; j < concertObject.length; j++) {
            console.log("\nVenue Name: " + concertObject[j].venue.name);
            console.log("Venue Location: " + concertObject[j].venue.city + ", " + concertObject[j].venue.region);
            console.log("Date Of The Event: " + moment(concertObject[j].datetime).format("MM/DD/YY") + "\r\n");
        }
    });
};

function spotifyLife() {

    var song = userInput.join("+");
    if (song === "") {
        song = "The Sign";
    }
    console.log("song: " + song);
    spotify.search({ type: "track", query: song, limit: 1 }, function (error, data) {
        if (error) {
            return console.log("Error: " + error);
        }
        console.log("\nArtist: " + data.tracks.items[0].artists[0].name + "\r\n");
        console.log("Song Name: " + data.tracks.items[0].name + "\r\n");
        console.log("Preview Link: " + data.tracks.items[0].preview_url + "\r\n");
        console.log("Album Name: " + data.tracks.items[0].album.name + "\r\n");
    });
};

function movieLife() {

    var movie = userInput.join("+");
    if (movie === "") {
        movie = "Mr. Nobody";
    }
    console.log(movie);
    request("http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy", function (error, response, body) {
        var movieObject = JSON.parse(body);
        console.log("\nTitle: " + movieObject.Title + "\r\n");
        console.log("Year: " + movieObject.Year + "\r\n");
        console.log("IMDB Rating: " + movieObject.imdbRating + "\r\n");
        console.log("Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\r\n");
        console.log("Country: " + movieObject.Country + "\r\n");
        console.log("Language: " + movieObject.Language + "\r\n");
        console.log("Plot: " + movieObject.Plot + "\r\n");
        console.log("Actors: " + movieObject.Actors + "\r\n");
    });
};

function randomLife() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log("Error: " + error);
        }
        var dataArray = data.split(",");
        command = dataArray[0];
        for (var a = 1; a < dataArray.length; a++) {
            userInput.push(dataArray[a]);
        }
        userData(command);
    });
};

var userData = function (userInput) {
    switch (command) {
        case "concert-this":
            concertLife();
            break;

        case "spotify-this-song":
            spotifyLife();
            break;

        case "movie-this":
            movieLife();
            break;

        case "do-what-it-says":
            randomLife();
            break;

        default:
            console.log("Error");
    };
};

userData();