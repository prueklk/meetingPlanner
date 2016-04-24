meetingPlannerApp.controller('OverviewCtrl', function ($scope, Agenda, $firebaseObject, $uibModal, $firebaseArray) {

	$scope.TrackingFunction = function(actIndex, day, act){


		// Agenda.updateIndex(actIndex, day, act)


		// console.log(actIndex, day)

	}


	$scope.sortableKey = function(key, day){

		Agenda.ActSorted = key;
		Agenda.DaySorted = day;
		console.log(Agenda.ActSorted);
		console.log(Agenda.DaySorted);

		// var ref = Agenda.dayRef.child(day).child("activities").child(key);
			
		// // ref.setWithPriority('fred', 500, function(error) {
		// 	ref.once("value", function(snapshot) {
		// 	    var priority = snapshot.getPriority();
		// 	    // priority === 500
		// 	    console.log(priority)
		// 	  });

		  // });

	}

	$scope.sort = {
            group: 'acts',
            animation: 150,
            onSort: function (/** ngSortEvent */evt){
                // @see https://github.com/RubaXa/Sortable/blob/master/ng-sortable.js#L18-L24
                console.log("ADDED")


                			 angular.element(".dayAct").each(function(index, obj){
		        	var id = obj.id;
		        	var day = obj.parentNode.parentNode.id;
		        	// console.log(obj.parentNode.parentNode.id);

		        	Agenda.updateIndex(index, day, id);
		        })


                
            },


            onEnd: function (/**Event*/evt) {
		        
		        // var ref = Agenda.dayRef.child(day).child("activities")


		       
		        console.log(evt.oldIndex);  // element's old index within parent
		        console.log(evt.newIndex);  // element's new index within parent



		    },
		    onAdd: function (/**Event*/evt) {
		        var itemEl = evt.item;  // dragged HTMLElement
		        evt.from;  // previous list
		        // + indexes from onEnd
		        alert("ADD")
		    	}
	}


	// var query = messagesRef.orderByChild("timestamp").limitToLast(25);

        
	var arr = $firebaseObject(Agenda.dayRef);

	arr.$loaded(function(data){

		$scope.days = data;
		console.log(data);
	})

	//  = $firebaseArray(Agenda.dayRef);

	// $scope.days = $firebaseArray(Agenda.dayRef);
	// var dayActArray = sync.$asArray();

	// //  = objectsArray;
	//  = dayArray;





	$scope.totalSum = 0;
	$scope.letterlimit = 1;




	// $scope.daysAct = $firebaseObject(Agenda.dayRef.child("activities").child("-KF0S7rQ9fhU2-m1fIsv"));
	// console.log($firebaseObject(Agenda.dayRef).activities);
	// console.log($scope.daysAct);
	// console.log($firebaseObject(Agenda.dayRef))

	$scope.deleteActDay = function(day_id, act_id) {
		
		// console.log(day_id);
		// console.log(act_id);
		Agenda.deleteActDay(day_id, act_id);
		Agenda.DragDayID = day_id;
		Agenda.getTotalTime();
		Agenda.getEndTime();
		Agenda.fillcolor(day_id)


	}
	



	$scope.deleteDay = function(id){
		console.log($scope.days[id].name);
		var modalInstance = $uibModal.open({
	      	templateUrl: 'overviewConfirmModal.html',
	      	controller: 'OverviewConfirmModalCtrl',
		    resolve: {
		        id: function () {
		          	return id;
		        },
		        name: function(){
		        	return $scope.days[id].name;
		        }
		    }
    	});

		//Agenda.deleteDay(id);
	}


  	$scope.open = function () {
	    var modalInstance = $uibModal.open({
	      templateUrl: 'overviewModal.html',
	      controller: 'OverviewModalCtrl'
    	});
  	};

  	




  	$scope.breakmarker = {



              'color' : 'blue',
              'background-color': 'red',
              'width':  '3px',
              'height':'20px',
              'position' : 'relative',
              'left':  '20%',
              'bottom':'25px',

              'display': 'inline-block'
  	}

  	// if (Agenda.emptycheck === true) {

  	// 	console.log(Agenda.emptycheck);
  	// 	$scope.breakhide = true;
  	// } else {

  	// 	$scope.breakhide = false;
  	// }

	$scope.drop = function(day){
	
			console.log(day);

	    	
	    	Agenda.DragDayID = day;
	    	Agenda.addActToDay();
	    	


	  //   	var percentageArr=Agenda.fillcolor(day); 
		
	  //   	CoffeePercent = percentageArr[0];
	  //   	GroupPercent = percentageArr[1];
	  //   	DiscussionPercent = percentageArr[2];
			// PresentationPercent = percentageArr[3];

			// 			// var wtf = "colorboxGroup" + day;
			// 			// console.log(wtf);
		
				// $scope.colorboxGroup = {
			 //        "color" : "blue",
			 //        "background-color" : "#ae163e",
			 //        "width":GroupPercent+"px",
			 //        "height":"20px",
			 //        "display": "inline-block"
			      
			      
			 //    }
			 //   	$scope.colorboxCoffee = {
			 //        "color" : "blue",
			 //        "background-color" : "orange",
			 //        "width":CoffeePercent+"px",
			 //        "height":"20px",
			 //       "display": "inline-block"
			       
			        
			 //    }
				// $scope.colorboxDiscussion = {
			 //        "color" : "blue",
			 //        "background-color" : "#ab3fdd",
			 //        "width":DiscussionPercent+"px",
			 //        "height":"20px",
			 //        "display": "inline-block"
			       
			        
			 //    }
			 //    $scope.colorboxPresentation = {
			 //        "color" : "blue",
			 //        "background-color" : "#13b4ff",
			 //        "width":PresentationPercent+"px",
			 //        "height":"20px",
			 //        "display": "inline-block"
			       
			         
			 //    }



	    	Agenda.deleteAct(Agenda.DragActID);

	    	Agenda.getTotalTime();
	    	Agenda.getEndTime();
	    	Agenda.fillcolor(day)
	
	    }

	    
	    
	    // $scope.actUpdate();

	$scope.dragBackStart = function(act, day){

		Agenda.DragDayID = day;
		Agenda.DragActID = act;
		Agenda.dragBackDay = day;
		Agenda.dragBackAct = act;
		
	}

	  $scope.openEditActivityDay = function (keyAct, keyDay) {
	  		Agenda.clickedAct = keyAct;
	  		Agenda.clickedDay = keyDay;
	  		
		    var modalInstance = $uibModal.open({
		      templateUrl: 'editActivityModal.html',
		      controller: 'editActivityDayModalCtrl'
	    	});
 	 	};

 	$scope.convertToHours = function(min){
        var minutes = min % 60;
        var hours = Math.floor(min / 60);

        minutes = (minutes < 10 ? '0' : '') + minutes;
        // hours = (hours < 10 ? '0' : '') + hours;

        return hours + ':' + minutes; 
 	}

 	$scope.updateWeather = function(_date, _time){		
 		//console.log("UPDATEWEATHER // _date = "+_date+" // _time = "+_time);
 		var _date = new Date(_date);
 		var _time = new Date(_time);
 		
		return Agenda.getWeather(_date, _time);
	}


});



meetingPlannerApp.controller('OverviewModalCtrl', function ($scope, Agenda, $uibModalInstance){
	
	$scope.addDay = function() {
		

		// getSelectedTime = new Date(Agenda.selectedTime);
		// getSelectedTimeConvert = getSelectedTime.getTime();
		// getSelectedTimeRounded = getSelectedTimeConvert/100000;
		// var newPickTime = Math.floor(getSelectedTimeRounded); 
		// // console.log("Time" + newPickTime);

		// getSelectedDate = Agenda.selectedDate.toISOString();
		// console.log("Date" + getSelectedDate)



		
		// Agenda.dayRef.once("value", function(snapshot) {
		// 	snapshot.forEach(function(childSnapshot){

		//   			var key = childSnapshot.key()
		//   			var data = childSnapshot.val()
		//   			var savedDate = data.date;
		//   			console.log("savedDate "+ savedDate)

		//   			var savedStarttime = new Date(data.starttime);
		//   			var getSelectedStartTime = savedStarttime.getTime();
		//   			var getSelectedStartTimeRounded = getSelectedStartTime/100000;
		//   			var newTime = Math.floor(getSelectedStartTimeRounded); 
		//   			//var getSelectedStartTimeNew = Math.round(1000*getSelectedStartTime)/1000
		//   			console.log("Starttime" + newTime)

		//   			if ( getSelectedDate == savedDate && newPickTime == newTime){
		//   				console.log("same date!!!");
		//   				$scope.daystatus = "This date and time already exist. Please pick another day or time"

		//   			}
		//   			else{
		  				if (Agenda.selectedDate && $scope.meetingname && $scope.meetinglocation && Agenda.selectedTime !== null){
		  					// console.log("LOCATION = "+$scope.meetinglocation);

							Agenda.addDay($scope.meetingname , $scope.meetinglocation);
							$uibModalInstance.dismiss('cancel');
							$scope.daystatus = ""			
						}

						else{
							$scope.daystatus = "Please make sure you have completed the form."
						}
		  				
		  		// 	}
		  		
		  		// });
		  			
		// });
// >>>>>>> 7fdd407cfd91d7f57de2f5f03917736438ff8746


	
	}
		
	
$scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
    console.log("CANCEL");
  };

$scope.getWeather = function(){
	if(Agenda.selectedDate && Agenda.selectedTime){
		return "Weather forecast : "+Agenda.getWeather(Agenda.selectedDate, Agenda.selectedTime);
	}
}

});

meetingPlannerApp.controller('editActivityDayModalCtrl', function ($scope, Agenda, $uibModalInstance){


	//var clickedActivity = Agenda.getAct(key);
	//console.log(clickedActivity);
	var clickAct = Agenda.clickedAct;
	var clickDay = Agenda.clickedDay;
	

	targetAct = Agenda.dayRef.child(clickDay).child("activities").child(clickAct)

		targetAct.once("value", function(snapshot) {

			  			var key = snapshot.key()
			  			var data = snapshot.val()

			  	$scope.status = "";
			  			
			  			$scope.name = data.name;
						$scope.description = data.description;
						$scope.length = data.length;
						$scope.type = data.type;

		
					});

		$scope.editAct = function(){
			
				if ($scope.name == ""){
					$scope.status = "Please enter a name";
				}
				// else if ($scope.length == ""){
				// 	$scope.status = "Please choose a length of the activity";
				// }
				else if ($scope.type == "Select here"){
					$scope.status = "Please choose a type for the activity";
				}
				// else if ($scope.description == ""){
				// 	$scope.status = "Please give the activity a description";
				// }
				else{
				Agenda.updateActDay($scope.name, $scope.length, $scope.type, $scope.description);

				$uibModalInstance.dismiss('cancel');
				$scope.status = "";

				}
			}

					$scope.cancel = function () {
				    	$uibModalInstance.dismiss('cancel');
				  	};


});

meetingPlannerApp.controller('OverviewConfirmModalCtrl', function ($scope, Agenda, $uibModalInstance, id, name){
	//console.log("id = "+id);
	//console.log("name = "+name);
	$scope.getMeetingName = function(){
		return name;
	}
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	    console.log("CANCEL");
	};

	$scope.deleteMeeting = function(){
		console.log("DELETE");
		$uibModalInstance.dismiss('cancel');
		Agenda.deleteDay(id);
	}

});

