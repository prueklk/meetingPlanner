meetingPlannerApp.controller('OverviewCtrl', function ($scope, Agenda, $firebaseObject, $uibModal) {

	$scope.days = $firebaseObject(Agenda.dayRef);
	$scope.daysAct = $firebaseObject(Agenda.dayRef).activities;
	// $scope.daysAct = $firebaseObject(Agenda.dayRef.child("activities").child("-KF0S7rQ9fhU2-m1fIsv"));
	// console.log($firebaseObject(Agenda.dayRef).activities);
	// console.log($scope.daysAct);
	// console.log($firebaseObject(Agenda.dayRef))

	$scope.deleteActDay = function(day_id, act_id) {
		console.log(day_id);
		console.log(act_id);
		Agenda.deleteActDay(day_id, act_id);

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
	    // var data = ev.dataTransfer.getData("text");
	    // ev.target.appendChild(document.getElementById(data));
	    // Agenda.deleteAct(data);
	    Agenda.DragDayID = ev.target.id;
	    Agenda.addActToDay();
	    console.log(ev.target.id)
	    $scope.actUpdate();

	   
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
