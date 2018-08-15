var config = {
    apiKey: "AIzaSyA1p34eOXtOMoVbUmzlOYu-VIjXj7rZDm4",
    authDomain: "train-tacker.firebaseapp.com",
    databaseURL: "https://train-tacker.firebaseio.com",
    projectId: "train-tacker",
    storageBucket: "",
    messagingSenderId: "1058019641218"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//button for adding train
$("#submit").on("click", function(event){
    event.preventDefault();

    //grabs user input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    console.log("Train Name: ", trainName);
    console.log("Destination: ", destination);
    console.log("First Train: ", firstTrain);
    console.log("Frequency: ", frequency);

    //temporary object to hold train info
    var trainInfo = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    };

    //push info to database
    database.ref().push(trainInfo);
    alert("Train information successfully added");

    //Clears out text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
});

//create firebase event for adding train to database and row in html when entry is added 
database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    //store everything as variable
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    
    console.log("Train Name: ", trainName);
    console.log("Destination: ", destination);
    console.log("First Train: ", firstTrain);
    console.log("Frequency: ", frequency);
});

var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(firstTrain),
    $("<td>").text(frequency),
  );

  $("#train-table > tbody").append(newRow);

  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));





// function(errorObject) {
//   console.log("The read failed: " + errorObject.code);
// };