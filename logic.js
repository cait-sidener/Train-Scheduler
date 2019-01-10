  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBQjfN1Hex-KNAQbR3z8oTXHq1jhw6zhdc",
    authDomain: "train-schedule-ba39c.firebaseapp.com",
    databaseURL: "https://train-schedule-ba39c.firebaseio.com",
    projectId: "train-schedule-ba39c",
    storageBucket: "train-schedule-ba39c.appspot.com",
    messagingSenderId: "508545303086"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
var database = firebase.database();

// 2. Button for adding Train
$("#submit").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination-name").val().trim();
    var firstTrain = $("#first-train-time").val().trim();
    var frequency = $("#frequency-time").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: destination,
      start: firstTrain,
      frequency: frequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination-name").val("");
    $("#first-train-time").val("");
    $("#frequency-time").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var frequency = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
  
    // Prettify the employee start
    // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);
  
    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(firstTrain),
      $("<td>")
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case