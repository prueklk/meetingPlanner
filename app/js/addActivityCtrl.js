
meetingPlannerApp.controller('AddActivityCtrl', function ($scope,$firebaseArray,Agenda,$firebaseObject) {
$scope.name = "";
$scope.description = "";
$scope.length = 0;
$scope.type = "Select here";
$scope.addAct = function() {
	
	Agenda.addAct($scope.name, $scope.length, $scope.type, $scope.description);

}
		

});