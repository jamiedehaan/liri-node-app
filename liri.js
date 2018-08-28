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

// function concertLife() {
//     var concert = "";
//     for (var c = 0; c < userInput.length; c++) {
//         concert = concert + "+" + userInput[c];
//     }
//     if (concert === "") {
//         concertName = "Ed Sheeran";
//     }
//     console.log(concert);
//     request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
//         var concertObject = JSON.parse(body);

//         // EDIT CONSOLE.LOGS BELOW!!!
//         console.log(); Name of the venue
//         console.log(); Venue location
//         console.log(); Date of the event (use moment to format this as "MM/DD/YYYY")

//     });
// };

function spotifyLife() {

    var song = "";
    for (var s = 0; s < userInput.length; s++) {
        song = song + "+" + userInput[s];
    }
    if (song === "") {
        songName = "The Sign";
    }
    console.log(song);
    spotify.search({ type: "track", query: song, limit: 1 }, function (error, data) {
        if (error) {
            return console.log("Error: " + error);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name + "\r\n");
        console.log("Song Name: " + data.tracks.items[0].name + "\r\n");
        console.log("Preview Link: " + data.tracks.items[0].preview_url + "\r\n");
        console.log("Album Name: " + data.tracks.items[0].album.name + "\r\n");
    });
};

function movieLife() {

    var movie = "";
    for (var m = 0; m < userInput.length; m++) {
        movie = movie + "+" + userInput[m];
    }
    if (movie === "") {
        movieName = "Mr Nobody";
    }
    console.log(movie);
    request("http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy", function (error, response, body) {
        var movieObject = JSON.parse(body);
        console.log("Title: " + movieObject.Title + "\r\n");
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
            spotifyLife(userInput);
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