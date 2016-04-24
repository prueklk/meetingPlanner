meetingPlannerApp.factory('Agenda',function ($resource, $firebaseArray, $firebaseObject) {

this.ref = new Firebase("https://agendaplanner.firebaseio.com/");
this.actRef = this.ref.child("activity")
this.dayRef = this.ref.child("day")



// this.ref.child("day").orderByChild("date").once("value",function(data) { 
//     console.log(data.val()); 
//     // this.dayRef = data.val();
// });
// this.testRef = new Firebase("https://agendaplanner.firebaseio.com/day");

// var list = $firebaseArray(this.dayRef);


// this.dayActs = this.dayRef.child("activities")
// this.dayRefActivities = this.dayRef.child("dayActivities")

this.actIDarray = [];
this.selectedDate = "";
this.selectedTime = "";

this.DragDayID = "";
this.DragActID = "";
this.dragBackDay = "";
this.dragBackAct = "";



this.clickedAct = "";
this.clickedDay = "";

this.paneltag = false;

this.ActSorted = "";
this.DaySorted = "";


this.updateIndex = function(index, day, act){

	target = this.dayRef.child(day).child("activities").child(act)
	target.update({


		index: index
	})

	// target.child("index").child("priority").setWithPriority(index, -index);



	// target.orderByChild("index")



}

this.deleteActDay = function(day_id, act_id) {

this.dayRef.child(day_id).child("activities").child(act_id).remove();

}


//fill color box
this.fillcolor = function(day){
  
    var PresentationArr=[];
	var CoffeeBreakArr=[];
	
	var GroupWorkArr=[];
	var DiscussionArr=[];
	var percentageArr=[];

  //  initializing sum variables

    var sumcoffee=0;
    var sumgroup=0;
    var sumdiscussion=0;
    var sumpresentation=0;
 //targetDay = this.dayRef.child("-KFOVszSjV7jW99NhlnG")
 targetDay = this.dayRef.child(day)

    targetDayActs = targetDay.child("activities");
    
	
    targetDayActs.once("value", function(snapshot) {

	   snapshot.forEach(function(childSnapshot) {

		  			var key = childSnapshot.key()
		  			var data = childSnapshot.val()
		  	     
		  			var typ=data.type;
		  			// console.log(typ)
		  			var Len=data.length;
		  			if (typ=="Coffee"){
		  				CoffeeBreakArr.push(Len);
		  				 }
		  			
		  			else  if(typ=="Group"){
		  				GroupWorkArr.push(Len);
		  			   	 }
		  			
		  		    else if(typ=="Discussion"){
		  			 DiscussionArr.push(Len);
		  			     }
		  
                   else{
	                 PresentationArr.push(Len);
	                   }
		  			  

	});


		});

  // console.log(CoffeeBreakArr)
  // console.log(PresentationArr)
  // console.log(GroupWorkArr)
  // console.log(DiscussionArr)


//summation
for(var i in CoffeeBreakArr) {sumcoffee += CoffeeBreakArr[i]; }
// console.log(sumcoffee)
//groupsum
for(var i in GroupWorkArr) {sumgroup += GroupWorkArr[i]; }
// console.log(sumgroup)
//discussion
for(var i in DiscussionArr) {sumdiscussion += DiscussionArr[i]; }
// console.log(sumdiscussion)
//presentation
for(var i in PresentationArr) {sumpresentation += PresentationArr[i]; }
// console.log(sumpresentation)

// Total sum of all type arrays
		  			 
 var total=sumcoffee+sumpresentation+sumdiscussion+sumgroup;
			    
// Percentage time  of eacy type

var percentagecoffe=Math.round((sumcoffee/total)*100);
 percentageArr.push(percentagecoffe);
var percentagegroup=Math.round((sumgroup/total)*100);
 percentageArr.push(percentagegroup);
var percentagediscussion=Math.round((sumdiscussion/total)*100);
 percentageArr.push(percentagediscussion);
var percentagepresentation=Math.round((sumpresentation/total)*100);
 percentageArr.push(percentagepresentation);
 // console.log( percentageArr)
 // console.log(percentagecoffe)
targetDayColorbox = targetDay.child("colorbox");
updateDB = function() {


	targetDayColorbox.update({

	group: {

		percent: percentagegroup,
		color: "#ae163e"
	},
	coffee: {

		percent: percentagecoffe,
		color: "orange"
	},
	discussion: {

		percent: percentagediscussion,
		color: "#ab3fdd"

	},
	presentation: {

		percent: percentagepresentation,
		color: "#13b4ff"
	}


});


}



 if ( isNaN(percentagegroup) && isNaN(percentagecoffe) && isNaN(percentagediscussion) && isNaN(percentagepresentation) ) {

 	
 	console.log("NaN We are empty");

 	percentagegroup = 0;
 	percentagecoffe = 0;
 	percentagediscussion = 0;
 	percentagepresentation = 0;
 	updateDB();

 } else {
 	
 	updateDB();
 	
 }


// return  percentageArr;

}



this.deleteDay = function(id){

this.dayRef.child(id).remove();

};


this.deleteAct = function(id){

// console.log(this.actRef.child(id))
this.actRef.child(id).remove();

}


this.logdate = function(){

	// console.log(this.selectedDate);

}

this.addAct = function(name, length, type, description){
	console.log("addACT");

	this.actRef.push({
  		
		    name: name,
		    length: length,
		    type: type,
		    description: description

		});


}

this.addDay = function(name,location){
	

	// TODO // need to check duplicate dates
	// var list = $firebaseArray();

	this.dayRef.push({
  			
  			name: name,
  			location: location,
  			weather: this.getWeather(this.selectedDate, this.selectedTime),
		    date: this.selectedDate.toISOString(),
		    starttime: this.selectedTime.toISOString(),
		    endtime: "",
			length: "",
			breakpercent: 20,  
		    activities: "",
		    colorbox: {

		    	group: {

		    		percent: "",
		    		color: "#ae163e"

		    	},
		    	coffee: {
		    		percent: "",
		    		color: "orange"

		    	},

		    	discussion: {
		    		percent: "",
		    		color: "#ab3fdd"

		    	},

		    	presentation: {
		    		percent: "",
		    		color: "#13b4ff"
		    	}
		    }
	});


}

this.resetDateTime = function(){
	this.selectedDate = "";
	this.selectedTime = "";
}



this.getEndTime = function(){

	targetDay = this.dayRef.child(this.DragDayID)
	totalTime = 0;
	startTime = 0;
	endTime = 0;


	targetDay.once("value", function(snapshot) {

		  			var key = snapshot.key()
		  			var data = snapshot.val()
		  			
		  			totalTime += data.length;
		  			// console.log(totalTime);
		  			startTime = data.starttime;
		  			// console.log(startTime);
		  			
				});

				getStartTime = new Date(startTime);
				getStartTimeConvert = getStartTime.getTime();

				getTotalTimeConvert = totalTime * 60000
				
				endTimeConvert = getTotalTimeConvert + getStartTimeConvert;

				endTime = new Date(endTimeConvert).toISOString();

				console.log(endTime);

				targetDay.update({endtime: endTime});

		  			

	//targetDay("length").on("value", function(snapshot) {
      //console.log(snapshot.val()); 
    //});

	//How to get the length and starttime of a day? get those from database, add them together, save in a variable and 
	// stor in this.targetDay.update({endtime: sumTime});

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
	// console.log(targetDay);

	sum = 0;

	targetDayActs.once("value", function(snapshot) {
		  		snapshot.forEach(function(childSnapshot) {

		  			var key = childSnapshot.key()
		  			var data = childSnapshot.val()
		  			
		  			sum += data.length;
		  			
				});

				this.targetDay.update({length: sum});

		  			
			});

	//this.updateSum(sum)
};

this.addActToDay = function(){

	// console.log(this.DragActID)
	// priority = 0;

	targetDay = this.dayRef.child(this.DragDayID)
	targetAct = this.actRef.child(this.DragActID)

	// var targetAct = this.actRef.child("-KG1mdw35O6AWVuNwpRO")
	// var targetDay = this.dayRef.child("-KG1mcA22R6NbKqLVPt9")

	var actID = this.DragActID;
	// var actID = "-KG1mdw35O6AWVuNwpRO"
	
			this.actRef.once("value", function(snapshot) {
		  		snapshot.forEach(function(childSnapshot) {

		  			var key = childSnapshot.key()
		  			var data = childSnapshot.val()
		  			// console.log(key)
		  			// console.log(data)

		  			if (actID === key) {
		  				console.log("HIT");
		  				

		  				var targetData = data;
		  				// var list = $firebaseArray(targetDay.child("activities"));
		  				// console.log(targetData.name);
		  				// .then(console.log("ADDACTTHEN"))
		  				targetDay.child("activities").push({


		  						name: targetData.name,
							    length: targetData.length,
							    type: targetData.type,
							    description: targetData.description,
							    index: {

							    	priority: 0
							    }

		  				}); 



		  			} else {

		  				console.log("noHit");
		  			}

		  			

		  		});


		});


	// this.actRef.child(targetAct).remove();






}



this.updateActDay = function(name, length, type, description){
	console.log("updating activity Day")

	this.dayRef.child(this.clickedDay).child("activities").child(this.clickedAct).update({
  		
		    name: name,
		    length: length,
		    type: type,
		    description: description
	

		});

	this.clickedAct = "";
	this.clickedDay = "";

}

this.updateAct = function(name, length, type, description){

	console.log("updating activity")

	this.actRef.child(this.clickedAct).update({
  		
		    name: name,
		    length: length,
		    type: type,
		    description: description

		});

	this.clickedAct = "";

};

this.getWeather = function(_selectedDate, _selectedTime){
	//get selectedDate
	// _selectedDate = new Date("April 26, 2017 12:13:00"); // FOR TESTING, TO BE DELETED
	// _selectedHour = _selectedDate.getHours(); // FOR TESTING, TO BE DELETED

	_selectedHour = _selectedTime.getHours(); // USE!!!
	
	// console.log("getWeather // _selectedDate = "+_selectedDate);
	var _selectedDate0 = _selectedDate.setHours(0, 0, 0, 0);
	// console.log("setHours 0 0 0 0 // _selectedDate0 = "+_selectedDate0);

	//compare selectedDate to dayWeather list
	for (var i=0; i <self.weatherList.length; i++){

		var _testDate = self.weatherList[i];
		var _date = new Date(_testDate.dt*1000);
		var _hours = _date.getHours();
		//var _minutes = "0" + _date.getMinutes();
		//var _seconds = "0" + _date.getSeconds();
		//var _time = _hours + ':' + _minutes.substr(-2) + ':' + _seconds.substr(-2); // 10:30:23 format

		var _date0 = _date.setHours(0,0,0,0);
		
		//find selectedDate in dayWeather list
		if(_selectedDate0.valueOf() == _date0.valueOf()){
			//console.log("FOUND // _selectedDate0 = "+_selectedDate0+" , _date0 = "+_date0);
			//console.log("_selectedHour = "+_selectedHour+", _hours = "+_hours);
			
			//find the next hour
			if(_selectedHour <= _hours){

				//show weather description and temperature
				// console.log("_testDate.main.temp = "+_testDate.main.temp);
				// console.log("_testDate.weather.decription = "+_testDate.weather[0].description);

				var weather_temp = _testDate.main.temp;
				var weather_description = _testDate.weather[0].description;
				var weather_txt = weather_temp +" C with "+weather_description;
				break;
			}
		}else{ //if cannot find selectedDate in dayWeather list, weather description = "no weather info"
			// console.log("NOT FOUND // _selectedDate = "+_selectedDate+" , _date0 = "+_date0);
			var weather_txt = "No data available.";
		}

	}

	//return weather description
	return weather_txt;
}

var self = this;
this.apiKey = "63528f449410f83acb94ee8edf8c0d02";

//HOW TO: http://openweathermap.org/forecast5 // 5 days, 3 hours
// {"_id":2673730,"name":"Stockholm","country":"SE","coord":{"lon":18.064899,"lat":59.332581}}
this.DaysWeather = $resource('http://api.openweathermap.org/data/2.5/forecast',{units:"metric",appid:self.apiKey});
//console.log(this.DaysWeather.get({id:2673730})); // OR this.DaysWeather.get({q:"Stockholm"});

this.DaysWeather.get({id:2673730},function(data){
		console.log("this.DaysWeather // DAYSWEATHER");
		self.weatherList = data.list;
		// console.log(self.weatherList); //array of objects
		
		// self.getWeather(); // FOR TESTING, TO BE DELETED
	},function(data){
	    //$scope.status = "There was an error.";
});


return this;
});