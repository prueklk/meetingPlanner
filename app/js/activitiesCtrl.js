meetingPlannerApp.controller('ActivitiesCtrl', function ($scope,$firebaseArray,$firebaseObject,Agenda) {

var ref = new Firebase("https://flickering-fire-1621.firebaseio.com/");
var actRef = ref.child("activity")
$scope.activities = $firebaseObject(actRef);
// var newActRef = actRef.push();
// var actID = newActRef.key();
// console.log(actID);

ref.on("child_changed", function(snapshot){

	// console.log(snapshot.val());


}, function (errorObject){

	console.log("The read failed:" + errorObject.code);
});


$scope.removeAct = function(id) {


actRef.child(id).remove();


}

// $scope.activities = [];


		// $scope.activities.$loaded()
		//   .then(function() {
		    
		//     console.log("act");
		//   })
		//   .catch(function(err) {
		//     console.error(err);
		//   });



});