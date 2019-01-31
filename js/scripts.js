function UserList(users){
  this.users = [],
  this.currentID = 0,
  this.currentTurn= 1
};

UserList.prototype.addUser = function(users){
  user.id = this.assignID();
  this.users.push(user);
  this.currentUser = this.users[0]
};

UserList.prototype.assignID = function(){
  this.currentID += 1;
  return this.currentID;
};

UserList.prototype.changeUser = function(){

  this.currentTurn += 1
  if(this.currentTurn % 2 != 0){
    this.currentUser = this.users[0];
    $("#arrow1").show();
    $("#arrow2").hide();

  }
  else{
    this.currentUsers = this.users[1];
    $("#arrow1").hide();
    $("#arrow2").show();
  };
};

UserList.prototype.scoreUpdate = function(){
  this.currentUser.updateScore();
  this.changeUser();
}

/*         Logic      */
function User(name, score, currentRoll){
  this.name = name,
  this.score = 0,
  this.currentRoll = []
};

User.prototype.updateScore =function(){
  this.score += this.tallyUp()
  this.currentRoll = [];
};

User.prototype.roll = function(){
  var thisRoll = (Math.floor(Math.random() * (6)) + 1);
  if (thisRoll > 1){
  this.currentRoll.push(thisRoll);
}
else{
  this.currentRoll = [];
  UserList.changeUser();
  alert("Your turn is over")
};
};

User.prototype.tallyUp = function(){
  var number = 0;
  for(var i = 0; i<this.currentRoll.length; i++){
    number += this.currentRoll[i];
  };
  return number;

};


/*     User Interface Logic     */
var userList = new UserList();
var user = new User("User1");
var user2 = new User("User2");
userList.addUser(user1);
userList.addUser(user2);

function scoresReset(){
  $("#currentRoll").text(0);
  userList.users[0].currentRoll= [];
  userList.users[1].currentRoll = [];
  userList.users[0].score = 0;
  userList.users[1].score = 0;
  $("#userOne").text(userList.users[0].score);
  $("#userTwo").text(userList.users[1].score);
  userList.currentTurn = 1;
  userList.currentUser = userList.users[0];
  $("h2").hide();
  $("#arrow1").show();
  $("#arrow2").hide();
  $("#roll").show();
  $("#switch").show();
  $("#reset").hide();
};

$(function(){
  $("#roll").click(function(){
    userList.currentUser.roll();
    $("h2").hide();
    $("#currentRoll").text(userList.currentUser.tallyUp());
    $("#userOne").text(userList.users[0].score);
    $("#userTwo").text(userList.users[1].score);
  }); //end roll.click function

  $("#switch").click(function(){
    $("#currentRoll").text(0);
    userList.scoreUpdate();
    $("#userOne").text(userList.users[0].score);
    $("#userTwo").text(userList.users[1].score);
      if(userList.users[0].score >= 100){
        $("#userOne").show();
        $("#roll").hide();
        $("#switch").hide();
        $("#reset").show();
      }
      else if(userList.users[1].score >= 100){
        $("#userTwo").show();
        $("#roll").hide();
        $("#switch").hide();
        $("#reset").show();
      }
  });  //end switch.click function

  $("#reset").click(function(){
    scoresReset();
  }); //end reset click function
}); //end document ready function
