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
