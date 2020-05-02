var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        var difference = 0;
        var match = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;

        var b = userScores.map(function(item) {
            return parseInt(item, 10);
        });
        userData = {
            name: req.body.name,
            photo: req.body.photo, 
            scores: b
        };

        console.log("Name: " + userName);
        console.log("User Score " + userScores);

        var sum = b.reduce((a, b) => a + b, 0);
        
        console.log("Sum of userscore: " + sum);
        console.log('Best Match: ' + match.friendDifference);

        for(var i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            difference = 0;
            console.log("Difference: " + difference);
            console.log("Best Match: " + match.friendDifference);

            var bestfriend = friends[i].scores.reduce((a, b) => a + b, 0);
            console.log("Total Friend Score: " + bestfriend);
            difference += Math.abs(sum - bestfriend);
            console.log("===============> " + difference);

            if(difference <= match.friendDifference) {
                match.name = friends[i].name;
                match.photo = friends[i].photo;
                match.friendDifference = difference;
            }
            console.log(match);
            console.log(difference + " Total Difference");
        }
        friends.push(userData);
        console.log("New User Added");
        console.log(userData);
        res.json(match);
    });
};