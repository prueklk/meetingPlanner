meetingPlannerApp.controller('HomeCtrl', function ($scope,$firebaseArray,Agenda,$firebaseObject, $location, ngProgressFactory) {
	$scope.progressbar = ngProgressFactory.createInstance();

	$scope.progressbar.setHeight('20px');
	$scope.progressbar.setColor('#fff');


	$scope.isDisabled = false;
	$scope.homeAlert = false;
	
	

	// $scope.progressbar.setParent(document.getElementById('progressdiv'));
	// var element = $scope.progressbar.getDomElement();

	// console.log(element)
  
$scope.login = function(){
		// alert("LOGIN");


		if ($scope.email && $scope.pw) {
		
		   $scope.progressbar.start();
		   $scope.homeAlert = false;
		   $scope.isDisabled = true;
		Agenda.ref.authWithPassword({
			email    : $scope.email,
			password : $scope.pw
		}, function(error, authData) {
			if (!error) {

				Agenda.currentUser = authData.uid
				// Agenda.updateUserDB();

				$scope.progressbar.complete();

				$scope.isDisabled = false;
				$location.path("/activities")


				// alert("NOERROR")
				
			    
			} else if (error.code === "INVALID_USER") {
				$scope.isDisabled = false;
				$scope.homeAlert = true;
				$scope.loginError = "Invalid user, try again or Sign Up"
				$scope.progressbar.reset()


			} else if (error.code === "INVALID_PASSWORD"){

				$scope.isDisabled = false;
				$scope.homeAlert = true;
				$scope.loginError = "Invalid password"
				$scope.progressbar.reset()



			} else if (error.code === "INVALID_EMAIL") {
				
				$scope.isDisabled = false;
				$scope.homeAlert = true;
				$scope.loginError = "Username must be an e-mail address"
				// alert("No such user, try again or Sign Up!")
				
			    console.log("Login Failed!", error)
			    $scope.progressbar.reset()

				// 	Agenda.ref.onAuth(authDataCallback);
				// function authDataCallback(authData) {
				// 	 	if (authData) {
				// 	    	console.log("User " + authData.uid + " is logged in with " + authData.provider);

				// 		} else {
				// 		    console.log("User is logged out");
				// 		}
				// 	}
			} 
				

				
		});

	} else {
		$scope.progressbar.reset();
		$scope.isDisabled = false;
		// alert("Please fill in your e-mail and password")
		$scope.homeAlert = true;
		$scope.loginError = "Please fill in your e-mail and password"

	}
}



	$scope.createUser = function() {

	if ($scope.email && $scope.pw) {

			$scope.progressbar.start();
			$scope.homeAlert = false;
			$scope.isDisabled = true;
		
		Agenda.ref.createUser({
			email    : $scope.email,
			password : $scope.pw
		}, function(error, userData) {
			if (!error) {

			console.log("Successfully created user account with uid:", userData.uid);
			Agenda.ref.authWithPassword({
				email    : $scope.email,
				password : $scope.pw
			}, function(error, authData) {
			  	if (error) {
					console.log("Login Failed!", error);
					$scope.homeAlert = true;
					$scope.loginError = error;
					$scope.progressbar.reset();
					$scope.isDisabled = false;
				} else {
						
			    console.log("Authenticated successfully with payload:", authData)
							

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
							

									Agenda.ref.onAuth(function(authData) {

										
										console.log(authData)
										var isNewUser = true;
										Agenda.ref.child("users").once("value", function(snapshot) {
	  										snapshot.forEach(function(childSnapshot) {
	  											var key = childSnapshot.key()
	  											
	  											if (authData) {
	  												
	  												if (authData.uid === key) {
	  													isNewUser = false;

	  												};
	  												
		
	  											} 

	  										});

	  											if (authData && isNewUser) {
											  
											  		console.log(authData.uid)

											    	// save the user's profile into the database so we can list users,
												    // use them in Security and Firebase Rules, and show profiles
												    Agenda.ref.child("users").child(authData.uid).set({
											      		provider: authData.provider,
											    		name: getName(authData),
											    		day:"",
											    		activity:""
											    	});
											    	
												    Agenda.currentUser = authData.uid
												    
												   
											    	$scope.progressbar.complete();
											    	$scope.isDisabled = false;
											    	$location.path("/activities");
									  	
											  	} else if (authData) {


											  		Agenda.currentUser = authData.uid
												    
											    	$scope.progressbar.complete();
											    	$scope.isDisabled = false;
											    	$location.path("/activities");

											  	}

	  								});			  	
							});
				  	}
				});





				
				
				
					// alert(error)
			    	
			  	} else if(error.code === "INVALID_EMAIL") {
			  			$scope.homeAlert = true;
						$scope.loginError = "Please use a valid e-mail address";
						$scope.isDisabled = false;
						$scope.progressbar.reset();



			  	} else if (error.code  === "EMAIL_TAKEN")  {

			  			$scope.homeAlert = true;
						$scope.loginError = "User is already signed up";
						$scope.isDisabled = false;
						$scope.progressbar.reset();
			    	
				}
			});



		} else {

			$scope.progressbar.reset();
			$scope.isDisabled = false;
			// alert("Please fill in your e-mail and password")
			$scope.homeAlert = true;
			$scope.loginError = "Please fill in all details and click Sign Up"
		}
	}

	
});

meetingPlannerApp.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  	$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    	$location.hash($routeParams.scrollTo);
    	$anchorScroll();  
  	});
});