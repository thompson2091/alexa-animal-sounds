'use strict';

const Alexa = require('alexa-sdk');
const language  = require('./data/language.js');
const airplanes = require('./data/airplanes.js');
const animals   = require('./data/animals.js');

const handlers = {
    'NewSession':   function(){
        // Check if it's the first time the skill has been invoked - if so, set global attributes (that will be persisted)
        if(Object.keys(this.attributes).length === 0) {
            this.attributes.next 		= animals.tiger;
            this.attributes.visited 	= false;
        }

        this.emit(this.event.request.type);
    },
    'IntentRequest': 	function(){
    	this.emit(this.event.request.intent.name);
    },
    'LaunchRequest': function () {
        
    	// replace variables within needed language
    	var next, cont;
		next 	= language.next.replace('{animal.name}',this.attributes.next.name);
		next 	= next.replace('{animal.country}',this.attributes.next.country);
    	cont 	= language.continue.replace('{animal.name}',this.attributes.next.name);

        var speak 		= "";
        var respeak 	= language.repeat;

        if (typeof this.attributes.visited === 'undefined' || this.attributes.visited === false){
        	// append more their first time
        	this.attributes.visited 	= true;
	        // create the rest of the welcome message
	        speak  		= language.welcome;
	        speak 	+= "<break time='300ms'/>" + next;
	        speak 	+= "<break time='300ms'/>" + cont;
	        speak 	+= "<break time='300ms'/>" + language.repeat.replace("Continue, <break time='300ms'/>","");
        } else {
        	speak 		= language.return;
        	speak 	+= "<break time='300ms'/>" + next;
        	speak 	+= "<break time='300ms'/>" + cont;
        }

        this.response.speak(speak).listen(respeak);
        this.emit(':saveState', true);
        this.emit(':responseReady');
    },
    'AnimalIntent':       function(){

    	var animal  = this.event.request.intent.slots.animal.value;

    	if (animal){

	    	animal 		= animal.toLowerCase();
    		animal 		= animal.replace(' ','');

    	}

    	// default speak to error message
    	var speak 	= "Please repeat the <emphasis>animal</emphasis> you'd like to visit.  <break time='300ms'/> Say <emphasis>List</emphasis> Animals to hear our current list of animals.";

    	if (animal && typeof animals[animal] !== 'undefined'){

    		animal 	= animals[animal];

    		// replace next animal in session
    		this.attributes.next 	= animals[animal.next];

	    	///////////////////////////////////////////////////////////
	    	// Main Response
	    	///////////////////////////////////////////////////////////
	    	// replace variables within needed language
			var next, cont 	= "";
			next 	= language.next.replace('{animal.name}',this.attributes.next.name);
			next 	= next.replace('{animal.country}',this.attributes.next.country);
			cont 	= language.continue.replace('{animal.name}',this.attributes.next.name);

			// airplane sound
			var airplane 	= airplanes[Math.floor(Math.random()*airplanes.length)];


			// welcome message
			var welcome 	= "Welcome to {animal.country}!  Home to the {animal.name}.  ";
			welcome 	 	= welcome.replace('{animal.name}',animal.name);
			welcome 		= welcome.replace('{animal.country}',animal.country);

			// overwrite speak
			speak 	= "<audio src='" + airplane + "'/>";
			speak	+= "<break time='300ms'/>" + welcome;
			speak 	+= "<audio src='" + animal.sounds[0] + "'/>";
			
			// get facts
			var facts 	= animal.facts;
			for (var key = 0; key < facts.length; key++){
				speak 	+= facts[key] + "<break time='300ms'/>";
			}

			// iterate remaining animal sounds and play
			for (var i = 0; i < animal.sounds.length; i++){
				if (i === 0){
					continue;
				}
				speak 	+= "<audio src='" + animal.sounds[i] + "'/>";
			}

			speak 	+= "<break time='300ms'/>" + next;
			speak 	+= "<break time='300ms'/>" + cont;
    	}

        this.emit(':saveState', true);
        this.emit(':ask', speak, language.repeat);
    },
    /*
    'LearnMoreIntent':       function(){
        var speak 	= 'Learn More';
        this.emit(':tell', speak);
    },
    */
    'ListIntent':       function(){
        var speak 	= "Here is our current list of animals.  Be sure to check back often.";

        for (var key in animals){
        	speak 	+= "<break time='300ms'/>" + animals[key].name;
        }

        speak 	+= "<break time='1s'/>Which animal would you like to visit?  For example, say <break time='300ms'/>Visit the <emphasis>Penguin</emphasis>. ";

        this.emit(':ask', speak, language.repeat);
    },
    'ContinueIntent':   function(){

    	var speak 	= "";

    	// get current animal
    	var animal 	= this.attributes.next;

		// replace next animal in session
		this.attributes.next 	= animals[animal.next];

		///////////////////////////////////////////////////////////
		// Main Response
		///////////////////////////////////////////////////////////
		var next, cont 	= "";
		next 	= language.next.replace('{animal.name}',this.attributes.next.name);
		next 	= next.replace('{animal.country}',this.attributes.next.country);
		cont 	= language.continue.replace('{animal.name}',this.attributes.next.name);

		// airplane sound
		var airplane 	= airplanes[Math.floor(Math.random()*airplanes.length)];


		// welcome message
		var welcome 	= "Welcome to {animal.country}!  Home to the {animal.name}.  ";
		welcome 	 	= welcome.replace('{animal.name}',animal.name);
		welcome 		= welcome.replace('{animal.country}',animal.country);

		// overwrite speak
		speak 	= "<audio src='" + airplane + "'/>";
		speak	+= "<break time='300ms'/>" + welcome;
		speak 	+= "<audio src='" + animal.sounds[0] + "'/>";

		// get facts
		var facts 	= animal.facts;
		for (var key = 0; key < facts.length; key++){
			speak 	+= facts[key] + "<break time='300ms'/>";
		}

		// iterate remaining animal sounds and play
		for (var i = 0; i < animal.sounds.length; i++){
			if (i === 0){
				continue;
			}
			speak 	+= "<audio src='" + animal.sounds[i] + "'/>";
		}

		speak 	+= "<break time='300ms'/>" + next;
		speak 	+= "<break time='300ms'/>" + cont;

		this.emit(':saveState', true);
        this.emit(':ask', speak, language.repeat);
    },
    'AMAZON.HelpIntent': function () {
        this.response.speak(language.repeat).listen(language.repeat);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        var speak 	= language.stop;
        this.emit(':tell', speak);
    },
    'AMAZON.StopIntent': function () {
        var speak 	= language.stop;
        this.emit(':tell', speak);
    },
    'SessionEndedRequest': function () {
        this.emit(':saveState', true); // Be sure to call :saveState to persist your session attributes in DynamoDB
    },
    'Unhandled': function(){
        var speak 	= "You can say <emphasis>Continue</emphasis>, List Animals or Stop to quit.";
        this.emit(':ask', speak);    	
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.dynamoDBTableName = 'AnimalSounds';
    alexa.registerHandlers(handlers);
    alexa.execute();
};
