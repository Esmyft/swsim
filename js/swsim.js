/*jslint browser:true */
"use strict";

//// Start of fundamental functions 

// function to allow comparison between Arrays
function array_equals(array1, array2) {
    // if the other array is a falsy value, return
    if (typeof array1 !== "array" || typeof array2 !== "array")
        return false;

    // compare lengths - can save a lot of time 
    if (array1.length !== array2.length)
        return false;

    var i;
    for (i = 0; i < array1.length; i++) {
        // Check if we have nested arrays
        if (array1[i] instanceof Array && array1[i] instanceof Array) {
            // recurse into the nested arrays
            if (!array_equals(array1[i], array2[i]))
                return false;
        }           
        else if (array1[i] != array2[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}

function array_has(array, el) {
    var i;
    for (i = 0; i < array.length; i++) {
        if (array[i] === el || array_equals(array[i], el)) {
            return true;
        }
    }
    return false;
}

function capitalise (string) {
    var words = string.split(/[\s-]+/);
    var i;
    for (i = 0; i < words.length; i += 1) {
        var word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1); 
    }
    return words.join(" ");
}

//// End of fundamental functions

//// Start of simulator functions
var temp;

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

var scenario = {  //name, base_monster_id, attribute, con, atk, def, spd, resist, class, unit_level
    "faimon-1-normal": [
        [[1, 1, 1, 1], [1, 1, 1, 1], [2, 2, 3, 2, 2]],
        [["sieq", 10602, 2, 175, 285, 160, 109, 18, 2, 27], ["raoq", 11002, 2, 235, 258, 198, 107, 18, 2, 27]],
        [["sieq", 10602, 2, 213, 349, 196, 109, 18, 3, 28], ["raoq", 11002, 2, 288, 315, 242, 107, 18, 3, 28]],
        [["sieq_awakened", 10612, 2, 267, 528, 261, 121, 21, 3, 28]]
    ],

    "faimon-1-hard": [
        [[1, 1, 1, 1], [1, 1, 1, 1], [2, 2, 3, 2, 2]],
        [["sieq", 10602, 2, 282, 460, 260, 119, 21, 3, 33], ["raoq", 11002, 2, 379, 415, 319, 117, 21, 3, 33]],
        [["sieq", 10602, 2, 340, 554, 313, 119, 21, 4, 34], ["raoq", 11002, 2, 456, 501, 385, 117, 21, 4, 34]],
        [["sieq_awakened", 10612, 2, 413, 816, 402, 132, 24, 4, 34]]
    ],

    "faimon-1-hard":[
        [[1, 1, 1, 1], [1, 1, 1, 1], [2, 2, 3, 2, 2]],
        [["sieq", 10602, 2, 433, 707, 400, 130, 24, 4, 40], ["raoq", 11002, 2, 582, 640, 491, 128, 24, 4, 40]],
        [["sieq", 10602, 2, 531, 865, 488, 130, 24, 5, 40], ["raoq", 11002, 2, 712, 782, 600, 128, 24, 5, 40]],
        [["sieq_awakened", 10612, 2, 792, 1563, 771, 143, 27, 6, 40]]
    ]
};

var logger = {
    document_fragment: document.createDocumentFragment(),
    get options () {
        return {
            show_battle_log: document.getElementById("battle-log-checkbox").checked,
            show_status_log: document.getElementById("status-log-checkbox").checked,
        };
    },
    add_result_log: function (monster_name, scenario_name) {
        "use strict";
        var result_log = {monster_name: monster_name, map: map, wins: 0, total: 0};
        document.getElementById("result-farmer").innerHTML = monster_name;
        document.getElementById("result-map").innerHTML = scenario_name;
        document.getElementById("result-wins").innerHTML = 0;
        document.getElementById("result-battles").innerHTML = 0;

        return result_log;
    },
    update_result_log: function (result_log, wins, total) {
        "use strict";
        result_log.wins = wins;
        result_log.total = total;

        document.getElementById("result-wins").innerHTML = result_log.wins;
        document.getElementById("result-battles").innerHTML = result_log.total;

        return result_log;
    },
    add_battle_log: function (string) {
        "use strict";
        var battle_log_div = document.createElement("div");
        battle_log_div.className = "battle-entry log-entry";
        battle_log_div.innerHTML = string;

        if (this.options.show_battle_log) {
            this.document_fragment.appendChild(battle_log_div);
        }
        return battle_log_div;
    },
    add_error_log: function (string) {
        "use strict";
        var error_log_div = document.createElement("div");
        error_log_div.className = "error-entry log-entry";
        error_log_div.innerHTML = string;
        this.document_fragment.appendChild(error_log_div);
        this.append_document_fragment();

        error_log_div.scrollIntoView();
        return error_log_div;
    },
    append_document_fragment: function () {
        "use strict";
        document.getElementById("log-container").appendChild(this.document_fragment);
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
            if (el !== "target") {
                copy[el] = clone(obj[el]);
            }
        });
        return copy;
    }

    logger.add_error_log("Error in cloning." + obj);
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

function get_skill_cooldowns (monster_data) {
    "use strict";
    var id = monster_data[1];
    var skill_list = JSON.parse(SWData.mons[id]["base skill"]);
    var skill_cooldowns = [];
    var i;

    for (i = 0; i < skill_list.length; i += 1) {
        var skill_level = 1;
        var skill_id = skill_list[i];   
        skill_cooldowns[skill_cooldowns.length] = monster_skills[skill_id][3][skill_level - 1];
    }

    return skill_cooldowns;
}

function apply_leader_skill (leader, monster) { // example: lapis: [17001, 0, 0, 2, 0.25] verde: [13003, 2, 0, 4, 0.28]
    var id = leader.id;
    var leader_skill = JSON.parse(SWData.mons[id]["leader skill"]);
    var leader_skill_limitation = leader_skill[1];
    var leader_skill_attribute = leader_skill[2];
    var leader_skill_type_index = leader_skill[3];

    // check that leader skill either applies everywhere (0) or in scenario only (2)
    if (leader_skill_limitation !== 0 && leader_skill_limitation !== 2) return;

    // check that leader skill either applies to every attribute or to monster's attribute
    if (leader_skill_attribute !== 0 && leader_skill_attribute !== monster.attribute) return;

    var base_stat = ["", "base_hp", "base_atk", "base_def", "base_spd", "critrate", "critdmg", "res", "acc"][leader_skill_type_index];
    var final_stat = ["", "maxhp", "atk", "def", "spd", "critrate", "critdmg", "res", "acc"][leader_skill_type_index];
    var leader_skill_value = leader_skill[4];

    if (leader_skill_type_index <= 4) {
        monster[final_stat] += monster[base_stat] * leader_skill_value;
    }

    else {
        monster[final_stat] = Math.min(100, monster[final_stat] + 100 * leader_skill_value);
    }
}

function monster_passive_filter (skill_array) {
    "use strict";
    var passive_list = [2012];
    var separated = [[],[]];
    var skills = separated[0];
    var passives = separated[1];

    var i;
    for (i = 0; i < skill_array.length; i += 1) {
        
        if (array_has(passive_list, skill_array[i])) {
            passives[passives.length] = skill_array[i];
        }

        else {
            skills[skills.length] = skill_array[i];
        }
    }

    return separated;
}

function create_scenario_monster (monster_data, position) {
    //monster_data is array
    //name, attribute, con, atk, def, spd, resist, class, unit_level
    "use strict";
    var id = monster_id[monster_data[0]];
    var entry = SWData.mons[id];
    var separated_skill_passive = monster_passive_filter(JSON.parse(entry["base skill"]));
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
        skill_list: separated_skill_passive[0],
        skill_levels: [1, 1, 1, 1],
        skill_cooldowns: get_skill_cooldowns(monster_data), 

        is_dead: false,
        passives: separated_skill_passive[1],
        status: {},
        atb: 0,

        side: "scenario_side",
        opposing_side: "farmer_side",
        position: position,
        posname: monster_data[0] + "(" + position + ")"
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
            monsters_remaining[wave - 1][position] = create_scenario_monster(chosen_monster_data, position);
        }

    }
    return {monsters: monsters, monsters_remaining: monsters_remaining, passives: []};
} 

function State (farmer, scenario) {
    // typeof farmer === object , typeof scenario === arrays (waves) of arrays (random monster list, monster position, fixed monster list)
    "use strict";
    this.farmerInstance = clone(farmer);
    this.farmerInstance.currhp = this.farmerInstance.maxhp;
    this.farmerInstance.is_dead = false;
    this.farmerInstance.passives = [];
    this.farmerInstance.status = {};
    this.farmerInstance.atb = 0;
    this.farmerInstance.skill_cooldowns = [];
    this.farmerInstance.target = null;

    apply_leader_skill(this.farmerInstance, this.farmerInstance);
    var i;
    for (i = 0; i < this.farmerInstance.skill_list.length; i += 1) {
        var skill_number = this.farmerInstance.skill_list[i].toString();
        this.farmerInstance.skill_cooldowns[i] = 0;
    }

    this.farmer_side = {monsters: [this.farmerInstance], team_passives: []}; //team_passives is for passive skills and effects such as defend
    this.scenario_side = create_scenario(scenario); //{monsters, monsters_remaining, team_passives}
    this.wave = 1;
}

function has_died (monster) {
    "use strict";
    if (monster.currhp <= 0) {
        monster.is_dead = true;
        monster.currhp = 0;
    }

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
    monster_list = monster_list.filter(has_not_died);

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
    if (typeof multiplier_array === "number") {
        return multiplier_array;
    }

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
        else if (multiplier_array === "ATTACK_WIZARD_LIFE_RATE") return state[monster.side][monsters].filter(has_not_died).length / state[monster.side][monsters].length;
        else if (multiplier_array === "DAMAGE_DEALT") return attack_result["damage_dealt"];
        
        else if (parseFloat(multiplier_array) !== NaN) return parseFloat(multiplier_array);
        //else if (multiplier_array === "DIE_RATE")
        //else if (multiplier_array === "LIFE_SHARE_ALL")
    }

    if (multiplier_array.length === 0) return 0;

    else if (multiplier_array[1] === "FIXED") multiplier_array.splice(1, 1);
    
    if (multiplier_array.length === 1) return calculate_raw_damage(monster, target, multiplier_array[0], state);

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
    logger.add_battle_log("Wave " + state.wave + " end");
    state.scenario_side.monsters = state.scenario_side.monsters_remaining.splice(0, 1)[0];
    var i;
    for (i = 0; i < state.farmer_side.monsters.length; i += 1) {
        var monster = state.farmer_side.monsters[i];
        // reset buffs, attack bar
        var heal_amount = calculate_raw_damage(null, monster, [["TARGET_TOT_HP", "*", 0.20]], state);
        monster_regain_hp(monster, heal_amount, "stage clear");
        monster_reset_buffs(monster, 2); 
        monster.atb = 0;

        // reduce cooldowns
        var j;
        for (j = 0; j < monster.skill_cooldowns.length; j += 1) {
            monster.skill_cooldowns[j] = Math.max(0, monster.skill_cooldowns[j] - 1)
        }
    }
    state.wave += 1;
    logger.add_battle_log("Wave " + state.wave);
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

function monster_take_damage (monster, damage) {
    "use strict";
    var shield = monster.status.shield ? monster.status.shield[1] : 0;
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

    logger.add_battle_log(monster.posname + " takes " + Math.round(damage_dealt) + " damage!");

    return {is_fatal_blow: is_fatal_blow, damage_dealt: damage_dealt};
}

function monster_regain_hp (monster, heal_amount, effect_name) {
    "use strict";
    var oldhp = monster.currhp;
    monster.currhp = Math.min(monster.currhp + heal_amount, monster.maxhp);
    var actual_heal_amount = monster.currhp - oldhp;
    logger.add_battle_log(monster.posname + " heals for " + Math.round(actual_heal_amount) + " due to " + effect_name);

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
            var effect = effect_interaction[2].toLowerCase();
            var effect_duration = effect_interaction[4];
            var effect_magnitude = effect_interaction[5];

            if (effect === "continuousdmg") {
                var dot_list = target.status[effect];
                dot_list[dot_list.length] = [effect_duration, monster, effect_magnitude];
            }

            else {
                if (target.status[effect][0] > effect_duration) continue;

                target.status[effect] = [effect_duration, monster, effect_magnitude];
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
    var buff_list = ["counter", "defend", "endure", "immunity", "increaseatk", "increasecritrate", "increasecritres", "increasedef", "increasespd", "invincible", "protectsoul", "recovery", "reflectdmg", "revenge", "shield"];
    var debuff_list = ["blockeffect", "bomb", "brand", "continuousdmg", "decreaseatk", "decreasedef", "decreasespd", "disturbrecovery", "freeze", "glancinghit", "oblivious", "provoke", "silence", "sleep", "stun"];
    var status = monster.status;
    var i;

    if (buff_type === 0 || buff_type === 2) {
        for (i = 0; i < buff_list.length; i += 1) {
            var buff_name = buff_list[i];
            status[buff_name] = null;
        }
    }

    if (buff_type === 1 || buff_type === 2) {
        for (i = 0; i < debuff_list.length; i += 1) {
            var debuff_name = debuff_list[i];
            status[debuff_name] = null;
        }
    }
}

function monster_teamattack (monster, target, state, skill_id, interaction) {
    "use strict";
    var skill_index = get_skill_index(monster, skill_id);
    var skill_level = monster.skill_levels[skill_index];
    var bonus_skillup_damage = monster_skills[skill_id][1][skill_level - 1];
    var multiplier_array = JSON.parse(SWData.skills[skill_id]["Damage"]);
    var attack_type;
    var attack_type_percent_multiplier;
    var advantage = has_elemental_advantage(monster, target);

    var raw_damage = calculate_raw_damage(monster, target, multiplier_array, state);
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
    var target_defense = target.def;
    var effective_damage = (1000 * raw_damage) / (3.5 * target_defense + 1140);
    // giving randomness multiplier to effective damage: 0.9 to 1.1
    effective_damage = ((Math.random() * 0.2) + 0.9) * effective_damage;

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
    while (potential_attackers.length > 0 && i < interaction[2]) {
        var choosen_monster_index = Math.floor(Math.random() * potential_attackers.length);
        var choosen_monster = potential_attackers[choosen_monster_index];
        var choosen_monster_skill_id = choosen_monster.skill_list[0];
        monster_use_skill(choosen_monster, state, choosen_monster_skill_id, target);
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
    var multiplier_array = JSON.parse(SWData.skills[skill_id]["Damage"]);
    var attack_type;
    var attack_type_percent_multiplier;
    var advantage = has_elemental_advantage(monster, target); // -1, 0 or 1

    var raw_damage = calculate_raw_damage(monster, target, multiplier_array, state); // doesnt count skillups
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
    var target_defense = target.def;
    var effective_damage = (1000 * raw_damage) / (3.5 * target_defense + 1140);
    // giving randomness multiplier to effective damage: 0.9 to 1.1
    effective_damage = ((Math.random() * 0.2) + 0.9) * effective_damage;

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

function monster_heal (monster, target, state, skill_id, interaction) {

}

function monster_use_skill (monster, state, skill_id, optional_target) { 
    "use strict";
    // skill should be off cooldown
    var side = monster.side;
    var skill_data = monster_skills[skill_id][0];

    var interaction_number;
    var i;
    var attack_results = [];
    var target;
    for (interaction_number = 0; interaction_number < skill_data.length; interaction_number += 1) {
        var interaction = skill_data[interaction_number];
        // list of interactions:
        // ATTACK, BUFF, TEAMATTACK, DEBUFF, 
        // ["ATTACK", "SINGLE", ["HEAL", "SELF", "DAMAGE", 30]]
        if (interaction[0] === "ATTACK") {
            if (interaction[1] === "SINGLE") {
                target = optional_target || monster.target;
                logger.add_battle_log(monster.posname + " uses " + SWData.skills[skill_id]["description_en"] + " on " + target.name + "(" + target.position + ")");

                var attack_result = monster_attack(monster, target, state, skill_id, interaction);
                attack_results[attack_results.length] = attack_result;

                monster_apply_effect(monster, target, state, skill_id, interaction, attack_result); 

            }
            else if (interaction[1] === "AOE") {
                logger.add_battle_log(monster.posname + " uses " + SWData.skills[skill_id]["description_en"] + " on opponent team!");
                for (i = 0; i < state[monster.opposing_side].monsters.length; i += 1) {
                    if (state[monster.opposing_side].monsters[i].is_dead) continue;

                    target = state[monster.opposing_side].monsters[i];

                    var attack_result = monster_attack(monster, target, state, skill_id, interaction);
                    attack_results[attack_results.length] = attack_result;
                    monster_apply_effect(monster, target, state, skill_id, interaction, attack_result); 

                } 
            }
            
        }

        else if (interaction[0] === "BUFF") {
            if (interaction[1] === "AOE") {
                for (i = 0; i < state[side].monsters.length; i += 1) {
                    if (state[side].monsters[i].is_dead === true) continue;

                    logger.add_battle_log(monster.posname + " casts " + SWData.skills[skill_id]["description_en"] + " on all allies!");
                    monster_buff(monster, state[side].monsters[i], skill_id, interaction);
                }
            }
        }

        else if (interaction[0] === "TEAMATTACK") {
            if (interaction[1] === "SINGLE") {
                target = optional_target || monster.target;
                logger.add_battle_log(monster.posname + " uses " + SWData.skills[skill_id]["description_en"] + " on " + target.posname);
                monster_teamattack(monster, target, state, skill_id, interaction);
            }
        }
    }

    var monsters_just_died = [];
    for (i = 0; i < attack_results.length; i += 1) {
        attack_result = attack_results[i];
        if (array_has(monsters_just_died, attack_result.defender)) continue;

        if (attack_result.is_fatal_blow) {
            monsters_just_died[monsters_just_died.length] = attack_result.defender;
            logger.add_battle_log(attack_result.defender.posname + " has died!");
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

    // deal with monster atb
    monster.atb = 0;

    // get available skills to choose from
    var available_skills = [];
    for (i = 0; i < monster.skill_list.length; i += 1) {
        if (monster.skill_cooldowns[i] === 0) {
            available_skills[available_skills.length] = monster.skill_list[i];
        }
    }

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

    // buffs and debuffs to be added
}

function run_state (state) {
    "use strict";
    var winlose; 
    logger.add_battle_log("Wave 1");
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
            logger.add_battle_log("It's " + next_monster.name + "(" + next_monster.position + ")'s turn.");
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

    if (winlose === 1) logger.add_battle_log("VICTORY");
    else logger.add_battle_log("SECOND PLACE");
    
    return winlose; 
}

function get_value (id, expected_type) {
    "use strict";
    var str = document.getElementById(id).value;

    //To check if value_string is indeed of expected_type
    if ((expected_type === "number" || expected_type === "integer") && !(!isNaN(parseFloat(str)) && isFinite(str))) {
        logger.add_error_log(str + " is not " + expected_type);
        return;
    }

    if (expected_type === "integer" && (parseInt(str) !== parseFloat(str))) {
        logger.add_error_log(str + " is not " + expected_type);
        return;
    }

    if (/^[a-zA-Z-]+\S*[a-zA-z]+$/g.test(str)) {
        return str;
    }

    var value = str.split("+").reduce(function (x, y) {
        return parseInt(x) + parseInt(y);
    }, 0);

    return value;
}

function run_simulation_outer (farmer, scenario_array, result_log, num_of_simulations) {
    var wins = 0;
    var total = 0;

    var run_simulation_inner = function () {
        if (total === num_of_simulations) {
            return;
        }

        if (total === 0) {
            result_log = logger.update_result_log(result_log, wins, total);
        }

        logger.add_battle_log("Beginning simulation " + (total + 1));
        var state = new State(farmer, scenario_array);
        wins += run_state(state);
        total += 1;


        if (total % 100 === 0 || total === num_of_simulations) {
            result_log = logger.update_result_log(result_log, wins, total);
            setTimeout(run_simulation_inner, 100);
            return;
        }

        run_simulation_inner();
    }
    return run_simulation_inner;
}

function run_simulation() { //id, entry, level, star, hp, atk, def, spd, critrate, critdmg, 
    "use strict";
    var monster_name = get_value("monster-selector", null);
    var proper_monster_name = capitalise(monster_name);
    if (get_value("monster-awakened-selector") === "yes") {
        monster_name += "_awakened";
    }
    var farmer_id = monster_id[monster_name];
    var monster_entry = SWData.mons[farmer_id];
    var monster_attribute_string = ["water", "fire", "wind", "light", "dark", "neutral"][monster_entry.attribute - 1];

    var monster_level = get_value("monster-level-input", "integer");
    var monster_star = get_value("monster-stars-input", "integer");
    var monster_basehp = get_value("monster-basehp", "number");
    var monster_addhp = get_value("monster-addhp", "number");
    var monster_baseatk = get_value("monster-baseatk", "number");
    var monster_addatk = get_value("monster-addatk", "number");
    var monster_basedef = get_value("monster-basedef", "number");
    var monster_adddef = get_value("monster-adddef", "number");
    var monster_basespd = get_value("monster-basespd", "number");
    var monster_addspd = get_value("monster-addspd", "number");
    var monster_critrate = get_value("monster-critrate", "number");
    var monster_critdmg = get_value("monster-critdmg", "number");
    var monster_res = get_value("monster-resist", "number");
    var monster_acc = get_value("monster-accuracy", "number");
    /*
    var glory_fire = get_value("glory-fire");
    var glory_water = get_value("glory-water");
    var glory_wind = get_value("glory-wind");
    var glory_light = get_value("glory-light");
    var glory_dark = get_value("glory-dark");
    */
    var glory_hp = get_value("glory-hp", "number");
    var glory_atk = get_value("glory-attack", "number");
    var glory_elematk = get_value("glory-" + monster_attribute_string, "number");
    var glory_def = get_value("glory-defense", "number");
    var glory_spd = get_value("glory-speed", "number");
    var glory_critdmg = get_value("glory-critdamage", "number");
    var skill_1_level = get_value("skill-1-level", "integer");
    var skill_2_level = get_value("skill-2-level", "integer");
    var skill_3_level = get_value("skill-3-level", "integer");
    var skill_4_level = get_value("skill-4-level", "integer");

    var all_input = [monster_name, monster_level, monster_star, monster_basehp, monster_addhp, monster_baseatk, monster_addatk, monster_basedef, monster_adddef, monster_basespd, monster_addspd, monster_critrate, monster_critdmg, monster_res, monster_acc, glory_hp, glory_atk, glory_elematk, glory_def, glory_spd, glory_critdmg, skill_1_level, skill_2_level, skill_3_level, skill_4_level];
    var i;
    for (i = 0; i < all_input.length; i += 1) {
        if (all_input[i] === null || all_input[i] === undefined || Number.isNaN(all_input[i])) {
            return;
        }
    }

    //logger.update_options();

    var farmer = {
        name: monster_name,
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
        position: 0,
        posname: monster_name + "(0)"

    };
    
    var scenario_name = get_value("map");

    var num_of_simulations = parseInt(get_value("number-of-sim-input", "number"));
    if (!num_of_simulations || num_of_simulations < 0) {
        logger.add_error_log("Invalid number of simulations.");
    }

    var scenario_array = scenario[scenario_name];
    var result_log = logger.add_result_log(proper_monster_name, capitalise(scenario_name));

    run_simulation_outer(farmer, scenario_array, result_log, num_of_simulations)();


        /**
        if (i % 100 === 99) {
            logger.append_document_fragment();
        }
        **/

    logger.append_document_fragment();

    var last_log = document.getElementById("log-container").lastElementChild;
    if (!!last_log) {
        last_log.scrollIntoView();
    }
}

document.getElementById("start-button").addEventListener("click", run_simulation, false);
