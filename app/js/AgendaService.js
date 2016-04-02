meetingPlannerApp.factory('Agenda',function ($resource, $firebaseArray, $firebaseObject) {

this.ref = new Firebase("https://flickering-fire-1621.firebaseio.com/");
this.actRef = this.ref.child("activity")
this.dayRef = this.ref.child("day")

this.actIDarray = [];
this.selectedDate = "";
this.selectedTime = "";


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
  			
		    date: this.selectedDate.toString(),
		    time: this.selectedTime.toString()
		    
		    

		});


}

return this;
});