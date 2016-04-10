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



	$scope.AddToDayTest = function(act_id) {
		day_id = "-KEziGbaxzMO_2Lt29IA"
		console.log(day_id);

		Agenda.addActToDay(act_id, day_id);
	}
	


	$scope.openAddActivity = function () {
	    var modalInstance = $uibModal.open({
	      templateUrl: 'activityModal.html',
	      controller: 'ActivityModalCtrl'
    	});
  	};

  	$scope.centerAnchor = true;
        $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}
        //$scope.draggableObjects = [{name:'one'}, {name:'two'}, {name:'three'}];
        $scope.droppedObjects1 = [];
        $scope.onDropComplete1=function(data,evt){
            var index = $scope.droppedObjects1.indexOf(data);
            if (index == -1)
            $scope.droppedObjects1.push(data);
        }
        $scope.onDragSuccess1=function(data,evt){
            console.log("133","$scope","onDragSuccess1", "", evt);
            var index = $scope.droppedObjects1.indexOf(data);
            if (index > -1) {
                $scope.droppedObjects1.splice(index, 1);
            }
        }
        var inArray = function(array, obj) {
            var index = array.indexOf(obj);
        }

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