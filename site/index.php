<?php
if(isset($_GET["zone"])){
	$zone=$_GET["zone"];
}else{
	$zone="fr_metro";
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Carte des Faisceaux Hertziens</title>
	<link rel="stylesheet" href="leaflet.css">
	<script src="leaflet.js"></script>
	<script src="oms_cm.js"></script>
	<link rel="stylesheet" href="Control.OSMGeocoder.css">
	<script src="Control.OSMGeocoder.js"></script>
	<link rel="stylesheet" href="style.css">
</head>
<body onkeydown="touche_clavier(event)" onload="build_interface(true,<?php
	echo "'".$zone."'";
	if(isset($_GET["op_init"])){
		echo ",'".$_GET["op_init"]."'";
	}
	?>);<?php
	if(isset($_GET["no_sup_init"])){
		echo "recherche_sup(".$_GET["no_sup_init"].");";
	}
	?>">
	<div id="detail_sup">
		<div id="d_sup">
			<div id="d_header">
				<img class="img_click" onclick="recherche_sup(d_div.no_sup)" src="center.png" alt="center">
				<img class="img_click" id="d_img_close" onclick="close_detail()" src="close.png" alt="close">
			</div>
			<div id="d_descr">
				<div id="d_titre" class="p_titre"></div>
				<div id="d_adresse" class="p_adresse"></div>
				<div id="div_photo_large">
					<a target="_blank" id="d_link_galerie_2" href=""><img id="photo_large"></a>
				</div>
				<div id="d_ant"></div>
				<div id="d_num_sup" class="p_num_sup"></div>
			</div>
			<div id="d_links">
				<div class="p_titre">Liens:</div>
				<div id="d_list_links">Vers ce support: <input id="d_link_to_sup" type="text" readonly><br><a target="_blank" id="d_link_galerie" href="">Vers la galerie photo</a><br><a target="_blank" id="d_link_cartoradio" href="">Vers cartoradio</a><br><a target="_blank" id="d_link_gmaps" href="">Vers Google Maps</a></div>
			</div>
		</div>
	</div>
	<div id="map_global">
		<div id="map_canvas"></div>
		<div id="controle_right"> 
			<div class="box" id="b_date"> 
				<table class="tab_col">
					<tr>
						<td class="ligne_plus"><input id="button_moins" type="button" value="<<" onclick="date_moins()"></td>
						<td class="ligne_plus" id="date_select"></td>
						<td class="ligne_plus"><input id="button_plus" type="button" value=">>" onclick="date_plus()" disabled></td>
					</tr>
				</table>
			</div>
			<div class="box clickable" onclick="choix_zone();" id="b_zone">
				<table class="tab_col">
					<tr>
						<td class="ligne_simple" width="80%" id="nom_zone"></td>
						<td class="ligne_simple" width="20%" align="center"><img class="img_click" src="world.png" alt="w"></td>
					</tr>
				</table>
			</div>
			<div class="box" id="b_recherche">
				<table class="tab_col">
					<tr class="clickable" onclick="toggle_search()">
						<td class="ligne_plus">Recherche</td>
						<td class="toggle" id="toggle_search">+</td>
					</tr>
				</table>
				<table class="tab_col tab_cache" id="tab_search">
					<tr>
						<td class="ligne_simple">Par n° de support:</td>
					</tr>
					<tr>
						<td><input type="text" class="champ_recherche" id="no_sup_rech" onkeydown="if(event.keyCode==13){recherche_sup();}"></td>
						<td onclick="recherche_sup()"><img class="img_click" src="loupe.png" alt="l"></td>
					</tr>
				</table>
			</div>
			<div class="box" id="b_filtre">
				<table class="tab_col">
					<tr class="clickable" onclick="toggle_filtres()">
						<td class="ligne_plus">Filtrage</td>
						<td class="toggle" id="toggle_filtres">+</td>
					</tr>
				</table>
				<table class="tab_col tab_cache" id="tab_status">
					<tr>
						<td><input type="checkbox" id="check_act" onclick="ajax()" checked></td>
						<td>Liens activés</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_non_act" onclick="ajax()" checked></td>
						<td>Liens non activés</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_couples" onclick="ajax()" checked></td>
						<td>Liens r&eacute;solus</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_singles" onclick="ajax()" checked></td>
						<td>Liens non r&eacute;solus</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_avec_photo" onclick="ajax()" checked></td>
						<td>Supports avec photo</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_sans_photo" onclick="ajax()" checked></td>
						<td>Supports sans photo</td>
					</tr>
				</table>
				<table class="tab_col tab_cache" id="shortcut_bandes">
					<tr class="clickable" onclick="toggle_filtres_bandes()">
						<td class="ligne_plus">Bandes de fréquences</td>
						<td class="toggle" id="toggle_filtres_bandes">+</td>
					</tr>
				</table>
				<table class="tab_col tab_cache_2" id="tab_bandes">
					<tr>
						<td class="ligne_plus"><input type="button" id="check_all_bandes" value="Toutes" onclick="check_all_bandes()"></td>
						<td class="ligne_plus"><input type="button" id="check_no_bande" value="Aucune" onclick="check_no_bande()"></td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_0" onclick="ajax()" checked></td>
						<td>Autres</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_1" onclick="ajax()" checked></td>
						<td>150 MHz</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_2" onclick="ajax()" checked></td>
						<td>450 MHz</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_3" onclick="ajax()" checked></td>
						<td>1,4 GHz</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_4" onclick="ajax()" checked></td>
						<td>4 GHz</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_5" onclick="ajax()" checked></td>
						<td>6 GHz</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_6" onclick="ajax()" checked></td>
						<td>8 GHz</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_7" onclick="ajax()" checked></td>
						<td>11 GHz</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_8" onclick="ajax()" checked></td>
						<td>13 GHz</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_9" onclick="ajax()" checked></td>
						<td>14 GHz</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_10" onclick="ajax()" checked></td>
						<td>18 GHz</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_11" onclick="ajax()" checked></td>
						<td>23 GHz</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_12" onclick="ajax()" checked></td>
						<td>26 GHz</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_13" onclick="ajax()" checked></td>
						<td>32 GHz</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_14" onclick="ajax()" checked></td>
						<td>38 GHz</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_bande_15" onclick="ajax()" checked></td>
						<td>70/80 GHz</td>
					</tr>
				</table>
				<table class="tab_col tab_cache" id="shortcut_prop_sup">
					<tr class="clickable" onclick="toggle_filtres_prop_sup()">
						<td class="ligne_plus">Propriétaires des supports</td>
						<td class="toggle" id="toggle_filtres_prop_sup">+</td>
					</tr>
				</table>
				<table class="tab_col tab_cache_2" id="tab_prop_sup">
					<tr>
						<td class="ligne_plus"><input type="button" id="check_all_prop_sup" value="Tous" onclick="check_all_prop_sup()"></td>
						<td class="ligne_plus"><input type="button" id="check_no_prop_sup" value="Aucun" onclick="check_no_prop_sup()"></td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_0" onclick="ajax()" checked></td>
						<td>Inconnu</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_1" onclick="ajax()" checked></td>
						<td>ANFR</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_2" onclick="ajax()" checked></td>
						<td>Association</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_3" onclick="ajax()" checked></td>
						<td>Aviation Civile</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_4" onclick="ajax()" checked></td>
						<td>BOUYGUES</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_5" onclick="ajax()" checked></td>
						<td>CCI, Ch Metiers, Port Aut, Aérop</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_6" onclick="ajax()" checked></td>
						<td>Conseil Général</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_7" onclick="ajax()" checked></td>
						<td>Conseil Régional</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_8" onclick="ajax()" checked></td>
						<td>Coopérative Agricole, Vinicole</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_9" onclick="ajax()" checked></td>
						<td>Copropriété, Syndic, SCI</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_10" onclick="ajax()" checked></td>
						<td>CROSS</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_11" onclick="ajax()" checked></td>
						<td>DDE</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_12" onclick="ajax()" checked></td>
						<td>Autres</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_13" onclick="ajax()" checked></td>
						<td>EDF GDF</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_14" onclick="ajax()" checked></td>
						<td>Etablissement de soins</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_15" onclick="ajax()" checked></td>
						<td>Etat, Ministère</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_16" onclick="ajax()" checked></td>
						<td>ORANGE Services Fixes</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_17" onclick="ajax()" checked></td>
						<td>Syndicat des eaux, Adduction</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_18" onclick="ajax()" checked></td>
						<td>Intérieur</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_19" onclick="ajax()" checked></td>
						<td>La Poste</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_20" onclick="ajax()" checked></td>
						<td>Météo</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_21" onclick="ajax()" checked></td>
						<td>ORANGE</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_22" onclick="ajax()" checked></td>
						<td>Particulier</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_23" onclick="ajax()" checked></td>
						<td>Phares et balises</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_24" onclick="ajax()" checked></td>
						<td>SNCF Réseau</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_25" onclick="ajax()" checked></td>
						<td>RTE</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_26" onclick="ajax()" checked></td>
						<td>SDIS, secours, incendie</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_27" onclick="ajax()" checked></td>
						<td>SFR</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_28" onclick="ajax()" checked></td>
						<td>Société HLM</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_29" onclick="ajax()" checked></td>
						<td>Société Privée SA</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_30" onclick="ajax()" checked></td>
						<td>Sociétés d'Autoroutes</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_31" onclick="ajax()" checked></td>
						<td>Sté Réunionn. de Radiotéléph.</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_32" onclick="ajax()" checked></td>
						<td>TDF</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_33" onclick="ajax()" checked></td>
						<td>Towercast</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_34" onclick="ajax()" checked></td>
						<td>Commune, communauté de commune</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_35" onclick="ajax()" checked></td>
						<td>Voies navigables de France</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_36" onclick="ajax()" checked></td>
						<td>Altitude Telecom</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_37" onclick="ajax()" checked></td>
						<td>Antalis</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_38" onclick="ajax()" checked></td>
						<td>One Cast</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_39" onclick="ajax()" checked></td>
						<td>Gendarmerie</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_40" onclick="ajax()" checked></td>
						<td>Tikiphone</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_41" onclick="ajax()" checked></td>
						<td>France Caraibes Mobiles</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_42" onclick="ajax()" checked></td>
						<td>IFW-FREE</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_43" onclick="ajax()" checked></td>
						<td>Lagardère Active Média</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_44" onclick="ajax()" checked></td>
						<td>Outremer Telecom</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_45" onclick="ajax()" checked></td>
						<td>RATP</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_46" onclick="ajax()" checked></td>
						<td>Titulaire programme Radio/TV</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_47" onclick="ajax()" checked></td>
						<td>Office des Postes et Telecom</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_48" onclick="ajax()" checked></td>
						<td>9 CEGETEL</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_49" onclick="ajax()" checked></td>
						<td>BOLLORE</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_50" onclick="ajax()" checked></td>
						<td>COMPLETEL</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_51" onclick="ajax()" checked></td>
						<td>DIGICEL</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_52" onclick="ajax()" checked></td>
						<td>EUTELSAT</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_53" onclick="ajax()" checked></td>
						<td>EXPERTMEDIA</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_54" onclick="ajax()" checked></td>
						<td>MEDIASERV</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_55" onclick="ajax()" checked></td>
						<td>BELGACOM</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_56" onclick="ajax()" checked></td>
						<td>AIRBUS</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_57" onclick="ajax()" checked></td>
						<td>GUYANE NUMERIQUE</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_58" onclick="ajax()" checked></td>
						<td>DAUPHIN TELECOM</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_59" onclick="ajax()" checked></td>
						<td>Itas Tim</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_60" onclick="ajax()" checked></td>
						<td>REUNION NUMERIQUE</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_61" onclick="ajax()" checked></td>
						<td>GLOBECAST</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_62" onclick="ajax()" checked></td>
						<td>SNCF</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_63" onclick="ajax()" checked></td>
						<td>VITI</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_64" onclick="ajax()" checked></td>
						<td>Pacific Mobile Telecom</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_65" onclick="ajax()" checked></td>
						<td>FPS TOWERS</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_prop_sup_66" onclick="ajax()" checked></td>
						<td>Telco OI</td>
					</tr>
				</table>
			</div>
		</div>
		<div id="controle_left"> 
			<div class="box" id="b_sum">
				<table class="tab_col">
					<tr class="clickable" onclick="toggle_lim_aff()">
						<td class="ligne_plus">Limitation d'affichage</td>
						<td class="toggle" id="toggle_lim_aff">+</td>
					</tr>
				</table>
				<table class="tab_col tab_cache" id="tab_lim_aff">
					<tr>
						<td class="radio_limit"><input type="radio" name="nb_limit" id="limit_150" onclick="current_lim=150;ajax();"></td>
						<td>Après 150 supports</td>
					</tr>
					<tr>
						<td class="radio_limit"><input type="radio" name="nb_limit" id="limit_300" onclick="current_lim=300;ajax();" checked></td>
						<td>Après 300 supports</td>
					</tr>
					<tr>
						<td class="radio_limit"><input type="radio" name="nb_limit" id="limit_600" onclick="current_lim=600;ajax();"></td>
						<td>Après 600 supports</td>
					</tr>
					<tr>
						<td class="radio_limit"><input type="radio" name="nb_limit" id="limit_0" onclick="shure_all()"></td>
						<td>Pas de limite</td>
					</tr>
					<tr>
						<td><input type="checkbox" id="check_supports" onclick="redraw()" checked></td>
						<td>Supports</td>
					</tr>
				</table>
				<table class="tab_col">
					<tr>
						<td colspan="2" class="ligne_plus" id="aff_restreint"></td>
					</tr>
					<tr>
						<td class="ligne_left" id="aff_nb_liens" width="80%">liens affichés</td>
						<td rowspan="2" width="20%" id="info" align="center" onclick="affichage_credits();"><img class="img_click" src="info.png" alt="i"></td>
					</tr>
					<tr>
						<td class="ligne_left" id="aff_nb_supports">supports affichés</td>
					</tr>
				</table>
			</div>
			<div class="box" id="b_ope">
				<table class="tab_col" id="tab_ope_main"></table>
				<table class="tab_col">
					<tr>
						<td class="check_cell"><input type="checkbox" id="check_op_autres" onclick="click_autres_ope()" checked></td>
						<td class="clickable" onclick="toggle_autres_ope()"><span class="leg" id="leg_autres">&#x25FC;</span> Autres</td>
						<td class="toggle" id="toggle_autres_op" onclick="toggle_autres_ope()">+</td>
					</tr>
				</table>
				<table class="tab_col tab_cache" id="shortcut_autres_ope">
					<tr >
						<td class="ligne_plus"><input type="button" id="check_all_autres_op" value="Tous" onclick="check_all_autres_op()"></td>
						<td class="ligne_plus"><input type="button" id="check_no_autre_op" value="Aucun" onclick="check_no_autre_op()"></td>
					</tr>
				</table>
				<table class="tab_col tab_cache" id="tab_autres_ope"></table>
			</div> 
		</div>
		<div id="credits" onclick="affichage_credits();">
		Cette carte est réalisée à partir de données issues de <a href="http://www.cartoradio.fr">Cartoradio</a> et <a href="https://www.data.gouv.fr">data.gouv.fr</a>.<br><br>Mes remerciements à <a href="https://twitter.com/MarinMoulinier">Marin</a>, <a href="https://twitter.com/_GaLaK_">Nicolas</a>, <a href="https://twitter.com/Network_Addict">Thomas</a>, <a href="https://twitter.com/lafibreinfo">Vivien</a>, <a href="https://twitter.com/Chairdan">Vince</a> pour leur collaboration.<br><br>Contact, remarques, signalements de bugs: <a href="https://twitter.com/buchanan_">@buchanan_</a>, ou sur <a href=https://lafibre.info/4g/site-de-cartographie-des-faisceaux-hertziens-bugs-idees-damelioration/>lafibre.info</a>.
		</div>
		<div id="choix_zone">
			<span class="clickable" onclick="build_interface(true,'fr_metro')">France métropolitaine</span><br>
			<span class="clickable" onclick="build_interface(true,'fr_971')">Guadeloupe (971)</span><br>
			<span class="clickable" onclick="build_interface(true,'fr_972')">Martinique (972)</span><br>
			<span class="clickable" onclick="build_interface(true,'fr_973')">Guyane (973)</span><br>
			<span class="clickable" onclick="build_interface(true,'fr_974')">La Réunion (974)</span><br>
			<span class="clickable" onclick="build_interface(true,'fr_975')">Saint-Pierre-et-Miquelon (975)</span><br>
			<span class="clickable" onclick="build_interface(true,'fr_976')">Mayotte (976)</span><br>
			<span class="clickable" onclick="build_interface(true,'fr_9778')">Saint-Barthélemy (977)/Saint-Martin (978)</span><br>
			<span class="clickable" onclick="build_interface(true,'fr_986')">Wallis-et-Futuna (986)</span><br>
			<span class="clickable" onclick="build_interface(true,'fr_987')">Polynésie française (987)</span><br>
			<span class="clickable" onclick="build_interface(true,'fr_988')">Nouvelle-Calédonie (988)</span>
		</div>
	</div>
	<script type="application/javascript" src="ope_zones.js"></script> 
	<script type="application/javascript" src="le_script.js"></script> 
</body>
</html>