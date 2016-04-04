meetingPlannerApp.controller('ActivitiesCtrl', function ($scope,$firebaseArray,$firebaseObject,Agenda) {


$scope.activities = $firebaseObject(Agenda.actRef);


$scope.deleteAct = function(id) {


Agenda.deleteAct(id);


}

$scope.name = "";
$scope.description = "";
$scope.length = 0;
$scope.type = "Select here";
$scope.addAct = function() {
	
	Agenda.addAct($scope.name, $scope.length, $scope.type, $scope.description);
		$scope.name = "";
		$scope.description = "";
		$scope.length = 0;
		$scope.type = "Select here";

}

$scope.list1 = {title: 'AngularJS - Drag Me'};
$scope.list2 = {};


});