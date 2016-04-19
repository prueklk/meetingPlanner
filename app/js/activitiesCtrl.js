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

		if ($scope.name == ""){
			alert("Please give the activity a name");
		}
		else if ($scope.length == ""){
			alert("Please set a length to the activity");
		}
		else if ($scope.type == "Select here"){
			alert("Please select a type");
		}
		else if ($scope.description == ""){
			alert("Please give a description to the activity");
		}
		else{
		
		Agenda.addAct($scope.name, $scope.length, $scope.type, $scope.description);

			$scope.name = "";
			$scope.description = "";
			$scope.length = 0;
			$scope.type = "Select here";

		}
	}



	$scope.AddToDayTest = function(act_id) {
		day_id = "-KF-vybalfqvRa4lQQG8"
		console.log(day_id);

		Agenda.addActToDay(act_id, day_id);
	}
	
	//$scope.drag = function(event){
	//	ev.dataTransfer.setData("text", ev.target.id);
	//}

	// $scope.onDragComplete=function(data,evt){
 //       console.log("drag success, data:", data);
 //    }

	$scope.drag = function(key){
		console.log("dragstart");
		console.log(key)
		Agenda.DragActID = key;
	 // 	ev.dataTransfer.setData("text", ev.target.id);
	}


	$scope.dropBack = function(){

		var targetDay = Agenda.dayRef.child(Agenda.dragBackDay);
		var targetAct = targetDay.child("activities").child(Agenda.dragBackAct);
		
		targetAct.once("value", function(snapshot) {
				var data = snapshot.val();
						
				Agenda.addAct(data.name, data.length, data.type, data.description)
				Agenda.deleteActDay(Agenda.dragBackDay, Agenda.dragBackAct);

		});

			Agenda.getTotalTime();
	    	Agenda.getEndTime();
	    	Agenda.fillcolor(Agenda.dragBackDay);
	

	}
	





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

		if ($scope.name == ""){
			alert("Please give the activity a name");
		}
		else if ($scope.length == ""){
			alert("Please set a length to the activity");
		}
		else if ($scope.type == "Select here"){
			alert("Please select a type");
		}
		else if ($scope.description == ""){
			alert("Please give a description to the activity");
		}
		else{
		Agenda.addAct($scope.name, $scope.length, $scope.type, $scope.description);
		$uibModalInstance.dismiss('cancel');
		}
	}

	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};

});