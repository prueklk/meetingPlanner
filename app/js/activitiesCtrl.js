meetingPlannerApp.controller('ActivitiesCtrl', function ($scope,$firebaseArray,$firebaseObject,Agenda) {

// Agenda.ref = ref;
// var actRef = ref.child("activity")
// var dayRef = ref.child("days")

$scope.activities = $firebaseObject(Agenda.actRef);

// ref.on("child_changed", function(snapshot){

// 	// console.log(snapshot.val());


// }, function (errorObject){

// 	console.log("The read failed:" + errorObject.code);
// });


$scope.removeAct = function(id) {


Agenda.actRef.child(id).remove();


}





});