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
					    // Agenda.userAuth();



					    		var isNewUser = true;


					    				function authDataCallback(authData) {
									 	if (authData) {
									    	console.log("User " + authData.uid + " is logged in with " + authData.provider);
										} else {
										    console.log("User is logged out");
										}
									}

									this.ref.onAuth(authDataCallback);

	

										function getName(authData) {
										  	switch(authData.provider) {
										     	case 'password':
										       	return authData.password.email.replace(/@.*/, '');

										     	case 'twitter':
										       	return authData.twitter.displayName;
										     	
										     	case 'facebook':
										       	return authData.facebook.displayName;
										  	}
										}
	// this.userAuth = function(){

	// 	isNewUser = true;

	// }

	// 	

									Agenda.ref.onAuth(function(authData) {
										alert("onAuth")
										console.log(Agenda.ref);
									  	if (authData && isNewUser) {
									    	// save the user's profile into the database so we can list users,
										    // use them in Security and Firebase Rules, and show profiles
										    Agenda.ref.child("users").child(authData.uid).set({
									      		provider: authData.provider,
									    		name: getName(authData)
									    	});
									  	}
									});






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

meetingPlannerApp.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  	$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    	$location.hash($routeParams.scrollTo);
    	$anchorScroll();  
  	});
});