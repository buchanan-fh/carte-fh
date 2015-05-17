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
	?>);">
	<div id="detail_sup">
		<div id="d_sup">
			<div id="d_titre" class="p_titre"></div>
			<div id="d_adresse" class="p_adresse"></div>
			<div id="d_ant"></div>
			<div id="d_num_sup" class="p_num_sup"></div>
		</div>
		<img id="photo_large">
	</div>
	<div id="map_global">
		<div id="map_canvas"></div>
		<div id="controle_right"> 
			<div class="box_right"> 
				<table class="tab_col">
					<tr>
						<td class="ligne_plus"><input id="button_moins" type="button" value="<<" onclick="date_moins()"></td>
						<td class="ligne_plus" id="date_select"></td>
						<td class="ligne_plus"><input id="button_plus" type="button" value=">>" onclick="date_plus()" disabled></td>
					</tr>
				</table>
			</div>
			<div class="box_right">
				<table class="tab_col">
					<tr>
						<td class="ligne_plus">Recherche par n°</td>
						<td class="toggle" id="toggle_search" onclick="toggle_search()">+</td>
					</tr>
				</table>
				<table class="tab_col tab_cache" id="tab_search">
					<tr>
						<td class="ligne_simple">Support:</td>
					</tr>
					<tr>
						<td><input type="text" class="champ_recherche" id="no_sup_rech" onkeydown="if(event.keyCode==13){recherche_sup();}"></td>
						<td onclick="recherche_sup()"><img class="img_click" src="loupe.png" alt="l"></td>
					</tr>
				</table>
			</div>
			<div class="box_right">
				<table class="tab_col">
					<tr>
						<td class="ligne_plus">Bande de fréquence</td>
						<td class="toggle" id="toggle_bandes" onclick="toggle_bandes()">+</td>
					</tr>
				</table>
				<table class="tab_col tab_cache" id="shortcut_bandes">
					<tr >
						<td class="ligne_plus"><input type="button" id="check_all_bandes" value="Toutes" onclick="check_all_bandes()"></td>
						<td class="ligne_plus"><input type="button" id="check_no_bande" value="Aucune" onclick="check_no_bande()"></td>
					</tr>
				</table>
				<table class="tab_col tab_cache" id="tab_bandes">
					<tr>
						<td><input type="checkbox" id="check_bande_0" onclick="ajax()" checked></td>
						<td>X</td>
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
			</div>
			<div class="box_right">
				<table class="tab_col">
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
						<td><input type="checkbox" id="check_supports" onclick="redraw()" checked></td>
						<td>Supports</td>
					</tr>
				</table>
			</div>
		</div>
		<div id="controle_left"> 
			<div class="box_left" id="status"> 
				<table class="tab_col">
					<tr>
						<td class="ligne_plus" width="20%" id="loading"></td>
						<td class="ligne_plus" width="60%" id="zoom_level" align="center"></td>
						<td class="ligne_plus" width="20%" id="info" align="center" onclick="affichage_credits();"><img class="img_click" src="info.png" alt="i"></td>
					</tr>
				</table>
			</div>
			<div class="box_left">
				<table class="tab_col">
					<tr>
						<td class="ligne_plus">Limitation d'affichage</td>
						<td class="toggle" id="toggle_lim_aff" onclick="toggle_lim_aff()">+</td>
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
				</table>
				<table class="tab_col">
					<tr>
						<td colspan="2" class="ligne_plus" id="aff_restreint"></td>
					</tr>
					<tr>
						<td colspan="2" class="ligne_simple" id="aff_nb_liens"></td>
					</tr>
					<tr>
						<td colspan="2" class="ligne_simple" id="aff_nb_supports"></td>
					</tr>
				</table>
			</div>
			<div class="box_left">
				<table class="tab_col">
					<tr>
						<td class="ligne_plus" width="80%" id="nom_zone" onclick="choix_zone();"></td>
						<td class="ligne_plus" width="20%" align="center" onclick="choix_zone();"><img class="img_click" src="world.png" alt="w"></td>
					</tr>
				</table>
			</div>
			<div class="box_left">
				<table class="tab_col" id="tab_ope_main"></table>
				<table class="tab_col">
					<tr>
						<td class="check_cell"><input type="checkbox" id="check_op_autres" onclick="click_autres_ope()" checked></td>
						<td><span class="leg" id="leg_autres">&#x25FC;</span> Autres</td>
						<td class="toggle" id="toggle_autres_op" onclick="toggle_autres_ope()">+</td>
					</tr>
				</table>
				<table class="tab_col tab_cache" id="shortcut_autres_ope">
					<tr >
						<td class="ligne_plus"><input type="button" id="check_all_autres_op" value="Tous" onclick="check_all_autres_op()"></td>
						<td class="ligne_plus"><input type="button" id="check_no_autre_op" value="Aucun" onclick="check_no_autre_op()"></td>
					</tr>
				</table>
				<table class="tab_col_sub tab_cache" id="tab_autres_ope"></table>
			</div> 
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
	<script type="application/javascript" src="ope_zones.js"></script> 
	<script type="application/javascript" src="le_script.js"></script> 
</body>
</html>