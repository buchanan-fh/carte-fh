col_op=['#FFFFFF','#ED7B00','#ED0000','#0067ED','#6A6A6A','#339933'];
nom_ope=["","Orange","SFR","Bouygues Telecom","Free","TDF","Towercast","Sté de Transport audiovisuel","EDF","RTE","SNCF Réseau","Direction Des Routes","SANEF"];
nom_bande_pow={};
nom_bande_pow["1"]="Autre";nom_bande_pow["2"]="150 MHz";nom_bande_pow["4"]="450 MHz";nom_bande_pow["8"]="1,4 GHz";nom_bande_pow["16"]="4 GHz";nom_bande_pow["32"]="6 GHz";nom_bande_pow["64"]="8 GHz";nom_bande_pow["128"]="11 GHz";nom_bande_pow["256"]="13 GHz";
nom_bande_pow["512"]="14 GHz";nom_bande_pow["1024"]="18 GHz";nom_bande_pow["2048"]="23 GHz";nom_bande_pow["4096"]="26 GHz";nom_bande_pow["8192"]="32 GHz";nom_bande_pow["16384"]="38 GHz";nom_bande_pow["32768"]="70/80 GHz";
nom_syst=["FH","FH ABI","BLR 3 GHz"];
epaisseur=1;
fact_epaisseur=1;
dash_stat={};
dash_stat["5"]=[1,0];dash_stat["6"]=[1,3];dash_stat["9"]=[4,6];dash_stat["10"]=[1,3];
polylinesA=[];
marksA=[];
poly_du_sup=[];
hist_result=[];
hist_url=[];
ind_req=0;
nb_ope=12;
base_url="http://127.0.0.1:5723/";
//base_url="https://carte-fh.lafibre.info/";

la_div_globale = document.createElement("div");
la_div_ant = document.createElement("div");
la_div_support = document.createElement("div");
la_div_no_support = document.createElement("div");
la_div_globale.className="p_div_globale";
la_div_support.className="p_div";
la_div_ant.className="p_div";
divs_ope=[];
tabs_ope=[];
rows_ope=[];
la_div_ant.style.overflowY="auto";
la_div_ant.style.overflowX="hidden";
la_div_globale.appendChild(la_div_support)
la_div_globale.appendChild(la_div_ant)
la_div_globale.appendChild(la_div_no_support)
la_div_support.onmouseenter = function(e){
	for (var i=0; i<poly_du_sup.length; i++){
		poly_du_sup[i].setStyle({weight: 3.5});
	}
}
la_div_support.onmouseleave = function(e){
	for (var i=0; i<poly_du_sup.length; i++){
		poly_du_sup[i].setStyle({weight: fact_epaisseur*epaisseur});
	}
}

for(var i=1; i<=nb_ope; i++){
	divs_ope[i]=document.createElement("div");
	tabs_ope[i]=document.createElement("table");
	la_div_ant.appendChild(divs_ope[i]);
}

layer_osm = L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {	
	attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
	opacity: "0.7"
});
layer_arcgis = L.tileLayer( 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community',
	opacity: "1"
});
layer_arcgis_topo = L.tileLayer( 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Sources: Esri, HERE, DeLorme, TomTom, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), swisstopo, MapmyIndia, © OpenStreetMap contributors, and the GIS User Community',
	opacity: "1"
});
base_layers = {
	"OSM": layer_osm,
	"ESRI World Imagery": layer_arcgis,
	"ESRI World Topo": layer_arcgis_topo
};
map = L.map( 'map_canvas', {
    minZoom: 5,
	closePopupOnClick: false,
	layers: [layer_osm],
	zoomControl: false,
	keyboard: false
});
map.fitBounds([[41,-5.7],[51.5,10]]);
L.control.scale().addTo(map);
le_zoom_controle=L.control.zoom({position:"bottomleft"})
le_zoom_controle.addTo(map);
new L.Control.OSMGeocoder({
	collapsed: false,
	position: "bottomright",
	text: "Chercher..."
}).addTo(map);
le_controle=L.control.layers(base_layers);
le_controle.setPosition("bottomright");
le_controle.addTo(map);

map.on("baselayerchange", function(e){
	if(e._url=='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'){
		fact_epaisseur=1.5;
	}else{
		fact_epaisseur=1;
	}
	redraw("r"+ind_req);
});

oms = new OverlappingMarkerSpiderfier(map,{keepSpiderfied:true, nearbyDistance:10});
oms.addListener('click', function(marker){
	build_popup_mark_s(marker,false);
});

document.getElementById("zoom_level").innerHTML = "Zoom " + map.getZoom();
document.getElementById("date_select").innerHTML = "04/2015";

map.on('zoomend', function() {
		document.getElementById("zoom_level").innerHTML = "Zoom " + this.getZoom();
		if (map.getZoom()<=9) {
			epaisseur=1;
		} else if (map.getZoom()<=11) {
			epaisseur=1.25;
		} else {
			epaisseur=1.5;
		}
	});
map.on('moveend', function() {
	ajax();
	});
	
ajax();

function redraw(index_hist){
	document.getElementById("loading").style.backgroundColor = "orange";
	var time_start=Date.now();
	var l_result=JSON.parse(hist_result[index_hist]);
	var mark_aff=[];
	
	for (var i=marksA.length-1; i>=0; i--){
		var flag_keep=false;
		if (document.getElementById("check_supports").checked==true){
			if(("s"+marksA[i].dat.no_sup) in l_result.supports){
				marksA[i].dat.nb_ant=l_result.supports["s"+marksA[i].dat.no_sup].nb_ant;
				delete l_result.supports["s"+marksA[i].dat.no_sup]
				flag_keep=true;
			}
		}
		if(flag_keep==false){
			oms.removeMarker(marksA[i]);
			map.removeLayer(marksA[i]);
			marksA.splice(i,1);
		}
	}
	
	var pix_max=7;
	var pix_min=3;
	if(l_result.nb_ant_max!=l_result.nb_ant_min){
		var t_a=(pix_max-pix_min)/(l_result.nb_ant_max-l_result.nb_ant_min);
		var t_b=pix_min-t_a*l_result.nb_ant_min;
	}else{
		var t_a=0;
		var t_b=4;
	}
	if (document.getElementById("check_supports").checked==true){
		for(var property in l_result.supports){
			if(l_result.supports.hasOwnProperty(property)){
				var le_mark = L.circleMarker(l_result.supports[property].coords);
				le_mark["dat"]=l_result.supports[property]
				le_mark.dat["no_sup"]=property.substring(1);
				le_mark.on("popupclose", function(e){setTimeout(function(){close_popup_mark(e)},210);});
				marksA.push(le_mark);
				mark_aff.push(le_mark);
				oms.addMarker(le_mark);
			}
		}
		for (var i=marksA.length-1; i>=0; i--){
			marksA[i].setRadius(t_a*marksA[i].dat.nb_ant+t_b);
			marksA[i].setStyle({color:"#000000", weight:"1", opacity:"1", fillColor:col_op[marksA[i].dat.prop], fillOpacity:"1"})
		}
	}
	L.layerGroup(mark_aff).addTo(map);
	
	var poly_aff=[];
	for (var i=polylinesA.length-1; i>=0; i--){
		var flag_keep=false;
		if(polylinesA[i].dat.code_lien in l_result.liens){
			polylinesA[i].setStyle({dashArray: dash_stat[l_result.liens[polylinesA[i].dat.code_lien].stat]});
			delete l_result.liens[polylinesA[i].dat.code_lien]
			if(polylinesA[i].getPopup()==undefined){
				polylinesA[i].setStyle({weight: fact_epaisseur*epaisseur});
			}
			flag_keep=true
		}
		if(flag_keep==false){
			map.removeLayer(polylinesA[i]);
			polylinesA.splice(i,1);
		}
	}
	for (var code_lien in l_result.liens){
		if(l_result.liens.hasOwnProperty(code_lien)){
			var la_poly = L.polyline(l_result.liens[code_lien].coords,{weight: fact_epaisseur*epaisseur, color: col_op[Math.min(l_result.liens[code_lien].ope,5)], opacity: 1, dashArray: dash_stat[l_result.liens[code_lien].stat]});
			la_poly["dat"]=l_result.liens[code_lien];
			la_poly.dat["code_lien"]=code_lien;		
			la_poly.on("click", function(e){
				e.target.setStyle({weight: 3.5});
				if(e.target.getPopup()==undefined){
					build_popup_link(e);
				}else{
					e.target.getPopup().setLatLng(e.latlng)
				}
			});
			la_poly.on("popupclose", function(e){
				e.target.unbindPopup();
				e.target.setStyle({weight: fact_epaisseur*epaisseur});
			});
			la_poly.on("mouseover", function(e){
				if(e.target.getPopup()==undefined){
					e.target.setStyle({weight: 3.5});
					for (var k=0; k<e.target.dat.nos_ant.length; k++){
						div_ant=document.getElementById(e.target.dat.nos_ant[k])
						if(!(div_ant==null)){
							div_ant.style.backgroundColor=col_op[Math.min(e.target.dat.ope,5)];
							div_ant.style.color="white";
						}
					}
				}
			});
			la_poly.on("mouseout", function(e){
				if(e.target.getPopup()==undefined){
					e.target.setStyle({weight: fact_epaisseur*epaisseur});
					for (var k=0; k<e.target.dat.nos_ant.length; k++){
						div_ant=document.getElementById(e.target.dat.nos_ant[k])
						if(!(div_ant==null)){
							div_ant.style.backgroundColor="white";
							div_ant.style.color=col_op[Math.min(e.target.dat.ope,5)];
						}
					}
				}
			});
			polylinesA.push(la_poly);
			poly_aff.push(la_poly);
		}
	}
	L.layerGroup(poly_aff).addTo(map);

	flag_popup_found=false;
	for (var i=marksA.length-1; i>=0 && !flag_popup_found; i--){
		if(marksA[i].getPopup()!= undefined){
			if(marksA[i].getPopup().isOpen){
				flag_popup_found=true;
				build_popup_mark_s(marksA[i],true);
			}
		}
	}
	
	for (var i=polylinesA.length-1; i>=0; i--){
		polylinesA[i].bringToBack();
	}
	
	document.getElementById("aff_nb_liens").innerHTML = polylinesA.length + " liens affichés";
	document.getElementById("aff_nb_supports").innerHTML = marksA.length + " supports affichés";

	if(l_result.full==-1){
		document.getElementById("aff_restreint").innerHTML = "Erreur";
		document.getElementById("aff_restreint").style.color = "red";
	}else if(l_result.limitation_act==false){
		document.getElementById("aff_restreint").innerHTML = "Affichage complet";
		document.getElementById("aff_restreint").style.color = "green";
	}else if(l_result.limitation_act==true){
		document.getElementById("aff_restreint").innerHTML = "Affichage incomplet";
		document.getElementById("aff_restreint").style.color = "orange";
	}
	document.getElementById("loading").style.backgroundColor = "green";
	//console.log("tile: " + l_result.tile + " - PHP: " + l_result.ex_time + " ms - Client: " + (Date.now()-time_start).toString() + " ms");
}
	
function ajax(){
	document.getElementById("loading").style.backgroundColor = "orange";
	document.getElementById("controle_left").style.maxHeight=(document.documentElement.clientHeight - 110) + "px";
	document.getElementById("controle_right").style.maxHeight=(document.documentElement.clientHeight - 110) + "px";
	
    var url=build_url_liens();
	var key_hist=array_search(url,hist_url);
	if(key_hist!=false){
		redraw(key_hist);
	}else{
		ind_req+=1;
		if(Object.keys(hist_url).length>=4){
			var r_a_supp = Object.keys(hist_url).shift();
			delete hist_url[r_a_supp];
			delete hist_result[r_a_supp];
		}
		hist_url["r"+ind_req]=url;
		hist_result["r"+ind_req]="";
		var xhr=null;
		if (window.XMLHttpRequest) { 
			xhr = new XMLHttpRequest();
		}
		else if (window.ActiveXObject) 
		{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.onreadystatechange = function(){
			if (xhr.readyState==4){
				json_parse=JSON.parse(xhr.responseText);
				hist_result[json_parse.ind_req] = xhr.responseText;
				if(json_parse.ind_req==("r"+ind_req)){
					redraw("r"+ind_req);
				}
			}
		}
		xhr.open("GET", url + "&req=r" + ind_req, true);
		xhr.send(null);
	}
}
 
 function build_url_liens(){
	var op_liste=[];
	var bande_code=0;
	var status=0;
	var nb_limit=150;
	for(var i=1; i<=4; i++){
		if (document.getElementById("check_op_" + i).checked==true){op_liste.push(i);}
	}
	if (document.getElementById("check_op_autres").checked==true){
		for(var i=5; i<=nb_ope; i++){
			if (document.getElementById("check_op_" + i).checked==true){op_liste.push(i);}
		}
	}
	for(var i=0; i<16; i++){
		if (document.getElementById("check_bande_" + i).checked==true){bande_code+=Math.pow(2,i);}
	}
	if(document.getElementById("limit_600").checked==true){
		nb_limit=600
	}else if(document.getElementById("limit_300").checked==true){
		nb_limit=300
	}
	if (document.getElementById('check_non_act').checked==true){status+=8;}
	if (document.getElementById('check_act').checked==true){status+=4;}
	if (document.getElementById('check_singles').checked==true){status+=2;}
	if (document.getElementById('check_couples').checked==true){status+=1;}
	la_date=document.getElementById("date_select").innerHTML.split("/");
	la_date=la_date[1]+la_date[0];
	url = base_url + "liens.php?limit=" + nb_limit + "&op_liste=" + op_liste.join("|")  + "&bande_code=" + bande_code + "&status=" + status + "&zoom=" + map.getZoom() + "&west=" + map.getBounds().getWest() + "&east=" + map.getBounds().getEast() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth() + "&date=" + la_date;
	console.log(url);
	return url;
 }

function build_url_support(no_sup){
	var op_liste=[];
	var bande_code=0;
	var status=0;
	for(var i=1; i<=nb_ope; i++){
		if (document.getElementById("check_op_" + i).checked==true){op_liste.push(i);}
	}
	for(var i=0; i<16; i++){
		if (document.getElementById("check_bande_" + i).checked==true){bande_code+=Math.pow(2,i);}
	}
	if (document.getElementById('check_non_act').checked==true){status+=8;}
	if (document.getElementById('check_act').checked==true){status+=4;}
	if (document.getElementById('check_singles').checked==true){status+=2;}
	if (document.getElementById('check_couples').checked==true){status+=1;}
	la_date=document.getElementById("date_select").innerHTML.split("/");
	la_date=la_date[1]+la_date[0];
	url = base_url + "supports.php?no_sup=" + String(no_sup) + "&op_liste=" + op_liste.join("|") + "&bande_code=" + bande_code + "&status=" + status + "&date=" + la_date;
	//console.log(url);
	return url;
}

function build_popup_link(event){
	if (event.target.dat.syst==2){
		var texte_syst_bande=nom_syst[2];
	}else{
		var texte_bande="";
		var mark_bande=1;
		for(var i=0; i<16; i++){
			if(event.target.dat.band & mark_bande){
				if(texte_bande==""){
					texte_bande = nom_bande_pow[event.target.dat.band & mark_bande];
				}else{
					texte_bande += (" ou " + nom_bande_pow[event.target.dat.band & mark_bande]);
				}
			}
			mark_bande <<= 1;
		}
		var texte_syst_bande=nom_syst[event.target.dat.syst] + " " + texte_bande;
	}
	if (event.target.dat.stat & 8){
		texte_syst_bande += ", non activé";
	}
	if (event.target.dat.stat & 2){
		texte_syst_bande += ", non résolu";
	}
	var le_texte_popup="<b>" + texte_syst_bande + "</b><br>" + nom_ope[event.target.dat.ope] + "<br>" + event.target.dat.lon + "  km";
	event.target.bindPopup(le_texte_popup,{autoPan:false});
	event.target.openPopup(event.latlng);
}

function build_popup_mark_s(marker,isopen) {
    var xhr=null;
	var url=build_url_support(marker.dat.no_sup);
    if (window.XMLHttpRequest) { 
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) 
    {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function() {
		if (xhr.readyState==4){
			supports_t = xhr.responseText;
			build_popup_mark_s_2(marker,isopen);
		}
	};
    xhr.open("GET", url, true);
    xhr.send(null);
}

function build_popup_mark_s_2(marker,isopen){
	var s_result=JSON.parse(supports_t);
	poly_du_sup=[];
	for (var i=0; i<polylinesA.length; i++){
		if(polylinesA[i].dat.nos_sup.indexOf(parseInt(marker.dat.no_sup))>-1){
			poly_du_sup.push(polylinesA[i]);
		}
	}
	la_div_support.innerHTML= "<div class=\"p_titre\">" + s_result.type + "</div><div class=\"p_adresse\">" + s_result.adresse + "<br>" + s_result.c_post + " " + s_result.commune + "</div>";
	la_div_no_support.innerHTML="<div class=\"p_num_sup\">" + s_result.nom_prop + " ("+ s_result.no_sup + ")</div>";
	for(var i=1; i<=nb_ope; i++){
		rows_ope[i]=[];
		while (divs_ope[i].hasChildNodes()) {
			divs_ope[i].removeChild(divs_ope[i].lastChild);
		}
	}
	for(var i=0; i<s_result.antennes.length; i++){
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
		tr.style.color=col_op[Math.min(s_result.antennes[i][4],5)]
		if(s_result.antennes[i][3]==2){
			td1.innerHTML=nom_syst[s_result.antennes[i][3]];
		}else{
			td1.innerHTML=nom_syst[s_result.antennes[i][3]] + " " + nom_bande_pow[s_result.antennes[i][6]];
		}
		if(s_result.antennes[i][7] & 8){
			td1.innerHTML += ", non activé";
		}
		td1.className="td_syst";
		td2.innerHTML=s_result.antennes[i][5] + " m";
		td2.className="td_num";
		td3.innerHTML=s_result.antennes[i][2] + "°";
		td3.className="td_num";
		tr.ant_azimut=parseFloat(s_result.antennes[i][2]);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.id=s_result.antennes[i][0];
		tr["n_ope"]=s_result.antennes[i][4];
		tr.onmouseenter = function(e){
			for (var j=0; j<poly_du_sup.length; j++){
				if (poly_du_sup[j].dat.nos_ant.indexOf(parseInt(e.target.id))>-1){
					poly_du_sup[j].setStyle({weight: 3.5});
				}
			}
			e.target.style.backgroundColor=col_op[Math.min(e.target.n_ope,5)];
			e.target.style.color="white";
			if(e.target.ant_azimut<=80 || e.target.ant_azimut>=280){
				var popup_wraps=document.getElementsByClassName("leaflet-popup-content-wrapper");
				for(var k=0; k<popup_wraps.length; k++){
					popup_wraps[k].style.background = "rgba(255, 255, 255, 0.55)";
				}
			}
		}
		tr.onmouseleave = function(e){
			for (var k=0; k<poly_du_sup.length; k++){
				poly_du_sup[k].setStyle({weight: fact_epaisseur*epaisseur});
			}
			e.target.style.backgroundColor="transparent";
			e.target.style.color=col_op[Math.min(e.target.n_ope,5)];
			if(e.target.ant_azimut<=80 || e.target.ant_azimut>=280){
				var popup_wraps=document.getElementsByClassName("leaflet-popup-content-wrapper");
				for(var k=0; k<popup_wraps.length; k++){
					popup_wraps[k].style.background = "white";
				}
			}
		}
		rows_ope[s_result.antennes[i][4]].push(tr);
	}
	for(var i=1; i<=nb_ope; i++){
		if(rows_ope[i].length>0){
			divs_ope[i].innerHTML="<div class=\"p_titre\">"+nom_ope[i]+" ("+ rows_ope[i].length +")</div>";
			divs_ope[i].className="p_div";
			tabs_ope[i].innerHTML="";
			tabs_ope[i].className="t_ant";
			for(var j=0; j<rows_ope[i].length; j++){
				tabs_ope[i].appendChild(rows_ope[i][j]);
			}
			divs_ope[i].appendChild(tabs_ope[i]);
		}
	}
	la_div_ant.style.maxHeight=String(parseInt(document.documentElement.clientHeight*0.4))+"px";
	if(!isopen){
		marker.bindPopup(la_div_globale,{autoPan:false});
		marker.openPopup();
	}
}

function close_popup_mark(event){
	for (var i=0; i<poly_du_sup.length; i++){
		if(poly_du_sup[i].getPopup()==undefined){
			poly_du_sup[i].setStyle({weight: fact_epaisseur*epaisseur});
		}
	}
	event.target.unbindPopup();
}

function check_all_bandes(){
	for(var i=0; i<16; i++){
		document.getElementById("check_bande_" + i).checked=true;
	}
	ajax()
}
function check_no_bande(){
	for(var i=0; i<16; i++){
		document.getElementById("check_bande_" + i).checked=false;
	}
	ajax()
}

function check_all_autres_op(){
	for(var i=5; i<=nb_ope; i++){
		document.getElementById("check_op_" + i).checked=true;
	}
	ajax()
}
function check_no_autre_op(){
	for(var i=5; i<=nb_ope; i++){
		document.getElementById("check_op_" + i).checked=false;
	}
	ajax()
}

function date_moins(){
	le_mois=document.getElementById("date_select").innerHTML.split("/")[0];
	l_annee=document.getElementById("date_select").innerHTML.split("/")[1];
	if(le_mois=="01"){
		le_mois="12";
		l_annee=parseInt(l_annee) - 1;
	}else{
		if(le_mois<11){
			le_mois= "0" + (parseInt(le_mois)-1);
		}else{
			le_mois=parseInt(le_mois) - 1;
		}
	}
	document.getElementById("button_plus").disabled=false;
	if(le_mois=="01" && l_annee=="2015"){
		document.getElementById("button_moins").disabled=true;
	}
	document.getElementById("date_select").innerHTML=le_mois + "/" + l_annee;
	ajax();
}

function date_plus(){
	le_mois=document.getElementById("date_select").innerHTML.split("/")[0];
	l_annee=document.getElementById("date_select").innerHTML.split("/")[1];
	if(le_mois=="12"){
		le_mois="01";
		l_annee=parseInt(l_annee) + 1;
	}else{
		if(le_mois<9){
			le_mois= "0" + (parseInt(le_mois)+1);
		}else{
			le_mois=parseInt(le_mois) + 1;
		}
	}
	document.getElementById("button_moins").disabled=false;
	if(le_mois=="04" && l_annee=="2015"){
		document.getElementById("button_plus").disabled=true;
	}
	document.getElementById("date_select").innerHTML=le_mois + "/" + l_annee;
	ajax();
}

function affichage_credits(){
	if(document.getElementById('credits').style.display=='block'){
		document.getElementById('credits').style.display='none'
	}else{
		document.getElementById('credits').style.display='block'
	}
}

function touche_clavier(e){
	if(e.keyCode==37 && document.getElementById("button_moins").disabled==false){
		date_moins();
	}
	if(e.keyCode==39 && document.getElementById("button_plus").disabled==false){
		date_plus();
	}
}

function click_autres_ope(){
	if(document.getElementById("check_op_autres").checked==true){
		for(var i=5; i<=nb_ope; i++){
			document.getElementById("check_op_" + i).disabled=false;
		}
	}else{
		for(var i=5; i<=nb_ope; i++){
			document.getElementById("check_op_" + i).disabled=true;
		}
	}
	ajax()
}

function toggle_autres_ope(){
	if(document.getElementById("tab_autres_ope").style.display=="table"){
		document.getElementById("tab_autres_ope").style.display="none";
		document.getElementById("shortcut_autres_ope").style.display="none";
		document.getElementById("toggle_autres_op").innerHTML="+"
	}else{
		document.getElementById("tab_autres_ope").style.display="table";
		document.getElementById("shortcut_autres_ope").style.display="table";
		document.getElementById("shortcut_autres_ope").style.width="100%";
		document.getElementById("toggle_autres_op").innerHTML="-"
	}
}

function array_search(needle, haystack, argStrict) {
  //  discuss at: http://phpjs.org/functions/array_search/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  depends on: array
  //        test: skip
  //   example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'});
  //   returns 1: 'surname'
  //   example 2: ini_set('phpjs.return_phpjs_arrays', 'on');
  //   example 2: var ordered_arr = array({3:'value'}, {2:'value'}, {'a':'value'}, {'b':'value'});
  //   example 2: var key = array_search(/val/g, ordered_arr); // or var key = ordered_arr.search(/val/g);
  //   returns 2: '3'

  var strict = !! argStrict,
    key = '';

  if (haystack && typeof haystack === 'object' && haystack.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
    return haystack.search(needle, argStrict);
  }
  if (typeof needle === 'object' && needle.exec) { // Duck-type for RegExp
    if (!strict) { // Let's consider case sensitive searches as strict
      var flags = 'i' + (needle.global ? 'g' : '') +
        (needle.multiline ? 'm' : '') +
        (needle.sticky ? 'y' : ''); // sticky is FF only
      needle = new RegExp(needle.source, flags);
    }
    for (key in haystack) {
      if (needle.test(haystack[key])) {
        return key;
      }
    }
    return false;
  }

  for (key in haystack) {
    if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
      return key;
    }
  }

  return false;
}