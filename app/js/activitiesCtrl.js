meetingPlannerApp.controller('ActivitiesCtrl', function ($scope,$firebaseArray,$firebaseObject,Agenda) {


$scope.activities = $firebaseObject(Agenda.actRef);


$scope.deleteAct = function(id) {


Agenda.deleteAct(id);


}





});