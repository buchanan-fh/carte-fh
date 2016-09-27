nom_bande_pow={};
nom_bande_pow["1"]="Autre";nom_bande_pow["2"]="150 MHz";nom_bande_pow["4"]="450 MHz";nom_bande_pow["8"]="1,4 GHz";nom_bande_pow["16"]="4 GHz";nom_bande_pow["32"]="6 GHz";nom_bande_pow["64"]="8 GHz";nom_bande_pow["128"]="11 GHz";nom_bande_pow["256"]="13 GHz";
nom_bande_pow["512"]="14 GHz";nom_bande_pow["1024"]="18 GHz";nom_bande_pow["2048"]="23 GHz";nom_bande_pow["4096"]="26 GHz";nom_bande_pow["8192"]="32 GHz";nom_bande_pow["16384"]="38 GHz";nom_bande_pow["32768"]="70/80 GHz";
freq_bande_pow={};
freq_bande_pow["2"]=150*Math.pow(10,6);freq_bande_pow["4"]=450*Math.pow(10,6);freq_bande_pow["8"]=1.4*Math.pow(10,9);freq_bande_pow["16"]=4*Math.pow(10,9);freq_bande_pow["32"]=6*Math.pow(10,9);freq_bande_pow["64"]=8*Math.pow(10,9);
freq_bande_pow["128"]=11*Math.pow(10,9);freq_bande_pow["256"]=13*Math.pow(10,9);freq_bande_pow["512"]=14*Math.pow(10,9);freq_bande_pow["1024"]=18*Math.pow(10,9);freq_bande_pow["2048"]=23*Math.pow(10,9);freq_bande_pow["4096"]=26*Math.pow(10,9);
freq_bande_pow["8192"]=32*Math.pow(10,9);freq_bande_pow["16384"]=38*Math.pow(10,9);freq_bande_pow["32768"]=75*Math.pow(10,9);
nom_syst=["FH","FH ABI","BLR 3 GHz"];
epaisseur_init=1.1;
fact_epaisseur=1;
dash_stat={};
dash_stat["5"]=[1,0];dash_stat["6"]=[1,3];dash_stat["9"]=[6,5];dash_stat["10"]=[1,3];
polylinesA=[];
marksA=[];
hist_result=[];
hist_url=[];
ind_req=0;
current_lim=300;
t_init=new Date().getTime();
first_announce=true;
var popup_to_draw;
var pwg_img_cat;
var pwg_img_tag;
var supports_du_popup=[];
var ope_du_popup;
var dir_popup;
opacite_lien_non_lie=0.22;
opacite_lien_meme_ope=0.6;
//base_url="https://carte-fh.lafibre.info/";
base_url="/";
piwigo_api_url="https://carte-fh.lafibre.info/galerie_photo/ws.php";

la_div_globale = document.createElement("div");
la_div_ant = document.createElement("div");
la_div_support = document.createElement("div");
la_div_titre = document.createElement("div");
la_div_adresse = document.createElement("div");
la_div_no_support = document.createElement("div");
img_photo = document.createElement("img");
la_div_globale.className="p_div_globale";
la_div_support.className="p_div clickable";
la_div_titre.className="p_titre";
la_div_adresse.className="p_adresse";
la_div_ant.className="p_div_ant";
la_div_no_support.className="p_num_sup clickable";
img_photo.id="p_photo_sup";
img_photo.className="clickable";
la_div_support.appendChild(la_div_titre);
la_div_support.appendChild(la_div_adresse);
la_div_support.appendChild(img_photo);
la_div_globale.appendChild(la_div_support);
la_div_globale.appendChild(la_div_ant);
la_div_globale.appendChild(la_div_no_support);
div_photo_large=document.getElementById("div_photo_large")
photo_large=document.getElementById("photo_large")
d_div = document.getElementById("detail_sup");
d_div_titre = document.getElementById("d_titre");
d_div_adresse = document.getElementById("d_adresse");
d_div_ant = document.getElementById("d_ant");
d_div_no_support = document.getElementById("d_num_sup");
d_div_link_to_sup = document.getElementById("d_link_to_sup");
d_img_link_galerie = document.getElementById("d_img_galerie");
d_div_link_galerie_2 = document.getElementById("d_link_galerie_2");
d_div_link_cartoradio = document.getElementById("d_link_cartoradio");
d_div_link_osm = document.getElementById("d_link_osm");
d_div_link_gmaps = document.getElementById("d_link_gmaps");

la_div_support.onmouseenter = function(e){
	e.target.marker.attached_links.map(function(poly){poly.setStyle({weight: 3.5})})
}
la_div_support.onmouseleave = function(e){
	e.target.marker.attached_links.map(function(poly){poly.setStyle({weight: fact_epaisseur*epaisseur})})
}
d_div_titre.onmouseenter = function(){
	d_poly_du_sup.map(function(poly){poly.setStyle({weight: 3.5})})
}
d_div_titre.onmouseleave = function(){
	d_poly_du_sup.map(function(poly){poly.setStyle({weight: fact_epaisseur*epaisseur})})
}
d_div_adresse.onmouseenter = function(){
	d_poly_du_sup.map(function(poly){poly.setStyle({weight: 3.5})})
}
d_div_adresse.onmouseleave = function(){
	d_poly_du_sup.map(function(poly){poly.setStyle({weight: fact_epaisseur*epaisseur})})
}
la_div_support.onclick = function(){
	build_detail_2(supports_t,false);
	d_div.style.display="flex";
	map.invalidateSize(true);
}
la_div_no_support.onclick = function(){
	build_detail_2(supports_t,false);
	d_div.style.display="flex";
	map.invalidateSize(true);
}
img_photo.onload=function(){
	display_photo();
}
photo_large.onload=function(){
	display_photo_large(true);
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
	keyboard: false,
	noWrap: true
});
polylinesPane = map.createPane('polylinesPane');
polylinesPane.style.zIndex=201;
markersPane = map.createPane('markersPane');
markersPane.style.zIndex=202;
L.control.scale().addTo(map);
L.control.layers(base_layers,null,{position: "bottomright"}).addTo(map);
new L.Control.Measure({localization:'fr', position: "bottomright", primaryLengthUnit: "kilometers", primaryAreaUnit: "sqmeters", activeColor: "#000000", completedColor: "#606060"}).addTo(map);
L.control.zoom({position:"bottomright"}).addTo(map);
var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider({maxResults: "4"});
var searchControl = L.esri.Geocoding.geosearch({providers: [arcgisOnline], position: "bottomright", useMapBounds: "false", placeholder: "Rechercher un lieu...", title: "Rechercher un lieu"}).addTo(map);
var el=L.control.elevation({position:'bottomleft', collapsed:true, width: 800}).addTo(map);

map.on("baselayerchange", function(e){
	if(e.name=='ESRI World Imagery'){
		fact_epaisseur=1.5;
	}else{
		fact_epaisseur=1;
	}
	if(typeof json_parse != "undefined"){
		redraw("r"+ind_req);
	}
});

oms = new OverlappingMarkerSpiderfier(map,{keepSpiderfied:true, nearbyDistance:5});
oms.addListener('click', function(marker){
	map.closePopup();
	supports_du_popup.push(parseInt(e.target.dat.no_sup));
	ope_du_popup=null;
	build_popup_mark_s(marker,false);
});

document.getElementById("date_select").innerHTML = "09/2016";

map.on('zoomend', function() {
	if (map.getZoom()<=9) {
		epaisseur=1.2*epaisseur_init;
	} else if (map.getZoom()<=11) {
		epaisseur=1.4*epaisseur_init;
	} else {
		epaisseur=1.6*epaisseur_init;
	}
});
map.on('moveend', function() {
	auto_build_interface(map.getBounds());
	ajax();
	if(first_announce){
		t_current=new Date().getTime();
		if(t_current-t_init>2000){
			first_announce=false;
			document.getElementById('credits').style.display='none'
		}
	}
});

function redraw(index_hist){
	index_hist=index_hist || ("r"+ind_req);
	document.getElementById("aff_restreint").innerHTML = "Chargement...";
	document.getElementById("aff_restreint").style.color = "#e68900";
	var time_start=Date.now();
	var l_result=JSON.parse(hist_result[index_hist]);
	
	var mark_aff=[];
	if (document.getElementById("check_supports").checked==false){
		for (var i=marksA.length-1; i>=0; i--){
			//oms.removeMarker(marksA[i]);
			map.removeLayer(marksA[i]);
			marksA.splice(i,1);
		}
	}else{
		for (var i=marksA.length-1; i>=0; i--){
			if(("s"+marksA[i].dat.no_sup) in l_result.supports){
				marksA[i].dat.nb_ant=l_result.supports["s"+marksA[i].dat.no_sup].nb_ant;
				delete l_result.supports["s"+marksA[i].dat.no_sup]
			}else{
				//oms.removeMarker(marksA[i]);
				map.removeLayer(marksA[i]);
				marksA.splice(i,1);
			}
		}
		var pix_max=7;
		var pix_min=3;
		var nb_max_fh=90;
		var pix_max_orig=5;
		var pix_lim_a=(pix_max-pix_min)/nb_max_fh;
		if(l_result.nb_ant_max!=l_result.nb_ant_min){
			var t_a=((pix_lim_a*l_result.nb_ant_max+pix_max_orig)-pix_min)/(l_result.nb_ant_max-l_result.nb_ant_min);
			var t_b=pix_min-t_a*l_result.nb_ant_min;
		}else{
			var t_a=(pix_max-pix_min)/nb_max_fh;
			var t_b=pix_min;
		}
		for(var property in l_result.supports){
			if(l_result.supports.hasOwnProperty(property)){
				var le_mark = L.circleMarker(l_result.supports[property].coords,{pane:'markersPane'});
				le_mark["dat"]=l_result.supports[property]
				le_mark.dat["no_sup"]=property.substring(1);
				le_mark.on("popupclose", function(e){setTimeout(function(){close_popup_mark(e)},210);});
				//
				le_mark.on("click", function(e){
					map.closePopup();
					supports_du_popup.push(parseInt(e.target.dat.no_sup));
					ope_du_popup=null;
					refresh_opacity();
					build_popup_mark_s(e.target,false);
				})
				//
				marksA.push(le_mark);
				mark_aff.push(le_mark);
				//oms.addMarker(le_mark);
			}
		}
		for (var i=marksA.length-1; i>=0; i--){
			marksA[i].setRadius(t_a*marksA[i].dat.nb_ant+t_b);
			marksA[i].setStyle({color:"#000000", weight:"1", opacity:"1", fillColor:liste_proprio[marksA[i].dat.prop].color, fillOpacity:"1"})
		}
	}
	L.layerGroup(mark_aff).addTo(map);
	
	var poly_aff=[];
	for (var i=polylinesA.length-1; i>=0; i--){		
		if(polylinesA[i].dat.code_lien in l_result.liens){
			polylinesA[i].setStyle({dashArray: dash_stat[l_result.liens[polylinesA[i].dat.code_lien].stat]});
			code_lien_tmp=polylinesA[i].dat.code_lien;
			polylinesA[i].dat=l_result.liens[code_lien_tmp];
			polylinesA[i].dat.code_lien=code_lien_tmp;
			delete l_result.liens[polylinesA[i].dat.code_lien]
			if(polylinesA[i].getPopup()==undefined){
				polylinesA[i].setStyle({weight: fact_epaisseur*epaisseur});
			}
			if(supports_du_popup.length==0){
				polylinesA[i].setStyle({opacity: 1});
			}
		}else if (polylinesA[i].hasOwnProperty('prolonge')){
			if(polylinesA[i].getPopup()==undefined){
				polylinesA[i].setStyle({weight: fact_epaisseur*epaisseur});
			}
			if(supports_du_popup.length==0){
				polylinesA[i].setStyle({opacity: 1});
			}
		}else{
			map.removeLayer(polylinesA[i]);
			polylinesA.splice(i,1);
		}
	}
	for (var code_lien in l_result.liens){
		if(l_result.liens.hasOwnProperty(code_lien)){		
			if(supports_du_popup.length>0){
				opacite_lien=opacite_lien_non_lie;
				if(ope_du_popup){
					if(tab_ope_ID[l_result.liens[code_lien].ope]==ope_du_popup){
						opacite_lien=opacite_lien_meme_ope;
						for(var i=0;i<supports_du_popup.length;i++){
							if(l_result.liens[code_lien].nos_sup.indexOf(supports_du_popup[i])>-1){
								opacite_lien=1;
							}
						}
					}
				}else{
					for(var i=0;i<supports_du_popup.length;i++){
						if(l_result.liens[code_lien].nos_sup.indexOf(supports_du_popup[i])>-1){
							opacite_lien=1;
						}
					}
				}
			}else{
				opacite_lien=1;
			}
			var la_poly = L.polyline(l_result.liens[code_lien].coords,{weight: fact_epaisseur*epaisseur, color: liste_ope[tab_ope_ID[l_result.liens[code_lien].ope]].color, opacity: opacite_lien, dashArray: dash_stat[l_result.liens[code_lien].stat], pane:'polylinesPane'});
			la_poly["dat"]=l_result.liens[code_lien];
			la_poly.dat["code_lien"]=code_lien;		
			la_poly.on("click", function(e){
				supports_du_popup=supports_du_popup.concat(e.target.dat.nos_sup);
				ope_du_popup=tab_ope_ID[e.target.dat.ope];
				refresh_opacity();
				e.target.setStyle({weight: 3.5});
				if(e.target.dat.stat==6 || e.target.dat.stat==10){
					longueur_prolonge=20;
					coords=e.target.getLatLngs().slice();
					lat_orig=coords[0].lat*Math.PI/180;
					lng_orig=coords[0].lng*Math.PI/180;
					lat_extr=coords[1].lat*Math.PI/180;
					lng_extr=coords[1].lng*Math.PI/180;
					az_orig=(Math.atan2(Math.sin(lng_extr-lng_orig)*Math.cos(lat_extr),Math.cos(lat_orig)*Math.sin(lat_extr)-Math.sin(lat_orig)*Math.cos(lat_extr)*Math.cos(lng_extr-lng_orig))+2*Math.PI)%(2*Math.PI);
					lat_new=Math.asin(Math.sin(lat_orig)*Math.cos(longueur_prolonge/6371)+Math.cos(lat_orig)*Math.sin(longueur_prolonge/6371)*Math.cos(az_orig));
					lng_new=lng_orig+Math.atan2(Math.sin(az_orig)*Math.sin(longueur_prolonge/6371)*Math.cos(lat_orig),Math.cos(longueur_prolonge/6371)-Math.sin(lat_orig)*Math.sin(lat_new));
					coords.splice(1,1,[lat_new*180/Math.PI,lng_new*180/Math.PI]);
					e.target["prolonge"]=L.polyline(coords,{weight: fact_epaisseur*epaisseur, color: liste_ope[tab_ope_ID[e.target.dat.ope]].color, opacity: 1, dashArray: dash_stat[e.target.dat.stat], pane:'polylinesPane'}).addTo(map);
				}
				if(e.target.getPopup()==undefined){
					build_popup_link(e);
				}else{
					e.target.getPopup().setLatLng(e.latlng)
				}
			});
			la_poly.on("popupclose", function(e){
				e.target.unbindPopup();
				e.target.setStyle({weight: fact_epaisseur*epaisseur});
				if(e.target.dat.stat==6 || e.target.dat.stat==10){
					map.removeLayer(e.target.prolonge);
					delete e.target.prolonge;
				}
				for(i=0;i<e.target.dat.nos_sup.length;i++){
					supports_du_popup.splice(supports_du_popup.indexOf(e.target.dat.nos_sup[i]),1);
				}
				if(typeof(profil_gj)!='undefined'){
					map.removeLayer(profil_gj);
				}
				refresh_opacity();
				for (var k=0; k<e.target.dat.nos_ant.length; k++){
					d_tr_ant=document.getElementById("d_"+e.target.dat.nos_ant[k])
					if(!(d_tr_ant==null)){
						d_tr_ant.style.backgroundColor="transparent";
						d_tr_ant.style.color=liste_ope[tab_ope_ID[e.target.dat.ope]].color;
					}
				}
			});
			la_poly.on("mouseover", function(e){
				if(e.target.getPopup()==undefined){
					e.target.setStyle({weight: 3.5});
					for (var k=0; k<e.target.dat.nos_ant.length; k++){
						div_ant=document.getElementById(e.target.dat.nos_ant[k])
						if(!(div_ant==null)){
							div_ant.style.backgroundColor=liste_ope[tab_ope_ID[e.target.dat.ope]].color;
							div_ant.style.color="white";
						}
						d_tr_ant=document.getElementById("d_"+e.target.dat.nos_ant[k])
						if(!(d_tr_ant==null)){
							d_tr_ant.style.backgroundColor=liste_ope[tab_ope_ID[e.target.dat.ope]].color;
							d_tr_ant.style.color="white";
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
							div_ant.style.backgroundColor="transparent";
							div_ant.style.color=liste_ope[tab_ope_ID[e.target.dat.ope]].color;
						}
						d_tr_ant=document.getElementById("d_"+e.target.dat.nos_ant[k])
						if(!(d_tr_ant==null)){
							d_tr_ant.style.backgroundColor="transparent";
							d_tr_ant.style.color=liste_ope[tab_ope_ID[e.target.dat.ope]].color;
						}
					}
				}
			});
			polylinesA.push(la_poly);
			poly_aff.push(la_poly);
		}
	}
	L.layerGroup(poly_aff).addTo(map);
	
	for (var i=marksA.length-1; i>=0; i--){
		if(marksA[i].getPopup()!= undefined){
			if(marksA[i].getPopup().isOpen){
				build_popup_mark_s(marksA[i],true);
				break;
			}
		}
	}
	if(d_div.style.display=="flex"){
		build_detail_1(d_div.no_sup,true);
	}
	if(popup_to_draw!=null){
		for (var i=marksA.length-1; i>=0; i--){
			if(marksA[i].dat.no_sup==popup_to_draw){
				supports_du_popup.push(parseInt(marksA[i].dat.no_sup));
				build_popup_mark_s(marksA[i],false);
				break;
			}
		}
		popup_to_draw=null;
	}
	
	document.getElementById("aff_nb_liens").innerHTML = polylinesA.length + " liens affichés";
	document.getElementById("aff_nb_supports").innerHTML = marksA.length + " supports affichés";
	
	if(l_result.full==0){
		le_mois=document.getElementById("date_select").innerHTML.split("/")[0];
		l_annee=document.getElementById("date_select").innerHTML.split("/")[1];
		document.getElementById("lien_dl_kml").href = base_url + l_annee + le_mois + "/" + l_annee + "-" + le_mois + ".zip";
	}else{
		document.getElementById("lien_dl_kml").href = "";
	}
	
	if(l_result.full==-1){
		document.getElementById("aff_restreint").innerHTML = "Erreur";
		document.getElementById("aff_restreint").style.color = "red";
	}else if(l_result.limitation_act==false){
		document.getElementById("aff_restreint").innerHTML = "Affichage complet";
		document.getElementById("aff_restreint").style.color = "green";
	}else if(l_result.limitation_act==true){
		document.getElementById("aff_restreint").innerHTML = "Affichage incomplet";
		document.getElementById("aff_restreint").style.color = "#e68900";
	}
	//console.log("tile: " + l_result.tile + " - PHP: " + l_result.ex_time + " ms - Client: " + (Date.now()-time_start).toString() + " ms");
}
	
function ajax(){
	document.getElementById("aff_restreint").innerHTML = "Chargement...";
	document.getElementById("aff_restreint").style.color = "#e68900";
	document.getElementById("controle_left").style.height=(document.documentElement.clientHeight - 90) + "px";
	document.getElementById("controle_right").style.height=(document.documentElement.clientHeight - 160) + "px";
	
    var url=build_url_liens();
	var key_hist=array_search(url,hist_url);
	if(key_hist!=false && hist_result[key_hist]!=""){
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
	var prop_liste=[];
	var nat_liste=[];
	var bande_code=0;
	var status=0;
	var nb_limit=150;
	for(i=0;i<liste_ope_zones[current_zone].main.length;++i){
		if(document.getElementById("check_op_" + liste_ope_zones[current_zone].main[i]).checked==true){
			op_liste=op_liste.concat(liste_ope[liste_ope_zones[current_zone].main[i]].no_expl);
		}
	}
	if (document.getElementById("check_op_autres").checked==true){
		for(i=0;i<liste_ope_zones[current_zone].other.length;++i){
			if(document.getElementById("check_op_" + liste_ope_zones[current_zone].other[i]).checked==true){
				op_liste=op_liste.concat(liste_ope[liste_ope_zones[current_zone].other[i]].no_expl);
			}
		}
	}
	for(var i=0; i<16; i++){
		if (document.getElementById("check_bande_" + i).checked==true){bande_code+=Math.pow(2,i);}
	}
	for(var i=0; i<67; i++){
		if (document.getElementById("check_prop_sup_" + i).checked==true){
			prop_liste.push(i);
		}
	}
	for(var i in nature_support){
		if (document.getElementById("check_nat_sup_" + i).checked==true){
			nat_liste.push(i);
		}
	}
	if(document.getElementById("check_avec_photo").checked==true){
		avec_photo=1;
	}else{
		avec_photo=0;
	}
	if(document.getElementById("check_sans_photo").checked==true){
		sans_photo=1;
	}else{
		sans_photo=0;
	}
	if(document.getElementById("limit_600").checked==true){
		nb_limit=600
	}else if(document.getElementById("limit_300").checked==true){
		nb_limit=300
	}else if(document.getElementById("limit_0").checked==true){
		nb_limit=0
	}
	if (document.getElementById('check_non_act').checked==true){status+=8;}
	if (document.getElementById('check_act').checked==true){status+=4;}
	if (document.getElementById('check_singles').checked==true){status+=2;}
	if (document.getElementById('check_couples').checked==true){status+=1;}
	la_date=document.getElementById("date_select").innerHTML.split("/");
	la_date=la_date[1]+la_date[0];
	url = base_url + "liens.php?limit=" + nb_limit + "&op_liste=" + op_liste.join("|")  + "&bande_code=" + bande_code + "&prop_liste=" + prop_liste.join("|") + "&nat_liste=" + nat_liste.join("|") + "&status=" + status + "&avec_photo=" + avec_photo + "&sans_photo=" + sans_photo + "&zoom=" + map.getZoom() + "&west=" + map.getBounds().getWest() + "&east=" + map.getBounds().getEast() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth() + "&date=" + la_date;
	//console.log(url);
	return url;
 }

function build_url_support(no_sup,liste_ant){
	var op_liste=[];
	var bande_code=0;
	var status=0;
	for(i=0;i<liste_ope_zones[current_zone].main.length;++i){
		if(document.getElementById("check_op_" + liste_ope_zones[current_zone].main[i]).checked==true){
			op_liste=op_liste.concat(liste_ope[liste_ope_zones[current_zone].main[i]].no_expl);
		}
	}
	if (document.getElementById("check_op_autres").checked==true){
		for(i=0;i<liste_ope_zones[current_zone].other.length;++i){
			if(document.getElementById("check_op_" + liste_ope_zones[current_zone].other[i]).checked==true){
				op_liste=op_liste.concat(liste_ope[liste_ope_zones[current_zone].other[i]].no_expl);
			}
		}
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
	url = base_url + "supports.php?no_sup=" + String(no_sup) + "&liste_ant=" + liste_ant + "&op_liste=" + op_liste.join("|") + "&bande_code=" + bande_code + "&status=" + status + "&date=" + la_date;
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
		var le_texte_popup="<div class='p_link'><b>" + texte_syst_bande + "</b><br>" + nom_exploit[event.target.dat.ope] + "</div>";
	}else{
		var poly_points=event.target.getLatLngs();
		var dist=poly_points[0].distanceTo(poly_points[1]);
		var le_texte_popup="<div class='p_link'><b>" + texte_syst_bande + "</b><br>" + nom_exploit[event.target.dat.ope] + "<br>" + String((dist/1000).toFixed(1)).replace(".",",") + "  km</div>";
		el.clear();
		la_date=document.getElementById("date_select").innerHTML.split("/");
		la_date=la_date[1]+la_date[0];
		var url=base_url+'profil.php?date='+la_date+'&nos_sup='+event.target.dat.nos_sup+'&nos_ant='+event.target.dat.nos_ant;
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
				obj_gJ=JSON.parse(xhr.responseText);
				trace_profil(obj_gJ,event.target.dat.band,dist);
			}
		};
		xhr.open("GET", url, true);
		xhr.send(null);
		img_loading = document.getElementById("img_loading");
		img_loading.style.display='block';
	}
	event.target.bindPopup(le_texte_popup,{maxWidth:900,autoPan:false});
	event.target.openPopup(event.latlng);
}

function trace_profil(obj_gJ,band,dist){
	
	if(typeof(profil_gj)!='undefined'){
		map.removeLayer(profil_gj);
	}
	el.clear();
	
	//cas des liaisons "X GHz ou Autre"
	if(isNaN(band)){
		obj_gJ.elevation.ry_el=NaN;
	}else{
		band_f=parseInt(band) & 65534;
		if(band_f==0){
			ry_el=NaN;
		}else{
			ry_el=0.5*Math.sqrt(300000000*dist/freq_bande_pow[band_f]);
		}
		obj_gJ.elevation.ry_el=ry_el;
	}

	//ajout courbure
	var point_start=L.latLng(obj_gJ.elevation.geometry.coordinates[0][1],obj_gJ.elevation.geometry.coordinates[0][0]);
	var lowest_alt=9000;
	for (var i=0;i<obj_gJ.elevation.geometry.coordinates.length;i++){
		if(obj_gJ.elevation.geometry.coordinates[i][2]<lowest_alt){
			lowest_alt=obj_gJ.elevation.geometry.coordinates[i][2];
		}
	}
	for (var i=0;i<obj_gJ.elevation.geometry.coordinates.length;i++){
		point_x=L.latLng(obj_gJ.elevation.geometry.coordinates[i][1],obj_gJ.elevation.geometry.coordinates[i][0]);
		dist_x=point_start.distanceTo(point_x);
		offset_x=Math.sqrt(Math.pow(6371000,2)-Math.pow(dist_x-dist/2,2))-Math.sqrt(Math.pow(6371000,2)-Math.pow(dist/2,2));
		alt_bas_x=lowest_alt+offset_x;
		obj_gJ.elevation.geometry.coordinates[i][2]+=offset_x;
		obj_gJ.elevation.geometry.coordinates[i].push(alt_bas_x,offset_x);
	}
	
	img_loading = document.getElementById("img_loading");
	img_loading.style.display='none';
	profil_gj=L.geoJson(obj_gJ.elevation,{onEachFeature: el.addData.bind(el), style: {'weight': 0}}).addTo(map);
	
}

map.on('measurefinish',function(e){
	if(e.points.length>1){
		var dist=e.points[0].distanceTo(e.points[1]);
		el.clear();
		var url=base_url+'profil.php?lon='+e.points[0].lng+'|'+e.points[1].lng+'&lat='+e.points[0].lat+'|'+e.points[1].lat;
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
				obj_gJ=JSON.parse(xhr.responseText);				
				trace_profil(obj_gJ,NaN,dist);
			}
		};
		xhr.open("GET", url, true);
		xhr.send(null);
		img_loading = document.getElementById("img_loading");
		img_loading.style.display='block';
		el._expand();
	}
});

function build_popup_mark_s(marker,isopen){
    var xhr=null;
	var url=build_url_support(marker.dat.no_sup,"1");
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
	marker.attached_links=[];
	la_div_support.marker=marker;
	la_div_titre.marker=marker;
	la_div_adresse.marker=marker;
	la_div_no_support.marker=marker;
	for (var i=0; i<polylinesA.length; i++){
		if(polylinesA[i].dat.nos_sup.indexOf(parseInt(marker.dat.no_sup))>-1){
			marker.attached_links.push(polylinesA[i]);
		}
	}
	refresh_opacity();
	
	if(s_result.url_photo_small){
		la_div_globale.style.flexDirection="row";
		la_div_support.insertBefore(la_div_no_support,null);
		la_div_ant.style.maxWidth="200px";
		la_div_ant.style.minWidth="160px";
		la_div_support.style.width="200px";
		la_div_no_support.style.width="180px";
		la_div_ant.style.maxHeight=String(parseInt(document.documentElement.clientHeight*0.5))+"px";
		img_photo.url_cat=s_result.url_cat_photo;
		if(img_photo.sup_id==s_result.no_sup){
			display_photo(marker);
		}else{
			img_photo.style.display="none";
			var img = new Image();
			img.onload = function(){display_photo(marker);}
			img.src = s_result.url_photo_small;
			img_photo.src = img.src;
			img_photo.src_small = s_result.url_photo_det;
			img_photo.sup_id=s_result.no_sup;
		}
	}else{
		la_div_globale.style.flexDirection="column";
		la_div_globale.insertBefore(la_div_no_support,null);
		img_photo.style.display="none";
		la_div_ant.style.maxWidth="";
		la_div_ant.style.minWidth="";
		la_div_support.style.width="100%";
		la_div_no_support.style.width="100%";
		la_div_ant.style.maxHeight=String(parseInt(document.documentElement.clientHeight*0.5))+"px";
		img_photo.url_cat=null;
	}
	
	la_div_titre.innerHTML=nature_support[s_result.type];
	la_div_adresse.innerHTML=s_result.adresse + "<br>" + s_result.c_post + " " + s_result.commune;
	la_div_no_support.innerHTML=s_result.nom_prop + " ("+ s_result.no_sup + ")<br><div class=\"plus_details\"><a>+ de détails...</a></div>";
	for(i=0;i<liste_ope_zones[current_zone].main.length;++i){
		rows_ope[liste_ope_zones[current_zone].main[i]]=[];
		while (divs_ope[liste_ope_zones[current_zone].main[i]].hasChildNodes()) {
			divs_ope[liste_ope_zones[current_zone].main[i]].removeChild(divs_ope[liste_ope_zones[current_zone].main[i]].lastChild);
		}
	}
	for(i=0;i<liste_ope_zones[current_zone].other.length;++i){
		rows_ope[liste_ope_zones[current_zone].other[i]]=[];
		while (divs_ope[liste_ope_zones[current_zone].other[i]].hasChildNodes()) {
			divs_ope[liste_ope_zones[current_zone].other[i]].removeChild(divs_ope[liste_ope_zones[current_zone].other[i]].lastChild);
		}
	}
	for(var i=0; i<s_result.antennes.length; i++){
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		tr.style.color=liste_ope[tab_ope_ID[s_result.antennes[i][4]]].color;
		if(s_result.antennes[i][3]==2){
			td1.innerHTML=nom_syst[s_result.antennes[i][3]];
		}else{
			td1.innerHTML=nom_syst[s_result.antennes[i][3]] + " " + nom_bande_pow[s_result.antennes[i][6]];
		}
		if(s_result.antennes[i][7] & 8){
			td1.innerHTML += ", non activé";
		}
		td1.className="td_syst";
		td2.innerHTML=s_result.antennes[i][2] + "°";
		td2.className="td_num";
		tr.ant_azimut=parseFloat(s_result.antennes[i][2]);
		tr.marker=marker;
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.id=s_result.antennes[i][0];
		tr["n_ope"]=s_result.antennes[i][4];
		tr.onmouseenter = function(e){
			e.target.marker.attached_links.map(function(a_link){
				if (a_link.dat.nos_ant.indexOf(parseInt(e.target.id))>-1){
					a_link.setStyle({weight: 3.5});
				}
			})
			e.target.style.backgroundColor=liste_ope[tab_ope_ID[e.target.n_ope]].color;
			e.target.style.color="white";
			if(dir_popup=='n' && (e.target.ant_azimut<=80 || e.target.ant_azimut>=280) ||
			dir_popup=='ne' && (e.target.ant_azimut<=80) ||
			dir_popup=='nw' && (e.target.ant_azimut>=280) ||
			dir_popup=='s' && (e.target.ant_azimut<=260 && e.target.ant_azimut>=100) ||
			dir_popup=='se' && (e.target.ant_azimut<=185 && e.target.ant_azimut>=100) ||
			dir_popup=='sw' && (e.target.ant_azimut<=260 && e.target.ant_azimut>=175)){
				//var popup_wraps=document.getElementsByClassName("leaflet-popup-content-wrapper");
				//var popup_tip_wraps=document.getElementsByClassName("leaflet-popup-tip");
				var popup_wraps=document.getElementsByClassName("leaflet-rrose-content-wrapper");
				var popup_tip_wraps=document.getElementsByClassName("leaflet-rrose-tip");
				for(var k=0; k<popup_wraps.length; k++){
					popup_wraps[k].style.background = "rgba(255, 255, 255, 0.5)";
					popup_tip_wraps[k].style.background = "rgba(255, 255, 255, 0.5)";
				}
				img_photo.style.opacity="0.3";
			}
		}
		tr.onmouseleave = function(e){
			e.target.marker.attached_links.map(function(a_link){
				a_link.setStyle({weight: fact_epaisseur*epaisseur});
			})
			e.target.style.backgroundColor="transparent";
			e.target.style.color=liste_ope[tab_ope_ID[e.target.n_ope]].color;
			//var popup_wraps=document.getElementsByClassName("leaflet-popup-content-wrapper");
			//var popup_tip_wraps=document.getElementsByClassName("leaflet-popup-tip");
			var popup_wraps=document.getElementsByClassName("leaflet-rrose-content-wrapper");
			var popup_tip_wraps=document.getElementsByClassName("leaflet-rrose-tip");
			for(var k=0; k<popup_wraps.length; k++){
				popup_wraps[k].style.background = "white";
				popup_tip_wraps[k].style.background = "white";
			}
			img_photo.style.opacity="1";
		}
		rows_ope[tab_ope_ID[s_result.antennes[i][4]]].push(tr);
	}	
	for(i=0;i<liste_ope_zones[current_zone].main.length;++i){
		var no_ope=liste_ope_zones[current_zone].main[i];
		if(rows_ope[no_ope].length>0){
			divs_ope[no_ope].innerHTML="<div class=\"p_titre\">"+liste_ope[no_ope].name+" ("+ rows_ope[no_ope].length +")</div>";
			divs_ope[no_ope].className="p_div";
			tabs_ope[no_ope].innerHTML="";
			tabs_ope[no_ope].className="t_ant";
			for(var j=0; j<rows_ope[no_ope].length; j++){
				tabs_ope[no_ope].appendChild(rows_ope[no_ope][j]);
			}
			divs_ope[no_ope].appendChild(tabs_ope[no_ope]);
		}
	}
	for(i=0;i<liste_ope_zones[current_zone].other.length;++i){
		var no_ope=liste_ope_zones[current_zone].other[i];
		if(rows_ope[no_ope].length>0){
			divs_ope[no_ope].innerHTML="<div class=\"p_titre\">"+liste_ope[no_ope].name+" ("+ rows_ope[no_ope].length +")</div>";
			divs_ope[no_ope].className="p_div";
			tabs_ope[no_ope].innerHTML="";
			tabs_ope[no_ope].className="t_ant";
			for(var j=0; j<rows_ope[no_ope].length; j++){
				tabs_ope[no_ope].appendChild(rows_ope[no_ope][j]);
			}
			divs_ope[no_ope].appendChild(tabs_ope[no_ope]);
		}
	}
	if(!isopen){
		//marker.bindPopup(la_div_globale,{autoPan:false, maxWidth:600});
		var le_rrose=new L.Rrose({autoPan:false, maxWidth:600, offset:new L.Point(0,0)})
		le_rrose.setContent(la_div_globale)
		marker.bindPopup(le_rrose);
		marker.openPopup();
		dir_popup=le_rrose._tip.className.split('-').pop();
	}
}

function build_detail_1(no_sup,isopen){
    var xhr=null;
	var url=build_url_support(no_sup,"1");
    if (window.XMLHttpRequest) { 
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) 
    {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function() {
		if (xhr.readyState==4){
			build_detail_2(xhr.responseText,isopen);
		}
	};
    xhr.open("GET", url, true);
    xhr.send(null);
}
function build_detail_2(d_supports_t,isopen){
	var s_result=JSON.parse(d_supports_t);
	if(!isopen){
		if(img_photo.style.display==""){
			if(photo_large.sup_id==img_photo.sup_id){
				display_photo_large(true)
			}else{
				photo_large.sup_id=img_photo.sup_id;
				photo_large.src=img_photo.src_small;
			}
		}else{
			display_photo_large(false);
		}
	}
	d_poly_du_sup=[];
	for (var i=0; i<polylinesA.length; i++){
		if(polylinesA[i].dat.nos_sup.indexOf(parseInt(s_result.no_sup))>-1){
			d_poly_du_sup.push(polylinesA[i]);
		}
	}
	d_div_titre.innerHTML=nature_support[s_result.type]+' ('+s_result.hauteur+' m)';
	d_div_adresse.innerHTML=s_result.adresse + "<br>" + s_result.c_post + " " + s_result.commune;
	d_div_no_support.innerHTML=s_result.nom_prop + " ("+ s_result.no_sup + ")";
	for(i=0;i<liste_ope_zones[current_zone].main.length;++i){
		d_rows_ope[liste_ope_zones[current_zone].main[i]]=[];
		while (d_divs_ope[liste_ope_zones[current_zone].main[i]].hasChildNodes()) {
			d_divs_ope[liste_ope_zones[current_zone].main[i]].removeChild(d_divs_ope[liste_ope_zones[current_zone].main[i]].lastChild);
		}
	}
	for(i=0;i<liste_ope_zones[current_zone].other.length;++i){
		d_rows_ope[liste_ope_zones[current_zone].other[i]]=[];
		while (d_divs_ope[liste_ope_zones[current_zone].other[i]].hasChildNodes()) {
			d_divs_ope[liste_ope_zones[current_zone].other[i]].removeChild(d_divs_ope[liste_ope_zones[current_zone].other[i]].lastChild);
		}
	}
	d_div.no_sup=s_result.no_sup;
	d_div_link_to_sup.href="https://carte-fh.lafibre.info/index.php?no_sup_init="+s_result.no_sup;
	if(!isopen){
		if(img_photo.url_cat){
			d_img_link_galerie.style.display="";
			d_img_link_galerie.href=img_photo.url_cat;
			d_div_link_galerie_2.href=img_photo.url_cat;
		}else{
			d_img_link_galerie.style.display="none";
		}
	}
	d_div_link_cartoradio.href="http://www.cartoradio.fr/cartoradio/web/#bbox/"+s_result.coords[1]+"/"+s_result.coords[0]+"/"+s_result.coords[1]+"/"+s_result.coords[0];
	d_div_link_osm.href="https://www.openstreetmap.org/#map=18/"+s_result.coords[0]+"/"+s_result.coords[1];
	d_div_link_gmaps.href="https://www.google.com/maps/@"+s_result.coords[0]+","+s_result.coords[1]+",17z";
	for(var i=0; i<s_result.antennes.length; i++){
		var d_tr = document.createElement("tr");
		var d_td1 = document.createElement("td");
		var d_td2 = document.createElement("td");
		var d_td3 = document.createElement("td");
		var d_td4 = document.createElement("td");
		d_tr.style.color=liste_ope[tab_ope_ID[s_result.antennes[i][4]]].color;
		if(s_result.antennes[i][3]==2){
			d_td1.innerHTML=nom_syst[s_result.antennes[i][3]];
		}else{
			d_td1.innerHTML=nom_syst[s_result.antennes[i][3]] + " " + nom_bande_pow[s_result.antennes[i][6]];
		}
		if(s_result.antennes[i][7] & 8){
			d_td1.innerHTML += ", non activé";
		}
		d_td2.innerHTML=s_result.antennes[i][8] + " (" + s_result.antennes[i][9] + " m)";
		d_td2.className="td_syst";
		d_td3.innerHTML=s_result.antennes[i][5] + " m";
		d_td3.className="td_num";
		d_td4.innerHTML=s_result.antennes[i][2] + "°";
		d_td4.className="td_num";
		d_tr.appendChild(d_td1);
		d_tr.appendChild(d_td2);
		d_tr.appendChild(d_td3);
		d_tr.appendChild(d_td4);
		d_tr.id="d_"+s_result.antennes[i][0];
		d_tr["n_ope"]=s_result.antennes[i][4];
		d_tr.onmouseenter = function(e){
			d_poly_du_sup.map(function(a_link){
				if (a_link.dat.nos_ant.indexOf(parseInt(e.target.id.substring(2)))>-1){
					a_link.setStyle({weight: 3.5});
				}
			})
			e.target.style.backgroundColor=liste_ope[tab_ope_ID[e.target.n_ope]].color;
			e.target.style.color="white";
		}
		d_tr.onmouseleave = function(e){
			d_poly_du_sup.map(function(a_link){
				a_link.setStyle({weight: fact_epaisseur*epaisseur});
			})
			e.target.style.backgroundColor="transparent";
			e.target.style.color=liste_ope[tab_ope_ID[e.target.n_ope]].color;
		}
		d_rows_ope[tab_ope_ID[s_result.antennes[i][4]]].push(d_tr);
	}	
	for(var i=0;i<liste_ope_zones[current_zone].main.length;++i){
		var no_ope=liste_ope_zones[current_zone].main[i];
		if(d_rows_ope[no_ope].length>0){
			d_divs_ope[no_ope].innerHTML="<div class=\"d_titre\">"+liste_ope[no_ope].name+" ("+ d_rows_ope[no_ope].length +")</div>";
			d_divs_ope[no_ope].className="p_div";
			d_tabs_ope[no_ope].innerHTML="";
			d_tabs_ope[no_ope].className="t_ant";
			for(var j=0; j<d_rows_ope[no_ope].length; j++){
				d_tabs_ope[no_ope].appendChild(d_rows_ope[no_ope][j]);
			}
			d_divs_ope[no_ope].appendChild(d_tabs_ope[no_ope]);
		}
	}
	for(var i=0;i<liste_ope_zones[current_zone].other.length;++i){
		var no_ope=liste_ope_zones[current_zone].other[i];
		if(d_rows_ope[no_ope].length>0){
			d_divs_ope[no_ope].innerHTML="<div class=\"d_titre\">"+liste_ope[no_ope].name+" ("+ rows_ope[no_ope].length +")</div>";
			d_divs_ope[no_ope].className="p_div";
			d_tabs_ope[no_ope].innerHTML="";
			d_tabs_ope[no_ope].className="t_ant";
			for(var j=0; j<d_rows_ope[no_ope].length; j++){
				d_tabs_ope[no_ope].appendChild(d_rows_ope[no_ope][j]);
			}
			d_divs_ope[no_ope].appendChild(d_tabs_ope[no_ope]);
		}
	}
}
function display_photo(marker){
	img_photo.style.opacity="1"
	img_photo.style.display="";
	if(marker){
		var le_popup=marker.getPopup();
		if(le_popup){
			le_popup.update();
		}
	}
}
function display_photo_large(disp){
	if(disp){
		div_photo_large.style.display="";
	}else{
	div_photo_large.style.display="none";
	}
}

function close_popup_mark(e){
	supports_du_popup.splice(supports_du_popup.indexOf(parseInt(e.target.dat.no_sup)),1);
	refresh_opacity();
	e.target.attached_links.map(function(a_link){
		if(a_link.getPopup()==undefined){
			a_link.setStyle({weight: fact_epaisseur*epaisseur});
		}
	})
	e.target.unbindPopup();
}

function recherche_sup(no_sup){
	var coords;
	no_sup = no_sup || parseInt(document.getElementById("no_sup_rech").value);
	for (var poly in polylinesA){
		if(polylinesA.hasOwnProperty(poly)){
			var sup_index=polylinesA[poly].dat.nos_sup.indexOf(no_sup);
			if(sup_index>-1){
				coords=polylinesA[poly].dat.coords[sup_index];
				break;
			}
		}
	}
	if(coords!=undefined){
		center_sup(no_sup,coords);
	}else{
		var xhr=null;
		var url=build_url_support(no_sup,"0");
		if (window.XMLHttpRequest) { 
			xhr = new XMLHttpRequest();
		}
		else if (window.ActiveXObject) 
		{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.onreadystatechange = function() {
			if (xhr.readyState==4){
				var s_result=JSON.parse(xhr.responseText);
				if(s_result.coords.length>1){
					la_date=document.getElementById("date_select").innerHTML.split("/");
					la_date=la_date[1]+la_date[0];
					if(s_result.date_found==la_date){
						center_sup(s_result.no_sup,s_result.coords);
					}else{
						le_mois=s_result.date_found.substr(4,2);
						l_annee=s_result.date_found.substr(0,4);
						new_date=le_mois+'/'+l_annee;
						var date_jump=confirm('Support introuvable en '+document.getElementById("date_select").innerHTML+' mais existant en '+new_date+'. Changer de date ?')
						if(date_jump){
							document.getElementById("date_select").innerHTML=new_date;
							if(le_mois=="01" && l_annee=="2015"){
								document.getElementById("button_moins").disabled=true;
							}else{
								document.getElementById("button_moins").disabled=false;
							}
							if(le_mois=="09" && l_annee=="2016"){
								document.getElementById("button_plus").disabled=true;
							}else{
								document.getElementById("button_plus").disabled=false;
							}
							center_sup(s_result.no_sup,s_result.coords);
						}
					}
				}else{
					alert("Support introuvable");
				}
			}
		};
		xhr.open("GET", url, true);
		xhr.send(null);
	}
}
function center_sup(no_sup,coords){
	for(var i=0;i<liste_ope_zones[current_zone].main.length;++i){
		document.getElementById("check_op_" + liste_ope_zones[current_zone].main[i]).checked=true;
	}
	document.getElementById("check_op_autres").checked=true;
	for(var i=0;i<liste_ope_zones[current_zone].other.length;++i){
		document.getElementById("check_op_" + liste_ope_zones[current_zone].other[i]).checked=true;
	}
	popup_to_draw=no_sup;
	map.setView(coords,14);
}
function close_detail(){
	d_div.style.display="none";
	map.invalidateSize(true);
}
function refresh_opacity(){
	if(supports_du_popup.length==0){
		for (var i=0; i<polylinesA.length; i++){
			polylinesA[i].setStyle({opacity: 1});
		}
	}else{
		for (var i=0; i<polylinesA.length; i++){
			opacite_lien=opacite_lien_non_lie;
			if(ope_du_popup){
				if(tab_ope_ID[polylinesA[i].dat.ope]==ope_du_popup){
					opacite_lien=opacite_lien_meme_ope;
					for(var j=0;j<supports_du_popup.length;j++){
						if(polylinesA[i].dat.nos_sup.indexOf(supports_du_popup[j])>-1){
							opacite_lien=1;
						}
					}
				}
			}else{
				for(var j=0;j<supports_du_popup.length;j++){
					if(polylinesA[i].dat.nos_sup.indexOf(supports_du_popup[j])>-1){
						opacite_lien=1;
					}
				}
			}
			polylinesA[i].setStyle({opacity: opacite_lien});
		}
	}
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
function check_all_prop_sup(){
	for(var i=0; i<67; i++){
		document.getElementById("check_prop_sup_" + i).checked=true;
	}
	ajax()
}
function check_no_prop_sup(){
	for(var i=0; i<67; i++){
		document.getElementById("check_prop_sup_" + i).checked=false;
	}
	ajax()
}
function check_all_nat_sup(){
	for(var i in nature_support){
		document.getElementById("check_nat_sup_" + i).checked=true;
	}
	ajax()
}
function check_no_nat_sup(){
	for(var i in nature_support){
		document.getElementById("check_nat_sup_" + i).checked=false;
	}
	ajax()
}
function check_all_autres_op(){
	for(i=0;i<liste_ope_zones[current_zone].other.length;++i){
		document.getElementById("check_op_" + liste_ope_zones[current_zone].other[i]).checked=true;
	}
	ajax()
}
function check_no_autre_op(){
	for(i=0;i<liste_ope_zones[current_zone].other.length;++i){
		document.getElementById("check_op_" + liste_ope_zones[current_zone].other[i]).checked=false;
	}
	ajax()
}

function date_moins(){
	if(document.activeElement.type!="text"){
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
}
function date_plus(){
	if(document.activeElement.type!="text"){
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
		if(le_mois=="09" && l_annee=="2016"){
			document.getElementById("button_plus").disabled=true;
		}
		document.getElementById("date_select").innerHTML=le_mois + "/" + l_annee;
		ajax();
	}
}

function affichage_credits(){
	if(document.getElementById('credits').style.display!='none'){
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
		for(i=0;i<liste_ope_zones[current_zone].other.length;++i){
			document.getElementById("check_op_" + liste_ope_zones[current_zone].other[i]).disabled=false;
		}
	}else{
		for(i=0;i<liste_ope_zones[current_zone].other.length;++i){
			document.getElementById("check_op_" + liste_ope_zones[current_zone].other[i]).disabled=true;
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
		document.getElementById("toggle_autres_op").innerHTML="–"
	}
}
function toggle_filtres(){
	if(document.getElementById("shortcut_bandes").style.display=="table"){
		document.getElementById("tab_bandes").style.display="none";
		document.getElementById("toggle_filtres_bandes").innerHTML="+"
		document.getElementById("tab_prop_sup").style.display="none";
		document.getElementById("tab_prop_sup2").style.display="none";
		document.getElementById("toggle_filtres_prop_sup").innerHTML="+"
		document.getElementById("tab_nat_sup").style.display="none";
		document.getElementById("tab_nat_sup2").style.display="none";
		document.getElementById("toggle_filtres_nat_sup").innerHTML="+"
		document.getElementById("shortcut_bandes").style.display="none";
		document.getElementById("shortcut_prop_sup").style.display="none";
		document.getElementById("shortcut_nat_sup").style.display="none";
		document.getElementById("tab_status").style.display="none";
		document.getElementById("toggle_filtres").innerHTML="+"
	}else{
		document.getElementById("shortcut_bandes").style.display="table";
		document.getElementById("shortcut_prop_sup").style.display="table";
		document.getElementById("shortcut_nat_sup").style.display="table";
		document.getElementById("tab_status").style.display="table";
		document.getElementById("toggle_filtres").innerHTML="–"
	}
}
function toggle_filtres_bandes(){
	if(document.getElementById("tab_bandes").style.display=="table"){
		document.getElementById("tab_bandes").style.display="none";
		document.getElementById("toggle_filtres_bandes").innerHTML="+"
	}else{
		document.getElementById("tab_bandes").style.display="table";
		document.getElementById("toggle_filtres_bandes").innerHTML="–"
	}
}
function toggle_filtres_prop_sup(){
	if(document.getElementById("tab_prop_sup").style.display=="table"){
		document.getElementById("tab_prop_sup").style.display="none";
		document.getElementById("tab_prop_sup2").style.display="none";
		document.getElementById("toggle_filtres_prop_sup").innerHTML="+"
	}else{
		document.getElementById("tab_prop_sup").style.display="table";
		document.getElementById("tab_prop_sup2").style.display="table";
		document.getElementById("toggle_filtres_prop_sup").innerHTML="–"
	}
}
function toggle_filtres_nat_sup(){
	if(document.getElementById("tab_nat_sup").style.display=="table"){
		document.getElementById("tab_nat_sup").style.display="none";
		document.getElementById("tab_nat_sup2").style.display="none";
		document.getElementById("toggle_filtres_nat_sup").innerHTML="+"
	}else{
		document.getElementById("tab_nat_sup").style.display="table";
		document.getElementById("tab_nat_sup2").style.display="table";
		document.getElementById("toggle_filtres_nat_sup").innerHTML="–"
	}
}
function toggle_lim_aff(){
	if(document.getElementById("tab_lim_aff").style.display=="table"){
		document.getElementById("tab_lim_aff").style.display="none";
		document.getElementById("toggle_lim_aff").innerHTML="+"
	}else{
		document.getElementById("tab_lim_aff").style.display="table";
		document.getElementById("toggle_lim_aff").innerHTML="–"
	}
}
function toggle_search(){
	if(document.getElementById("tab_search").style.display=="table"){
		document.getElementById("tab_search").style.display="none";
		document.getElementById("toggle_search").innerHTML="+"
	}else{
		document.getElementById("tab_search").style.display="table";
		document.getElementById("toggle_search").innerHTML="–"
	}
}

function shure_all(){
	answer=confirm("Ce choix peut ralentir fortement la navigation. Continuer ?")
	if(answer){
		current_lim=0;
	}else{
		document.getElementById("limit_"+current_lim).checked=true;
	}	
	ajax();
}

mark_geoloc=L.marker();
function geoloc(){
	if(document.getElementById("check_geoloc").checked==true){
		map.locate({watch:true, setView:true, maxZoom:17});
	}else{
		map.stopLocate();
		map.removeLayer(mark_geoloc)
	}
}
map.on('locationfound',function(e){
	mark_geoloc.setLatLng(e.latlng);
	mark_geoloc.addTo(map);
})

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