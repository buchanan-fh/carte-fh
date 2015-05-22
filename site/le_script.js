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
d_poly_du_sup=[];
hist_result=[];
hist_url=[];
ind_req=0;
current_lim=300;
var popup_to_draw;
//base_url="http://192.168.7.1:5723/";
base_url="https://carte-fh.lafibre.info/";

la_div_globale = document.createElement("div");
la_div_ant = document.createElement("div");
la_div_support = document.createElement("div");
la_div_titre = document.createElement("div");
la_div_adresse = document.createElement("div");
la_div_no_support = document.createElement("div");
la_div_clear = document.createElement("div");
la_div_clear.style.clear="both";
img_photo = document.createElement("img");
la_div_globale.className="p_div_globale";
la_div_support.className="p_div clickable";
la_div_titre.className="p_titre";
la_div_adresse.className="p_adresse";
la_div_ant.className="p_div_ant";
la_div_no_support.className="p_num_sup clickable";
img_photo.className="p_photo_sup clickable";
la_div_ant.style.overflowY="auto";
la_div_ant.style.overflowX="hidden";
la_div_support.appendChild(la_div_titre);
la_div_support.appendChild(la_div_adresse);
la_div_support.appendChild(img_photo);
la_div_globale.appendChild(la_div_support);
la_div_globale.appendChild(la_div_ant);
la_div_globale.appendChild(la_div_no_support);
la_div_globale.appendChild(la_div_clear);
div_photo_large=document.getElementById("div_photo_large")
photo_large=document.getElementById("photo_large")
d_div = document.getElementById("detail_sup");
d_div_titre = document.getElementById("d_titre");
d_div_adresse = document.getElementById("d_adresse");
d_div_ant = document.getElementById("d_ant");
d_div_no_support = document.getElementById("d_num_sup");
d_div_info_photo = document.getElementById("d_info_photo");

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
d_div_titre.onmouseenter = function(e){
	for (var i=0; i<d_poly_du_sup.length; i++){
		d_poly_du_sup[i].setStyle({weight: 3.5});
	}
}
d_div_titre.onmouseleave = function(e){
	for (var i=0; i<d_poly_du_sup.length; i++){
		d_poly_du_sup[i].setStyle({weight: fact_epaisseur*epaisseur});
	}
}
d_div_adresse.onmouseenter = function(e){
	for (var i=0; i<d_poly_du_sup.length; i++){
		d_poly_du_sup[i].setStyle({weight: 3.5});
	}
}
d_div_adresse.onmouseleave = function(e){
	for (var i=0; i<d_poly_du_sup.length; i++){
		d_poly_du_sup[i].setStyle({weight: fact_epaisseur*epaisseur});
	}
}

la_div_support.onclick = function(){
	build_detail();
	d_div.style.display="flex";
	map.invalidateSize(true);
}
la_div_no_support.onclick = function(){
	build_detail();
	d_div.style.display="flex";
	map.invalidateSize(true);
}
img_photo.onload=function(){
	resize_photo();
}
photo_large.onload=function(){
	div_photo_large.style.display="";
	d_div_info_photo.style.display="";
	if(d_div.style.display=="flex"){
		map.invalidateSize(true);
	}
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
	if(ind_req>0){
	redraw("r"+ind_req);
	}
});

oms = new OverlappingMarkerSpiderfier(map,{keepSpiderfied:true, nearbyDistance:10});
oms.addListener('click', function(marker){
	build_popup_mark_s(marker,false);
});

document.getElementById("date_select").innerHTML = "05/2015";

map.on('zoomend', function() {
		if (map.getZoom()<=9) {
			epaisseur=1;
		} else if (map.getZoom()<=11) {
			epaisseur=1.25;
		} else {
			epaisseur=1.5;
		}
	});
map.on('moveend', function() {
	auto_build_interface(map.getBounds());
	ajax();
	});

function redraw(index_hist){
	index_hist=index_hist || ("r"+ind_req);
	document.getElementById("aff_restreint").innerHTML = "Chargement...";
	document.getElementById("aff_restreint").style.color = "orange";
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
			marksA[i].setStyle({color:"#000000", weight:"1", opacity:"1", fillColor:liste_ope[marksA[i].dat.prop].color, fillOpacity:"1"})
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
			var la_poly = L.polyline(l_result.liens[code_lien].coords,{weight: fact_epaisseur*epaisseur, color: liste_ope[l_result.liens[code_lien].ope].color, opacity: 1, dashArray: dash_stat[l_result.liens[code_lien].stat]});
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
							div_ant.style.backgroundColor=liste_ope[e.target.dat.ope].color;
							div_ant.style.color="white";
						}
						d_div_ant=document.getElementById("d_"+e.target.dat.nos_ant[k])
						if(!(d_div_ant==null)){
							d_div_ant.style.backgroundColor=liste_ope[e.target.dat.ope].color;
							d_div_ant.style.color="white";
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
							div_ant.style.color=liste_ope[e.target.dat.ope].color;
						}
						d_div_ant=document.getElementById("d_"+e.target.dat.nos_ant[k])
						if(!(d_div_ant==null)){
							d_div_ant.style.backgroundColor="transparent";
							d_div_ant.style.color=liste_ope[e.target.dat.ope].color;
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
	
	if(popup_to_draw!=null){
		for (var i=marksA.length-1; i>=0; i--){
			if(marksA[i].dat.no_sup==popup_to_draw){
				build_popup_mark_s(marksA[i],false);
				break;
			}
		}
		popup_to_draw=null;
	}
	
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
	//console.log("tile: " + l_result.tile + " - PHP: " + l_result.ex_time + " ms - Client: " + (Date.now()-time_start).toString() + " ms");
}
	
function ajax(){
	document.getElementById("aff_restreint").innerHTML = "Chargement...";
	document.getElementById("aff_restreint").style.color = "orange";
	document.getElementById("controle_left").style.height=(document.documentElement.clientHeight - 110) + "px";
	document.getElementById("controle_right").style.height=(document.documentElement.clientHeight - 110) + "px";
	
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
	for(i=0;i<liste_ope_zones[current_zone].main.length;++i){
		if(document.getElementById("check_op_" + liste_ope_zones[current_zone].main[i]).checked==true){op_liste.push(liste_ope_zones[current_zone].main[i]);}
	}
	if (document.getElementById("check_op_autres").checked==true){
		for(i=0;i<liste_ope_zones[current_zone].other.length;++i){
			if(document.getElementById("check_op_" + liste_ope_zones[current_zone].other[i]).checked==true){op_liste.push(liste_ope_zones[current_zone].other[i]);}
		}
	}
	for(var i=0; i<16; i++){
		if (document.getElementById("check_bande_" + i).checked==true){bande_code+=Math.pow(2,i);}
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
	url = base_url + "liens.php?limit=" + nb_limit + "&op_liste=" + op_liste.join("|")  + "&bande_code=" + bande_code + "&status=" + status + "&zoom=" + map.getZoom() + "&west=" + map.getBounds().getWest() + "&east=" + map.getBounds().getEast() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth() + "&date=" + la_date;
	//console.log(url);
	return url;
 }

function build_url_support(no_sup,liste_ant){
	var op_liste=[];
	var bande_code=0;
	var status=0;
	for(i=0;i<liste_ope_zones[current_zone].main.length;++i){
		if(document.getElementById("check_op_" + liste_ope_zones[current_zone].main[i]).checked==true){op_liste.push(liste_ope_zones[current_zone].main[i]);}
	}
	if (document.getElementById("check_op_autres").checked==true){
		for(i=0;i<liste_ope_zones[current_zone].other.length;++i){
			if(document.getElementById("check_op_" + liste_ope_zones[current_zone].other[i]).checked==true){op_liste.push(liste_ope_zones[current_zone].other[i]);}
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
	}
	var poly_points=event.target.getLatLngs();
	var dist=String((poly_points[0].distanceTo(poly_points[1])/1000).toFixed(1)).replace(".",",");
	var le_texte_popup="<div class='p_link'><b>" + texte_syst_bande + "</b><br>" + liste_ope[event.target.dat.ope].name + "<br>" + dist + "  km</div>";
	event.target.bindPopup(le_texte_popup,{autoPan:false});
	event.target.openPopup(event.latlng);
}

function build_popup_mark_s(marker,isopen) {
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
	
	if(s_result.img_disp==1){
		la_div_globale.insertBefore(la_div_ant,la_div_support);
		la_div_adresse.style.maxWidth="230px";
		la_div_globale.style.minWidth="385px";
		la_div_ant.style.width="180px";
		la_div_ant.style.cssFloat="right";
		la_div_support.style.width="200px";
		la_div_no_support.style.width="180px";
		la_div_ant.style.maxHeight=String(parseInt(document.documentElement.clientHeight*0.5))+"px";
		if(img_photo.sup_id==s_result.no_sup){
			resize_photo();
		}else{
			img_photo.src=base_url+s_result.img_small_url;
			img_photo.sup_id=s_result.no_sup;
		}
	}else{
		la_div_globale.insertBefore(la_div_support,la_div_ant);
		img_photo.style.display="none";
		la_div_adresse.style.maxWidth="180px";
		la_div_globale.style.minWidth=""
		la_div_ant.style.width="100%";
		la_div_ant.style.cssFloat="none";
		la_div_support.style.width="100%";
		la_div_no_support.style.width="100%";
		la_div_ant.style.maxHeight=String(parseInt(document.documentElement.clientHeight*0.5))+"px";
	}
	
	poly_du_sup=[];
	for (var i=0; i<polylinesA.length; i++){
		if(polylinesA[i].dat.nos_sup.indexOf(parseInt(marker.dat.no_sup))>-1){
			poly_du_sup.push(polylinesA[i]);
		}
	}
	la_div_titre.innerHTML=s_result.type;
	la_div_adresse.innerHTML=s_result.adresse + "<br>" + s_result.c_post + " " + s_result.commune;
	la_div_no_support.innerHTML=s_result.nom_prop + " ("+ s_result.no_sup + ")";
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
		tr.style.color=liste_ope[s_result.antennes[i][4]].color;
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
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.id=s_result.antennes[i][0];
		tr["n_ope"]=s_result.antennes[i][4];
		tr.onmouseenter = function(e){
			for (var j=0; j<poly_du_sup.length; j++){
				if (poly_du_sup[j].dat.nos_ant.indexOf(parseInt(e.target.id))>-1){
					poly_du_sup[j].setStyle({weight: 3.5});
				}
			}
			e.target.style.backgroundColor=liste_ope[e.target.n_ope].color;
			e.target.style.color="white";
			if(e.target.ant_azimut<=80 || e.target.ant_azimut>=280){
				var popup_wraps=document.getElementsByClassName("leaflet-popup-content-wrapper");
				var popup_tip_wraps=document.getElementsByClassName("leaflet-popup-tip");
				for(var k=0; k<popup_wraps.length; k++){
					popup_wraps[k].style.background = "rgba(255, 255, 255, 0.5)";
					popup_tip_wraps[k].style.background = "rgba(255, 255, 255, 0.5)";
				}
				img_photo.style.opacity="0.3";
			}
		}
		tr.onmouseleave = function(e){
			for (var k=0; k<poly_du_sup.length; k++){
				poly_du_sup[k].setStyle({weight: fact_epaisseur*epaisseur});
			}
			e.target.style.backgroundColor="transparent";
			e.target.style.color=liste_ope[e.target.n_ope].color;
			if(e.target.ant_azimut<=80 || e.target.ant_azimut>=280){
				var popup_wraps=document.getElementsByClassName("leaflet-popup-content-wrapper");
				var popup_tip_wraps=document.getElementsByClassName("leaflet-popup-tip");
				for(var k=0; k<popup_wraps.length; k++){
					popup_wraps[k].style.background = "white";
					popup_tip_wraps[k].style.background = "white";
				}
				img_photo.style.opacity="1";
			}
		}
		rows_ope[s_result.antennes[i][4]].push(tr);
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
		marker.bindPopup(la_div_globale,{autoPan:false, maxWidth:600});
		marker.openPopup();
	}
}
function build_detail(){
	var s_result=JSON.parse(supports_t);
	if(s_result.img_disp==1){
		if(photo_large.sup_id==s_result.no_sup){
			div_photo_large.style.display="";
			d_div_info_photo.style.display="";
			if(d_div.style.display=="flex"){
				map.invalidateSize(true);
			}
		}else{
			document.getElementById("t_info_photo").innerHTML=s_result.img_col[0].date + " - " + s_result.img_col[0].auteur
			photo_large.sup_id=s_result.no_sup;
			photo_large.src=base_url+s_result.img_col[0].url;
		}
	}else{
		div_photo_large.style.display="none";
		d_div_info_photo.style.display="none";
		if(d_div.style.display=="flex"){
			map.invalidateSize(true);
		}
	}
	
	d_poly_du_sup=[];
	for (var i=0; i<polylinesA.length; i++){
		if(polylinesA[i].dat.nos_sup.indexOf(parseInt(s_result.no_sup))>-1){
			d_poly_du_sup.push(polylinesA[i]);
		}
	}
	d_div_titre.innerHTML=s_result.type;
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
	for(var i=0; i<s_result.antennes.length; i++){
		var d_tr = document.createElement("tr");
		var d_td1 = document.createElement("td");
		var d_td2 = document.createElement("td");
		var d_td3 = document.createElement("td");
		var d_td4 = document.createElement("td");
		d_tr.style.color=liste_ope[s_result.antennes[i][4]].color;
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
			for (var j=0; j<d_poly_du_sup.length; j++){
				if (d_poly_du_sup[j].dat.nos_ant.indexOf(parseInt(e.target.id.substring(2)))>-1){
					d_poly_du_sup[j].setStyle({weight: 3.5});
				}
			}
			e.target.style.backgroundColor=liste_ope[e.target.n_ope].color;
			e.target.style.color="white";
		}
		d_tr.onmouseleave = function(e){
			for (var k=0; k<d_poly_du_sup.length; k++){
				d_poly_du_sup[k].setStyle({weight: fact_epaisseur*epaisseur});
			}
			e.target.style.backgroundColor="transparent";
			e.target.style.color=liste_ope[e.target.n_ope].color;
		}
		d_rows_ope[s_result.antennes[i][4]].push(d_tr);
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
function resize_photo(){
	if(img_photo.width/img_photo.height >= 200/(document.documentElement.clientHeight*0.5-70)){
		img_photo.style.width="180px";
		img_photo.style.height="auto";
	}else{
		img_photo.style.height=String(parseInt(document.documentElement.clientHeight*0.5-70))+"px";
		img_photo.style.width="auto";
	}
	img_photo.style.opacity="1"
	img_photo.style.display="inline";
}

function close_popup_mark(event){
	for (var i=0; i<poly_du_sup.length; i++){
		if(poly_du_sup[i].getPopup()==undefined){
			poly_du_sup[i].setStyle({weight: fact_epaisseur*epaisseur});
		}
	}
	event.target.unbindPopup();
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
				console.log(no_sup);
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
					center_sup(s_result.no_sup,s_result.coords);
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
	map.setView(coords,11);
}
function close_detail(){
	d_div.style.display="none";
	map.invalidateSize(true);
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
	if(le_mois=="05" && l_annee=="2015"){
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
		document.getElementById("toggle_autres_op").innerHTML="-"
	}
}

function toggle_filtres(){
	if(document.getElementById("tab_bandes").style.display=="table"){
		document.getElementById("tab_bandes").style.display="none";
		document.getElementById("shortcut_bandes").style.display="none";
		document.getElementById("tab_status").style.display="none";
		document.getElementById("toggle_filtres").innerHTML="+"
	}else{
		document.getElementById("tab_bandes").style.display="table";
		document.getElementById("shortcut_bandes").style.display="table";
		document.getElementById("tab_status").style.display="table";
		document.getElementById("toggle_filtres").innerHTML="-"
	}
}

function toggle_lim_aff(){
	if(document.getElementById("tab_lim_aff").style.display=="table"){
		document.getElementById("tab_lim_aff").style.display="none";
		document.getElementById("toggle_lim_aff").innerHTML="+"
	}else{
		document.getElementById("tab_lim_aff").style.display="table";
		document.getElementById("toggle_lim_aff").innerHTML="-"
	}
}
function toggle_search(){
	if(document.getElementById("tab_search").style.display=="table"){
		document.getElementById("tab_search").style.display="none";
		document.getElementById("toggle_search").innerHTML="+"
	}else{
		document.getElementById("tab_search").style.display="table";
		document.getElementById("toggle_search").innerHTML="-"
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