meetingPlannerApp.controller('OverviewCtrl', function ($scope, Agenda, $firebaseObject, $uibModal) {


	$scope.sortConfig = {
            group: 'sortConfig',
            animation: 200,
            onSort: function (/** ngSortEvent */evt){
                // @see https://github.com/RubaXa/Sortable/blob/master/ng-sortable.js#L18-L24
                console.log("SORT");
            }



        }

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
		if (confirm("Are you sure you want to delete this day?")){
		Agenda.deleteDay(id);
	}
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

	// $scope.drag = function(ev) {
	//      ev.preventDefault();



	// }

	// $scope.onDragComplete=function(data, evt){
 //       console.log("drag success, data:", data);






 //    }

	$scope.drop = function(day){
		// ev.preventDefault();
		console.log(day);
	
	    
	    // if ( $(ev.target).hasClass("drop")) {
	    // 	console.log(ev.target + "drop");

	    	
	    	Agenda.DragDayID = day;
	    	Agenda.addActToDay();

	    	Agenda.deleteAct(Agenda.DragActID);
	    // 	Agenda.getTotalTime();


	    // } else if ($(ev.target).hasClass("drop2")) {
	    // 	Agenda.DragDayID = ev.target.parentNode.id;
	    // 	Agenda.addActToDay();

	    // 	console.log(ev.target + "drop2");

	    // 	Agenda.getTotalTime();


	    // } else if ($(ev.target).hasClass("drop3")) {
	    // 	Agenda.DragDayID = ev.target.parentNode.parentNode.id;
	    // 	Agenda.addActToDay();

	    // 	console.log(ev.target + "drop3");

	    // 	Agenda.getTotalTime();


	    // };


	    // $scope.totalSum = Agenda.summ;
	    	
	    	
	    	// Agenda.DragDayID = ev.target.parentNode.id;
	    	
	    	// Agenda.addActToDay();
	    }

	    
	    
	    // $scope.actUpdate();

	$scope.dragBackStart = function(act, day){

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
