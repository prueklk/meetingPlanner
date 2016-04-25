meetingPlannerApp.controller('CalendarCtrl', function ($scope, Agenda) {
    Agenda.selectedDate = "";
    // console.log("CALENDAR // $scope.olddate = "+$scope.olddate);

	$scope.setDay = function(_day) {
		$scope.dt = new Date(_day);
        Agenda.selectedDate = $scope.dt;
  	};

    if ($scope.olddate){
        $scope.setDay($scope.olddate);
    }

  	$scope.clear = function() {
    	$scope.dt = null;
  	};

  	$scope.inlineOptions = {
    	// customClass: getDayClass,
    	minDate: 0,
    	showWeeks: true
  	};

  	$scope.dateOptions = {
    	formatYear: 'yy',
	    maxDate: new Date(2020, 5, 22),
	    minDate: 0,
	    startingDay: 1
  	};

  	$scope.toggleMin = function() {
    	$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    	$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  	};

  	$scope.toggleMin();

    $scope.changed = function(){
      // alert("calchanged");
        Agenda.selectedDate = $scope.dt;
      // Agenda.logdate();
    }
});