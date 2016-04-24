meetingPlannerApp.controller('ActivitiesCtrl', function ($scope, $location, $firebaseArray,$firebaseObject,Agenda,$uibModal) {




$scope.selectChevron = function(id, event) {
    $scope.activeClass = id;

	var myEl = angular.element(event.target);

	if (angular.element(event.target).hasClass("glyphicon-chevron-down")) {

		$scope.activeClass = "ChevronRight";

	};
    
    console.log(myEl)
 
   

    
  };


$scope.test = function(text) {
  alert(text);
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
		// console.log($scope.days[id].name);
		console.log($scope.activities);

		var modalInstance = $uibModal.open({
		      	templateUrl: 'activityConfirmModal.html',
		      	controller: 'ActivityConfirmModalCtrl',
			    resolve: {
			        id: function () {
			          	return id;
			        },
		        	name: function(){
		        		return $scope.activities[id].name;
		        	}
			    }
	    });

		// Agenda.deleteAct(id);
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
  	


});

meetingPlannerApp.controller('ActivityModalCtrl', function ($scope, Agenda, $uibModalInstance){
  // $scope.ok = function () {
    //$uibModalInstance.close($scope.selected.item);//passing a result

   
  // };
  	$scope.status = "";

	$scope.name = "";
	$scope.description = "";
	// $scope.length = 0;
	$scope.type = "Select here";

	$scope.addAct = function() {
	
		if ($scope.name == ""){
			$scope.status = "Please enter the activity name";
		}
		else if ($scope.length == "" || !$scope.length){
			$scope.status = "Please fill in the activity length.";
		} 
		else if ($scope.type == "Select here"){
			$scope.status = "Please choose the activity type.";
		}
		// else if ($scope.description == ""){
		// 	$scope.status = "Please give the activity a description";
		// }
		else {
			Agenda.addAct($scope.name, $scope.length, $scope.type, $scope.description);
			$uibModalInstance.dismiss('cancel');
			$scope.status = "";
		}
	}

	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};

});

meetingPlannerApp.directive('validNumber', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return; 
      }

      ngModelCtrl.$parsers.push(function(val) {
        if (angular.isUndefined(val)) {
            var val = '';
        }
        var clean = val.replace( /[^0-9]+/g, '');
        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });

      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});

meetingPlannerApp.controller('editActivityModalCtrl', function ($scope, Agenda, $uibModalInstance,$uibModal){

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
						$scope.key = key;
						$scope.data = data;
		
					});

		$scope.editAct = function(){

				if ($scope.name == ""){
					$scope.status = "Please enter the activity name";
				}
				else if ($scope.length == "" || !$scope.length){
					$scope.status = "Please fill in the activity length.";
				} 
				else if ($scope.type == "Select here"){
					$scope.status = "Please choose the activity type.";
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

		/*$scope.deleteAct = function(id) {
			console.log("DELETEACT");
			console.log($scope.data.name);
			console.log(id);

			var modalInstance = $uibModal.open({
		      	templateUrl: 'activityConfirmModal.html',
		      	controller: 'ActivityConfirmModalCtrl',
			    resolve: {
			        id: function () {
			          	return id;
			        },
		        	name: function(){
		        		return $scope.data.name;
		        	}
			    }
	    	});
		}*/

	});

meetingPlannerApp.controller('ActivityConfirmModalCtrl', function ($scope, Agenda, $uibModalInstance, id, name){
	console.log("id = "+id+" , name = "+name);
	$scope.getActivityName = function(){
		return name;
	}
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	    console.log("CANCEL");
	};

	$scope.deleteActivity = function(){
		console.log("DELETE");
		$uibModalInstance.dismiss('cancel');
		Agenda.deleteAct(id);
	}

});
