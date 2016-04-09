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
	    var data = ev.dataTransfer.getData("text");
	    ev.target.appendChild(document.getElementById(data));
	    Agenda.deleteAct(data);
	   
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
