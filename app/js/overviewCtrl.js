meetingPlannerApp.controller('OverviewCtrl', function ($scope,Agenda, $firebaseObject) {

$scope.days = $firebaseObject(Agenda.dayRef);


$scope.deleteDay = function(id){

Agenda.deleteDay(id);

}


$scope.addDay = function() {

Agenda.addDay();


}



});