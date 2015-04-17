col_op=['#ED7B00','#ED0000','#0067ED','#6A6A6A'];
col_op_pow={};
col_op_pow["1"]='#FFFFFF';col_op_pow["2"]='#ED7B00';col_op_pow["4"]='#ED0000';col_op_pow["8"]='#0067ED';col_op_pow["16"]='#6A6A6A';
nom_ope=["Orange","SFR","Bouygues Telecom","Free"];
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
//base_url="http://127.0.0.1:5723/";
base_url="https://carte-fh.lafibre.info/";

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

for(var i=0; i<4; i++){
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
base_layers = {
	"OSM": layer_osm,
	"ESRI World Imagery": layer_arcgis
};
map = L.map( 'map_canvas', {
    minZoom: 5,
	closePopupOnClick: false,
	layers: [layer_osm],
	zoomControl: false
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
	redraw(0);
});

oms = new OverlappingMarkerSpiderfier(map,{keepSpiderfied:true, nearbyDistance:10});
oms.addListener('click', function(marker) {
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
			marksA[i].setStyle({color:"#000000", weight:"1", opacity:"1", fillColor:col_op_pow[Math.pow(2,marksA[i].dat.prop)], fillOpacity:"1"})
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
			var la_poly = L.polyline(l_result.liens[code_lien].coords,{weight: fact_epaisseur*epaisseur, color: col_op[l_result.liens[code_lien].ope], opacity: 1, dashArray: dash_stat[l_result.liens[code_lien].stat]});
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
							div_ant.style.backgroundColor=col_op[e.target.dat.ope];
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
							div_ant.style.color=col_op[e.target.dat.ope];
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
	
	document.getElementById("aff_restreint").style.fontWeight = "bold";
	document.getElementById("aff_restreint").style.fontSize = "17px"
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
	if(hist_url.indexOf(url)>-1){
		redraw(hist_url.indexOf(url));
	}else{
		if(hist_url.length>=3){
			hist_url.pop();
			hist_result.pop();
		}
		hist_url.unshift(url);
		hist_result.unshift("");
		var xhr=null;
		if (window.XMLHttpRequest) { 
			xhr = new XMLHttpRequest();
		}
		else if (window.ActiveXObject) 
		{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState==4){
				hist_result[0] = xhr.responseText;
				redraw(0);
			}
		};
		xhr.open("GET", url, true);
		xhr.send(null);
	}
}
 
 function build_url_liens(){
	var op_code=0;
	var bande_code=0;
	var status=0;
	var nb_limit=150;
	for(var i=0; i<4; i++){
		if (document.getElementById("check_op_" + i).checked==true){op_code+=Math.pow(2,i);}
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
	url = base_url + "liens.php?limit=" + nb_limit + "&op_code=" + op_code + "&bande_code=" + bande_code + "&status=" + status + "&zoom=" + map.getZoom() + "&west=" + map.getBounds().getWest() + "&east=" + map.getBounds().getEast() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth() + "&date=" + la_date;
	//console.log(url);
	return url;
 }

function build_url_support(no_sup){
	var op_code=0;
	var bande_code=0;
	var status=0;
	for(var i=0; i<4; i++){
		if (document.getElementById("check_op_" + i).checked==true){op_code+=Math.pow(2,i+1);}
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
	url = base_url + "supports.php?no_sup=" + String(no_sup) + "&op_code=" + op_code + "&bande_code=" + bande_code + "&status=" + status + "&date=" + la_date;
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
	for(var i=0; i<4; i++){
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
		tr.style.color=col_op_pow[s_result.antennes[i][4]]
		tr.style.backgroundColor="white"
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
			e.target.style.backgroundColor=col_op_pow[e.target.n_ope];
			e.target.style.color="white";
			if(e.target.ant_azimut<=80 || e.target.ant_azimut>=280){
				var popup_wraps=document.getElementsByClassName("leaflet-popup-content-wrapper");
				for(var k=0; k<popup_wraps.length; k++){
					popup_wraps[k].style.opacity="0.55";
				}
			}
		}
		tr.onmouseleave = function(e){
			for (var k=0; k<poly_du_sup.length; k++){
				poly_du_sup[k].setStyle({weight: fact_epaisseur*epaisseur});
			}
			e.target.style.backgroundColor="white";
			e.target.style.color=col_op_pow[e.target.n_ope];
			if(e.target.ant_azimut<=80 || e.target.ant_azimut>=280){
				var popup_wraps=document.getElementsByClassName("leaflet-popup-content-wrapper");
				for(var k=0; k<popup_wraps.length; k++){
					popup_wraps[k].style.opacity="1";
				}
			}
		}
		rows_ope[Math.log(s_result.antennes[i][4])/Math.log(2)-1].push(tr);
	}
	for(var i=0; i<4; i++){
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

function date_moins(){
	le_mois=document.getElementById("date_select").innerHTML.split("/")[0];
	l_annee=document.getElementById("date_select").innerHTML.split("/")[1];
	if(l_annee>2015 || (l_annee==2015 && le_mois>01)){
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
		document.getElementById("date_select").innerHTML=le_mois + "/" + l_annee;
		ajax();
	}
}

function date_plus(){
	le_mois=document.getElementById("date_select").innerHTML.split("/")[0];
	l_annee=document.getElementById("date_select").innerHTML.split("/")[1];
	if(l_annee<2015 || (l_annee==2015 && le_mois<04)){
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
		document.getElementById("date_select").innerHTML=le_mois + "/" + l_annee;
		ajax();
	}
}

function affichage_credits(){
	if(document.getElementById('credits').style.display=='block'){
		document.getElementById('credits').style.display='none'
	}else{
		document.getElementById('credits').style.display='block'
	}
}
