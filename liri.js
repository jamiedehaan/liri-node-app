require("dotenv").config();

var dotenv = require("dotenv");
var fs = require("fs");
var keys = require("keys.js");
var moment = require("moment");
var request = require("request");
var Spotify = require("node-spotify-api");

var command = process.argv[2];
var input = process.argv[3];

function info(command, input) {
    switch (command) {
        case "concert-this":
            concert(input);
            break;

        case "spotify-this-song":
            song(input);
            break;

        case "movie-this":
            movie(input);
            break;

        case "do-what-it-says":
            random();
            break;

        default:
            console.log("Error");
    }
}

//CONCERTS

// Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

// SPOTIFY

function song(songName) {

    var spotify = new Spotify(keys.spotify);

    if (!songName) {
        songName = "The Sign";
    };

    console.log(songName);

    spotify.search({ type: "track", query: songName }, function (err, data) {

        if (err) {
            return console.log("Error: " + err);
        }

        console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name +
            "\nAlbum Name: " + data.tracks.items[0].album.name + "\nPreview Link: " + data.tracks.items[0].preview_url);

        var logSong = "Artist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name +
            "\nAlbum Name: " + data.tracks.items[0].album.name + "\nPreview Link: " + data.tracks.items[0].preview_url + "\n";

        fs.appendFile('log.txt', logSong, function (err) {
            if (err) throw err;
        });

        logResults(data);

    });
};

//MOVIES

function movie(movieName) {

    if (!movieName) {
        movieName = "mr nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy";

    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            
            var movieObject = JSON.parse(body);

            var movieData =
                "Title: " + movieObject.Title + "\r\n" +
                "Year: " + movieObject.Year + "\r\n" +
                "Imdb Rating: " + movieObject.imdbRating + "\r\n" +
                "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\r\n" +
                "Country: " + movieObject.Country + "\r\n" +
                "Language: " + movieObject.Language + "\r\n" +
                "Plot: " + movieObject.Plot + "\r\n" +
                "Actors: " + movieObject.Actors + "\r\n" +
                console.log(movieData);

            fs.appendFile('log.txt', movieData, function (err) {
                if (err) throw err;
            });

            console.log("Saved");
            logResults(response);

        }

        else {
            console.log("Error: " + error);
            return;

        }
    });
};

//RANDOM

function random() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        else {
            console.log(data);

            var randomData = data.split(",");

            info(randomData[0], randomData[1]);
        }

        console.log(randomData[0] + randomData[1]);

    });
};

function logResults(data) {

    fs.appendFile("log.txt", data, function (err) {
        
        if (err)
            throw err;
    });
};

info(command, input);