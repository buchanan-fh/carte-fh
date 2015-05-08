liste_col=['#FFFFFF','#ED7B00','#ED0000','#0067ED','#6A6A6A','#339933','#E11C78','#ED3529'];
current_zone="";

nom_ope=["","Orange","SFR","Bouygues Telecom","Free","TDF","Towercast","Sté de Transport audiovisuel",
"EDF","RTE","SNCF Réseau","Direction Des Routes","SANEF","CEREMA","Réseau privé","Axione Limousin",
"IMTS","Altitude Infra.","17 Numérique","Axione","SARTEL","Eurek@","Medialys","NiverTel","Completel","SDNum","R'LAN",
"Net Aveyron","Cher haut débit","ADTIM","CG 39","Melis@","Net 55","SYSOCO","IRIS 64","HPN","Net 67","Sem@for",
"Bollore Telecom","Talco Languedoc","Alsatis Réseaux","Wizeo","REG.I.E.S","TMN","GRAM","Comm Infra. UK LTD",
"Global Connect","Decyben","e-tera","Gigalis","Optline service","Hub Telecom","Sat Consult","Net Bourgogne","CG 08",
"Nomotech","ATHD","Vaucluse numérique","Vannes agglo numérique","Tutor Calvados","Custom Connect MW B.V.",
"Net 48","Manche numérique","Armor connectic","ITAS TIM","Latent Networks","Station étrangère","Mediaserv","Digicel",
"CNES","SRR","Gouv. Polynésie française (DGEN)","Gouv. Nouvelle Calédonie (OPT)","Outremer Telecom",
"La Réunion numérique","Guyane Numérique","Dauphin Telecom","Martinique numérique","SPLANG","STOI","VITI SAS",
"PMT/Vodafone","WLL","BPT","SPM Telecom"];

nom_ope_leg=["","Orange","SFR","Bouygues Telecom","Free","TDF","Towercast","Sté de Transport<br>audiovisuel",
"EDF","RTE","SNCF Réseau","Direction Des<br>Routes","SANEF","CEREMA","Réseau privé","(19, 23, 87) Axione<br>Limousin",
"IMTS","(14, 31, 35, 61, 79,<br>85) Altitude Infra.","(17) 17 Numérique","(29) Axione","(72) SARTEL","(27) Eurek@","(45) Medialys",
"(58) NiverTel","Completel","(47) SDNum","R'LAN","(12) Net Aveyron","(18) Cher haut débit","(07, 26) ADTIM","(39) CG 39","(49) Melis@",
"(55) Net 55","SYSOCO","(64) IRIS 64","(65) HPN","(67) Net 67","(77) Sem@for","(86) Bollore Telecom","Talco Languedoc","Alsatis Réseaux",
"Wizeo","REG.I.E.S","(37) TMN","GRAM","Comm Infra. UK LTD","Global Connect","Decyben","e-tera","Gigalis","Optline service","Hub Telecom",
"Sat Consult","(21, 71, 89) Net Bourgogne","(08) CG 08","Nomotech","(03, 15, 43, 63) ATHD","(84) Vaucluse numérique",
"Vannes agglo numérique","(14) Tutor Calvados","Custom Connect MW B.V.","(48) Net 48","(50) Manche numérique","(22) Armor connectic",
"ITAS TIM","Latent Networks","Station étrangère","Mediaserv","Digicel","CNES","SRR","Gouv. Polynésie française (DGEN)",
"Gouv. Nouvelle Calédonie (OPT)","Outremer Telecom","La Réunion numérique","Guyane Numérique","Dauphin Telecom",
"Martinique numérique","SPLANG","STOI","VITI SAS","PMT/Vodafone","WLL","BPT","SPM Telecom"];

couleur_main_ope=[];
couleur_main_ope[0]=liste_col[0];
couleur_main_ope[1]=liste_col[1];
couleur_main_ope[2]=liste_col[2];
couleur_main_ope[3]=liste_col[3];
couleur_main_ope[4]=liste_col[4];
couleur_main_ope[73]=liste_col[6];
couleur_main_ope[68]=liste_col[7];
couleur_main_ope[70]=liste_col[2];
couleur_main_ope[84]=liste_col[1];

liste_ope_zones=[];
liste_ope_zones["fr_metro"]={nom_zone:"France métropolitaine", bounds:[[41,-5.7],[51.5,10]], main:[1,2,3,4], other:[5,6,7,8,9,10,11,12,13,24,16,26,33,39,40,41,42,44,45,46,47,60,65,48,49,50,51,52,
55,58,64,14,66,17,56,15,53,29,54,27,59,18,28,63,21,19,43,30,22,25,61,31,62,32,23,34,35,36,20,37,57,38]}
liste_ope_zones["fr_971"]={nom_zone:"Guadeloupe (971)", bounds:[[15.78,-61.9],[16.54,-60.9]], main:[1,73,68], other:[5,7,8,67,16,14]}
liste_ope_zones["fr_972"]={nom_zone:"Martinique (972)", bounds:[[14.35,-61.3],[14.9,-60.7]], main:[1,73,68], other:[5,7,67,16,14,77]}
liste_ope_zones["fr_973"]={nom_zone:"Guyane (973)", bounds:[[2,-54.7],[5.9,-51.4]], main:[1,73,68], other:[5,7,8,69,75,78]}
liste_ope_zones["fr_974"]={nom_zone:"La Réunion (974)", bounds:[[-21.43,55.15],[-20.83,55.9]], main:[1,70,73], other:[5,7,8,14,74,82]}
liste_ope_zones["fr_975"]={nom_zone:"Saint-Pierre-et-Miquelon (975)", bounds:[[46.72,-56.50],[47.17,-56.08]], main:[1,84], other:[5]}
liste_ope_zones["fr_976"]={nom_zone:"Mayotte (976)", bounds:[[-13.1,44.9],[-12.55,45.33]], main:[1,70,73], other:[5,8,79]}
liste_ope_zones["fr_9778"]={nom_zone:"Saint-Barthélemy (977)", bounds:[[17.87,-63.17],[18.13,-62.78]], main:[1,68], other:[5,7,76,14,66]}
liste_ope_zones["fr_986"]={nom_zone:"Wallis-et-Futuna (986)", bounds:[[-13.4,-176.3],[-13.17,-176.09]], main:[83], other:[]}
liste_ope_zones["fr_987"]={nom_zone:"Polynésie française (987)", bounds:[[-28,-155],[-7,-134]], main:[71,80,81], other:[]}
liste_ope_zones["fr_988"]={nom_zone:"Nouvelle-Calédonie (988)", bounds:[[-23,163.3],[-19.4,168.1]], main:[72], other:[]}

liste_ope={};
for(i=0;i<nom_ope.length+1;i++){
	if(i in couleur_main_ope){
		couleur_ope=couleur_main_ope[i];
	}else{
		couleur_ope=liste_col[5];
	}
	liste_ope[i]={name:nom_ope[i], name_leg:nom_ope_leg[i], color:couleur_ope};
}

function build_interface(zone,select_ope){
	document.getElementById('choix_zone').style.display='none';
	current_zone=zone;
	document.getElementById("nom_zone").innerHTML=liste_ope_zones[zone].nom_zone;
	var tab_main = document.getElementById("tab_ope_main");
	while (tab_main.firstChild) {
		tab_main.removeChild(tab_main.firstChild);
	}
	var tab_other = document.getElementById("tab_autres_ope");
	while (tab_other.firstChild) {
		tab_other.removeChild(tab_other.firstChild);
	}
	if(select_ope!==undefined){
		var tab_select_ope=select_ope.split("|");
	}
	for(i=0;i<liste_ope_zones[zone].main.length;++i){
		if(tab_select_ope===undefined || (tab_select_ope.indexOf(String(liste_ope_zones[zone].main[i]))>-1)){
			var init_state="checked";
		}else{
			var init_state="unchecked";
		}
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		td1.className="check_cell";
		td1.innerHTML="<input type=\"checkbox\" id=\"check_op_"+liste_ope_zones[zone].main[i]+"\" onclick=\"ajax()\" "+init_state+">";
		td2.innerHTML="<span class=\"leg\" style=\"color:"+liste_ope[liste_ope_zones[zone].main[i]].color+";\">&#x25FC;</span> "+liste_ope[liste_ope_zones[zone].main[i]].name_leg;
		tr.appendChild(td1);
		tr.appendChild(td2);
		document.getElementById("tab_ope_main").appendChild(tr);
	}
	for(i=0;i<liste_ope_zones[zone].other.length;++i){
		if(tab_select_ope===undefined || (tab_select_ope.indexOf(String(liste_ope_zones[zone].other[i]))>-1)){
			var init_state="checked";
		}else{
			var init_state="unchecked";
		}
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		td1.className="check_cell";
		td1.innerHTML="<input type=\"checkbox\" id=\"check_op_"+liste_ope_zones[zone].other[i]+"\" onclick=\"ajax()\" "+init_state+">";
		td2.innerHTML=liste_ope[liste_ope_zones[zone].other[i]].name_leg;
		tr.appendChild(td1);
		tr.appendChild(td2);
		document.getElementById("tab_autres_ope").appendChild(tr);
	}
	
	divs_ope=[];
	tabs_ope=[];
	rows_ope=[];
	while (la_div_ant.firstChild){
		la_div_ant.removeChild(la_div_ant.firstChild);
	}
	for(i=0;i<liste_ope_zones[zone].main.length;++i){
		divs_ope[liste_ope_zones[zone].main[i]]=document.createElement("div");
		tabs_ope[liste_ope_zones[zone].main[i]]=document.createElement("table");
		la_div_ant.appendChild(divs_ope[liste_ope_zones[zone].main[i]]);
	}
	for(i=0;i<liste_ope_zones[zone].other.length;++i){
		divs_ope[liste_ope_zones[zone].other[i]]=document.createElement("div");
		tabs_ope[liste_ope_zones[zone].other[i]]=document.createElement("table");
		la_div_ant.appendChild(divs_ope[liste_ope_zones[zone].other[i]]);
	}
	
	map.fitBounds(liste_ope_zones[zone].bounds);
}

function choix_zone(){
	if(document.getElementById('choix_zone').style.display=='block'){
		document.getElementById('choix_zone').style.display='none';
	}else{
		document.getElementById('choix_zone').style.display='block';
	}
}