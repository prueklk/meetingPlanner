
meetingPlannerApp.controller('AddActivityCtrl', function ($scope,$firebaseArray,Agenda,$firebaseObject) {
$scope.name = "";
$scope.description = "";
$scope.length = 0;
$scope.type = "Select here";
$scope.addAct = function() {
	
	var ref = new Firebase("https://flickering-fire-1621.firebaseio.com/");
	var actRef = ref.child("activity")

	if ($scope.name == "") {

		alert("Your activity needs a name!")
	};

	actRef.push({
  		
		    name: $scope.name,
		    length: $scope.length,
		    type: $scope.type,
		    description:$scope.description

		});


	$scope.data = $firebaseObject(ref);

		$scope.data.$loaded()
		  .then(function() {
		    console.log($scope.data);
		  })
		  .catch(function(err) {
		    console.error(err);
		  });
}
		

});