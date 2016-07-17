function show_loader () {
	document.getElementById("load-container").style.display = "block";
	document.getElementById("backdrop").style.display = "block";
}

function hide_loader () {
	document.getElementById("load-container").style.display = "none";
	document.getElementById("backdrop").style.display = "none";
}
function get_toggled_save_index () {
	var save_data_elements = document.getElementsByClassName("save-data");
	var i;
	for (i = 0; i < save_data_elements.length; i++) {
		var save_data_element = save_data_elements[i];
		if (save_data_element.getAttribute("data-save-toggle") === "true") {
			return i;
		}
	}
	return 0;
}

function populate_build_list () {
	if (!localStorage.builds || JSON.parse(localStorage.builds).length === 0) {
		return;
	}
	var save_data_list = document.getElementById("save-data-list");
	var builds = JSON.parse(localStorage.builds);
	var i;
	for (i = 0; i < builds.length; i++) {
		var list_element = document.createElement("li");
		list_element.setAttribute("class", "save-data");
		list_element.setAttribute("tabindex", "0");
		list_element.innerHTML = builds[i].name;
		list_element.addEventListener("click", select_build);
		save_data_list.appendChild(list_element);
	}
}

function save_build () {
	var save_data_index = get_toggled_save_index();
	if (save_data_index === 0) {
		var build = {};
		build.name = document.getElementById("build-name").value;
		build.monster_name = document.getElementById("monster-selector").value;
		build.monster_awaken = document.getElementById("monster-awakened-selector").value;
		build.monster_stars = document.getElementById("monster-stars-input").value;
		build.monster_level = document.getElementById("monster-level-input").value;
		build.basehp = document.getElementById("monster-basehp").value;
		build.addhp = document.getElementById("monster-addhp").value;
		build.critrate = document.getElementById("monster-critrate").value;
		build.baseatk = document.getElementById("monster-baseatk").value;
		build.addatk = document.getElementById("monster-addatk").value;
		build.critdmg = document.getElementById("monster-critdmg").value;
		build.basedef = document.getElementById("monster-basedef").value;
		build.adddef = document.getElementById("monster-adddef").value;
		build.resist = document.getElementById("monster-resist").value;
		build.basespd = document.getElementById("monster-basespd").value;
		build.addspd = document.getElementById("monster-addspd").value;
		build.accuracy = document.getElementById("monster-accuracy").value;
		build.set1 = document.getElementById("set1").value;
		build.set2 = document.getElementById("set2").value;
		build.set3 = document.getElementById("set3").value;
		build.skill_1_level = document.getElementById("skill-1-level").value;
		build.skill_2_level = document.getElementById("skill-2-level").value;
		build.skill_3_level = document.getElementById("skill-3-level").value;
		build.skill_4_level = document.getElementById("skill-4-level").value;
		build.glory_fire = document.getElementById("glory-fire").value;
		build.glory_hp = document.getElementById("glory-hp").value;
		build.glory_water = document.getElementById("glory-water").value;
		build.glory_attack = document.getElementById("glory-attack").value;
		build.glory_wind = document.getElementById("glory-wind").value;
		build.glory_defense = document.getElementById("glory-defense").value;
		build.glory_light = document.getElementById("glory-light").value;
		build.glory_speed = document.getElementById("glory-speed").value;
		build.glory_dark = document.getElementById("glory-dark").value;
		build.glory_critdamage = document.getElementById("glory-critdamage").value;

		if (!localStorage.builds) {
			localStorage.builds = "[]";
		}

		var builds = JSON.parse(localStorage.builds);
		builds[builds.length] = build;
		localStorage.builds = JSON.stringify(builds);

		var save_data_list = document.getElementById("save-data-list");
		var save_data_child = document.createElement("li");
		save_data_child.setAttribute("class", "save-data");
		save_data_child.setAttribute("tabindex", "0");
		save_data_child.innerText = build.name;
		save_data_child.addEventListener("click", select_build);
		save_data_list.appendChild(save_data_child);
		}

	else {
		var builds = JSON.parse(localStorage.builds);
		builds[save_data_index - 1].name = document.getElementById("build-name").value;
		localStorage.builds = JSON.stringify(builds);

		document.getElementsByClassName("save-data")[save_data_index].innerText = document.getElementById("build-name").value;
	}
}

function select_build () {
	var buildsArray = document.getElementsByClassName("save-data");
	var i;
	if (this !== window) {
		for (i = 0; i < buildsArray.length; i++) {
			if (buildsArray[i] === this) {
				buildsArray[i].style.backgroundColor = "#B8B8B8";
				buildsArray[i].setAttribute("data-save-toggle", "true");
			}
			else {
				buildsArray[i].style.backgroundColor = "";
				buildsArray[i].removeAttribute("data-save-toggle");
			}
		}
	}

	var index = get_toggled_save_index();
	var build;
	if (index === 0) {
		build = {};
		build.name = "";
		build.monster_name = document.getElementById("monster-selector").value;
		build.monster_awaken = document.getElementById("monster-awakened-selector").value;
		build.monster_stars = document.getElementById("monster-stars-input").value;
		build.monster_level = document.getElementById("monster-level-input").value;
		build.basehp = document.getElementById("monster-basehp").value;
		build.addhp = document.getElementById("monster-addhp").value;
		build.critrate = document.getElementById("monster-critrate").value;
		build.baseatk = document.getElementById("monster-baseatk").value;
		build.addatk = document.getElementById("monster-addatk").value;
		build.critdmg = document.getElementById("monster-critdmg").value;
		build.basedef = document.getElementById("monster-basedef").value;
		build.adddef = document.getElementById("monster-adddef").value;
		build.resist = document.getElementById("monster-resist").value;
		build.basespd = document.getElementById("monster-basespd").value;
		build.addspd = document.getElementById("monster-addspd").value;
		build.accuracy = document.getElementById("monster-accuracy").value;
		build.set1 = document.getElementById("set1").value;
		build.set2 = document.getElementById("set2").value;
		build.set3 = document.getElementById("set3").value;
		build.skill_1_level = document.getElementById("skill-1-level").value;
		build.skill_2_level = document.getElementById("skill-2-level").value;
		build.skill_3_level = document.getElementById("skill-3-level").value;
		build.skill_4_level = document.getElementById("skill-4-level").value;
		build.glory_fire = document.getElementById("glory-fire").value;
		build.glory_hp = document.getElementById("glory-hp").value;
		build.glory_water = document.getElementById("glory-water").value;
		build.glory_attack = document.getElementById("glory-attack").value;
		build.glory_wind = document.getElementById("glory-wind").value;
		build.glory_defense = document.getElementById("glory-defense").value;
		build.glory_light = document.getElementById("glory-light").value;
		build.glory_speed = document.getElementById("glory-speed").value;
		build.glory_dark = document.getElementById("glory-dark").value;
		build.glory_critdamage = document.getElementById("glory-critdamage").value;

		document.getElementById("build-name").value = "";

		document.getElementById("load-button").style.backgroundColor = "#E6E6E6";
		document.getElementById("load-button").style.borderColor = "#B8B8B8";

		document.getElementById("delete-button").style.display = "none";
	}

	else {
		build = JSON.parse(localStorage.builds)[index - 1];

		document.getElementById("build-name").value = build.name;

		document.getElementById("load-button").style.backgroundColor = "";
		document.getElementById("load-button").style.borderColor = "#4C2882";

		document.getElementById("delete-button").style.display = "";
	}

	var monster_portrait_location = "img/" + build.monster_name;
	if (build.monster_awaken === "yes") {
		monster_portrait_location += "-awakened";
	}
	monster_portrait_location += ".png";
	document.getElementById("load-monster-portrait").src = monster_portrait_location;
	
	var star_index;
	for (star_index = 1; star_index <= 6; star_index++) {
		var star = document.getElementsByClassName("portrait-star-" + star_index)[0];
		if (build.monster_stars >= star_index) {
			star.style.display = "";
		}
		else {
			star.style.display = "none";
		}
		if (build.monster_awaken === "yes") {
			star.src = "img/star-awakened.png";
		}
		else {
			star.src = "img/star-unawakened.png";
		}
	}

	document.getElementsByClassName("portrait-level")[0].innerHTML = build.monster_level;
	
	var monster_display_name;
	var option_monsters = document.getElementById("monster-selector").children;
	var j;
	for (j = 0; j < option_monsters.length; j++) {
		if (option_monsters[j].value === build.monster_name) {
			monster_display_name = option_monsters[j].innerHTML;
		}
	}
	/**
	if (build.monster_awaken === "yes") {
		monster_display_name.slice(monster_display_name.indexOf(","));
	}
	else {
		monster_display_name.slice(0, monster_display_name.indexOf(",") + 2);
	}
	**/
	document.getElementById("load-monster-name").innerHTML = monster_display_name;
	
	var sets = ["set1", "set2", "set3"];
	var sets_string = "";
	for (i = 0; i < sets.length; i++) {
		if (build[sets[i]] !== "") {
			var set_name = build[sets[i]];
			set_name = set_name.charAt(0).toUpperCase() + set_name.slice(1);
			sets_string += set_name + ", ";
		}
	}
	if (sets_string === "") {
		sets_string = "None";
	}

	else {
		sets_string = sets_string.slice(0, -2); //remove comma and space in front
	}
	document.getElementById("load-set-effects").innerText = sets_string;

	document.getElementById("load-basehp").innerText = build.basehp;
	document.getElementById("load-addhp").innerText = build.addhp;
	document.getElementById("load-critrate").innerText = build.critrate;
	document.getElementById("load-baseatk").innerText = build.baseatk;
	document.getElementById("load-addatk").innerText = build.addatk;
	document.getElementById("load-critdmg").innerText = build.critdmg;
	document.getElementById("load-basedef").innerText = build.basedef;
	document.getElementById("load-adddef").innerText = build.adddef;
	document.getElementById("load-resist").innerText = build.resist;
	document.getElementById("load-basespd").innerText = build.basespd;
	document.getElementById("load-addspd").innerText = build.addspd;
	document.getElementById("load-accuracy").innerText = build.accuracy;
	document.getElementById("load-skill-1-level").innerText = build.skill_1_level;
	document.getElementById("load-skill-2-level").innerText = build.skill_2_level;
	document.getElementById("load-skill-3-level").innerText = build.skill_3_level;
	document.getElementById("load-skill-4-level").innerText = build.skill_4_level;
	document.getElementById("load-glory-fire").innerText = build.glory_fire;
	document.getElementById("load-glory-hp").innerText = build.glory_hp;
	document.getElementById("load-glory-water").innerText = build.glory_water;
	document.getElementById("load-glory-attack").innerText = build.glory_attack;
	document.getElementById("load-glory-wind").innerText = build.glory_wind;
	document.getElementById("load-glory-defense").innerText = build.glory_defense;
	document.getElementById("load-glory-light").innerText = build.glory_light;
	document.getElementById("load-glory-speed").innerText = build.glory_speed;
	document.getElementById("load-glory-dark").innerText = build.glory_dark;
	document.getElementById("load-glory-critdamage").innerText = build.glory_critdamage;
}

function reset_load_display () {
	var buildsArray = document.getElementsByClassName("save-data");
	var i;
	buildsArray[0].style.backgroundColor = "#B8B8B8";
	buildsArray[0].setAttribute("data-save-toggle", "true");

	for (i = 1; i < buildsArray.length; i++) {
		buildsArray[i].style.backgroundColor = "";
		buildsArray[i].removeAttribute("data-save-toggle");
	}

	select_build();
}

function load_build () {
	var build_index = get_toggled_save_index() - 1;
	var build = JSON.parse(localStorage.builds)[build_index];

	document.getElementById("monster-selector").value = build.monster_name;
	document.getElementById("monster-awakened-selector").value = build.monster_awaken;
	document.getElementById("monster-stars-input").value = build.monster_stars;
	document.getElementById("monster-level-input").value = build.monster_level;
	monster_change();

	document.getElementById("monster-basehp").value = build.basehp;
	document.getElementById("monster-addhp").value = build.addhp;
	document.getElementById("monster-critrate").value = build.critrate;
	document.getElementById("monster-baseatk").value = build.baseatk;
	document.getElementById("monster-addatk").value = build.addatk;
	document.getElementById("monster-critdmg").value = build.critdmg;
	document.getElementById("monster-basedef").value = build.basedef;
	document.getElementById("monster-adddef").value = build.adddef;
	document.getElementById("monster-resist").value = build.resist;
	document.getElementById("monster-basespd").value = build.basespd;
	document.getElementById("monster-addspd").value = build.addspd;
	document.getElementById("monster-accuracy").value = build.accuracy;
	document.getElementById("set1").value = build.set1;
	document.getElementById("set2").value = build.set2;
	document.getElementById("set3").value = build.set3;
	document.getElementById("skill-1-level").value = build.skill_1_level;
	document.getElementById("skill-2-level").value = build.skill_2_level;
	document.getElementById("skill-3-level").value = build.skill_3_level;
	document.getElementById("skill-4-level").value = build.skill_4_level;
	document.getElementById("glory-fire").value = build.glory_fire;
	document.getElementById("glory-hp").value = build.glory_hp;
	document.getElementById("glory-water").value = build.glory_water;
	document.getElementById("glory-attack").value = build.glory_attack;
	document.getElementById("glory-wind").value = build.glory_wind;
	document.getElementById("glory-defense").value = build.glory_defense;
	document.getElementById("glory-light").value = build.glory_light;
	document.getElementById("glory-speed").value = build.glory_speed;
	document.getElementById("glory-dark").value = build.glory_dark;
	document.getElementById("glory-critdamage").value = build.glory_critdamage;

	hide_loader();
}

function delete_build () {
	var build_index = get_toggled_save_index();
	var previous_list_sibling = document.getElementsByClassName("save-data")[build_index - 1];

	previous_list_sibling.dispatchEvent(new Event("click"));

	document.getElementsByClassName("save-data")[build_index].remove();
	var builds = JSON.parse(localStorage.builds);
	builds.splice(build_index - 1, 1);
	localStorage.builds = JSON.stringify(builds);




}

function monster_change () {
    "use strict";
    var monster_name = document.getElementById("monster-selector").value;
    var has_awakened = document.getElementById("monster-awakened-selector").value;
    var img_src = "img/" + monster_name;

    if (has_awakened === "yes") {
        img_src += "-awakened";
    }
    img_src += ".png";

    document.getElementById("main-monster-portrait").src = img_src;

}

document.addEventListener("DOMContentLoaded", populate_build_list);
document.getElementById("load-save-btn").addEventListener("click", show_loader);
document.getElementById("load-save-btn").addEventListener("click", reset_load_display);
document.getElementById("load-container-header").addEventListener("click", hide_loader);
document.getElementById("cancel-button").addEventListener("click", hide_loader);
document.getElementById("load-button").addEventListener("click", load_build);
document.getElementById("save-button").addEventListener("click", save_build);
document.getElementById("delete-button").addEventListener("click", delete_build);
var builds_array = document.getElementsByClassName("save-data");
for (var i = 0; i < builds_array.length; i++) {
	builds_array[i].addEventListener("click", select_build);
}
document.getElementById("monster-selection").addEventListener("click", monster_change, false);
