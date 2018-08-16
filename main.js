var config = {
    apiKey: "AIzaSyA1p34eOXtOMoVbUmzlOYu-VIjXj7rZDm4",
    authDomain: "train-tacker.firebaseapp.com",
    databaseURL: "https://train-tacker.firebaseio.com",
    projectId: "train-tacker",
    storageBucket: "train-tacker.appspot.com",
    messagingSenderId: "1058019641218"
  };

firebase.initializeApp(config);

var database = firebase.database();

//button for adding train
$("#submit").on("click", function(event){
    event.preventDefault();

    //grabs user input
    var trainName = $("#trainName-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirstTrain = $("#firstTrain-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    console.log("Train Name: ", trainName);
    console.log("Destination: ", trainDestination);
    console.log("First Train: ", trainFirstTrain);
    console.log("Frequency: ", trainFrequency);

    //temporary object to hold train info
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTrain: trainFirstTrain,
        frequency: trainFrequency,
    };

    //push info to database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    alert("Train information successfully added");

    //Clears out text-boxes
    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
});

//create firebase event for adding train to database and row in html when entry is added 
database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    //store everything as variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirstTrain = childSnapshot.val().firstTrain;
    var trainFrequency = childSnapshot.val().frequency;
    
    console.log("Train Name: ", trainName);
    console.log("Destination: ", trainDestination);
    console.log("First Train: ", trainFirstTrain);
    console.log("Frequency: ", trainFrequency);

    var firstTimeConverted = moment(trainFirstTrain, "HH:mm").subtract(1, "years");
    console.log("first time converted: ", firstTimeConverted);
  
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
  
    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);
    
    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
      var nextArrival = moment().add(tMinutesTillTrain, "minutes").format('LT');
      console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

//create new row
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(tMinutesTillTrain),
  );

  $("#train-table > tbody").append(newRow);
})

// function(errorObject) {
//   console.log("The read failed: " + errorObject.code);
