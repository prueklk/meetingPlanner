meetingPlannerApp.controller('OverviewCtrl', function ($scope, Agenda, $firebaseObject, $uibModal, $firebaseArray) {

	$scope.go = function ( path ) {
  		$location.path( path );
  		alert("sss")
	};

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
    $scope.keyword = ""; 

	$scope.search = function(){
		var query = $scope.searchinput;
		$scope.keyword = query;
		// Agenda.dayRef.on("value", function(response){
		// 	days = response.val();
		// 	days.forEach(function(snapshot) {
		// 	console.log(item);
		// })
		// })
	}

	if (Agenda.dayRef) {

		var arr = $firebaseObject(Agenda.dayRef);
		arr.$loaded(function(data){
			$scope.spin = true;
			$scope.days = data;
		});

	};
	

	
	$scope.totalSum = 0;
	$scope.letterlimit = 1;

	$scope.deleteActDay = function(day_id, act_id) {
		// console.log("day_id = "+day_id);
		// console.log("act_id = "+act_id);
		var modalInstance = $uibModal.open({
	      	templateUrl: 'activityConfirmModal.html',
	      	controller: 'ActivityConfirmModalCtrl',
		    resolve: {
		        id: function () {
		          	return act_id;
		        },
	        	name: function(){
	        		return $scope.days[day_id].activities[act_id].name;
	        	},
	        	day_id: function(){
	        		return day_id;
	        	}
		    }
	    });
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

  	
  	$scope.edit = function (key, name, date, location, starttime) {
	    var modalInstance = $uibModal.open({
		    templateUrl: 'editDayModal.html',
		    controller: 'EditDayModalCtrl',
		    resolve: {
		        key: function () {
		          	return key;
		        },
		        name: function(){
		        	return name;
		        },
		        date: function () {
		          	return date;
		        },
		        location: function(){
		        	return location;
		        },
		        starttime: function(){
		        	return starttime;
		        }
		    }
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

	$scope.drop = function(day){
		// console.log(day);
    	Agenda.DragDayID = day;
    	Agenda.addActToDay();	
		Agenda.deleteAct(Agenda.DragActID);
    	Agenda.getTotalTime();
    	Agenda.getEndTime();
    	Agenda.fillcolor(day)
	}
	    
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
		if (Agenda.selectedDate && $scope.meetingname && $scope.meetinglocation && Agenda.selectedTime !== null){
			Agenda.addDay($scope.meetingname, $scope.meetinglocation);
			$uibModalInstance.dismiss('cancel');
			$scope.daystatus = "";			
		}else{
			$scope.daystatus = "Please make sure you have completed the form."
		}
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

meetingPlannerApp.controller('EditDayModalCtrl', function ($scope, Agenda, $uibModalInstance, key, name, date, location, starttime){
	// console.log("EDIT DAY");
	// console.log("key = "+key);
	// console.log("name = "+name+" // date = "+date+" // location = "+location+" // starttime = "+starttime);
	$scope.meetingname = name;
	$scope.olddate = new Date(date);
	$scope.meetinglocation = location;
	$scope.oldtime = new Date(starttime);
	Agenda.clickedDay = key;

	$scope.editDay = function() {
		// console.log(Agenda.selectedDate);
		// console.log($scope.meetingname);
		// console.log($scope.meetinglocation);
		// console.log(Agenda.selectedTime);
		if (Agenda.selectedDate && $scope.meetingname && $scope.meetinglocation && Agenda.selectedTime !== null){
			// TO DO // UPDATE MEETING IN SERVICE // selectedDate and selectedTime are already updated.

			Agenda.updateDay($scope.meetingname, $scope.meetinglocation);
			$uibModalInstance.dismiss('cancel');
			$scope.daystatus = "";			
		}else{
			$scope.daystatus = "Please make sure you have completed the form."

		}
	}

	$scope.cancel = function () {
	   	$uibModalInstance.dismiss('cancel');
	};

	$scope.getWeather = function(){
		if(Agenda.selectedDate && Agenda.selectedTime){
			return "Weather forecast : "+Agenda.getWeather(Agenda.selectedDate, Agenda.selectedTime);
		}
	}
});

meetingPlannerApp.controller('editActivityDayModalCtrl', function ($scope, Agenda, $uibModalInstance){
	//console.log(clickedActivity);
	var clickAct = Agenda.clickedAct;
	var clickDay = Agenda.clickedDay;
	
	targetAct = Agenda.dayRef.child(clickDay).child("activities").child(clickAct);
	
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
			$scope.status = "Please enter the activity name";
		}else if ($scope.length == "" || !$scope.length){
			$scope.status = "Please fill in the activity length.";
		}else if ($scope.type == "Select here"){
			$scope.status = "Please choose the activity type.";
		}else{
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
	// console.log("id = "+id);
	// console.log("name = "+name);
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

