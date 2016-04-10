meetingPlannerApp.controller('OverviewCtrl', function ($scope,Agenda, $firebaseObject,$uibModal) {

	$scope.days = $firebaseObject(Agenda.dayRef);


	$scope.deleteDay = function(id){
		Agenda.deleteDay(id);
	}


  	$scope.open = function () {
	    var modalInstance = $uibModal.open({
	      templateUrl: 'overviewModal.html',
	      controller: 'OverviewModalCtrl'
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


meetingPlannerApp.controller('OverviewModalCtrl', function ($scope, Agenda, $uibModalInstance){
  // $scope.ok = function () {
    //$uibModalInstance.close($scope.selected.item);
  // };

	$scope.addDay = function() {
		console.log("Agenda.selectedDate = "+Agenda.selectedDate);

		if(Agenda.selectedDate){
			console.log("selectedDate");

			Agenda.addDay();
			$uibModalInstance.dismiss('cancel');
		}else{
			console.log("NO selectedDate");
		}
		
	}

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
