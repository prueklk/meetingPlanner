meetingPlannerApp.controller('OverviewCtrl', function ($scope,Agenda, $firebaseObject) {

// var ref = new Firebase("https://flickering-fire-1621.firebaseio.com/");
// var dayRef = ref.child("days")

$scope.addDay = function() {

	// dayRef.push({
  		
	// 	    name: $scope.name,
	// 	    length: $scope.length,
	// 	    type: $scope.type,
	// 	    description:$scope.description

	// 	});

Agenda.addDay();


}

// console.log($scope.mytime)



});