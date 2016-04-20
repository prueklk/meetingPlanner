meetingPlannerApp.controller('OverviewCtrl', function ($scope, Agenda, $firebaseObject, $uibModal) {

	 $scope.config = {
            group: 'acts',
            animation: 150,
            onSort: function (/** ngSortEvent */evt){
                // @see https://github.com/RubaXa/Sortable/blob/master/ng-sortable.js#L18-L24

                console.log("SORT")
            }
        };



        
	$scope.days = $firebaseObject(Agenda.dayRef);
	$scope.daysAct = $firebaseObject(Agenda.dayRef).activities;



	$scope.totalSum = 0;
	$scope.letterlimit = 1;




	// $scope.daysAct = $firebaseObject(Agenda.dayRef.child("activities").child("-KF0S7rQ9fhU2-m1fIsv"));
	// console.log($firebaseObject(Agenda.dayRef).activities);
	// console.log($scope.daysAct);
	// console.log($firebaseObject(Agenda.dayRef))

	$scope.deleteActDay = function(day_id, act_id) {
		
		// console.log(day_id);
		// console.log(act_id);
		Agenda.deleteActDay(day_id, act_id);
		Agenda.DragDayID = day_id;
		Agenda.getTotalTime();
		Agenda.getEndTime();
		Agenda.fillcolor(day_id)


	}
	



	$scope.deleteDay = function(id){
		
		Agenda.deleteDay(id);
	
	}


  	$scope.open = function () {
	    var modalInstance = $uibModal.open({
	      templateUrl: 'overviewModal.html',
	      controller: 'OverviewModalCtrl'
    	});
  	};

  	




  	$scope.breakmarker = {



              'color' : 'blue',
              'background-color': 'red',
              'width':  '3px',
              'height':'20px',
              'position' : 'relative',
              'left':  '20%',
              'bottom':'25px',

              'display': 'inline-block'
  	}

  	// if (Agenda.emptycheck === true) {

  	// 	console.log(Agenda.emptycheck);
  	// 	$scope.breakhide = true;
  	// } else {

  	// 	$scope.breakhide = false;
  	// }

	$scope.drop = function(day){
	
			console.log(day);

	    	
	    	Agenda.DragDayID = day;
	    	Agenda.addActToDay();
	    	


	  //   	var percentageArr=Agenda.fillcolor(day); 
		
	  //   	CoffeePercent = percentageArr[0];
	  //   	GroupPercent = percentageArr[1];
	  //   	DiscussionPercent = percentageArr[2];
			// PresentationPercent = percentageArr[3];

			// 			// var wtf = "colorboxGroup" + day;
			// 			// console.log(wtf);
		
				// $scope.colorboxGroup = {
			 //        "color" : "blue",
			 //        "background-color" : "#ae163e",
			 //        "width":GroupPercent+"px",
			 //        "height":"20px",
			 //        "display": "inline-block"
			      
			      
			 //    }
			 //   	$scope.colorboxCoffee = {
			 //        "color" : "blue",
			 //        "background-color" : "orange",
			 //        "width":CoffeePercent+"px",
			 //        "height":"20px",
			 //       "display": "inline-block"
			       
			        
			 //    }
				// $scope.colorboxDiscussion = {
			 //        "color" : "blue",
			 //        "background-color" : "#ab3fdd",
			 //        "width":DiscussionPercent+"px",
			 //        "height":"20px",
			 //        "display": "inline-block"
			       
			        
			 //    }
			 //    $scope.colorboxPresentation = {
			 //        "color" : "blue",
			 //        "background-color" : "#13b4ff",
			 //        "width":PresentationPercent+"px",
			 //        "height":"20px",
			 //        "display": "inline-block"
			       
			         
			 //    }



	    	Agenda.deleteAct(Agenda.DragActID);

	    	Agenda.getTotalTime();
	    	Agenda.getEndTime();
	    	Agenda.fillcolor(day)
	
	    }

	    
	    
	    // $scope.actUpdate();

	$scope.dragBackStart = function(act, day){

		Agenda.DragDayID = day;
		Agenda.DragActID = act;
		Agenda.dragBackDay = day;
		Agenda.dragBackAct = act;
		
	}

	  $scope.openEditActivityDay = function (keyAct, keyDay) {
	  		Agenda.clickedAct = keyAct;
	  		Agenda.clickedDay = keyDay;
	  		
		    var modalInstance = $uibModal.open({
		      templateUrl: 'editActivityModal.html',
		      controller: 'editActivityDayModalCtrl'
	    	});
 	 	};


});






meetingPlannerApp.controller('OverviewModalCtrl', function ($scope, Agenda, $uibModalInstance){

	$scope.addDay = function() {
		console.log("Agenda.selectedDate = "+Agenda.selectedDate);

		Agenda.dayRef.once("value", function(snapshot) {

		  			var key = snapshot.key()
		  			var data = snapshot.val()

		  			if (data == Agenda.selectedDate){
		  				alert("EXIST!");
		  			}
		  		
		  			
		});

		if (Agenda.selectedDate && $scope.meetingname){
			console.log("selectedDate");

			Agenda.addDay($scope.meetingname);
			$uibModalInstance.dismiss('cancel');
			$scope.daystatus = ""			
		}

		else{
			$scope.daystatus = "Please give your activity a name and pick a date"
		}
	}
		
	

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

meetingPlannerApp.controller('editActivityDayModalCtrl', function ($scope, Agenda, $uibModalInstance){


	//var clickedActivity = Agenda.getAct(key);
	//console.log(clickedActivity);
	var clickAct = Agenda.clickedAct;
	var clickDay = Agenda.clickedDay;
	

	targetAct = Agenda.dayRef.child(clickDay).child("activities").child(clickAct)

		targetAct.once("value", function(snapshot) {

			  			var key = snapshot.key()
			  			var data = snapshot.val()

			  	$scope.status = "";
			  			
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
				Agenda.updateActDay($scope.name, $scope.length, $scope.type, $scope.description);

				$uibModalInstance.dismiss('cancel');
				$scope.status = "";

				}
			}

					$scope.cancel = function () {
				    	$uibModalInstance.dismiss('cancel');
				  	};


		});


