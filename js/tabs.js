function showLoader () {
	document.getElementById("load-container").style.display = "block";
	document.getElementById("backdrop").style.display = "block";
}

function hideLoader () {
	document.getElementById("load-container").style.display = "none";
	document.getElementById("backdrop").style.display = "none";
}

function saveBuild () {
	var build = {};
	build.monster_name - document.getElementById("monster-selector").value;
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

}

function selectBuild () {
	var buildsArray = document.getElementsByClassName("save-data");
	var i;
	for (i = 0; i < buildsArray.length; i++) {
		if (buildsArray[i] === this) {
			buildsArray[i].style.backgroundColor = "#B8B8B8";
		}
		else {
			buildsArray[i].style.backgroundColor = "";
		}
	}
	
}



document.getElementById("load-save-btn").addEventListener("click", showLoader);
document.getElementById("load-container-header").addEventListener("click", hideLoader);
document.getElementById("cancel-button").addEventListener("click", hideLoader);
document.getElementById("save-button").addEventListener("click", saveBuild);
var buildsArray = document.getElementsByClassName("save-data");
for (var i = 0; i < buildsArray.length; i++) {
	buildsArray[i].addEventListener("click", selectBuild);
}
