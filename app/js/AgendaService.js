meetingPlannerApp.factory('Agenda',function ($resource, $firebaseArray, $firebaseObject) {

this.ref = new Firebase("https://flickering-fire-1621.firebaseio.com/");
this.actRef = this.ref.child("activity")
this.dayRef = this.ref.child("day")
// this.dayRefActivities = this.dayRef.child("dayActivities")

this.actIDarray = [];
this.selectedDate = "";
this.selectedTime = "";


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
	
	// TODO // need to check duplicate dates
	console.log("SERVICE // addDay");

	this.dayRef.push({
  			
		    date: this.selectedDate.toISOString(),
		    time: this.selectedTime.toISOString(),
		    activities: ""


		    
		    
		  
	});

	this.resetDateTime();


}

this.resetDateTime = function(){
	this.selectedDate = "";
	this.selectedTime = "";
}

this.addActToDay = function(act_id, day_id){

	// addRef = this.dayRef;
	// targetRef = addRef.child(day_id); 
	targetDay = this.dayRef.child(day_id)
	// console.log(targetDay.child("activities"));
	targetAct = this.actRef.child(act_id)
	
			this.actRef.once("value", function(snapshot) {
		  		snapshot.forEach(function(childSnapshot) {

		  			var key = childSnapshot.key()
		  			var data = childSnapshot.val()

		  			if (act_id === key) {
		  				

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

		  			console.log(data);
		  			// console.log(id);

		  		});


		});






}




return this;
});