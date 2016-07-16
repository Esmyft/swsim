/*jslint browser:true */

// function to allow comparison between Arrays
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    var i;
    for (i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}

Object.defineProperty(Array.prototype, "equals", {enumerable: false});


// ------
var MONSTER_NAME = "soha_awakened";
var temp;

/**
var monster_stats = {
    sieq: {
        type: "fire",
        "2": {
            maxhp: [915, 945, 975, 1005, 1050, 1080, 1125, 1155, 1200, 1230, 1275, 1320, 1365, 1410, 1455, 1515, 1560, 1620, 1665, 1725],
            attack: [99, 102, 106, 110, 113, 117, 121, 125, 130, 134, 139, 144, 148, 154, 159, 164, 170, 176, 182, 188],
            defense: [56, 58, 60, 62, 64, 66, 69, 71, 73, 76, 78, 81, 84, 87, 90, 93, 96, 99, 102, 106]
        },
        "3": {
            maxhp: [1380, 1410, 1455, 1485, 1530, 1560, 1605, 1635, 1680, 1725, 1770, 1815, 1860, 1905, 1950, 1995, 2040, 2100, 2145, 2205, 2250, 2310, 2370, 2430, 2490],
            attack: [150, 154, 158, 162, 166, 170, 174, 178, 183, 187, 192, 197, 202, 207, 212, 217, 223, 228, 234, 240, 246, 252, 258, 264, 271],
            defense: [85, 87, 89, 91, 94, 96, 98, 101, 103, 106, 109, 111, 114, 117, 120, 123, 126, 129, 132, 135, 139, 142, 146, 149, 153]
        },
        "4": {
            maxhp: [1995, 2025, 2070, 2100, 2145, 2190, 2220, 2265, 2310, 2355, 2400, 2445, 2490, 2535, 2580, 2625, 2670, 2715, 2775, 2820, 2880, 2925, 2985, 3045, 3090, 3150, 3210, 3270, 3330, 3390],
            attack: [216, 220, 224, 228, 232, 237, 241, 246, 250, 255, 260, 264, 269, 274, 279, 285, 290, 295, 301, 306, 312, 318, 324, 330, 336, 342, 348, 355, 361, 368],
            defense: [122, 124, 127, 129, 131, 134, 136, 139, 141, 144, 147, 149, 152, 155, 158, 161, 164, 167, 170, 173, 176, 180, 183, 186, 190, 193, 197, 200, 204, 208]
        },
        "5": {
            maxhp: [2715, 2760, 2805, 2850, 2895, 2940, 2985, 3030, 3075, 3120, 3165, 3225, 3270, 3330, 3375, 3435, 3480, 3540, 3585, 3645, 3705, 3765, 3825, 3885, 3945, 4005, 4065, 4125, 4200, 4260, 4320, 4395, 4470, 4530, 4605],
            attack: [295, 300, 304, 309, 314, 319, 324, 329, 334, 339, 345, 350, 355, 361, 367, 372, 378, 384, 390, 396, 402, 409, 415, 422, 428, 435, 442, 449, 456, 463, 470, 477, 485, 492, 500],
            defense: [166, 169, 171, 174, 177, 180, 182, 185, 188, 191, 194, 197, 200, 204, 207, 210, 213, 217, 220, 224, 227, 231, 234, 238, 242, 246, 250, 254, 258, 262, 266, 270, 274, 279, 283]
        },
        "6": {
            maxhp: [3675, 3720, 3780, 3825, 3885, 3930, 3990, 4050, 4095, 4155, 4215, 4275, 4335, 4395, 4455, 4515, 4575, 4635, 4695, 4755, 4830, 4890, 4965, 5025, 5100, 5175, 5235, 5310, 5385, 5460, 5535, 5610, 5685, 5760, 5850, 5925, 6000, 6090, 6165, 6255],
            attack: [400, 405, 411, 417, 422, 428, 434, 440, 446, 452, 458, 465, 471, 478, 484, 491, 498, 504, 511, 518, 525, 533, 540, 547, 555, 563, 570, 578, 586, 594, 602, 611, 619, 627, 636, 645, 654, 663, 672, 681],
            defense: [226, 229, 232, 235, 239, 242, 245, 249, 252, 255, 259, 262, 266, 270, 273, 277, 281, 285, 289, 293, 297, 301, 305, 309, 313, 317, 322, 326, 331, 335, 340, 344, 349, 354, 359, 364, 369, 374, 379, 384]
        },
        speed: 109
    },
    sieq_awakened: {
        type: "fire",
        "2": {
            maxhp: [915, 945, 975, 1005, 1050, 1080, 1125, 1155, 1200, 1230, 1275, 1320, 1365, 1410, 1455, 1515, 1560, 1620, 1665, 1725],
            attack: [120, 124, 128, 133, 137, 142, 147, 152, 157, 162, 168, 174, 179, 186, 192, 198, 205, 212, 220, 227],
            defense: [59, 61, 63, 65, 68, 70, 72, 75, 77, 80, 83, 86, 88, 91, 95, 98, 101, 105, 108, 112]
        },
        "3": {
            maxhp: [1380, 1410, 1455, 1485, 1530, 1560, 1605, 1635, 1680, 1725, 1770, 1815, 1860, 1905, 1950, 1995, 2040, 2100, 2145, 2205, 2250, 2310, 2370, 2430, 2490],
            attack: [182, 186, 191, 196, 201, 206, 211, 216, 221, 227, 232, 238, 244, 250, 256, 262, 269, 276, 282, 289, 297, 304, 311, 319, 327],
            defense: [90, 92, 94, 97, 99, 102, 104, 107, 109, 112, 115, 117, 120, 123, 126, 129, 133, 136, 139, 143, 146, 150, 153, 157, 161]
        },
        "4": {
            maxhp: [1995, 2025, 2070, 2100, 2145, 2190, 2220, 2265, 2310, 2355, 2400, 2445, 2490, 2535, 2580, 2625, 2670, 2715, 2775, 2820, 2880, 2925, 2985, 3045, 3090, 3150, 3210, 3270, 3330, 3390],
            attack: [262, 267, 272, 277, 282, 287, 292, 298, 303, 309, 315, 321, 327, 333, 339, 345, 351, 358, 365, 371, 378, 385, 392, 400, 407, 414, 422, 430, 438, 446],
            defense: [129, 131, 134, 136, 139, 141, 144, 147, 149, 152, 155, 158, 161, 164, 167, 170, 173, 176, 180, 183, 186, 190, 193, 197, 201, 204, 208, 212, 216, 220]
        },
        "5": {
            maxhp: [2715, 2760, 2805, 2850, 2895, 2940, 2985, 3030, 3075, 3120, 3165, 3225, 3270, 3330, 3375, 3435, 3480, 3540, 3585, 3645, 3705, 3765, 3825, 3885, 3945, 4005, 4065, 4125, 4200, 4260, 4320, 4395, 4470, 4530, 4605],
            attack: [356, 362, 367, 373, 379, 385, 391, 397, 403, 410, 416, 423, 429, 436, 443, 450, 457, 464, 471, 479, 486, 494, 502, 510, 518, 526, 534, 542, 551, 560, 568, 577, 586, 596, 605],
            defense: [176, 179, 182, 184, 187, 190, 193, 196, 199, 203, 206, 209, 212, 216, 219, 222, 226, 229, 233, 237, 240, 244, 248, 252, 256, 260, 264, 268, 272, 277, 281, 285, 290, 294, 299]
        },
        "6": {
            maxhp: [3675, 3720, 3780, 3825, 3885, 3930, 3990, 4050, 4095, 4155, 4215, 4275, 4335, 4395, 4455, 4515, 4575, 4635, 4695, 4755, 4830, 4890, 4965, 5025, 5100, 5175, 5235, 5310, 5385, 5460, 5535, 5610, 5685, 5760, 5850, 5925, 6000, 6090, 6165, 6255],
            attack: [484, 491, 497, 504, 511, 518, 525, 532, 540, 547, 555, 562, 570, 578, 586, 594, 602, 610, 618, 627, 635, 644, 653, 662, 671, 680, 690, 699, 709, 718, 728, 738, 748, 758, 769, 779, 790, 801, 812, 823],
            defense: [239, 242, 246, 249, 252, 256, 259, 263, 266, 270, 274, 278, 281, 285, 289, 293, 297, 301, 305, 309, 314, 318, 322, 327, 331, 336, 340, 345, 350, 354, 359, 364, 369, 374, 379, 385, 390, 395, 401, 406]
        },
        speed: 110
    }
    soha: {
        type: "water",
        "4": {
            maxhp: [2355, 2400, 2445, 2490, 2535, 2580, 2625, 2670, 2730, 2775, 2835, 2880, 2940, 2985, 3045, 3105, 3150, 3210, 3270, 3330, 3390, 3465, 3525, 3585, 3660, 3720, 3795, 3855, 3930, 4005],
            attack: [244, 249, 253, 258, 263, 268, 272, 278, 283, 288, 293, 299, 304, 310, 316, 322, 328, 334, 340, 346, 353, 359, 366, 373, 379, 386, 394, 401, 408, 416],
            defense: [175, 178, 182, 185, 188, 192, 195, 199, 202, 206, 210, 214, 218, 222, 226, 230, 234, 239, 243, 247, 252, 257, 261, 266, 271, 276, 281, 286, 292, 297]
        },
        "5": {
            maxhp: [3210, 3255, 3315, 3360, 3420, 3465, 3525, 3585, 3630, 3690, 3750, 3810, 3870, 3930, 3990, 4050, 4110, 4185, 4245, 4320, 4380, 4455, 4515, 4590, 4665, 4740, 4815, 4890, 4965, 5040, 5115, 5190, 5280, 5355, 5445],
            attack: [333, 338, 344, 349, 354, 360, 366, 371, 377, 383, 389, 395, 401, 408, 414, 420, 427, 434, 441, 447, 454, 462, 469, 476, 484, 491, 499, 507, 515, 523, 531, 539, 548, 556, 565],
            defense: [238, 242, 246, 249, 253, 257, 261, 265, 270, 274, 278, 282, 287, 291, 296, 301, 305, 310, 315, 320, 325, 330, 335, 340, 346, 351, 357, 362, 368, 374, 380, 386, 392, 398, 404]
        },
        "6": {
            maxhp: [4365, 4425, 4485, 4545, 4605, 4665, 4740, 4800, 4860, 4935, 4995, 5070, 5130, 5205, 5280, 5355, 5430, 5505, 5580, 5655, 5730, 5805, 5880, 5970, 6045, 6135, 6210, 6300, 6390, 6465, 6555, 6645, 6735, 6825, 6930, 7020, 7110, 7215, 7305, 7410],
            attack: [452, 458, 464, 471, 477, 484, 491, 497, 504, 511, 518, 525, 532, 540, 547, 555, 562, 570, 578, 586, 594, 602, 610, 618, 627, 635, 644, 653, 662, 671, 680, 690, 699, 709, 718, 728, 738, 748, 759, 769],
            defense: [323, 327, 332, 336, 341, 346, 350, 355, 360, 365, 370, 375, 380, 385, 391, 396, 402, 407, 413, 418, 424, 430, 436, 442, 448, 454, 460, 466, 473, 479, 486, 492, 499, 506, 513, 520, 527, 534, 542, 549]
        },
        speed: 101
    },
    soha_awakened: {
        type: "water",
        "4": {
            maxhp: [2625, 2670, 2730, 2775, 2820, 2880, 2925, 2985, 3030, 3090, 3150, 3210, 3270, 3330, 3390, 3450, 3510, 3585, 3645, 3705, 3780, 3855, 3915, 3990, 4065, 4140, 4215, 4290, 4380, 4455],
            attack: [279, 284, 289, 295, 300, 306, 311, 317, 323, 329, 335, 341, 348, 354, 361, 367, 374, 381, 388, 395, 403, 410, 418, 425, 433, 441, 450, 458, 466, 475],
            defense: [175, 178, 182, 185, 188, 192, 195, 199, 202, 206, 210, 214, 218, 222, 226, 230, 234, 239, 243, 247, 252, 257, 261, 266, 271, 276, 281, 286, 292, 297]
        },
        "5": {
            maxhp: [3570, 3630, 3690, 3735, 3795, 3855, 3915, 3975, 4050, 4110, 4170, 4230, 4305, 4365, 4440, 4515, 4575, 4650, 4725, 4800, 4875, 4950, 5025, 5100, 5190, 5265, 5355, 5430, 5520, 5610, 5700, 5790, 5880, 5970, 6060],
            attack: [380, 386, 392, 398, 404, 411, 417, 424, 431, 437, 444, 451, 458, 465, 473, 480, 488, 495, 503, 511, 519, 527, 536, 544, 553, 561, 570, 579, 588, 598, 607, 616, 626, 636, 646],
            defense: [238, 242, 246, 249, 253, 257, 261, 265, 270, 274, 278, 282, 287, 291, 296, 301, 305, 310, 315, 320, 325, 330, 335, 340, 346, 351, 357, 362, 368, 374, 380, 386, 392, 398, 404]
        },
        "6": {
            maxhp: [4845, 4905, 4980, 5040, 5115, 5190, 5250, 5325, 5400, 5475, 5550, 5625, 5700, 5775, 5865, 5940, 6030, 6105, 6195, 6270, 6360, 6450, 6540, 6630, 6720, 6810, 6900, 6990, 7095, 7185, 7290, 7380, 7485, 7590, 7695, 7800, 7905, 8010, 8130, 8235],
            attack: [517, 524, 531, 538, 546, 553, 561, 569, 576, 584, 592, 600, 609, 617, 625, 634, 642, 651, 660, 669, 678, 688, 697, 707, 716, 726, 736, 746, 756, 767, 777, 788, 798, 809, 820, 832, 843, 854, 866, 878],
            defense: [323, 327, 332, 336, 341, 346, 350, 355, 360, 365, 370, 375, 380, 385, 391, 396, 402, 407, 413, 418, 424, 430, 436, 442, 448, 454, 460, 466, 473, 479, 486, 492, 499, 506, 513, 520, 527, 534, 542, 549]
        },
        speed: 102
    }
};
**/

var monster_id = {
    lapis: 19801,
    lapis_awakened: 19811,
    raoq: 11002,
    raoq_awakened: 11012,
    sieq: 10602,
    sieq_awakened: 10612,
    soha: 11201,
    soha_awakened: 11211
};

var monster_skills = { //instructions, damage%, harmful effect rate, cooldown, recovery, shield
    "1502": [
                [["ATTACK", "SINGLE", ["HEAL", "SELF", ["DAMAGE_DEALT", "*", 30]]]],
                [0, 5, 10, 15, 20, 25, 40],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ],
    "1507": [
                [["ATTACK", "SINGLE"],["ATTACK", "SINGLE"]],
                [0, 10, 20, 30, 30],
                [0, 0, 0, 0, 0],
                [3, 3, 3, 3, 2]
            ],
    "1512": [
                [["BUFF", "AOE", "INCREASEATK", 3], ["BUFF", "AOE", "INCREASECRITRATE", 3]],
                [0, 0, 0],
                [0, 0, 0],
                [5, 4, 3]
            ],
    "2002": [
                [["ATTACK", "SINGLE", [["DEBUFF", "SINGLE", "DECREASEDEF", 50, 2]]]],
                [0, 10, 20, 20],
                [0, 0, 0, 10],
                [0, 0, 0, 0]
            ],
    "2007": [
                [["TEAMATTACK", "SINGLE", 1]],
                [0, 0],
                [0, 0],
                [4, 3]
            ],
    "2012": [
                [["PASSIVE", "ANNIHILIATE"]],
                [0],
                [0],
                [0]
            ],
    "2201": [
                [["ATTACK", "SINGLE"], ["ATTACK", "SINGLE"], ["ATTACK", "SINGLE"]],
                [0, 5, 10, 15, 30],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
    "2206": [
                [["ATTACK", "SINGLE"], ["HEAL", "SELF", ["DAMAGE_DEALT", "*", 1]]],
                [0, 10, 20, 30, 30],
                [0, 0, 0, 0, 0],
                [4, 4, 4, 4, 3]
            ],
    "2211": [
                [["ATTACK", "AOE", [["REMOVEBUFF", "AOE"]]]],
                [0, 10, 20, 30, 30],
                [0, 0, 0, 0, 0],
                [5, 5, 5, 5, 4]
            ],
    "2216": [
                [["ATTACK", "SINGLE", [["DEBUFF", "SINGLE", "FREEZE", 10, 1]]], ["ATTACK", "SINGLE", [["DEBUFF", "SINGLE", "FREEZE", 10, 1]]], ["ATTACK", "SINGLE", [["DEBUFF", "SINGLE", "FREEZE", 10, 1]]]],
                [0, 5, 10, 15, 30],
                [0, 0, 0, 0, 20],
                [0, 0, 0, 0, 0]
            ]
    
};

var scenario = {  //name, base_monster_id, attribute, hp, atk, def, spd, resist, class, unit_level
    "faimon-1-normal": [
        [
            4,
            ["Fire Hellhound"],
            ["Fire Inugami"]
        ],
        [],
        []
    ],
    "faimon-1-hard": [
        [[1, 1, 1, 1], [1, 1, 1, 1], [2, 2, 3, 2, 2]],
        [["sieq", 10602, 2, 282 * 15, 460, 260, 119, 21, 3, 33], ["raoq", 11002, 2, 379 * 15, 415, 319, 117, 21, 3, 33]],
        [["sieq", 10602, 2, 340 * 15, 554, 313, 119, 21, 4, 34], ["raoq", 11002, 2, 456 * 15, 501, 385, 117, 21, 4, 34]],
        [["sieq_awakened", 10612, 2, 413 * 15, 816, 402, 132, 24, 4, 34]]
    ]
};

var logger = {
    logs_list: [],
    log: function (msg) {
        "use strict";
        var new_entry = document.createElement("div");
        new_entry.className = "log-entry";
        new_entry.innerHTML = msg;
        document.getElementById("log-container").appendChild(new_entry);

        //this.logs_list[this.logs_list.length] = new_entry;

        return new_entry;
    },
    add_battle_log: function (monster_name) {
        "use strict";
        var battle_log = {monster_name: monster_name, wins: 0, total: 0};
        var new_entry = document.createElement("div");
        new_entry.className = "log-entry";
        new_entry.innerHTML = "Farmer: " + battle_log.monster_name;
        new_entry.appendChild(document.createElement("br"));
        new_entry.innerHTML += "Wins: " + battle_log.wins + "/" + battle_log.total;

        document.getElementById("log-container").appendChild(new_entry);
        battle_log.child_div = new_entry;

        this.logs_list[this.logs_list.length] = new_entry;
        return battle_log;
    },
    update_battle_log: function (battle_log, wins, total) {
        "use strict";
        battle_log.wins = wins;
        battle_log.total = total;
        battle_log.child_div.innerHTML = "Farmer: " + battle_log.monster_name + "\n" + "Wins:" + battle_log.wins + "/" + battle_log.total;

        return battle_log;

    },
    add_debug_log: function (string) {
        var debug_div = document.createElement("div");
        debug_div.className = "debug-entry";
        debug_div.innerHTML = string;
        document.getElementById("log-container").appendChild(debug_div);
    }
};

function clone (obj) {
    "use strict";
    var copy;
    if (null === obj || typeof obj !== "object") {
        return obj;
    }

    if (NaN === obj) {
        console.log("Cloning NaN.");
        return obj;
    }

    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Array) {
        copy = [];
        var i;
        for (i = 0; i < obj.length; i += 1) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        copy = {};

        var keys = Object.keys(obj);
        keys.forEach(function (el) {
            copy[el] = clone(obj[el]);
        });
        return copy;
    }

    logger.log("Error in cloning." + obj);
}

function change_debug_mode () {
    "use strict";
    var debug_mode = document.getElementById("debug-mode-checkbox").checked;

    var sheet;
    var i;
    for (i = 0; i < document.styleSheets.length; i += 1) {
        if (document.styleSheets[i].href.indexOf("swsim.css") > -1) {
            sheet = document.styleSheets[i];
        }
    }

    var rules = sheet.cssRules || sheet.rules;

    var debug_hidden = debug_mode ? "inline-block" : "none";
    var log_hidden = debug_mode ? "none" : "inline-block";

    for (i = 0; i < rules.length; i += 1) {
        if (rules[i].selectorText === ".debug-entry") {
            rules[i].style.display = debug_hidden;
        }

        else if (rules[i].selectorText === ".log-entry") {
            rules[i].style.display = log_hidden;
        }
    }

}
document.getElementById("debug-mode-checkbox").addEventListener("click", change_debug_mode, false);

function get_skill_cooldowns (monster_data) {
    "use strict";
    var id = monster_data[1];
    var skill_list = JSON.parse(SWData.mons[id]["base skill"]);
    var skill_cooldowns = [];
    var i;

    for (i = 0; i < skill_list.length; i += 1) {
        var skill_level = 1;
        var skill_id = skill_list[i];
        //console.log(monster_skills);    
        skill_cooldowns[skill_cooldowns.length] = monster_skills[skill_id][3][skill_level - 1];
    }

    return skill_cooldowns;

}
// !!! TODO !!!
function apply_leader_skill (monster) { // example: lapis: [17001, 0, 0, 2, 0.25] verde: [13003, 2, 0, 4, 0.28]
    var id = monster.id;
    var leader_skill_string = JSON.parse(SWData.mons[id]["leader skill"]);

    // check that leader skill either applies everywhere (0) or in scenario only (2)
    if (leader_skill_string[1] !== 0 && leader_skill_string[1] !== 2) return;

    // check that leader skill either applies to every attribute or to monster's attribute
    if (leader_skill_string[2] !== 0 && leader_skill_string[2] !== monster.attribute) return;

    var base_stat = ["", "base_hp", "base_atk", "base_def", "base_spd", "critrate", "critdmg", "res", "acc"];
}

// !!! TODO !!!
function monster_passive_filter (skill_array, return_skill) {
    "use strict";
    var passive_list = [2012];
    var new_skill_array = [];
    var i;
    for (i = 0; i < skill_array.length; i += 1) {
        var j;
        var is_passive = false;
        for (j = 0; j < passive_list.length; j += 1) {
            if (skill_array[i] === passive_list[j]) {
                is_passive = true;
                break;
            }

            if (is_passive !== return_skill) {
                new_skill_array[new_skill_array.length] = skill_array[i];
            }
        }

    }
    return new_skill_array;
}

function create_scenario_monster (monster_data, position) {
    //monster_data is array
    //name, attribute, con, atk, def, spd, resist, class, unit_level
    "use strict";
    var id = monster_id[monster_data[0]];
    var entry = SWData.mons[id];
    var monster = {
        name: monster_data[0],
        id: monster_data[1],
        attribute: monster_data[2],
        maxhp: monster_data[3] * 15,
        currhp: monster_data[3] * 15,
        atk: monster_data[4],
        def: monster_data[5],
        spd: monster_data[6],

        critrate: entry["critical rate"],
        critdmg: entry["critical damage"],
        acc: entry["accuracy"],
        res: monster_data[7],
        crit_damage_reduction: 0,

        star: monster_data[8],
        lvl: monster_data[9],
        skill_list: monster_passive_filter(JSON.parse(entry["base skill"]), true),
        skill_levels: [1, 1, 1],
        skill_cooldowns: get_skill_cooldowns(monster_data), 

        is_dead: false,
        passives: monster_passive_filter(JSON.parse(entry["base skill"]), false),
        buffs: [],
        atb: 0,

        side: "scenario_side",
        opposing_side: "farmer_side",
        position: position,
    };

    return monster;
}

function create_scenario (scenario) {
    "use strict";
    var monsters = [];
    var monsters_remaining = [];

    var waves = scenario[0];

    var position;
    for (position = 0; position < waves[0].length; position += 1) {
        var grouping = waves[0][position];
        var num_of_monsters = scenario[grouping].length;
        var chosen_monster_data = scenario[grouping][Math.floor(Math.random() * num_of_monsters)];
        monsters[position] = create_scenario_monster(chosen_monster_data, position);
    }

    var wave;
    for (wave = 1; wave < waves.length; wave += 1) {
        monsters_remaining[wave - 1] = [];
        for (position = 0; position < waves[wave].length; position += 1) {
            var grouping = waves[wave][position];
            var num_of_monsters = scenario[grouping].length;
            var chosen_monster_data = scenario[grouping][Math.floor(Math.random() * num_of_monsters)];
            monsters_remaining[wave - 1][position] = create_scenario_monster(chosen_monster_data);
        }

    }

    return {monsters: monsters, monsters_remaining: monsters_remaining, team_passives: []};
} 

function State (farmer, scenario) {
    // typeof farmer === object , typeof scenario === arrays (waves) of arrays (random monster list, monster position, fixed monster list)
    "use strict";
    this.farmerInstance = clone(farmer);
    this.farmerInstance.currhp = this.farmerInstance.maxhp;
    this.farmerInstance.is_dead = false;
    this.farmerInstance.passives = [];
    this.farmerInstance.buffs = [];
    this.farmerInstance.atb = 0;
    this.farmerInstance.skill_cooldowns = [];
    this.farmerInstance.target = null;

    apply_leader_skill(this.farmerInstance);
    var i;
    for (i = 0; i < this.farmerInstance.skill_list.length; i += 1) {
        var skill_number = this.farmerInstance.skill_list[i].toString();
        this.farmerInstance.skill_cooldowns[i] = 0;
    }

    this.farmer_side = {monsters: [this.farmerInstance], team_passives: []}; //team_passives is for passive skills and effects such as defend
    this.scenario_side = create_scenario(scenario); //{monsters, monsters_remaining, team_passives}

}
function has_died (monster) {
    "use strict";
    monster.is_dead = monster.currhp <= 0;
    return monster.is_dead;
}

function has_not_died (monster) {
    "use strict";
    return !has_died(monster);
}

function get_buff (monster, buff) {
    "use strict";
    var i;
    for (i = 0; i < monster.buffs.length; i += 1) {
        if (monster.buffs[i][0] === buff) {
            return monster.buffs[i];
        }
    }
    return null;
}

function get_buff_index (monster, buff) {
    "use strict";
    var i;
    for (i = 0; i < monster.buffs.length; i += 1) {
        if (monster.buffs[i][0] === buff) {
            return i;
        }
    }
    return null;
}

function get_skill_index (monster, skill_id) {
    "use strict";
    var i;
    for (i = 0; i < monster.skill_list.length; i += 1) {
        if (monster.skill_list[i] === skill_id) {
            return i;
        }
    }

    console.log("Error: " + monster.name + " has no skill with the id " + skill_id);
    return null;
}

function get_next_monster (state) {
    "use strict";
    var monster_list = state.farmer_side.monsters.concat(state.scenario_side.monsters);
    var highest_atb = 0;    
    var highest_atb_monster;
    var i;

    for (i = 0; i < monster_list.length; i += 1) {
        if (monster_list[i].atb > highest_atb) {
            highest_atb = monster_list[i].atb;
            highest_atb_monster = monster_list[i];
        }
    }

    if (highest_atb >= 100) {
        return highest_atb_monster;
    }

    return null;
}

//input: array, output: number
function calculate_raw_damage (monster, target, multiplier_array, state, attack_result) {
    "use strict";
    if (multiplier_array.length === 0) return 0;
    else if (typeof multiplier_array === "number") {
        console.log("Damage is " + multiplier_array);
        return multiplier_array;
    }

    else if (multiplier_array[1] === "FIXED") multiplier_array.splice(1, 1);
    
    if (multiplier_array.length === 1) return calculate_raw_damage(monster, target, multiplier_array[0], state);
    else if (typeof multiplier_array === "string") {
        if (multiplier_array === "ATK") return monster.atk;
        else if (multiplier_array === "DEF") return monster.def;
        else if (multiplier_array === "ATTACK_SPEED") return monster.spd;
        else if (multiplier_array === "ATTACK_TOT_HP") return monster.maxhp;
        else if (multiplier_array === "TARGET_TOT_HP") return target.maxhp;
        else if (multiplier_array === "ATTACK_CUR_HP") return monster.currhp;
        else if (multiplier_array === "TARGET_CUR_HP") return target.currhp;
        else if (multiplier_array === "ATTACK_CUR_HP_RATE") return monster.currhp / monster.maxhp;
        else if (multiplier_array === "TARGET_CUR_HP_RATE") return target.currhp / target.maxhp;
        else if (multiplier_array === "ATTACK_LOSS_HP") return monster.maxhp - monster.currhp;
        else if (multiplier_array === "ATTACK_LV") return monster.lvl;
        else if (multiplier_array === "ATTACK_WIZARD_LIFE_RATE") return state[monster.side][monsters].filter(has_not_died).length / state[monster.side][monsters];
        else if (multiplier_array === "DAMAGE_DEALT") return attack_result["damage_dealt"];
        //else if (multiplier_array === "DIE_RATE")
        //else if (multiplier_array === "LIFE_SHARE_ALL")
    }

    var operand1 = calculate_raw_damage(monster, target, multiplier_array[0], state);
    var operand2 = calculate_raw_damage(monster, target, multiplier_array[2], state);
    var operator = (typeof multiplier_array[1] === "string") ? multiplier_array[1] : multiplier_array[1][0];

    if (operator === "+") {
        multiplier_array.splice(0, 3, operand1 + operand2);
    }

    else if (operator === "-") {
        multiplier_array.splice(0, 3, operand1 - operand2);
    }

    else if (operator === "*") {
        multiplier_array.splice(0, 3, operand1 * operand2);
    }

    else if (operator === "/") {
        multiplier_array.splice(0, 3, operand1 / operand2);
    }

    return calculate_raw_damage(monster, target, multiplier_array, state);

}

function get_next_wave (state) {
    "use strict";
    state.scenario_side.monsters = state.scenario_side.monsters_remaining.splice(0, 1)[0];
    var i;
    for (i = 0; i < state.farmer_side.length; i += 1) {
        var monster = state.farmer_side[i];
        // reset buffs, attack bar
        var heal_amount = calculate_raw_damage(null, state.farmer_side[i], [["TARGET_TOT_HP", "*", "0.20"]])
        monster_reset_buffs(state.farmer_side[i], 2); 
        monster.atb = 0;

        // reduce cooldowns
        var j;
        for (j = 0; j < monster.skill_cooldowns.length; j += 1) {
            monster.skill_cooldowns[j] = Math.max(0, monster.skill_cooldowns[j] - 1)
        }
    }
}

function has_elemental_advantage (monster, target) {
    "use strict";
    if (monster.attribute === 1 && target.attribute === 2) return 1;
    if (monster.attribute === 2 && target.attribute === 3) return 1;
    if (monster.attribute === 3 && target.attribute === 1) return 1;
    if (monster.attribute === 1 && target.attribute === 3) return -1;
    if (monster.attribute === 2 && target.attribute === 1) return -1;
    if (monster.attribute === 3 && target.attribute === 2) return -1;

    if (monster.attribute === 4 && target.attribute === 5) return 1;
    if (monster.attribute === 5 && target.attribute === 4) return 1;
    
    return 0;
}

function monster_take_damage(monster, damage) {
    "use strict";
    var shield = get_buff(monster, "SHIELD");
    var i;

    if (!!shield) {
        var shield_value = shield[2];
        var shield_buff_index = get_buff_index(monster, "SHIELD");

        shield_value -= damage;

        if (shield_value > 0) {
            monster.buffs[shield_buff_index][2] = shield_value;
            return {is_fatal_blow: false, damage_dealt: 0};
        }

        else {
            monster.buffs.splice(shield_buff_index, 1)
            return monster_take_damage(monster, -shield_value);
        }
    }

    var is_fatal_blow;
    var damage_dealt;

    if (monster.currhp > damage) {
        monster.currhp -= damage;
        is_fatal_blow = false;
        damage_dealt = damage;

    }

    else {
        monster.currhp = 0;
        monster.is_dead = true;
        is_fatal_blow = true;
        damage_dealt = damage;
    }

    logger.add_debug_log(monster.name + " takes " + damage_dealt + " damage!");

    if (is_fatal_blow) {
        logger.add_debug_log(monster.name + " died!");
    }

    return {is_fatal_blow: is_fatal_blow, damage_dealt: damage_dealt};
}

// remember: single target
function monster_apply_effect (monster, target, state, skill_id, interaction, attack_result) {
    "use strict";
    var skill_index = get_skill_index(monster, skill_id);
    var effect_interactions = interaction[interaction.length - 1];

    var effect_index;
    for (effect_index = 0; effect_index < effect_interactions.length; effect_index += 1) {
        var effect_interaction = effect_interactions[effect_index];
        var effect_type = effect_interaction[0];
        // "DEBUFF", application range, debuff_name. chance, no. of turns
        if (effect_type === "DEBUFF") { // ["DEBUFF", "SINGLE", "DECREASEDEF", 50, 2] 

            // activation check
            var activation_chance = effect_interaction[3] + monster_skills[skill_id][2][monster.skill_cooldowns[skill_index]];
            if (Math.random() > activation_chance / 100) continue;

            // application check
            var application_failure_chance = Math.max(target.res - monster.acc, 15);
            if (Math.random() < application_failure_chance) continue;

            // application
            var effect = effect_interaction[2];
            var effect_duration = effect_interaction[4];

            var i = get_buff_index(target, effect);

            if (i === null) {
                target.buffs[target.buffs.length] = [effect, effect_duration];
            }

            else {
                target.buffs[i] = [effect, effect_duration];
            }
        }

        else if (effect_type === "HEAL") { //lifesteal and %hp heals
            var heal_targets;
            switch (effect_interaction[1]) {
                case "SELF":
                    heal_targets = [monster];
                    break;

                case "AOE":
                    heal_targets = [state[monster[side]]];
                    break;


            }

            var i;
            for (i = 0; i < heal_targets.length; i += 1) {
                var heal_target = heal_targets[i];
                var healing_multiplier_array = effect_interaction[2];
                var heal_amount = calculate_raw_damage(monster, heal_target, healing_multiplier_array, state, attack_result)
                monster_heal(heal_target, amount);
            }
        }   
    }   
}

function monster_reset_buffs (monster, buff_type) {
    // buff_type:
    // 0 - buffs only
    // 1 - debuffs only
    // 2 - both buffs and debuffs
    "use strict";
    var buff_list = ["COUNTER", "DEFEND", "ENDURE", "IMMUNITY", "INCREASEATK", "INCREASECRITRATE", "INCREASECRITRES", "INCREASEDEF", "INCREASESPD", "INVINCIBLE", "PROTECTSOUL", "RECOVERY", "REFLECTDMG", "REVENGE", "SHIELD"];
    var debuff_list = ["BLOCKEFFECT", "BOMB", "BRAND", "CONTINUOUSDMG", "DECREASEATK", "DECREASEDEF", "DECREASESPD", "DISTURBRECOVERY", "FREEZE", "GLANCING HIT", "OBLIVIOUS", "PROVOKE", "SILENCE", "SLEEP", "STUN"];
    var i;
    for (i = monster.buffs.length; i >= 0; i -= 1) {
        var buff_cat;
        var j;

        for (j = 0; j < buff_list.length; j += 1) {
            if (buff_list[j] === monster.buffs[i][0]) {
                buff_cat = 0;
                break;
            }
        }

        if (buff_cat === 0 && (buff_type === 0 || buff_type === 2)) {
            monster.buffs.splice(i, 1);
            continue;
        }

        for (j = 0; j < debuff_list.length; j += 1) {
            if (debuff_list[j] === monster.buffs[i][0]) {
                buff_cat = 1;
                break;
            }
        }

        if (buff_cat === 1 && (buff_type === 1 || buff_type === 2)) {
            monster.buffs.splice(i, 1);
            continue;
        }
    }    
}   

function monster_teamattack (monster, target, state, skill_id, interaction) {
    "use strict";
    var skill_index = get_skill_index(monster, skill_id);
    var skill_level = monster.skill_levels[skill_index];
    var bonus_skillup_damage = monster_skills[skill_id][1][monster.skill_level - 1];
    var multiplier_array = JSON.parse(SWData.skills[skill_id]["Damage"]);
    var attack_type;
    var attack_type_percent_multiplier;
    var advantage = has_elemental_advantage(monster, target);

    var raw_damage = calculate_raw_damage(monster, target, multiplier_array, state);
    console.log(raw_damage);
    var attribute_bonus_critrate = 15 * advantage;

    if (advantage === -1 && Math.random() < 0.45) {
        attack_type = "glancing";
        attack_type_percent_multiplier = 70;
    }

    else if (Math.random() < monster.critrate + attribute_bonus_critrate) {
        attack_type = "crit";
        attack_type_percent_multiplier = 100 + monster.critdmg;
    }

    else if (advantage === 1 && Math.random() < 0.3333) {
        attack_type = "crushing";
        attack_type_percent_multiplier = 130;
    } 
    else if (advantage === -1) {
        attack_type = "normal";
        attack_type_percent_multiplier = 85;
    }
    else {
        attack_type = "normal";
        attack_type_percent_multiplier = 100;
    }
    console.log(raw_damage, attack_type_percent_multiplier, bonus_skillup_damage);
    raw_damage = raw_damage * (attack_type_percent_multiplier + bonus_skillup_damage) / 100;
    var target_defense = target.def;
    var effective_damage = (1000 * raw_damage) / (3.5 * target_defense + 1140);
    console.log(effective_damage);
    // giving randomness multiplier to effective damage: 0.9 to 1.1
    effective_damage = ((Math.random() * 0.2) + 0.9) * effective_damage;
    console.log(effective_damage);

    var take_damage_result = monster_take_damage(target, effective_damage);

    var damage_object = {
        attacker: monster,
        defender: target,
        attack_type: attack_type,
        damage_dealt: take_damage_result.damage_dealt,

        is_fatal_blow: take_damage_result.is_fatal_blow
    }


    var potential_attackers = clone(state[monster.side].monsters);
    potential_attackers.splice(potential_attackers.indexOf(monster), 1);
    potential_attackers = potential_attackers.filter(has_not_died);

    var i = 0;
    console.log(interaction[2]);
    while (!potential_attackers || i < interaction[2]) {
        var choosen_monster_index = Math.floor(Math.random() * potential_attackers.length);
        var choosen_monster_skill_id = potential_attackers[choosen_monster_index].skill_list[0];
        monster_use_skill(potential_attackers[choosen_monster_index], state, choosen_monster_skill_id, target);
        potential_attackers.splice(choosen_monster_index, 1);
        i += 1;
    }



    return damage_object;
}

function monster_attack (monster, target, state, skill_id, interaction) { 
    // this is per single attack
    // returns an object
    "use strict";

    var skill_index;
    var i;

    for (i = 0; i < monster.skill_list.length; i += 1) {
        if (monster.skill_list[i]  === skill_id) {
            skill_index = i;
        }
    }
    var skill_level = monster.skill_levels[skill_index];
    var bonus_skillup_damage = monster_skills[skill_id][1][skill_level - 1];
    temp = monster_skills[skill_id];
    var multiplier_array = JSON.parse(SWData.skills[skill_id]["Damage"]);
    var attack_type;
    var attack_type_percent_multiplier;
    var advantage = has_elemental_advantage(monster, target); // -1, 0 or 1

    var raw_damage = calculate_raw_damage(monster, target, multiplier_array, state); // doesnt count skillups
    console.log(raw_damage);
    var attribute_bonus_critrate = 15 * advantage;

    if (advantage === -1 && Math.random() < 0.45) {
        attack_type = "glancing";
        attack_type_percent_multiplier = 70;
    }

    else if (Math.random() < monster.critrate + attribute_bonus_critrate) {
        attack_type = "crit";
        attack_type_percent_multiplier = 100 + monster.critdmg;
    }

    else if (advantage === 1 && Math.random() < 0.3333) {
        attack_type = "crushing";
        attack_type_percent_multiplier = 130;
    } 
    else if (advantage === -1) {
        attack_type = "normal";
        attack_type_percent_multiplier = 85;
    }
    else {
        attack_type = "normal";
        attack_type_percent_multiplier = 100;
    }

    raw_damage = raw_damage * (attack_type_percent_multiplier + bonus_skillup_damage) / 100;
    console.log(raw_damage);
    var target_defense = target.def;
    var effective_damage = (1000 * raw_damage) / (3.5 * target_defense + 1140);
    console.log(effective_damage);
    // giving randomness multiplier to effective damage: 0.9 to 1.1
    effective_damage = ((Math.random() * 0.2) + 0.9) * effective_damage;
    console.log(effective_damage);

    var take_damage_result = monster_take_damage(target, effective_damage);

    var damage_object = {
        attacker: monster,
        defender: target,
        attack_type: attack_type,
        damage_dealt: take_damage_result.damage_dealt,

        is_fatal_blow: take_damage_result.is_fatal_blow
    }

    return damage_object;
}

function monster_use_skill (monster, state, skill_id, optional_target) { 
    "use strict";
    // skill should be off cooldown
    var side = monster.side;
    var skill_data = monster_skills[skill_id][0];

    var interaction_number;
    var i;
    var attack_result = [];
    var target;
    for (interaction_number = 0; interaction_number < skill_data.length; interaction_number += 1) {
        var interaction = skill_data[interaction_number];
        // list of interactions:
        // ATTACK, BUFF, TEAMATTACK, DEBUFF, 
        // ["ATTACK", "SINGLE", ["HEAL", "SELF", "DAMAGE", 30]]
        if (interaction[0] === "ATTACK") {
            if (interaction[1] === "SINGLE") {
                target = optional_target || monster.target;
                logger.add_debug_log(monster.name + " uses " + SWData.skills[skill_id]["description_en"] + " on " + target.name);

                attack_result[attack_result.length] = monster_attack(monster, target, state, skill_id, interaction);
                monster_apply_effect(monster, target, state, skill_id, interaction, attack_result); 

            }
            else if (interaction[1] === "AOE") {
                for (i = 0; i < state[monster.opposing_side].monsters.length; i += 1) {
                    if (state[monster.opposing_side].monsters[i].is_dead === true) continue;

                    target = state[monster.opposing_side].monsters[i];
                    logger.add_debug_log(monster.name + " uses " + SWData.skills[skill_id]["description_en"] + " on " + target.name);

                    attack_result[attack_result.length] = monster_attack(monster, target, state, skill_id, interaction);
                    monster_apply_effect(monster, state, skill_id, interaction, attack_result); 

                } 
            }
            
        }

        else if (interaction[0] === "BUFF") {
            if (interaction[1] === "AOE") {
                for (i = 0; i < state[side].monsters.length; i += 1) {
                    if (state[side].monsters[i].is_dead === true) continue;

                    logger.add_debug_log(monster.name + " casts " + SWData.skills[skill_id]["description_en"] + " on all allies!");
                    monster_buff(monster, state[side].monsters[i], skill_id, interaction);
                }
            }
        }

        else if (interaction[0] === "TEAMATTACK") {
            if (interaction[1] === "SINGLE") {
                target = optional_target || monster.target;
                monster_teamattack(monster, target, state, skill_id, interaction);

                if (target.currhp <= 0) target.is_dead = true;
            }
        }
    }
}

function monster_take_turn (monster, state) {
    "use strict";
    var i;
    // if monster is cc'ed, reduce cooldowns of buffs and return



    // monster is not cc'ed
    // see which side the monster is on
    var allied_side = state[monster.side];
    var opposing_side = state[monster.opposing_side];
    
    // make sure monster's target exist and is alive
    if (!monster.target || monster.target.is_dead) {
        var targets = opposing_side.monsters.filter(has_not_died);
        monster.target = targets[Math.floor(Math.random() * targets.length)];
    }

    // get available skills to choose from
    var available_skills = [];
    for (i = 0; i < monster.skill_list.length; i += 1) {
        if (monster.skill_cooldowns[i] === 0) {
            available_skills[available_skills.length] = monster.skill_list[i];
        }
    }

    console.log(available_skills);
    console.log(monster.name);
    // choose skill - random as of now
    var selected_skill_index = Math.floor(Math.random() * available_skills.length);
    var selected_skill_id = available_skills[selected_skill_index];
    monster_use_skill(monster, state, selected_skill_id);

    // deal with monster cooldowns
    // reset the cooldown of skills used, and reduce cooldown of the rest of the skills by 1
    for (i = 0; i < monster.skill_cooldowns.length; i += 1) {
        if (monster.skill_list[i] === selected_skill_id) {
            monster.skill_cooldowns[i] = monster_skills[monster.skill_list[i]][3][monster.skill_levels[i]];
        }
        else {
            monster.skill_cooldowns[i] = Math.max(monster.skill_cooldowns[i] - 1, 0);
        }
    }

    // deal with monster atb
    monster.atb = 0;

    // buffs and debuffs to be added
}

function run_state (state) {
    "use strict";
    var winlose; 
    //win -> winlose = 1, 
    //lose -> winlose = 0
    while (winlose === undefined) {
        if ((state.scenario_side.monsters.every(has_died)) && state.scenario_side.monsters_remaining.length === 0) {
            winlose = 1;
            continue;
        }

        else if ((state.scenario_side.monsters.every(has_died)) && !!state.scenario_side.monsters_remaining) {
            get_next_wave(state);
            continue;
        }

        if (state.farmer_side.monsters.every(has_died)) {
            winlose = 0;
            continue;
        }



        // if a monster can move, move, and lower cooldowns
        var next_monster = get_next_monster(state);

        if (!!next_monster) {
            logger.add_debug_log("It is " + next_monster.name + "'s turn.");
            monster_take_turn(next_monster, state);
        }

        // gain (7% * spd) atb at end of turn
        var i;
        for (i = 0; i < state.farmer_side.monsters.length; i += 1) { 
            if (state.farmer_side.monsters[i] === next_monster) {
                continue;
            }
            state.farmer_side.monsters[i].atb += 0.07 * state.farmer_side.monsters[i].spd;
        }

        for (i = 0; i < state.scenario_side.monsters.length; i += 1) { 
            if (state.scenario_side.monsters[i] === next_monster) {
                continue;
            }
            state.scenario_side.monsters[i].atb += 0.07 * state.scenario_side.monsters[i].spd;
        }
    }
    logger.add_debug_log("winlose = " + winlose);
    return winlose; 
}

function get_value (id) {
    "use strict";
    var valueString = document.getElementById(id).value;

    if (/^[a-zA-Z-]+\S*[a-zA-z]+$/g.test(valueString)) {
        return valueString;
    }

    var value = valueString.split("+").reduce(function (x, y) {
        return parseInt(x) + parseInt(y);
    }, 0);

    return value;
}

function run_simulation() { //id, entry, level, star, hp, atk, def, spd, critrate, critdmg, 
    "use strict";
    var monster_name = get_value("monster-selector");
    if (get_value("monster-awakened-selector") === "yes") {
        monster_name += "_awakened";
    }
    var farmer_id = monster_id[monster_name];
    var monster_entry = SWData.mons[farmer_id];
    var monster_attribute_string = ["water", "fire", "wind", "light", "dark", "neutral"][monster_entry.attribute - 1];

    var monster_level = get_value("monster-level-input");
    var monster_star = get_value("monster-stars-input");
    var monster_basehp = get_value("monster-basehp");
    var monster_addhp = get_value("monster-addhp");
    var monster_baseatk = get_value("monster-baseatk");
    var monster_addatk = get_value("monster-addatk");
    var monster_basedef = get_value("monster-basedef");
    var monster_adddef = get_value("monster-adddef");
    var monster_basespd = get_value("monster-basespd");
    var monster_addspd = get_value("monster-addspd");
    var monster_critrate = get_value("monster-critrate");
    var monster_critdmg = get_value("monster-critdmg");
    var monster_res = get_value("monster-resist");
    var monster_acc = get_value("monster-accuracy");
    /*
    var glory_fire = get_value("glory-fire");
    var glory_water = get_value("glory-water");
    var glory_wind = get_value("glory-wind");
    var glory_light = get_value("glory-light");
    var glory_dark = get_value("glory-dark");
    */
    var glory_hp = get_value("glory-hp");
    var glory_atk = get_value("glory-attack");
    var glory_elematk = get_value("glory-" + monster_attribute_string);
    var glory_def = get_value("glory-defense");
    var glory_spd = get_value("glory-speed");
    var glory_critdmg = get_value("glory-critdamage");
    var skill_1_level = get_value("skill-1-level");
    var skill_2_level = get_value("skill-2-level");
    var skill_3_level = get_value("skill-3-level");
    var skill_4_level = get_value("skill-4-level");

    var farmer = {
        name: MONSTER_NAME,
        id: farmer_id,
        attribute: monster_entry.attribute,
        maxhp: monster_basehp * (100 + glory_hp) / 100 + monster_addhp,
        atk: monster_baseatk * (100 + glory_atk + glory_elematk) / 100 + monster_addatk,
        def: monster_basedef * (100 + glory_def) / 100 + monster_adddef,
        spd: monster_basespd * (100 + glory_spd) / 100 + monster_addspd,

        base_hp: monster_basehp,
        base_atk: monster_baseatk,
        base_def: monster_basedef,
        base_spd: monster_basespd,

        critrate: monster_critrate,
        critdmg: monster_critdmg + glory_critdmg,
        res: monster_res,
        acc: monster_acc,
        crit_damage_reduction: 0,

        skill_list: JSON.parse(monster_entry["base skill"]), // e.g. [2006, 2011]
        skill_levels: [skill_1_level, skill_2_level, skill_3_level, skill_4_level],

        side: "farmer_side",
        opposing_side: "scenario_side",
        position: 1

    };
    
    var scenario_name = get_value("map");
    var num_of_simulations = parseInt(get_value("number-of-sim-input"));
    if (!num_of_simulations || num_of_simulations < 0) {
        logger.log("Invalid number of simulations.");
        return;
    }

    var scenario_array = scenario[scenario_name];
    var battle_log = logger.add_battle_log(farmer.name);

    var i;
    var wins = 0;
    var total = 0;
    for (i = 0; i < num_of_simulations; i += 1) {
        logger.add_debug_log("Beginning simulation " + (i + 1));
        var state = new State(farmer, scenario_array);
        temp = state;
        wins += run_state(state);
        total += 1;
        battle_log = logger.update_battle_log(battle_log, wins, total);
    }
}

document.getElementById("start-button").addEventListener("click", run_simulation, false);
