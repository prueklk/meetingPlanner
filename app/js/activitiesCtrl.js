meetingPlannerApp.controller('ActivitiesCtrl', function ($scope,$firebaseArray,$firebaseObject,Agenda,$uibModal) {


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


	$scope.openAddActivity = function () {
	    var modalInstance = $uibModal.open({
	      templateUrl: 'activityModal.html',
	      controller: 'ActivityModalCtrl'
    	});
  	};

});

meetingPlannerApp.controller('ActivityModalCtrl', function ($scope, Agenda, $uibModalInstance){
  // $scope.ok = function () {
    //$uibModalInstance.close($scope.selected.item);//passing a result
  // };

	$scope.name = "";
	$scope.description = "";
	$scope.length = 0;
	$scope.type = "Select here";

	$scope.addAct = function() {
		// TODO // check if all fields are filled, don't call addAct until every field is filled

		Agenda.addAct($scope.name, $scope.length, $scope.type, $scope.description);
		$uibModalInstance.dismiss('cancel');
	}
	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};

});