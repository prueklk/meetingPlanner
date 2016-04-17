meetingPlannerApp.controller('OverviewCtrl', function ($scope, Agenda, $firebaseObject, $uibModal) {

	$scope.days = $firebaseObject(Agenda.dayRef);
	$scope.daysAct = $firebaseObject(Agenda.dayRef).activities;

	$scope.totalSum = 0;
	// $scope.daysAct = $firebaseObject(Agenda.dayRef.child("activities").child("-KF0S7rQ9fhU2-m1fIsv"));
	// console.log($firebaseObject(Agenda.dayRef).activities);
	// console.log($scope.daysAct);
	// console.log($firebaseObject(Agenda.dayRef))

	$scope.deleteActDay = function(day_id, act_id) {
		if (confirm("Are you sure you want to delete this day?")){
		console.log(day_id);
		console.log(act_id);
		Agenda.deleteActDay(day_id, act_id);
	}

	}
	

	// $scope.actUpdate = function(){

	// Agenda.dayRef.once("value", function(snapshot) {
 
 //  	snapshot.forEach(function(childSnapshot) {
    
 //    var key = childSnapshot.key();
   
 //    var childData = childSnapshot.val();

  
    

 //    act = childData.activities;
 //    $scope.daysAct = act;
 //    console.log(act)

	//   });
	// });

	// }

	// $scope.actUpdate();


		
		
	

	
	


	$scope.deleteDay = function(id){
		
		Agenda.deleteDay(id);
	
	}


  	$scope.open = function () {
	    var modalInstance = $uibModal.open({
	      templateUrl: 'overviewModal.html',
	      controller: 'OverviewModalCtrl'
    	});
  	};

  	//$scope.allowDrop = function(ev){
	//	ev.preventDefault();
	//}

	// $scope.drop = function(){
	// 	ev.preventDefault();
	//     var data = ev.dataTransfer.getData("text");
	//     ev.target.appendChild(document.getElementById(data));
	//     Agenda.deleteAct(data);
	// }

	document.ondragover = function(ev) {
	     ev.preventDefault();
	}

	document.ondrop = function(ev){
		ev.preventDefault();
	
	    
	    if ( $(ev.target).hasClass("drop")) {
	    	console.log(ev.target + "drop");

	    	
	    	Agenda.DragDayID = ev.target.id;
	    	Agenda.addActToDay();
	    	//Agenda.getTotalTime();
	    	//Agenda.fillcolor();
	    	var percentageArr=Agenda.fillcolor(); 
		
	    	CoffePercent = percentageArr[0];
	    	GroupPercent = percentageArr[1];
	    	DiscussionPercent = percentageArr[2];
		PresentationPercent = percentageArr[3];
		
			$scope.colorboxg = {
        "color" : "blue",
        "background-color" : "#ae163e",
        "width":GroupPercent+"px",
        "height":"20px",
        "display": "inline-block"
      
      
    }
   	$scope.colorbox = {
        "color" : "blue",
        "background-color" : "orange",
        "width":CoffePercent+"px",
        "height":"20px",
       "display": "inline-block"
       
        
    }
$scope.colorboxd = {
        "color" : "blue",
        "background-color" : "#ab3fdd",
        "width":DiscussionPercent+"px",
        "height":"20px",
        "display": "inline-block"
       
        
    }
    $scope.colorboxp = {
        "color" : "blue",
        "background-color" : "#13b4ff",
        "width":PresentationPercent+"px",
        "height":"20px",
        "display": "inline-block"
       
         
    }


	    } else if ($(ev.target).hasClass("drop2")) {
	    	Agenda.DragDayID = ev.target.parentNode.id;
	    	Agenda.addActToDay();

	    	console.log(ev.target + "drop2");

	    	//Agenda.getTotalTime();
	    	//Agenda.fillcolor();
	    	var percentageArr=Agenda.fillcolor(); 
		
	    	CoffePercent = percentageArr[0];
	    	GroupPercent = percentageArr[1];
	    	DiscussionPercent = percentageArr[2];
		PresentationPercent = percentageArr[3];
			$scope.colorboxg = {
        "color" : "blue",
        "background-color" : "#ae163e",
        "width":GroupPercent+"px",
        "height":"20px"
    }
   	$scope.colorbox = {
        "color" : "blue",
        "background-color" : "yellow",
        "width":CoffePercent+"px",
        "height":"20px"
    }
$scope.colorboxd = {
        "color" : "blue",
        "background-color" : "#ab3fdd",
        "width":DiscussionPercent+"px",
        "height":"20px"
    }
    $scope.colorboxp = {
        "color" : "blue",
        "background-color" : "#13b4ff",
        "width":PresentationPercent+"px",
        "height":"20px"
    }
	    	


	    } else if ($(ev.target).hasClass("drop3")) {
	    	Agenda.DragDayID = ev.target.parentNode.parentNode.id;
	    	Agenda.addActToDay();

	    	console.log(ev.target + "drop3");

	    	Agenda.getTotalTime();
	    	//Agenda.fillcolor();
	    	var percentageArr=Agenda.fillcolor(); 
		
	    	CoffePercent = percentageArr[0];
	    	GroupPercent = percentageArr[1];
	    	DiscussionPercent = percentageArr[2];
		    PresentationPercent = percentageArr[3];
	
	
	$scope.colorboxg = {
        "color" : "blue",
        "background-color" : "#ae163e",
        "width":GroupPercent+"px",
        "height":"20px"
    }
   	$scope.colorbox = {
        "color" : "blue",
        "background-color" : "yellow",
        "width":CoffePercent+"px",
        "height":"20px"
    }
$scope.colorboxd = {
        "color" : "blue",
        "background-color" : "#ab3fdd",
        "width":DiscussionPercent+"px",
        "height":"20px"
    }
    $scope.colorboxp = {
        "color" : "blue",
        "background-color" : "#13b4ff",
        "width":PresentationPercent+"px",
        "height":"20px"
    }


	    };


	    $scope.totalSum = Agenda.summ;
	    	
	    	
	    	// Agenda.DragDayID = ev.target.parentNode.id;
	    	
	    	// Agenda.addActToDay();
	    }

	    
	    
	    // $scope.actUpdate();

	   
	
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
