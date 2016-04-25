meetingPlannerApp.controller('NavbarCtrl', function ($scope,$firebaseArray,Agenda,$firebaseObject) {
	
	$scope.logout = function(){
		Agenda.logout();
	}

});