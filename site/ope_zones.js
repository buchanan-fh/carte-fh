liste_col=['#FFFFFF','#ED7B00','#ED0000','#0067ED','#6A6A6A','#339933','#E11C78','#ED3529'];
current_zone="";

nature_support=[];nature_support["0"]="Sans nature";nature_support["40"]="Sémaphore";nature_support["41"]="Phare";nature_support["4"]="Château d'eau - réservoir";
nature_support["38"]="Immeuble";nature_support["39"]="Local technique";nature_support["42"]="Mât";nature_support["8"]="Intérieur galerie";nature_support["9"]="Intérieur sous-terrain";
nature_support["10"]="Tunnel";nature_support["11"]="Mât béton";nature_support["12"]="Mât métallique";nature_support["21"]="Pylône";nature_support["17"]="Bâtiment";
nature_support["19"]="Monument historique";nature_support["20"]="Monument religieux";nature_support["22"]="Pylône autoportant";nature_support["23"]="Pylône autostable";
nature_support["24"]="Pylône haubané";nature_support["25"]="Pylône treillis";nature_support["26"]="Pylône tubulaire";nature_support["31"]="Silo";nature_support["32"]="ouvrage d'art (pont, viaduc)";
nature_support["33"]="Tour hertzienne";nature_support["34"]="Dalle en béton";nature_support["999999999"]="Support non décrit";nature_support["43"]="Fût";
nature_support["44"]="Tour de contrôle";nature_support["45"]="Contre-poids au sol";nature_support["46"]="Contre-poids sur shelter";nature_support["47"]="Support DEFENSE";
nature_support["48"]="pylône arbre";nature_support["49"]="Ouvrage de signalisation (portique routier, panneau routier, panneau publicitaire)";nature_support["50"]="balise ou bouée";
nature_support["51"]="XXX";nature_support["52"]="Eolienne";

nom_exploit=[];
nom_exploit["149"]="AFRIPA Telecom";nom_exploit["2"]="Réseau privé";nom_exploit["3"]="ANFR / DTCG";nom_exploit["4"]="ARCEP";nom_exploit["5"]="DAPESID";nom_exploit["139"]="E*MESSAGE";
nom_exploit["150"]="MFS Communication";nom_exploit["127"]="DOLPHIN Telecom";nom_exploit["6"]="Bouygues Telecom";nom_exploit["9"]="CEREMA";nom_exploit["11"]="CNES";
nom_exploit["12"]="CSA";nom_exploit["13"]="DIRISI (Terre)";nom_exploit["14"]="DGA";nom_exploit["15"]="DGGN";nom_exploit["18"]="Intérieur";nom_exploit["140"]="BELGACOM ICS France";
nom_exploit["20"]="EMM";nom_exploit["21"]="Orange service fixe";nom_exploit["23"]="Orange";nom_exploit["26"]="Météo";nom_exploit["145"]="Completel";nom_exploit["28"]="Min. déf. / Div. technique";
nom_exploit["30"]="Radioastronomie";nom_exploit["141"]="ARQUIVA SAS";nom_exploit["38"]="STNA (Aviation civile)";nom_exploit["39"]="TDF";nom_exploit["16"]="TTOM";nom_exploit["142"]="LDCOM";
nom_exploit["129"]="INFOMOBILE";nom_exploit["130"]="Altitude Telecom";nom_exploit["131"]="SQUADRAN";nom_exploit["132"]="BLR Services";nom_exploit["133"]="9 Telecom Entreprise";
nom_exploit["136"]="LANDTEL";nom_exploit["137"]="SFR";nom_exploit["138"]="WLL";nom_exploit["143"]="DIRISI (Air)";nom_exploit["146"]="UPC";nom_exploit["147"]="Outremer Telecom";
nom_exploit["148"]="SPM Telecom";nom_exploit["151"]="Saint Martin Mobiles";nom_exploit["152"]="SKYBRIDGE";nom_exploit["153"]="Dauphin Telecom";nom_exploit["154"]="Mediaserv";
nom_exploit["155"]="DIRISI";nom_exploit["156"]="EXPERTMEDIA";nom_exploit["166"]="Gouv. Nouvelle Calédonie (OPT)";nom_exploit["167"]="Gouv. Polynésie française (DGEN)";
nom_exploit["168"]="HCR Nouvelle Calédonie";nom_exploit["169"]="HCR Polynésie";nom_exploit["170"]="Towercast";nom_exploit["160"]="OPTLiNE Service";nom_exploit["171"]="IMTS";
nom_exploit["172"]="GUYACOM";nom_exploit["179"]="Altitude Wireless";nom_exploit["180"]="Eurek@";nom_exploit["187"]="EUTELSAT";nom_exploit["191"]="Sem@for 77";nom_exploit["198"]="SDNUM";
nom_exploit["209"]="CG 64";nom_exploit["232"]="IMR Telecom";nom_exploit["233"]="NET Bourgogne";nom_exploit["236"]="REG.I.E.S.";nom_exploit["237"]="Ariège Telecom";nom_exploit["178"]="HDDR";
nom_exploit["161"]="GLOBECAST";nom_exploit["162"]="Digicel";nom_exploit["186"]="Melis@ territoires ruraux";nom_exploit["220"]="WizeO";nom_exploit["234"]="BT France";nom_exploit["174"]="TELOISE";
nom_exploit["175"]="CAP CONNEXION";nom_exploit["176"]="MEDIALYS";nom_exploit["177"]="IRIS 64";nom_exploit["181"]="17 numérique";nom_exploit["182"]="NIVERTEL";nom_exploit["185"]="TALCO Langudoc";
nom_exploit["216"]="RATP";nom_exploit["215"]="Direction des routes";nom_exploit["217"]="ONC";nom_exploit["218"]="Sté de transport audiovisuel";nom_exploit["219"]="Station étrangère";
nom_exploit["221"]="STOI";nom_exploit["229"]="Guadeloupe Téléphone Mobile";nom_exploit["230"]="Martinique Téléphone Mobile";nom_exploit["231"]="Guyane Téléphone Mobile";
nom_exploit["243"]="TMN (FH dépt 37)";nom_exploit["244"]="ADTIM (FH dépt 07, 26)";nom_exploit["245"]="HPN (FH dépt 65)";nom_exploit["158"]="IFW";nom_exploit["173"]="SHD";
nom_exploit["188"]="EADS Astrium";nom_exploit["207"]="Martinique numérique";nom_exploit["208"]="La Réunion numérique";nom_exploit["184"]="Bolloré Telecom";nom_exploit["210"]="Site privé";
nom_exploit["211"]="Société d'autoroute";nom_exploit["212"]="Télé analogique";nom_exploit["225"]="R'LAN";nom_exploit["214"]="TV ou radio étrangère";nom_exploit["239"]="Armor Connectic";
nom_exploit["242"]="Alsatis Réseaux";nom_exploit["190"]="Guyane numérique";nom_exploit["197"]="EMETTEL";nom_exploit["203"]="EDF";nom_exploit["206"]="SNCF";nom_exploit["238"]="Altitude Infra.";
nom_exploit["157"]="UTS Caraïbes";nom_exploit["201"]="NET 67";nom_exploit["193"]="SRR";nom_exploit["200"]="NET 55";nom_exploit["223"]="ITAS TIM";nom_exploit["228"]="BPT";nom_exploit["195"]="CG 39";
nom_exploit["227"]="TIKIPHONE";nom_exploit["194"]="NET Aveyron";nom_exploit["240"]="Free Mobile";nom_exploit["202"]="SNCF Réseau";nom_exploit["235"]="CS12";nom_exploit["199"]="Radioamateur";
nom_exploit["205"]="ONECAST";nom_exploit["189"]="Airbus";nom_exploit["163"]="AXIONE";nom_exploit["164"]="AXIONE Limousin";nom_exploit["165"]="SARTEL";nom_exploit["246"]="Viti SAS";
nom_exploit["262"]="Comm Infra. UK LTD";nom_exploit["264"]="Vaucluse numérique";nom_exploit["258"]="Gigalis";nom_exploit["252"]="BJT Partners";nom_exploit["253"]="SYSOCO";
nom_exploit["266"]="GLOBALTEL";nom_exploit["251"]="e-tera";nom_exploit["260"]="Custom Connect MW B.V.";nom_exploit["267"]="PMT/Vodafone";nom_exploit["249"]="Hub Telecom";nom_exploit["265"]="RTE";
nom_exploit["269"]="SPLANG";nom_exploit["271"]="ATHD";nom_exploit["254"]="GRAM";nom_exploit["261"]="Global Connect";nom_exploit["247"]="Melis@ exploitation";nom_exploit["259"]="Decyben";
nom_exploit["248"]="SAT Consult";nom_exploit["256"]="SANEF";nom_exploit["257"]="NET 48";nom_exploit["263"]="Latent Networks";nom_exploit["250"]="NomoTech";nom_exploit["272"]="Vannes agglo numérique";
nom_exploit["268"]="Dassault aviation";nom_exploit["278"]="Telco OI";nom_exploit["273"]="CG 08";nom_exploit["274"]="Cher haut débit";nom_exploit["275"]="Manche numérique";
nom_exploit["276"]="Tutor Calvados";nom_exploit["277"]="McKay Brothers International";

couleur_main_ope=[];
couleur_main_ope[21]=liste_col[1];
couleur_main_ope[23]=liste_col[1];
couleur_main_ope[148]=liste_col[1];
couleur_main_ope[137]=liste_col[2];
couleur_main_ope[193]=liste_col[2];
couleur_main_ope[6]=liste_col[3];
couleur_main_ope[158]=liste_col[4];
couleur_main_ope[240]=liste_col[4];
couleur_main_ope[147]=liste_col[6];
couleur_main_ope[278]=liste_col[6];
couleur_main_ope[162]=liste_col[7];
couleur_main_ope[267]=liste_col[7];

couleur_proprio=[];
couleur_proprio[4]=liste_col[3];
couleur_proprio[16]=liste_col[1];
couleur_proprio[21]=liste_col[1];
couleur_proprio[27]=liste_col[2];
couleur_proprio[31]=liste_col[2];
couleur_proprio[42]=liste_col[4];
couleur_proprio[44]=liste_col[6];
couleur_proprio[51]=liste_col[7];
couleur_proprio[66]=liste_col[6];

liste_reg_mod=[
	{name:"Orange",short_name:"Orange",no_expl:[21,23],color:liste_col[1]},
	{name:"Free",short_name:"Free",no_expl:[158,240],color:liste_col[4]},
	{name:"(14, 31, 35, 61, 79,<br>85) Altitude Infra.",no_expl:[238]},
	{name:"(03, 15, 43, 63) ATHD",no_expl:[271]},
	{name:"(19, 23, 87) Axione<br>Limousin",no_expl:[164]},
	{name:"(21, 71, 89) Net Bourgogne",no_expl:[233]},
	{name:"(07, 26) ADTIM",no_expl:[244]},
	{name:"(08) CG 08",no_expl:[273]},
	{name:"(12) Net Aveyron",no_expl:[194]},
	{name:"(14) Tutor Calvados",no_expl:[276]},
	{name:"(17) 17 numérique",no_expl:[181]},
	{name:"(18) Cher haut débit",no_expl:[274]},
	{name:"(22) Armor connectic",no_expl:[239]},
	{name:"(27) Eurek@",no_expl:[180]},
	{name:"(29) Axione",no_expl:[163]},
	{name:"(37) TMN",no_expl:[243]},
	{name:"(39) CG 39",no_expl:[195]},
	{name:"(45) Medialys",no_expl:[176]},
	{name:"(47) SDNum",no_expl:[198]},
	{name:"(48) Net 48",no_expl:[257]},
	{name:"(49) Melis@",no_expl:[186,247]},
	{name:"(50) Manche numérique",no_expl:[275]},
	{name:"(55) Net 55",no_expl:[200]},
	{name:"(58) NiverTel",no_expl:[182]},
	{name:"(64) IRIS 64",no_expl:[177]},
	{name:"(65) HPN",no_expl:[245]},
	{name:"(67) Net 67",no_expl:[201]},
	{name:"(72) SARTEL",no_expl:[165]},
	{name:"(77) Sem@for",no_expl:[191]},
	{name:"(84) Vaucluse numérique",no_expl:[264]},
	{name:"(86) Bolloré Telecom",no_expl:[184]},
	{name:"Direction des<br>routes",no_expl:[215]},
	{name:"Sté de transport<br>audiovisuel",no_expl:[218]}
];

tab_ope_ID=[];
liste_ope=[];
for(var l_reg_mod in liste_reg_mod){
	obj_ope={};
	obj_ope.name=liste_reg_mod[l_reg_mod].short_name || nom_exploit[liste_reg_mod[l_reg_mod].no_expl[0]];
	obj_ope.leg_name=liste_reg_mod[l_reg_mod].name;
	obj_ope.color=liste_reg_mod[l_reg_mod].color || couleur_main_ope[liste_reg_mod[l_reg_mod].no_expl[0]] || liste_col[5];
	obj_ope.no_expl=liste_reg_mod[l_reg_mod].no_expl;
	ope_ID=liste_reg_mod[l_reg_mod].no_expl.sort().join("_");
	for(var i in liste_reg_mod[l_reg_mod].no_expl){
		tab_ope_ID[liste_reg_mod[l_reg_mod].no_expl[i]]=ope_ID;
	}
	liste_ope[ope_ID]=obj_ope;
}
for(var no_expl in nom_exploit){
	if(!(no_expl in tab_ope_ID)){
		obj_ope={};
		obj_ope.name=nom_exploit[no_expl];
		obj_ope.leg_name=obj_ope.name;
		obj_ope.color=couleur_main_ope[no_expl] || liste_col[5];
		obj_ope.no_expl=[];
		obj_ope.no_expl.push(no_expl);
		ope_ID=no_expl.toString();
		tab_ope_ID[no_expl]=ope_ID;
		liste_ope[ope_ID]=obj_ope;
	}
}

liste_proprio=[]
for(i=0;i<67;i++){
	if(i in couleur_proprio){
		liste_proprio[i]={color:couleur_proprio[i]};
	}else{
		liste_proprio[i]={color:liste_col[0]};
	}
}

liste_ope_zones=[];
liste_ope_zones["fr_metro"]={nom_zone:"France métropolitaine", bounds:[[41,-5.7],[51.5,10]], main:["21_23","137","6","158_240"],
	other:["39","170","218","203","265","202","215","256","9","26","145","171","225","253","185","242","220","236","254","262","261","259",
			"260","263","277","251","258","160","249","248","250","272","223","2","219","238","271","164","233","244","273","194","276","181",
			"274","239","180","163","243","195","176","198","257","186_247","275","200","182","177","245","201","165","191","264","184"]};
liste_ope_zones["fr_971"]={nom_zone:"Guadeloupe (971)", bounds:[[15.78,-61.9],[16.54,-60.9]], main:["21_23","147","162"], other:["39","218","203","154","171","2"]};
liste_ope_zones["fr_972"]={nom_zone:"Martinique (972)", bounds:[[14.35,-61.3],[14.9,-60.7]], main:["21_23","147","162"], other:["39","218","154","171","207","2"]};
liste_ope_zones["fr_973"]={nom_zone:"Guyane (973)", bounds:[[2,-54.7],[5.9,-51.4]], main:["21_23","147","162"], other:["39","218","203","11","190","269"]};
liste_ope_zones["fr_974"]={nom_zone:"La Réunion (974)", bounds:[[-21.43,55.15],[-20.83,55.9]], main:["21_23","193","147","278"], other:["39","218","203","208","138","2"]};
liste_ope_zones["fr_975"]={nom_zone:"Saint-Pierre-et-Miquelon (975)", bounds:[[46.72,-56.50],[47.17,-56.08]], main:["21_23","148"], other:["39"]};
liste_ope_zones["fr_976"]={nom_zone:"Mayotte (976)", bounds:[[-13.1,44.9],[-12.55,45.33]], main:["21_23","193","147","278"], other:["39","203","221","252"]};
liste_ope_zones["fr_9778"]={nom_zone:"Saint-Barthélemy (977)/Saint-Martin (978)", bounds:[[17.87,-63.17],[18.13,-62.78]], main:["21_23","162"], other:["39","218","153","2","219"]};
liste_ope_zones["fr_986"]={nom_zone:"Wallis-et-Futuna (986)", bounds:[[-13.4,-176.3],[-13.17,-176.09]], main:["228"], other:[]};
liste_ope_zones["fr_987"]={nom_zone:"Polynésie française (987)", bounds:[[-28,-155],[-7,-134]], main:["167","246","267"], other:[]};
liste_ope_zones["fr_988"]={nom_zone:"Nouvelle-Calédonie (988)", bounds:[[-23,163.3],[-19.4,168.1]], main:["166"], other:[]};

function build_interface(fit,zone,select_ope){
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
		var tab_select_ID=tab_select_ope.map(function(no_ope){
			return tab_ope_ID[no_ope];
		})
	}
	for(i=0;i<liste_ope_zones[zone].main.length;++i){
		if(tab_select_ope===undefined || (tab_select_ID.indexOf(liste_ope_zones[zone].main[i])>-1)){
			var init_state="checked";
		}else{
			var init_state="unchecked";
		}
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		td1.className="check_cell";
		td1.innerHTML="<input type=\"checkbox\" id=\"check_op_"+liste_ope_zones[zone].main[i]+"\" onclick=\"ajax()\" "+init_state+">";
		td2.innerHTML="<span class=\"leg\" style=\"color:"+liste_ope[liste_ope_zones[zone].main[i]].color+";\">&#x25FC;</span> "+liste_ope[liste_ope_zones[zone].main[i]].leg_name;
		tr.appendChild(td1);
		tr.appendChild(td2);
		document.getElementById("tab_ope_main").appendChild(tr);
	}
	document.getElementById("check_op_autres").checked=true;
	for(i=0;i<liste_ope_zones[zone].other.length;++i){
		if(tab_select_ope===undefined || (tab_select_ID.indexOf(liste_ope_zones[zone].other[i])>-1)){
			var init_state="checked";
		}else{
			var init_state="unchecked";
		}
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		td1.className="check_cell";
		td1.innerHTML="<input type=\"checkbox\" id=\"check_op_"+liste_ope_zones[zone].other[i]+"\" onclick=\"ajax()\" "+init_state+">";
		td2.innerHTML=liste_ope[liste_ope_zones[zone].other[i]].leg_name;
		tr.appendChild(td1);
		tr.appendChild(td2);
		document.getElementById("tab_autres_ope").appendChild(tr);
	}
	divs_ope=[];
	tabs_ope=[];
	rows_ope=[];
	d_divs_ope=[];
	d_tabs_ope=[];
	d_rows_ope=[];
	while (la_div_ant.firstChild){
		la_div_ant.removeChild(la_div_ant.firstChild);
	}
	while (d_div_ant.firstChild){
		d_div_ant.removeChild(d_div_ant.firstChild);
	}
	for(i=0;i<liste_ope_zones[zone].main.length;++i){
		divs_ope[liste_ope_zones[zone].main[i]]=document.createElement("div");
		tabs_ope[liste_ope_zones[zone].main[i]]=document.createElement("table");
		la_div_ant.appendChild(divs_ope[liste_ope_zones[zone].main[i]]);
		d_divs_ope[liste_ope_zones[zone].main[i]]=document.createElement("div");
		d_tabs_ope[liste_ope_zones[zone].main[i]]=document.createElement("table");
		d_div_ant.appendChild(d_divs_ope[liste_ope_zones[zone].main[i]]);
	}
	for(i=0;i<liste_ope_zones[zone].other.length;++i){
		divs_ope[liste_ope_zones[zone].other[i]]=document.createElement("div");
		tabs_ope[liste_ope_zones[zone].other[i]]=document.createElement("table");
		la_div_ant.appendChild(divs_ope[liste_ope_zones[zone].other[i]]);
		d_divs_ope[liste_ope_zones[zone].other[i]]=document.createElement("div");
		d_tabs_ope[liste_ope_zones[zone].other[i]]=document.createElement("table");
		d_div_ant.appendChild(d_divs_ope[liste_ope_zones[zone].other[i]]);
	}
	if(fit){
		map.fitBounds(liste_ope_zones[zone].bounds);
	}
}

function auto_build_interface(map_bounds){
	var overlapped_zones=[];
	for(var zone in liste_ope_zones){
		if(liste_ope_zones.hasOwnProperty(zone)){
			if(overlap(liste_ope_zones[zone].bounds,map_bounds)){
				overlapped_zones.push(zone);
			}
		}
	}
	if(overlapped_zones.length==1 && current_zone!=overlapped_zones[0]){
		build_interface(false,overlapped_zones[0]);
	}
}

function choix_zone(){
	if(document.getElementById('choix_zone').style.display=='block'){
		document.getElementById('choix_zone').style.display='none';
	}else{
		document.getElementById('choix_zone').style.display='block';
	}
}

function overlap(z,m_bounds){
	var m=[[m_bounds.getSouthWest().lat,m_bounds.getSouthWest().lng],[m_bounds.getNorthEast().lat,m_bounds.getNorthEast().lng]];
	var separe=(z[0][1]>m[1][1])||(z[1][1]<m[0][1])||(z[0][0]>m[1][0])||(z[1][0]<m[0][0]);
	return(!separe)
}