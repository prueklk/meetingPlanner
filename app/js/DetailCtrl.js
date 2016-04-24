meetingPlannerApp.controller('DetailCtrl', function ($scope,$firebaseArray,Agenda,$firebaseObject,$stateParams,$route) {
	
	// var detail = 
	var currentId = $route.current.params.meetingID;
	console.log(currentId)
	$scope.items = Agenda.dayRef.child(currentId);

});