var friends = require("../data/friends.js");

module.exports = function(app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  // handles when a user submits a form and thus submits data to the server
  app.post("/api/friends", function(req, res) {
    //loop through best options
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 100
    };

    //take the result of the user's inputs to post and parse it
    var user = req.body;
    var userScores = user.scores;
    // To take the results of the user's name and photo, other than the survey questions, to post and parse it
    var userName = user.name;
    var userPhoto = user.photo;

    //Variable used to calculate the difference between the user's scores and the scores of each user
    var totalDifference = 0;

    //loop through the freinds array of objects to get each friends scores
    for (var i = 0; i < friends.length - 1; i++) {
      console.log(friends[i].name);
      totalDifference = 0;

      //loop through the friends score and the users score and calculate the abs difference between the two and push
      //that to the total difference variable set above
      for (var j = 0; j < 10; j++) {
        //calculate the difference between the scores and sum them into the totalDiffernce
        totalDifference = Math.abs(
          parseInt(userScores[j]) - parseInt(friends[i].scores[j])
        );
        //If the sum od differences is less then the difference of the current bestMatch
        if (totalDifference <= bestMatch.friendDifference) {
          //Reset the bestMatch to be the new friend.
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
        console.log();
      }
    }

    // after finding match, add user to friend array
    friends.push(user);

    // method will return a JSON data with the users's match which was looped Through friends array.
    res.json(bestMatch);
  });
};
