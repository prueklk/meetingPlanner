meetingPlannerApp.controller('TimepickerCtrl', function ($scope, $log, Agenda) {
  

  // $scope.options = {
  //   hstep: [1, 2, 3],
  //   mstep: [1, 5, 10, 15, 25, 30]
  // };

  $scope.ismeridian = false;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    if($scope.oldtime){
      var d = new Date($scope.oldtime)
    }else{

      var d = new Date();
      d.setHours( 8 );
      d.setMinutes( 0 );
    }
    $scope.mytime = d;
    Agenda.selectedTime = $scope.mytime;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);

    if ($scope.mytime === null) {
      $scope.inputText = "Please correct the time.";
    } else{
      $scope.inputText = "";
    }

    Agenda.selectedTime = $scope.mytime;
  };

  $scope.clear = function() {
    //$scope.mytime = null;
    $scope.update();
  };

  $scope.update();
  $scope.hstep = 1;
  $scope.mstep = 15;

});








