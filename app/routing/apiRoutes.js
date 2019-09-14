// requires the friends array data from the data/friends.js
var friends = require("../data/friends.js");

//Return all friends found in the friends.js as JSON
module.exports = function(app){
  app.get('/api/friends', function(req,res){
    //loop through the best option
    var bestMatch = {
      name: "",
      photp: "",
      friendDifference = 100
    };

    //take the result of the user's inputs to post and parse
    var user = req.body;
    var userScores = user.scores;
    //take the results of user's name and photo, other than the survey questions, to post and parse it
    var userName = user.name;
    var userPhoto = user.photo;

    //Var used to calculate the difference between the user's scores and the scores of each user
    var totalDifference = 0;

    //loop through the freinds array of objects to get each friends score
    // .length -1 = to prevent fencepost errors, aka "off-by-on
    for(var i = 0; i<friends.length - 1; i++){
      console.log(friends[i].name);
      totalDifference = 0

      //Loop through the friends score and the user's scores and calculate the abs difference between the two and push
      //that to the total difference variable set above
      for(var j = 0; j < 10; j++){
        //calculate the difference between the scores and sum them into the totalDifference
        totalDifference = Math.abs(paraeInt(userScores)-parseInt(friends[i].scores[j]));
        //If the sum of difference is leaa then the difference of the current bestMatch
        if(totalDifference <= bestMatch.friendDifference)
        //reset the bestMatch to be the new friend.
        bestMatch.name = friends[i].name;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference = totalDifference;
      }
      
    }
    //after finding match, add user to friend array
    friends.push(user);

    //method will return a JSON data with the user's match which was looped through friends 
    res.json(bestMatch);
  })
}