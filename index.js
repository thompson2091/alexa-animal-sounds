'use strict';

const Alexa = require('alexa-sdk');
const language  = require('./data/language.js');
const airplanes = require('./data/airplanes.js');
const animals   = require('./data/animals.js');

var language 	= {
	'welcome': 	"Welcome to <emphasis>Kids Animal Sounds!</emphasis> Inside you will travel to different parts of the world <break time='300ms'/> to hear and learn about your favorite animals.",
	'return': 	"Welcome back to <emphasis>Kids Animal Sounds!</emphasis> ",
	'next': 	"Our next stop is in <emphasis>{animal.country}</emphasis> to visit the <emphasis>{animal.name}</emphasis>",
	'continue': "Say <emphasis>Continue</emphasis> to visit the {animal.name}.  ",
	'stop': 	"Thanks for visiting Kids Animal Sounds!  If you liked this skill, please give us a 5 star rating",
	'repeat': 	"You can say Continue, <break time='300ms'/> <emphasis>List</emphasis> Animals <break time='300ms'/> or Stop to quit."
};

var airplanes 	= [
	"https://s3.amazonaws.com/aws-alexa/guess-the-sound/transportation/airplane.mp3",
	"https://s3.amazonaws.com/aws-alexa/guess-the-sound/transportation/airplane-3.mp3",
	"https://s3.amazonaws.com/aws-alexa/guess-the-sound/transportation/airplane-4.mp3",
	"https://s3.amazonaws.com/aws-alexa/guess-the-sound/transportation/airplane-5.mp3"
];

var animals 	= {
	'cheetah': 		{
		'name': 	'Cheetah',
		'country': 	'Africa',
		'facts': 	[
			'The Cheetah is a large feline that can run faster than any other land animal.',
			'Its prey includes many different species of antelopes and hares.',
			'The cheetah has up to nine cubs in one litter.'
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/cheetah/cheetah.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/cheetah/cheetah-3.mp3",
		],
		'next': 	'cougar'
	},
	'cougar': 		{
		'name': 	'Cougar',
		'country': 	'Asia',
		'facts': 	[
			'The Cougar also known as the mountain lion, puma, panther, or catamount will eat anything it can catch.',
			'They are believed to have originated in Asia about eleven million years ago. ',
			'Males typically weigh 115-220 pounds. while females weigh 64-141 pounds.'
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/cougar/cougar.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/cougar/cougar-3.mp3",
		],
		'next': 	'penguin'
	},
	'penguin': 		{
		'name': 	'Penguin',
		'country': 	'Sothern Hemisphere',
		'facts': 	[
			'Penguins are a type of bird that does not fly that are adapted to life in the water.',
			'They catch their food underwater including krill, fish, and squid.',
			'Penguins can be found on every continent in the Southern Hemisphere.'
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/penguin/penguin.mp3",
		],
		'next': 	'sealion'
	},
	'sealion': 	{
		'name': 	'Sea Lion',
		'country': 	'North America',
		'facts': 	[
			'Sea lions are sea mammals.',
			'They have long foreflippers and the ability to walk on all fours.',
			'A male sea lion can weigh up to six hundred and sixty pounds.',
			'They can eat eight percent of their body weight in one feeding consisting of fish, octopuses, and squids.'
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/sea-lion/sealion.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/sea-lion/sealion-3.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/sea-lion/sealion-4.mp3",
		],
		'next': 	'rhino'
	},
	'rhino': 		{
		'name': 	'Rhinoceros',
		'country': 	'Africa',
		'facts': 	[
			'Rhinoceros is a large, heavy animal with one or two horns.',
			'They are one of the largest living land mammals.',
			'Most rhinos avoid each other and tend to live solitary.',
			'They have poor eyesight but can hear and smell very well.'
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/rhino/rhino.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/rhino/rhino-3.mp3",
		],
		'next': 	'monkey'
	},
	'monkey': 		{
		'name': 	'Monkey',
		'country': 	'South America',
		'facts': 	[
			'Monkeys are primates with tails.',
			'Their tails are about six to seven inches long.',
			'Their diet consist of many things including fruit, flowers, and small animals.',
			'They can live anywhere from fifteen to fourty five years depending on the type.'
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/monkey/monkey.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/monkey/monkey-3.mp3",
		],
		'next': 	'tiger'
	},
	'tiger': 		{
		'name': 	'Tiger',
		'country': 	'Asia',
		'facts': 	[
			'Tigers are the largest cat species.',
			'They hunt at night for bears, buffalo, wild cattle, and many other types of animals.',
			'Tigers have three to four cub in one litter. '
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/tiger/tiger.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/tiger/tiger-3.mp3",
		],
		'next': 	'bear'	
	},
	'bear': 		{
		'name': 	'Bear',
		'country': 	'Western Europe',
		'facts': 	[
			'Bears can run up to twenty five miles an hour.',
			'They live in many different habitats depending on the type of bear.',
			'Those types including the polar, brown, black, sloth, giant panda and spectacled bear. '
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/bear/bear.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/bear/bear-3.mp3",
		],
		'next': 	'lion'	
	},
	'lion': 	{
		'name': 	'Lion',
		'country': 	'Africa',
		'facts': 	[
			'Lions can live for ten to fourteen years in wild.',
			'The female Lion is referred to as a lioness.',
			'They are inactive for about twenty hours a day, mostly active at dusk.'
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/lion/lion.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/lion/lion-3.mp3",
		],
		'next': 	'raccoon'
	},
	'raccoon': 		{
		'name': 	'Raccoon',
		'country': 	'North America',
		'facts': 	[
			'Raccoons have 40 teeth and like to snack on plants.',
			'They live about 3 years in the wild.',
			'Raccoon\'s can weigh up to 20 pounds.',
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/raccoon/raccoon.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/raccoon/raccoon-3.mp3",
		],
		'next': 	'leopard'	
	},
	'leopard': 		{
		'name': 	'Leopard',
		'country': 	'Africa',
		'facts': 	[
			'The Leopard has short legs, long body, and a large skull.',
			'There are as many as twenty seven subspecies of leopards, with the african Leopard being the most widespread.',
			'Males weigh more and are larger than females.',
			'The Leopard is often confused with the Cheetah however, Leopards spots are larger.'
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/leopard/leopard.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/leopard/leopard-3.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/leopard/leopard-4.mp3",
		],
		'next': 	'squirrel'	
	},
	'squirrel': 		{
		'name': 	'Squirrel',
		'country': 	'North America',
		'facts': 	[
			'squirrels are a type of rodent.',
			'There are many different kinds including tree, flying, and ground squirrels.',
			'They like to sleep around 14 hours a day. '
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/squirrel/squirrel.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/squirrel/squirrel-3.mp3",
		],
		'next': 	'zebra'	
	},
	'zebra': 		{
		'name': 	'Zebra',
		'country': 	'Africa',
		'facts': 	[
			'Zebras are a mammal that have very distinctive stripes.',
			'No two zebras are alike.',
			'They usually live around twenty five years and can weigh up to nine hundred and ninety pounds. '
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/zebra/zebra.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/zebra/zebra-3.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/zebra/zebra-4.mp3",
		],
		'next': 	'bat'	
	},
	'bat': 		{
		'name': 	'Bat',
		'country': 	'United Kingdom',
		'facts': 	[
			'Bats like to eat only insects and can eat one thousand mosquitoes in one hour.',
			'They are nocturnal, meaning they fly around at night looking for their food.',
			'A bat\'s eyesight is almost as good as a humans.'
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/bat/bat-4.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/bat/bat-3.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/bat/bat.mp3",
		],
		'next': 	'elephant'	
	},
	'elephant': 		{
		'name': 	'Elephant',
		'country': 	'Africa',
		'facts': 	[
			'One of the largest elephants ever recorded weighed twenty four thousand pounds.',
			'They can eat up to three hundred pounds of food in one day consisting of grass, roots, fruit, and bark.'
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/elephant/elephant.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/elephant/elephant-3.mp3",
		],
		'next': 	'prairiedog'	
	},
	'prairiedog': 		{
		'name': 	'Prairie Dog',
		'country': 	'North America',
		'facts': 	[
			'Prairie dogs are a type of rodent that live in North America.',
			'Prairie Dogs live in underground burrows.',
			'The Prairie dog gets its name from its habitat and warning call that is similar to the sound of a dog\'s bark.'
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/prairie-dog/prairiedog.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/prairie-dog/prairiedog-3.mp3",
		],
		'next': 	'hippo'	
	},
	'pig': 		{
		'name': 	'Pig',
		'country': 	'Europe',
		'facts': 	[
			'Pigs are highly intelligent and social animal.',
			'They love to squeal and talk.',
			'They can live up to eight years. '
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/pig/pig.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/pig/pig-3.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/pig/pig-4.mp3",
		],
		'next': 	'donkey'	
	},
	'donkey': 		{
		'name': 	'Donkey',
		'country': 	'Africa',
		'facts': 	[
			''
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/donkey/donkey.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/donkey/donkey-3.mp3",
		],
		'next': 	'horse'	
	},
	'horse': 		{
		'name': 	'Horse',
		'country': 	'North America',
		'facts': 	[
			''
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/horse/horse.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/horse/horse-3.mp3",
		],
		'next': 	'hippo'	
	},
	'hippo': 		{
		'name': 	'Hippopotamus',
		'country': 	'Africa',
		'facts': 	[
			'The hippopotamus is ancient greek for river horse.',
			'They are a large mammal that like to eat mostly plants.',
			'Hippos are semi aquatic meaning that they live on land but spend a great amount of time in the water.',
			'At dusk they like to graze on grass.'
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/hippo/hippo.mp3",
		],
		'next': 	'sheep'	
	},
	'sheep': 		{
		'name': 	'sheep',
		'country': 	'North America',
		'facts': 	[
			''
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/sheep/sheep.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/sheep/sheep-3.mp3",
		],
		'next': 	'cow'	
	},
	'cow': 		{
		'name': 	'cow',
		'country': 	'Europe',
		'facts': 	[
			''
		],
		//'long': 	'',
		'sounds': 	[
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/cow/cow.mp3",
			"https://s3.amazonaws.com/aws-alexa/world-zoo/animals/cow/cow-3.mp3",
		],
		'next': 	'cheetah'	
	},
};


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
