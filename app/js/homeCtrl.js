meetingPlannerApp.controller('HomeCtrl', function ($scope,$firebaseArray,Agenda,$firebaseObject) {


$scope.createUser = function() {


	Agenda.ref.createUser({
			  email    : $scope.email,
			  password : $scope.pw
			}, function(error, userData) {
			  if (error) {
			    console.log("Error creating user:", error);
			  } else {
			    console.log("Successfully created user account with uid:", userData.uid);


			    			Agenda.ref.authWithPassword({
							  email    : $scope.email,
							  password : $scope.pw
							}, function(error, authData) {
							  if (error) {
							    console.log("Login Failed!", error);
							  } else {
							    console.log("Authenticated successfully with payload:", authData);
							    Agenda.isNewUser = true;
							  }
							});





			  }
			});

}

$scope.login = function(){



	Agenda.ref.authWithPassword({
		  email    : $scope.email,
		  password : $scope.pw
		}, function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		  }
		});




}			
	
	

});