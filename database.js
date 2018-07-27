// name, size, girth, speed, jumping, base grab, default ARMS (indexes ARMS table)

var fighterStats = [
	["Spring Man",   3, 3, 3, 3, 150, [ 1,  2,  3]],
	["Ribbon Girl",  2, 2, 3, 4, 150, [ 4,  5,  6]],
	["Ninjara",      3, 3, 5, 4, 150, [ 7,  8,  9]],
	["Master Mummy", 5, 5, 1, 1, 200, [10, 11, 12]],
	["Min Min",      2, 1, 3, 3, 150, [13, 14, 15]],
	["Mechanica",    5, 4, 2, 2, 160, [16, 17, 18]],
	["Twintelle",    4, 3, 3, 3, 160, [19, 20, 21]],
	["Byte & Barq",  4, 2, 3, 3, 150, [22, 23, 24]],
	["Kid Cobra",    3, 5, 2, 5, 170, [25, 26, 27]],
	["Helix",        2, 3, 3, 3, 150, [28, 29, 30]],
	["Max Brass",    4, 4, 3, 3, 170, [31, 32, 33]],
	["Lola Pop",     4, 3, 3, 4, 150, [34, 35, 36]],
	["Misango",      4, 3, 3, 3, 160, [37, 38, 39]],
	["Springtron",   3, 3, 3, 3, 150, [ 1,  2,  3]],
	["Dr. Coyle",    4, 3, 4, 5, 150, [40, 41, 42]]
];

var fighterStatsMap = ["size", "ARM girth", "speed", "jumping ability", "grab damage"];
var ordinalGreater = ["bigger", "bigger", "faster", "better", "greater"];
var ordinalLesser = ["smaller", "smaller", "slower", "worse", "lower"];

var homeStages = [
	"Spring Stadium",
	"Ribbon Ring",
	"Ninja College",
	"Mausoleum",
	"Ramen Bowl",
	"Scrapyard",
	"Cinema Deux",
	"Buster Beach",
	"Snake Park",
	"DNA Lab",
	"Sky Arena",
	"Via Dolce",
	"Temple Grounds",
	"Sparring Ring",
	"[NAME REDACTED]"
];

// name, element, base damage, charge damage, fighter (indexes fighter table)
/*var armsStats = [
	["Toaster",
	["Boomerang",
	["Tribolt",
	["Sparky",
	["Popper",
	["Slapamander",
	["Chakram",
	["Buff",
	["Triblast",
	["Megaton",
	["Retorcher",
	["Phoenix",
	["Dragon",
	["Megawatt",
	["Ramram",
	["Revolver",
	["Whammer",
	["Homie",
	["Chilla",
	["Parasol",
	["Thunderbird",
	["Seekie",
	["Cracker",
	["Bubb",
	["Slamamander",
	["Hydra",
	["Coolerang",
	["Blorb",
	["Ice_Dragon",
	["Guardian",
	["Nade",
	["Roaster",
	["Kablammer",
	["Funchuck",
	["Biffler",
	["Clapback",
	["Scorpio",
	["Glusher",
	["Skully",
	["Lokjaw",
	["Parabola",
	["Brrchuck",
];*/

var fighterAges = [
	"20", "17", "21", "unknown", "18",
	"15", "26", "unknown", "19", "2",
	"52", "23", "33", "0", "48"
];

var extraStats = [
	["Enthusiasm", "Jokiness"], ["Dancing", "Singing"], ["Ninjutsu", "Talking"], ["Punch Taking", "Freshness"], ["Kicking", "Love of Ramen"],
	["Hovering", "IQ"], ["Actress Aura", "Star Power"], ["Bromance", "Water Resistance"], ["Snakeboarding", "Vid Views"], ["Elasticity", "Gross Factor"], 
	["Buffness", "Management"], ["Inflatability", "Sweetness"], ["Loyalty", "Spirit"], ["Explosiveness", "Mercy"], ["IQ", "EQ"]
];

var fighterHobbies = [
	["weight lifting", "pizza"], ["singing", "meeting fans"], ["hiding", "reading"], ["searching for his long-lost family"], ["eating mom's homemade ramen"],
	["watching ARMS (especially Ribbon Girl)"], ["sniffing luxury fragrances", "fitness"], ["avoiding salt water", "Fetch"], ["snakeboarding", "making rad vids"], ["watching the ARMS Grand Prix"],
	["training and inspiring new fighters"], ["seeking applause", "eating candy"], ["self-discipline", "making bracelets"], ["flawless victories"], ["none, only has time for ARMS"]
];

var fighterTitles = [
	"The Bouncer", "The Airess", "The Student of Stealth", "The Grim Creeper", "The Ramen Bomber",
	"The Scrapyard Scrapper", "The Silver Screen Queen", "The Clockwork Cops", "The Speed Demon", "The 'Man' of Mystery",
	"The Commish", "The Sucker Puncher", "The Spirited Fighter", "The Mean Machine", "The Rad Scientist"
];

var affiliations = [
	"Spring Gym", "Ribbonics Records", "Rasen Ninjutsu University", "the Mausoleum", "Mintendo Noodle House",
	"the Scrapyard", "Twintelle Productions", "Beach Patrol", "Naja Crew", "ARMS Laboratory",
	"ARMS League", "street performers worldwide", "Misangans", "ARMS Laboratories, Inc.", "ARMS Labs"
];

var voiceActors = [
	"Peter von Gomm", "Momoka Kawasaki", "Kenji Takahashi", "Kouji Takeda", "Haruna Takatsu",
	"Ayumi Fujimura", "Adeyto", "none", "Ryouta Takeuchi", "none",
	"Dominic Allen", "Soness Stevens", "Toru Sakurai", "Peter Von Gomm", "Donna Burke"
];

function randomNumber(count)
{
	return Math.floor(Math.random() * count);
}

function randomItemFrom(options)
{
	return options[randomNumber(options.length)];
}

function randomNumberButNot(count, avoid)
{
	do {
		rand = randomNumber(count);
	} while (avoid.includes(rand));
	return rand;
}

function randomFact()
{
	var fact_count = 8;
	
	rand = randomNumber(fact_count);
	
	fact = "";
	
	switch (rand)
	{
		case 0:
			
			var fighter = randomNumber(fighterStats.length);
			var stat = randomNumber(5);
			return "The " + fighterStatsMap[stat] + " of " + fighterStats[fighter][0] + " is " + fighterStats[fighter][1+stat] + ".";
			
		case 1:
			
			var fighter1 = randomNumber(fighterStats.length);
			var fighter2 = randomNumberButNot(fighterStats.length, [fighter1]);
			var stat = randomNumber(5);
			
			order = "equal to";
			if (fighterStats[fighter1][1+stat] > fighterStats[fighter2][1+stat])
				order = ordinalGreater[stat] + " than";
			else if (fighterStats[fighter1][1+stat] < fighterStats[fighter2][1+stat])
				order = ordinalLesser[stat] + " than";
			
			
			return "The " + fighterStatsMap[stat] + " of " + fighterStats[fighter1][0] + " is " + order + " that of " + fighterStats[fighter2][0] + ".";
		
		case 2: // fighter age
			var fighter = randomNumber(fighterStats.length);
			return "The age of " + fighterStats[fighter][0] + " is " + fighterAges[fighter] + ".";
		
		case 3: // fighter title
			var fighter = randomNumber(fighterStats.length);
			return "The nickname of " + fighterStats[fighter][0] + " is '" + fighterTitles[fighter] + "'.";
		
		case 4: // fighter affiliation
			var fighter = randomNumber(fighterStats.length);
			return fighterStats[fighter][0] + " is affiliated with " + affiliations[fighter] + ".";
			
		case 5: // voice actor
			var fighter = randomNumber(fighterStats.length);
			return fighterStats[fighter][0] + " is voiced by " + voiceActors[fighter] + ".";
			
		case 6: // hobby
			var fighter = randomNumber(fighterStats.length);
			return "One of " + fighterStats[fighter][0] + "'s hobbies is " + randomItemFrom(fighterHobbies[fighter]) + ".";
			
		
		case 7: // home stage
			var fighter = randomNumber(fighterStats.length);
			return homeStages[fighter] + " is the home stage of " + fighterStats[fighter][0] + ".";
	}
	
	
}

