// name, size, girth, speed, jumping, base grab, default ARMS (indexes ARMS table)

var fighterStats = [
	["Spring Man",   3, 3, 3, 3, 150, [ 0,  1,  2]], // 0
	["Ribbon Girl",  2, 2, 3, 4, 150, [ 3,  4,  5]],
	["Ninjara",      3, 3, 5, 4, 150, [ 6,  7,  8]],
	["Master Mummy", 5, 5, 1, 1, 200, [ 9, 10, 11]],
	["Min Min",      2, 1, 3, 3, 150, [12, 13, 14]],
	["Mechanica",    5, 4, 2, 2, 160, [15, 16, 17]], // 5
	["Twintelle",    4, 3, 3, 3, 160, [18, 19, 20]],
	["Byte & Barq",  4, 2, 3, 3, 150, [21, 22, 23]],
	["Kid Cobra",    3, 5, 2, 5, 170, [24, 25, 26]],
	["Helix",        2, 3, 3, 3, 150, [27, 28, 29]],
	["Max Brass",    4, 4, 3, 3, 170, [30, 31, 32]], // 10
	["Lola Pop",     4, 3, 3, 4, 150, [33, 34, 35]],
	["Misango",      4, 3, 3, 3, 160, [36, 37, 38]],
	["Springtron",   3, 3, 3, 3, 150, [ 0,  1,  2]],
	["Dr. Coyle",    4, 3, 4, 5, 150, [39, 40, 41]],
];

var fighterStatsMap = ["size", "ARM girth", "speed", "jumping ability", "grab damage"];
var ordinalGreater = ["bigger", "bigger", "faster", "better", "greater"];
var ordinalLesser = ["smaller", "smaller", "slower", "worse", "lower"];

// name, base damage, charge damage, rush damage, plus grab bonus, type, element, weight, fighter (indexes fighter table)
var armsStats = [
	["Toaster",     90, 120, 210,  0, "glove",      "fire",      "medium", ],
	["Boomerang",   80,  90, 160,  0, "curve",      "wind",      "medium", ],
	["Tribolt",     70, 100, 170,  0, "multishot",  "stun",      "light",  ],
	["Sparky",      90,  90, 215,  0, "glove",      "electric",  "medium", ],
	["Popper",      70, 110, 135,  0, "multishot",  "wind",      "light",  ],
	["Slapamander", 80, 110, 180,  0, "whip",       "fire",      "medium", ],
	["Chakram",     80, 100, 200,  0, "curve",      "stun",      "medium", ],
	["Buff",        90, 100, 190,  0, "glove",      "none",      "medium", ],
	["Triblast",    70,  70, 220,  0, "multishot",  "explosion", "light",  ],
	["Megaton",    110, 130, 190,  5, "heavy",      "none",      "heavy",  ],
	["Retorcher",   70, 100, 175,  0, "multishot",  "fire",      "light",  ],
	["Phoenix",     80, 110, 175,  0, "curve",      "fire",      "medium", ],
	["Dragon",      90, 120, 190,  0, "beam",       "fire",      "medium", ],
	["Megawatt",   110, 120, 175,  5, "heavy",      "electric",  "heavy",  ],
	["Ramram",      80, 110, 120,  0, "curve",      "fire",      "medium", ],
	["Revolver",    70,  70, 165,  0, "multishot",  "electric",  "light",  ],
	["Whammer",    100, 120, 195,  5, "hammer",     "stun",      "heavy",  ],
	["Homie",       70,  70, 245,  0, "missile",    "explosive", "medium", ],
	["Chilla",      90, 100, 200,  0, "glove",      "ice",       "medium", ],
	["Parasol",     90, 100, 175,  0, "umbrella",   "wind",      "medium", ],
	["Thunderbird", 80,  80, 170,  0, "curve",      "electric",  "medium", ],
	["Seekie",      70,  70, 200,  0, "missile",    "electric",  "medium", ],
	["Cracker",     70, 120, 145,  0, "multishot",  "fire",      "light",  ],
	["Bubb",        90, 100, 190,  0, "glove",      "none",      "medium", ],
	["Slamamander", 80,  90, 175,  0, "whip",       "wind",      "medium", ],
	["Hydra",       70, 100, 150,  0, "multishot",  "fire",      "light",  ],
	["Coolerang",   80,  90, 165,  0, "curve",      "ice",       "medium", ],
	["Blorb",      100, 100, 200,  0, "heavy",      "blind",     "heavy",  ],
	["Ice Dragon",  90, 100, 175,  0, "beam",       "ice",       "medium", ],
	["Guardian",    80, 100, 155,  5, "shield",     "electric",  "heavy",  ],
	["Nade",        90,  90, 240,  0, "glove",      "explosion", "medium", ],
	["Roaster",     90, 130, 235,  0, "glove",      "fire",      "medium", ],
	["Kablammer",  100, 100, 205,  5, "hammer",     "explosion", "heavy",  ],
	["Funchuck",    80, 100, 195,  0, "nunchuck",   "stun",      "medium", ],
	["Biffler",     70,  90, 120,  0, "multishot",  "blind",     "light",  ],
	["Clapback",    80,  80, 150,  5, "shield",     "none",      "heavy",  ],
	["Scorpio",     90, 100, 160,  0, "unique",     "poison",    "medium", ],
	["Glusher",    100, 120, 185,  0, "heavy",      "poison",    "heavy",  ],
	["Skully",      70,  80, 155,  0, "unique",     "poison",    "light",  ],
	["Lokjaw",     100, 100, 265,  5, "unique",     "explosion", "heavy",  ],
	["Parabola",    90, 90,  175,  0, "umbrella",   "electric",  "medium", ],
	["Brrchuck",    80, 90,  180,  0, "nunchuck",   "ice",       "medium", ],
];

var armStatsMap = ["uncharged", "charged", "maximum rush", "grab bonus"];

var homeStages = [
	"Spring Stadium", "Ribbon Ring", "Ninja College", "Mausoleum", "Ramen Bowl",
	"Scrapyard", "Cinema Deux", "Buster Beach", "Snake Park", "DNA Lab",
	"Sky Arena", "Via Dolce", "Temple Grounds", "Sparring Ring", "[NAME REDACTED]",
];

var fighterAges = [
	"20", "17", "21", "unknown", "18",
	"15", "26", "unknown", "19", "2",
	"52", "23", "33", "0", "48",
];

var extraStats = [
	["enthusiasm", "jokiness"], ["dancing", "singing"], ["ninjutsu", "talking"], ["punch taking", "freshness"], ["kicking", "love of ramen"],
	["hovering", "IQ"], ["actress aura", "star power"], ["bromance", "water resistance"], ["snakeboarding", "vid views"], ["elasticity", "gross factor"], 
	["buffness", "management"], ["inflatability", "sweetness"], ["loyalty", "spirit"], ["explosiveness", "mercy"], ["IQ", "EQ"],
];

var fighterHobbies = [
	["weight lifting", "pizza"], ["singing", "meeting fans"], ["hiding", "reading"], ["searching for his long-lost family"], ["eating mom's homemade ramen"],
	["watching ARMS (especially Ribbon Girl)"], ["sniffing luxury fragrances", "fitness"], ["avoiding salt water", "fetch"], ["snakeboarding", "making rad vids"], ["watching the ARMS Grand Prix"],
	["training and inspiring new fighters"], ["seeking applause", "eating candy"], ["self-discipline", "making bracelets"], ["flawless victories"], ["none (only has time for ARMS)"],
];

var fighterTitles = [
	"The Bouncer", "The Airess", "The Student of Stealth", "The Grim Creeper", "The Ramen Bomber",
	"The Scrapyard Scrapper", "The Silver Screen Queen", "The Clockwork Cops", "The Speed Demon", "The 'Man' of Mystery",
	"The Commish", "The Sucker Puncher", "The Spirited Fighter", "The Mean Machine", "The Rad Scientist",
];

var affiliations = [
	"Spring Gym", "Ribbonics Records", "Rasen Ninjutsu University", "the Mausoleum", "Mintendo Noodle House",
	"the Scrapyard", "Twintelle Productions", "Beach Patrol", "Naja Crew", "ARMS Laboratory",
	"ARMS League", "street performers worldwide", "Misangans", "ARMS Laboratory", "ARMS Laboratory",
];

var voiceActors = [
	"Peter von Gomm", "Momoka Kawasaki", "Kenji Takahashi", "Kouji Takeda", "Haruna Takatsu",
	"Ayumi Fujimura", "Adeyto", "no one", "Ryouta Takeuchi", "no one",
	"Dominic Allen", "Soness Stevens", "Toru Sakurai", "Peter Von Gomm", "Donna Burke",
];

var rankNames = [
	"Snail", "Lollipop", "Pinwheel", "Whirligig", "Corkscrew",
	"Propeller", "Drill", "Whirlpool", "Tornado", "Hurricane",
	"Cyclone", "Aurora", "Solar Flare", "Galaxy", "Supernova",
];


var partyCrash = [
	[ 0,  1, 62, "Battle for Stardom",],
	[ 2,  4, 58, "Martial Arts Mash-Up",],
	[ 3,  6, 49, "That's a Wrap"],
	[11, 12, 57, "New Face-Off"],
	[13,  8, 53, "Innovative Metal"],
	[ 5,  7, 51, "Shake the Rush Off"],
	[10, 14, 52, "Best Frenemies"],
	[ 4,  9, 55, "Stretch to the Limit"],
	[ 0,  2, 48, "Conflict of Interests"],
	[ 3, 10, 49, "Beef on Beef"],
	[ 1,  6, 52, "Star Power Showdown"],
	[ 4,  8, 51, "Serpents"],
	[ 5, 13, 39, "Metal Meets Metal"],
];


var armWeights = ["light", "medium", "heavy"];
var weightCount = {};

var armElements = ["none", "fire", "electric", "wind", "stun", "explosion", "ice", "blind", "poison"];
var elementCount = {};

for (a = 0; a < armsStats.length; ++a)
{
	if (!weightCount[armsStats[a][7]])
		weightCount[armsStats[a][7]] = 1;
	else
		weightCount[armsStats[a][7]]++;
		
	if (!elementCount[armsStats[a][6]])
		elementCount[armsStats[a][6]] = 1;
	else
		elementCount[armsStats[a][6]]++;
}

function extractIndexAsArray(array, index)
{
	var res = [];
	for (var i = 0; i < array.length; ++i)
		res.push(array[i][index]);
	return res;
}


function randomNumber(PRNG, count)
{
	var rand = Math.floor(PRNG() * count);
	return rand;
}

function randomItemFrom(PRNG, options)
{
	var val = options[randomNumber(PRNG, options.length)];
	return val;
}

function pickNButNot(PRNG, n, options, avoid)
{
	if (n == 0) return [];
	var rand = null;
	do {
		rand = options[randomNumber(PRNG, options.length)];
	} while (avoid.includes(rand));
	
	return [rand].concat(pickNButNot(PRNG, n-1, options, avoid + [rand]));
}

function randomNumberButNot(PRNG, count, avoid)
{
	do {
		rand = randomNumber(PRNG, count);
	} while (avoid.includes(rand));
	return rand;
}

function randomFlatten(PRNG, vals)
{
	var res = [];
	for (var i = 0; i < vals.length; ++i)
		res.push(randomItemFrom(PRNG, vals[i]));
	return res;
}


function intervalStep(start, step, count)
{
	var res = [];
	for (var i = 0; i < count; ++i)
		res.push(start + i * step);
	return res;
}

function offsetInterval(PRNG, center, step, count)
{
	var offset = randomNumber(PRNG, count);
	var start = center - offset * step;
	return intervalStep(start, step, count);
}

function offsetIntervalMin(PRNG, center, step, count, min)
{
	var offset = randomNumber(PRNG, count);
	var start = Math.max(min, center - offset * step);
	return intervalStep(start, step, count);
}

function formatOrdinal(nr)
{
	if (nr % 10 == 1 && nr % 100 != 11)
		return nr + "st";
	else if (nr % 10 == 2 && nr % 100 != 12)
		return nr + "nd";
	else if (nr % 10 == 3 && nr % 100 != 13)
		return nr + "rd";
	else
		return nr + "th";
}




function generateQuestion(PRNG)
{
	var question_count = 44;
	
	var rand = randomNumber(PRNG, question_count);
	
	var q, ans, opts, trivia, image;
	
	switch (rand)
	{
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
			
			var fighter = randomNumber(PRNG, fighterStats.length);
			var stat = rand;
			q = "What is the " + fighterStatsMap[stat] + " of " + fighterStats[fighter][0] + "?";
			ans = fighterStats[fighter][1+stat];
			if (stat != 4)
				opts = [1,2,3,4,5];
			else
				opts = [150, 160, 170, 180, 200];
			trivia = "The " + fighterStatsMap[stat] + " of " + fighterStats[fighter][0] + " is " + ans + ".";
			break;
		
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
			
			var fighter1 = randomNumber(PRNG, fighterStats.length);
			var fighter2 = randomNumberButNot(PRNG, fighterStats.length, [fighter1]);
			var stat = rand - 5;
			
			order = "equal to";
			if (fighterStats[fighter1][1+stat] > fighterStats[fighter2][1+stat])
				order = ordinalGreater[stat] + " than";
			else if (fighterStats[fighter1][1+stat] < fighterStats[fighter2][1+stat])
				order = ordinalLesser[stat] + " than";
			
			
			q = "How does the " + fighterStatsMap[stat] + " of " + fighterStats[fighter1][0] + "  compare to that of " + fighterStats[fighter2][0] + "?";
			ans = order;
			opts = [ordinalLesser[stat] + " than", "equal to", ordinalGreater[stat] + " than"];
			trivia = "The " + fighterStatsMap[stat] + " of " + fighterStats[fighter1][0] + " is " + ans + " that of " + fighterStats[fighter2][0] + ".";
			break;
			
		
		case 10: // fighter age
			var fighter = randomNumber(PRNG, fighterStats.length);
			q = "How old is " + fighterStats[fighter][0] + "?";
			ans = fighterAges[fighter];
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, fighterAges, [ans])));
			trivia = "The age of " + fighterStats[fighter][0] + " is " + ans + ".";
			break;
		
		case 11: // fighter title
			var fighter = randomNumber(PRNG, fighterStats.length);
			q = "What is the nickname of " + fighterStats[fighter][0] + "?";
			ans = fighterTitles[fighter];
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, fighterTitles, [ans])));
			trivia = "The nickname of " + fighterStats[fighter][0] + " is '" + ans + "'.";
			break;
		
		case 12: // fighter affiliation
			var fighter = randomNumber(PRNG, fighterStats.length);
			q = "Which organization is " + fighterStats[fighter][0] + " affiliated with?";
			ans = affiliations[fighter];
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, affiliations, [ans])));
			trivia = fighterStats[fighter][0] + " is affiliated with " + ans + ".";
			break;
			
		case 13: // fighter affiliation, inverse
			var fighter = randomNumber(PRNG, fighterStats.length);
			q = "Which fighter is affiliated with " + affiliations[fighter] + "?";
			ans = fighterStats[fighter][0];
			var avoid = [];
			for (var f = 0; f < fighterStats.length; f++)
				if (affiliations[f] == affiliations[fighter])
					avoid.push(fighterStats[f][0]);
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, extractIndexAsArray(fighterStats, 0), avoid)));
			trivia = ans + " is affiliated with " + affiliations[fighter] + ".";
			break;
			
		case 14: // voice actor
			var fighter = randomNumber(PRNG, fighterStats.length);
			q = "Who was the voice actor for " + fighterStats[fighter][0] + "?";
			ans = voiceActors[fighter];
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, voiceActors, [ans])));
			trivia = fighterStats[fighter][0] + " is voiced by " + ans + ".";
			break;
			
		case 15: // voice actor, inverted
			var fighter = randomNumber(PRNG, fighterStats.length);
			q = "Which fighter did " + voiceActors[fighter] + " do voice acting for?";
			ans = fighterStats[fighter][0];
			var avoid = [];
			for (var f = 0; f < fighterStats.length; f++)
				if (voiceActors[f] == voiceActors[fighter])
					avoid.push(fighterStats[f][0]);
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, extractIndexAsArray(fighterStats, 0), avoid)));
			trivia = ans + " is voiced by " + voiceActors[fighter] + ".";
			break;
			
		case 16: // hobby
			fighter = randomNumber(PRNG, fighterStats.length);
			q = "Which is a hobby of " + fighterStats[fighter][0] + "'s?";
			var hobbies = fighterHobbies[fighter];
			ans = randomItemFrom(PRNG, hobbies);
			opts = shuffle([ans].concat(randomFlatten(PRNG, pickNButNot(PRNG, 4, fighterHobbies, [hobbies]))));
			trivia = "One of " + fighterStats[fighter][0] + "'s hobbies is " + ans + ".";
			break;
		
		case 17: // hobby, inverted
			var fighter = randomNumber(PRNG, fighterStats.length);
			var hobby = randomItemFrom(PRNG, fighterHobbies[fighter]);
			q = "Which fighter has " + hobby + " as a hobby?";
			ans = fighterStats[fighter][0];
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, extractIndexAsArray(fighterStats, 0), [ans])));
			trivia = fighterStats[fighter][0] + " has " + hobby + " as a hobby.";
			break;
		
		case 18: // special stat
			fighter = randomNumber(PRNG, fighterStats.length);
			q = "Which is a unique statistic of " + fighterStats[fighter][0] + "'s?";
			var specials = extraStats[fighter];
			ans = randomItemFrom(PRNG, specials);
			opts = shuffle([ans].concat(randomFlatten(PRNG, pickNButNot(PRNG, 4, extraStats, [specials]))));
			trivia = "One of " + fighterStats[fighter][0] + "'s unique statistics is " + ans + ".";
			break;
		
		case 19: // special stat, inverted
			var fighter = randomNumber(PRNG, fighterStats.length);
			var special = randomItemFrom(PRNG, extraStats[fighter]);
			q = "Which fighter has " + special + " as a unique statistic?";
			ans = fighterStats[fighter][0];
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, extractIndexAsArray(fighterStats, 0), [ans])));
			trivia = fighterStats[fighter][0] + " has " + special + " as a unique statistic.";
			break;
		
		case 20: // home stage
			var fighter = randomNumber(PRNG, fighterStats.length);
			q = "Which is the home stage of " + fighterStats[fighter][0] + "?";
			ans = homeStages[fighter];
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, homeStages, [ans])));
			trivia = ans + " is the home stage of " + fighterStats[fighter][0] + ".";
			break;
		
		case 21: // home stage, inverted
			var fighter = randomNumber(PRNG, fighterStats.length);
			q = "Which fighter has " + homeStages[fighter] + " as home stage?";
			ans = fighterStats[fighter][0];
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, extractIndexAsArray(fighterStats, 0), [ans])));
			trivia = homeStages[fighter] + " is the home stage of " + ans + ".";
			break;
		
		case 22: // rank titles
			var rank = randomNumber(PRNG, rankNames.length);
			q = "What is the rank title for rank " + (rank + 1) + "?";
			ans = rankNames[rank];
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, rankNames, [ans])));
			trivia = "The rank title for rank " + (rank + 1) + " is " + ans + ".";
			break;
		
		case 23: // rank titles, inverted
			var rank = randomNumber(PRNG, rankNames.length);
			q = "Which rank has the rank title " + rankNames[rank] + "?";
			ans = (rank + 1);
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [ans])));
			trivia = "The rank title for rank " + ans + " is " + rankNames[rank] + ".";
			break;
		
		
		
		case 24: // ARM uncharged damage
		case 25: // ARM charged damage
			var arm = randomNumber(PRNG, armsStats.length);
			var stat = rand - 23; // 1 or 2
			q = "What is the " + armStatsMap[stat-1] + " damage of " + armsStats[arm][0] + " (base version, excl. secondary effects)?";
			ans = armsStats[arm][stat];
			opts = offsetInterval(PRNG, ans, 5, 5);
			trivia = "The " + armStatsMap[stat-1] + " damage of " + armsStats[arm][0] + " is " + ans + " (base version, excl. secondary effects).";
			break;
		
		case 26: // Plus ARM uncharged damage
		case 27: // Plus ARM charged damage
			var arm = randomNumber(PRNG, armsStats.length);
			var stat = rand - 25; // 1, 2
			q = "What is the " + armStatsMap[stat-1] + " damage of " + armsStats[arm][0] + "+ (excl. secondary effects)?";
			ans = armsStats[arm][stat];
			opts = offsetInterval(PRNG, ans, 5, 5);
			trivia = "The " + armStatsMap[stat-1] + " damage of " + armsStats[arm][0] + "+ is " + ans + " (excl. secondary effects).";
			break;
			
		case 28: // (standard or plus) ARM uncharged damage, comparision
		case 29: // (standard or plus) ARM charged damage, comparision
			var arm1 = randomNumber(PRNG, armsStats.length);
			var arm2 = randomNumberButNot(PRNG, armsStats.length, [arm1]);
			var stat = rand - 27; // 1 or 2
			q = "How does the " + armStatsMap[stat-1] + " damage of " + armsStats[arm1][0] + " compare to that of " + armsStats[arm2][0] + " (excl. secondary effects)?";
			
			ans = "equal to";
			if (armsStats[arm1][stat] > armsStats[arm2][stat])
				ans = "greater than";
			else if (armsStats[arm1][stat] < armsStats[arm2][stat])
				ans = "lesser than";
			
			opts = ["greater than", "equal to", "lesser than"];
			trivia = "The " + armStatsMap[stat-1] + " damage of " + armsStats[arm1][0] + " is " + ans + " that of " + armsStats[arm2][0] + " (excl. secondary effects).";
			break;
		
		case 30: // ARM rush damage
			var arm = randomNumber(PRNG, armsStats.length);
			q = "What is the " + armStatsMap[2] + " damage of " + armsStats[arm][0] + " (excl. secondary effects)?";
			ans = armsStats[arm][3];
			opts = offsetInterval(PRNG, ans, 5, 5);
			trivia = "The " + armStatsMap[2] + " damage of " + armsStats[arm][0] + " is " + ans + " (excl. secondary effects).";
			break;
		
		case 31: // ARM rush damage, comparision
			var arm1 = randomNumber(PRNG, armsStats.length);
			var arm2 = randomNumberButNot(PRNG, armsStats.length, [arm1]);
			q = "How does the " + armStatsMap[2] + " damage of " + armsStats[arm1][0] + " compare to that of " + armsStats[arm2][0] + " (excl. secondary effects)?";
			
			ans = "equal to";
			if (armsStats[arm1][3] > armsStats[arm2][3])
				ans = "greater than";
			else if (armsStats[arm1][3] < armsStats[arm2][3])
				ans = "lesser than";
			
			opts = ["greater than", "equal to", "lesser than"];
			trivia = "The " + armStatsMap[2] + " damage of " + armsStats[arm1][0] + " is " + ans + " that of " + armsStats[arm2][0] + " (excl. secondary effects).";
			break;
		
		
		
		case 32: // ARM element
			var arm = randomNumber(PRNG, armsStats.length);
			q = "What is the element of " + armsStats[arm][0] + "?";
			ans = armsStats[arm][6];
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, armElements, [ans])));
			trivia = "The element of " + armsStats[arm][0] + " is " + ans + ".";
			break;
		
		case 33: // ARM weight
			var arm = randomNumber(PRNG, armsStats.length);
			q = "What is the weight class of " + armsStats[arm][0] + "?";
			ans = armsStats[arm][7];
			opts = ["light", "medium", "heavy"];
			trivia = armsStats[arm][0] + " is a " + ans + " ARM.";
			break;
		
		case 34: // combined grab damage
			var fighter = randomNumber(PRNG, fighterStats.length);
			var arm1 = randomNumber(PRNG, armsStats.length);
			var arm2 = randomNumberButNot(PRNG, armsStats.length, [arm1]);
			q = "What is the grab damage of " + fighterStats[fighter][0] + " using " + armsStats[arm1][0] + "+ and " + armsStats[arm2][0] + "+?";
			ans = fighterStats[fighter][5] + armsStats[arm1][4] + armsStats[arm2][4];
			opts = offsetIntervalMin(PRNG, ans, 5, 5, 150);
			trivia = "The grab damage of " + fighterStats[fighter][0] + " using " + armsStats[arm1][0] + "+ and " + armsStats[arm2][0] + "+ is " + ans + ".";
			break;
		
		case 35: // combined rush damage
			var arm1 = randomNumber(PRNG, armsStats.length);
			var arm2 = randomNumberButNot(PRNG, armsStats.length, [arm1]);
			q = "What is the maximum rush damage when using " + armsStats[arm1][0] + " and " + armsStats[arm2][0] + " (excl. secondary effects)?";
			ans = armsStats[arm1][3] + armsStats[arm2][3];
			opts = offsetInterval(PRNG, ans, 20, 5);
			trivia = "The maximum rush damage when using " + armsStats[arm1][0] + " and " + armsStats[arm2][0] + " is " + ans + " (excl. secondary effects).";
			break;
		
		case 36: // Weight count
			var weight = randomNumber(PRNG, armWeights.length);
			q = "How many ARMS are of the " + armWeights[weight] + " class?";
			ans = weightCount[armWeights[weight]];
			opts = offsetInterval(PRNG, ans, 1, 5);
			trivia = ans + " ARMS are of the " + armWeights[weight] + " weight class.";
			break;
		
		case 37: // Element count
			var element = randomNumber(PRNG, armElements.length);
			q = "How many ARMS have " + ((element != 0) ? " the " + armElements[element] : " no" ) + " element?";
			ans = elementCount[armElements[element]];
			opts = offsetIntervalMin(PRNG, ans, 1, 5, 1);
			trivia = ans + " ARMS have " + ((element != 0) ? " the " + armElements[element] : " no" ) + " element.";
			break;
		
		case 38: // Default ARMS
			var fighter = randomNumber(PRNG, fighterStats.length);
			var defaultarms = [armsStats[fighterStats[fighter][6][0]][0], armsStats[fighterStats[fighter][6][1]][0], armsStats[fighterStats[fighter][6][2]][0]];
			q = "Which is one of " + fighterStats[fighter][0] + "'s default ARMS?";
			ans = randomItemFrom(PRNG, defaultarms);
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, extractIndexAsArray(armsStats, 0), defaultarms)));
			trivia = "One of " + fighterStats[fighter][0] + "'s default ARMS is " + ans + ".";
			break;
		
		// PARTY CRASH
		
		case 39: // Party Crash, matchup
			var crash = randomNumber(PRNG, partyCrash.length);
			var pick = randomNumber(PRNG, 2);
			q = "Who did " + fighterStats[partyCrash[crash][pick]][0] + " go up against in the " + formatOrdinal(crash+1) + " Party Crash?";
			ans = fighterStats[partyCrash[crash][((pick == 1) ? 0 : 1)]][0];
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, extractIndexAsArray(fighterStats, 0), [ans])));
			trivia = fighterStats[partyCrash[crash][pick]][0] + " faced " + ans + " in the " + formatOrdinal(crash+1) + " Party Crash.";
			break;
		
		case 40: // Party Crash, title
			var crash = randomNumber(PRNG, partyCrash.length);
			var pick = randomNumber(PRNG, 2);
			q = "What was the title of the " + formatOrdinal(crash+1) + " Party Crash?";
			ans = partyCrash[crash][3];
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, extractIndexAsArray(partyCrash, 3), [ans])));
			trivia = "The " + formatOrdinal(crash+1) + " Party Crash was titled " + ans + ".";
			break;
		
		case 41: // Party Crash, win percentage
			var crash = randomNumber(PRNG, partyCrash.length);
			var pick = randomNumber(PRNG, 2);
			var other = fighterStats[partyCrash[crash][((pick == 1) ? 0 : 1)]][0];
			var perc = (pick == 0) ? partyCrash[crash][2] : (100 - partyCrash[crash][2]);
			q = "What win percentage did " + fighterStats[partyCrash[crash][pick]][0] + " get in the Party Crash against " + other + "?";
			ans = perc + " %";
			opts = offsetIntervalMin(PRNG, perc, 2, 5, 0);
			for (var o = 0; o < opts.length; ++o) opts[o] = opts[o] + " %";
			trivia = fighterStats[partyCrash[crash][pick]][0] + " got a win percentage of " + ans + " in the Party Crash against " + other + ".";
			break;
		
		
		
		case 42: // fighter title, inverted
			var fighter = randomNumber(PRNG, fighterStats.length);
			q = "Which fighter goes under the title " + fighterTitles[fighter] + "?";
			ans = fighterStats[fighter][0];
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, extractIndexAsArray(fighterStats, 0), [ans])));
			trivia = fighterTitles[fighter] + " is the title of " + ans + ".";
			break;
		
		case 43: // Fighter signature
			var fighter = randomNumber(PRNG, fighterStats.length);
			q = "Which fighter is this the signature of?";
			image = "assets/sig-" + ((fighter < 10) ? "0" + fighter : fighter) + ".png";
			ans = fighterStats[fighter][0];
			opts = shuffle([ans].concat(pickNButNot(PRNG, 4, extractIndexAsArray(fighterStats, 0), [ans])));
			trivia = fighterTitles[fighter] + " is the title of " + ans + ".";
			break;
	}
	
	return {"question": q, "answer": ans, "options": opts, "trivia": trivia, "image": image};
}

