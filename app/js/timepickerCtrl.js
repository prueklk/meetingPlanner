meetingPlannerApp.controller('TimepickerCtrl', function ($scope, $log, Agenda) {
  

  // $scope.mytime = new Date();
  $scope.mytime = null;

  $scope.hstep = 1;
  $scope.mstep = 15;

  // $scope.options = {
  //   hstep: [1, 2, 3],
  //   mstep: [1, 5, 10, 15, 25, 30]
  // };

  $scope.ismeridian = false;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 10 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);

    Agenda.selectedTime = $scope.mytime;
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };





});








