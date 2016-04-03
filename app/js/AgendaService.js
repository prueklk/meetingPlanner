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


	this.dayRef.push({
  			
		    date: this.selectedDate.toISOString(),
		    time: this.selectedTime.toISOString()


		    
		    
		    

		});

	


}


this.addActToDay = function(){



}




return this;
});