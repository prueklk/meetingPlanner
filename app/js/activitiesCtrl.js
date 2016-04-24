meetingPlannerApp.controller('ActivitiesCtrl', function ($scope, $location, $firebaseArray,$firebaseObject,Agenda,$uibModal ) {




$scope.selectChevron = function(id, event) {
    $scope.activeClass = id;

	var myEl = angular.element(event.target);

	if (angular.element(event.target).hasClass("glyphicon-chevron-down")) {

		$scope.activeClass = "ChevronRight";

	};
    
    console.log(myEl)
 
   

    
  };





 $scope.paneltag = function (key) { 
		// $scope.paneltagID = key;
		// $uibModalInstance.dismiss('cancel');
		console.log("MODALCANCEL")

		Agenda.paneltag = true;
 }
	
        


	$scope.activities = $firebaseObject(Agenda.actRef);

	


	$scope.name = "";
		
	$scope.description = "";
	$scope.length = 0;
	$scope.type = "Select here";
	$scope.addAct = function() {

		if ($scope.name == ""){
			$scope.status = "Please enter a name";
		}
		// else if ($scope.length == ""){
		// 	$scope.status = "Please choose a length of the activity";
		// }
		else if ($scope.type == "Select here"){
			$scope.status = "Please choose a type for the activity";
		}
		// else if ($scope.description == ""){
		// 	$scope.status = "Please give the activity a description";
		// }
		else{
	
		
		Agenda.addAct($scope.name, $scope.length, $scope.type, $scope.description);

			$scope.name = "";
			$scope.description = "";
			$scope.length = 0;
			$scope.type = "Select here";

		}
	}

$scope.deleteAct = function(id) {
		Agenda.deleteAct(id);
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
	
$scope.removeactivity=function(){
 var modalInstance = $uibModal.open({
	      templateUrl: 'removeactivityModal.html',
	      controller: 'RemoveActivityModalCtrl'
    	});
  	};

	$scope.openEditActivity = function (key) {
  		
		if (Agenda.paneltag === false) {

			Agenda.clickedAct = key;
  		
	    var modalInstance = $uibModal.open({
	      templateUrl: 'editActivityModal.html',
	      controller: 'editActivityModalCtrl'
    	});


		} else {

			console.log("clicked on collapse tag")
			Agenda.paneltag = false;
		}

  		
  	};



	$scope.openAddActivity = function () {
	    var modalInstance = $uibModal.open({
	      templateUrl: 'activityModal.html',
	      controller: 'ActivityModalCtrl'
    	});
  	};
  	$scope.removeActivity = function () {
	    var modalInstance = $uibModal.open({
	      templateUrl: 'removeactivityModal.html',
	      controller: 'ActivityModalCtrl'
    	});
  	};

});

meetingPlannerApp.controller('ActivityModalCtrl', function ($scope, Agenda, $uibModalInstance){
  // $scope.ok = function () {
    //$uibModalInstance.close($scope.selected.item);//passing a result

   
  // };
  	$scope.status = "";

	$scope.name = "";
	$scope.description = "";
	$scope.length = 0;
	$scope.type = "Select here";

	$scope.addAct = function() {

		if ($scope.name == ""){
			$scope.status = "Please enter a name";
		}
		// else if ($scope.length == ""){
		// 	$scope.status = "Please choose a length of the activity";
		// }
		else if ($scope.type == "Select here"){
			$scope.status = "Please choose a type for the activity";
		}
		// else if ($scope.description == ""){
		// 	$scope.status = "Please give the activity a description";
		// }
		else{
		Agenda.addAct($scope.name, $scope.length, $scope.type, $scope.description);
		$uibModalInstance.dismiss('cancel');
		$scope.status = "";
		}
	}

	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};

});

meetingPlannerApp.controller('editActivityModalCtrl', function ($scope, Agenda, $uibModalInstance){

	  //HOW TO GET THE DATA FROM THE CLICKED ACTIVITY IN HERE???!

	//var clickedActivity = Agenda.getAct(key);
	//console.log(clickedActivity);

	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
    	console.log("CCCCCC")
  	};


	var clickAct = Agenda.clickedAct;

	targetAct = Agenda.actRef.child(clickAct)

		targetAct.once("value", function(snapshot) {

			 	$scope.status = ""

			  			var key = snapshot.key()
			  			var data = snapshot.val()
			  			
			  			$scope.name = data.name; 
						$scope.description = data.description;
						$scope.length = data.length;
						$scope.type = data.type;

		
					});

		$scope.editAct = function(){

				if ($scope.name == ""){
					$scope.status = "Please enter a name";
				}
				// else if ($scope.length == ""){
				// 	$scope.status = "Please choose a length of the activity";
				// }
				else if ($scope.type == "Select here"){
					$scope.status = "Please choose a type for the activity";
				}
				// else if ($scope.description == ""){
				// 	$scope.status = "Please give the activity a description";
				// }
				else{
				Agenda.updateAct($scope.name, $scope.length, $scope.type, $scope.description);

				$uibModalInstance.dismiss('cancel');
				 $scope.status = "";

				}

					$scope.cancel = function () {
				    	$uibModalInstance.dismiss('cancel');
				  	};


		};


	});


