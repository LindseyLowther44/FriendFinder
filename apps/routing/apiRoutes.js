var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends)
    });

    app.post("api/friends", function(req, res) {
        var difference = 0;
        var match = {
            name: "",
            photo: "",
            friendDif: 1000
        };
        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;

        var average = userScores.map(function(item) {
            return parseInt(item, 10);
        });
        userData = {
            name: req.body.name,
            photo: req.body.photo, 
            scores: average
        };

        console.log("Name: " + userName);
        console.log("User Score: " + userScores);

        var sum = average.reduce((a, b) => a + b, 0);
        
        console.log("Sum of userscore: " + sum);
        console.log('Best Match: ' + match.difference);

        for(var i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            difference = 0;
            console.log("Difference: " + difference);
            console.log("Best Match: " + match.difference);

            var bestMatch = friends[i].scores.reduce((a, b) => a + b, 0);
            console.log("Total Friend Score: " + bestMatch);
            difference += Math.abs(sum - bestMatch);
            console.log("===============> " + difference);

            if(difference<= match.difference) {
                match.name = friends[i].name;
                match.photo = friends[i].photo;
                match.friendDif = difference;
            }

            console.log(difference + " Total Difference");
        }
        friends.push(userData);
        res.json(match);
    })
}