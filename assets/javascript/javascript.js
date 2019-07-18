//Firebase config
//Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAfSfJNQxpYCqiPx-hEQOOTmxMI4PgZRSY",
  authDomain: "click-button-5cb64.firebaseapp.com",
  databaseURL: "https://click-button-5cb64.firebaseio.com",
  projectId: "click-button-5cb64",
  storageBucket: "",
  messagingSenderId: "20406231635",
  appId: "1:20406231635:web:996d90f3fe1753ae"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);
//Variables for the firebase to go to database and make a train branch
var database = firebase.database()
var trainRef = database.ref("/train")

//Button for adding Trains
$("#submit").on("click", function(event) {
  event.preventDefault();

  //Grabs user input
  var trainName = $("#trainname-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFirstTrainTime = moment($("#firsttraintime-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();


  // Creates local "temporary" object for holding train data
  var newTrain = {
    TrainName: trainName,
    Destination: trainDestination,
    TrainFirstTime: trainFirstTrainTime,
    Frequency: trainFrequency,
  };

  // Uploads train data to the database
  trainRef.push(newTrain);

  // Logs everything to console
  console.log(newTrain.TrainName);
  console.log(newTrain.Destination);
  console.log(newTrain.TrainFirstTime);
  console.log(newTrain.Frequency);

  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#trainname-input").val("");
  $("#destination-input").val("");
  $("#firsttraintime-input").val("");
  $("#frequency-input").val("");
});

//Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
trainRef.on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().TrainName;
  var trainDestination = childSnapshot.val().Destination;
  var trainFirstTrainTime = childSnapshot.val().TrainFirstTime;
  var trainFrequency = childSnapshot.val().Frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirstTrainTime);
  console.log(trainFrequency);

  var startMoment = moment.unix(trainFirstTrainTime);
  var trainFirstTrainTime = startMoment.format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  // First Time (pushed back 1 year to make sure it comes before current time)
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

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFirstTrainTime),
    $("<td>").text(trainFrequency),
  );

  // Append the new row to the table
  $("#table > tbody").append(newRow);
});