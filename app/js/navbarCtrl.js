meetingPlannerApp.controller('NavbarCtrl', function ($scope,$firebaseArray,Agenda,$firebaseObject, $location) {
	
	$scope.logout = function(){
		Agenda.logout();
		$location.path("/home");
		console.log("LOGOUT controller")
	}

	

	if (Agenda.dayRef && Agenda.actRef) {

		var data = $firebaseObject(Agenda.ref);
		data.$loaded(function(data){
		var userName = "";

			Agenda.ref.child("users").child(Agenda.currentUser).child("name").once("value", function(snapshot) {

			var data = snapshot.val();
			console.log(data);

			userName = data;

			});

		$scope.userObject = userName;

	});


	};
	
});