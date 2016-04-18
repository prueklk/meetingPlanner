meetingPlannerApp.factory('Agenda',function ($resource, $firebaseArray, $firebaseObject) {

this.ref = new Firebase("https://flickering-fire-1621.firebaseio.com/");
this.actRef = this.ref.child("activity")
this.dayRef = this.ref.child("day")
// this.dayActs = this.dayRef.child("activities")
// this.dayRefActivities = this.dayRef.child("dayActivities")

this.actIDarray = [];
this.selectedDate = "";
this.selectedTime = "";

this.DragDayID = "";
this.DragActID = "";
this.dragBackDay = "";
this.dragBackAct = "";

this.summ = 0;


this.deleteActDay = function(day_id, act_id) {

this.dayRef.child(day_id).child("activities").child(act_id).remove();

}


this.deleteDay = function(id){

	
this.dayRef.child(id).remove();


};

this.deleteAct = function(id){


console.log(this.actRef.child(id))
this.actRef.child(id).remove();


}


this.logdate = function(){

	console.log(this.selectedDate);

}

this.addAct = function(name, length, type, description){

	

	if (name == "") {

		alert("Your activity needs a name!")
	};

	this.actRef.push({
  		
		    name: name,
		    length: length,
		    type: type,
		    description: description

		});


}

this.addDay = function(){

	var start = 0;
	
	// TODO // need to check duplicate dates
	console.log("SERVICE // addDay");

	this.dayRef.push({
  			
		    date: this.selectedDate.toISOString(),
		    time: this.selectedTime.toISOString(),   
		    starttime: start,
		    length: "",  
		    activities: ""


		    
		    
		  
	});

	this.resetDateTime();


}

this.resetDateTime = function(){
	this.selectedDate = "";
	this.selectedTime = "";
}


this.updateSum = function(value){
	//update total time and endtiem for the day when dropped or removed activity, change value to dayId for the day
	// that has changed? Or not needed because of the other two functions?
	this.summ = value;
	console.log(this.summ);
}

this.getEndTime = function(dayId){
	return false;
	//get the total time and start time from the day sent in and calculate them to an endtime. 
	//store in firebase for that day as endtime and display in the view
	// call whenever dropped or deleted activity and in the beginning of the program (0)
}

this.getTotalTime = function(){
	// get activities length from day sent in and calculate them, store them in firebase for that day 
	//and display in the view from firebase
	// call whenever dropped or deleted activity and in the beginning of the program (0)
	targetDay = this.dayRef.child(this.DragDayID)
	targetDayActs = targetDay.child("activities")
	console.log(targetDay);

	sum = 0;

	targetDayActs.once("value", function(snapshot) {
		  		snapshot.forEach(function(childSnapshot) {

		  			var key = childSnapshot.key()
		  			var data = childSnapshot.val()
		  			console.log(key)
		  			console.log(data.length)
		  			
		  			sum += data.length;

		  			console.log(sum)
		  			
				});

				this.dayRef.update({length: sum});

		  			
			});

	this.updateSum(sum)
};

this.addActToDay = function(){

	console.log(this.DragActID)

	targetDay = this.dayRef.child(this.DragDayID)
	targetAct = this.actRef.child(this.DragActID)

	var actID = this.DragActID;
	
			this.actRef.once("value", function(snapshot) {
		  		snapshot.forEach(function(childSnapshot) {

		  			var key = childSnapshot.key()
		  			var data = childSnapshot.val()
		  			console.log(key)
		  			console.log(data)

		  			if (actID === key) {
		  				console.log("HIT");
		  				

		  				var targetData = data;
		  				console.log(targetData.name);
		  				targetDay.child("activities").push({


		  						name: targetData.name,
							    length: targetData.length,
							    type: targetData.type,
							    description: targetData.description

		  				});

		  			} else {

		  				console.log("noHit");
		  			}

		  			

		  		});


		});


	// this.actRef.child(targetAct).remove();






}


var self = this;
this.apiKey = "63528f449410f83acb94ee8edf8c0d02";

// {"_id":2673730,"name":"Stockholm","country":"SE","coord":{"lon":18.064899,"lat":59.332581}}
//HOW TO: http://openweathermap.org/forecast5
// console.log("DaysWeather");
// this.DaysWeather = $resource('http://api.openweathermap.org/data/2.5/forecast',{units:"metric",appid:self.apiKey});
// console.log(this.DaysWeather.get({id:2673730})); // OR this.DaysWeather.get({q:"Stockholm"});
// 5 days, 3 hours = 00.00, 03.00, 06.00, 09.00, 12.00, 15.00, 18.00, 21.00


/*
this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:self.apiKey});

Dinner.DishSearch.get({title_kw:query},function(data){
 	$scope.dishes=data.Results;
 	$scope.status = "Showing " + data.Results.length + " results";
},function(data){
 	$scope.status = "There was an error";
});

this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:self.apiKey}); 

Dinner.Dish.get({id:$routeParams.dishId},function(data){
	$scope.dish=data;
    $scope.status = "";
    Dinner.keepPreparedDish(data);
    $scope.foodPrice = Dinner.getFoodPrice();
},function(data){
    $scope.status = "There was an error";
});

//in the controller, if we want to search for dishes we can call Dinner.DishSearch.get({title_kw:'chicken'}) 
//or to get a single dish we would do Dinner.Dish.get({id:12345}).
*/

return this;
});