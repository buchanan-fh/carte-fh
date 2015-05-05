<?php
$nb_ope=66;
$etat_init=array();
for($i=0;$i<=$nb_ope;$i++){
	$etat_init[]="checked";
}
if(isset($_GET["op_init"])){
	$_GET["op_init"]=(int)$_GET["op_init"];
	$temoin_op=1;
	for($i=0;$i<=$nb_ope;$i++){
		if($_GET["op_init"] & $temoin_op){
			$etat_init[$i]="checked";
		}else{
			$etat_init[$i]="";
		}
		$temoin_op <<= 1;
	}
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
<body onkeydown="touche_clavier(event)">
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
					<td width="20%" id="loading"></td>
					<td width="60%" id="zoom_level" align="center"></td>
					<td width="20%" id="info" align="center" onclick="affichage_credits();"><img id="img_info" src="info.png" alt="i"></td>
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
					<td class="radio_limit"><input type="radio" name="nb_limit" id="limit_150" onclick="ajax()"></td>
					<td>Après 150 supports</td>
				</tr>
				<tr>
					<td class="radio_limit"><input type="radio" name="nb_limit" id="limit_300" onclick="ajax()" checked></td>
					<td>Après 300 supports</td>
				</tr>
				<tr>
					<td class="radio_limit"><input type="radio" name="nb_limit" id="limit_600" onclick="ajax()"></td>
					<td>Après 600 supports</td>
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
					<td class="check_cell"><input type="checkbox" id="check_op_1" onclick="ajax()" <?php echo $etat_init[1]; ?>></td>
					<td><span class="leg" id="leg_of">&#x25FC;</span> Orange</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_2" onclick="ajax()" <?php echo $etat_init[2]; ?>></td>
					<td><span class="leg" id="leg_sfr">&#x25FC;</span> SFR</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_3" onclick="ajax()" <?php echo $etat_init[3]; ?>></td>
					<td><span class="leg" id="leg_bt">&#x25FC;</span> Bouygues Telecom</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_4" onclick="ajax()" <?php echo $etat_init[4]; ?>></td>
					<td><span class="leg" id="leg_fm">&#x25FC;</span> Free</td>
				</tr>
			</table>
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
			<table class="tab_col_sub tab_cache" id="tab_autres_ope">
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_5" onclick="ajax()" <?php echo $etat_init[5]; ?>></td>
					<td>TDF</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_6" onclick="ajax()" <?php echo $etat_init[6]; ?>></td>
					<td>Towercast</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_7" onclick="ajax()" <?php echo $etat_init[7]; ?>></td>
					<td>Sté de Transport<br>audiovisuel</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_8" onclick="ajax()" <?php echo $etat_init[8]; ?>></td>
					<td>EDF</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_9" onclick="ajax()" <?php echo $etat_init[9]; ?>></td>
					<td>RTE</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_10" onclick="ajax()" <?php echo $etat_init[10]; ?>></td>
					<td>SNCF Réseau</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_11" onclick="ajax()" <?php echo $etat_init[11]; ?>></td>
					<td>Direction Des<br>Routes</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_12" onclick="ajax()" <?php echo $etat_init[12]; ?>></td>
					<td>SANEF</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_13" onclick="ajax()" <?php echo $etat_init[13]; ?>></td>
					<td>CEREMA</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_24" onclick="ajax()" <?php echo $etat_init[24]; ?>></td>
					<td>Completel</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_16" onclick="ajax()" <?php echo $etat_init[16]; ?>></td>
					<td>IMTS</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_26" onclick="ajax()" <?php echo $etat_init[26]; ?>></td>
					<td>R'LAN</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_33" onclick="ajax()" <?php echo $etat_init[33]; ?>></td>
					<td>SYSOCO</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_39" onclick="ajax()" <?php echo $etat_init[39]; ?>></td>
					<td>Talco Languedoc</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_40" onclick="ajax()" <?php echo $etat_init[40]; ?>></td>
					<td>Alsatis Réseaux</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_41" onclick="ajax()" <?php echo $etat_init[41]; ?>></td>
					<td>Wizeo</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_42" onclick="ajax()" <?php echo $etat_init[42]; ?>></td>
					<td>REG.I.E.S</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_44" onclick="ajax()" <?php echo $etat_init[44]; ?>></td>
					<td>GRAM</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_45" onclick="ajax()" <?php echo $etat_init[45]; ?>></td>
					<td>Comm. Infra. UK LTD</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_46" onclick="ajax()" <?php echo $etat_init[46]; ?>></td>
					<td>Global Connect</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_47" onclick="ajax()" <?php echo $etat_init[47]; ?>></td>
					<td>Decyben</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_60" onclick="ajax()" <?php echo $etat_init[60]; ?>></td>
					<td>Custom Connect MW B.V.</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_65" onclick="ajax()" <?php echo $etat_init[65]; ?>></td>
					<td>Latent Networks</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_48" onclick="ajax()" <?php echo $etat_init[48]; ?>></td>
					<td>e-tera</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_49" onclick="ajax()" <?php echo $etat_init[49]; ?>></td>
					<td>Gigalis</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_50" onclick="ajax()" <?php echo $etat_init[50]; ?>></td>
					<td>Optline Service</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_51" onclick="ajax()" <?php echo $etat_init[51]; ?>></td>
					<td>Hub Telecom</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_52" onclick="ajax()" <?php echo $etat_init[52]; ?>></td>
					<td>Sat Consult</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_55" onclick="ajax()" <?php echo $etat_init[55]; ?>></td>
					<td>Nomotech</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_58" onclick="ajax()" <?php echo $etat_init[58]; ?>></td>
					<td>Vannes agglo numérique</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_64" onclick="ajax()" <?php echo $etat_init[64]; ?>></td>
					<td>ITAS TIM</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_14" onclick="ajax()" <?php echo $etat_init[14]; ?>></td>
					<td>Réseau privé</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_66" onclick="ajax()" <?php echo $etat_init[66]; ?>></td>
					<td>Station étrangère</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_17" onclick="ajax()" <?php echo $etat_init[17]; ?>></td>
					<td>(14, 31, 35, 61, 79,<br>85) Altitude Infra.</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_56" onclick="ajax()" <?php echo $etat_init[56]; ?>></td>
					<td>(03, 15, 43, 63) ATHD</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_15" onclick="ajax()" <?php echo $etat_init[15]; ?>></td>
					<td>(19, 23, 87) Axione<br>Limousin</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_53" onclick="ajax()" <?php echo $etat_init[53]; ?>></td>
					<td>(21, 71, 89) Net Bourgogne</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_29" onclick="ajax()" <?php echo $etat_init[29]; ?>></td>
					<td>(07, 26) ADTIM</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_54" onclick="ajax()" <?php echo $etat_init[54]; ?>></td>
					<td>(08) CG 08</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_27" onclick="ajax()" <?php echo $etat_init[27]; ?>></td>
					<td>(12) Net Aveyron</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_59" onclick="ajax()" <?php echo $etat_init[59]; ?>></td>
					<td>(14) Tutor Calvados</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_18" onclick="ajax()" <?php echo $etat_init[18]; ?>></td>
					<td>(17) 17 Numérique</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_28" onclick="ajax()" <?php echo $etat_init[28]; ?>></td>
					<td>(18) Cher haut débit</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_63" onclick="ajax()" <?php echo $etat_init[63]; ?>></td>
					<td>(22) Armor connectic</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_21" onclick="ajax()" <?php echo $etat_init[21]; ?>></td>
					<td>(27) Eurek@</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_19" onclick="ajax()" <?php echo $etat_init[19]; ?>></td>
					<td>(29) Axione</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_43" onclick="ajax()" <?php echo $etat_init[43]; ?>></td>
					<td>(37) TMN</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_30" onclick="ajax()" <?php echo $etat_init[30]; ?>></td>
					<td>(39) CG 39</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_22" onclick="ajax()" <?php echo $etat_init[22]; ?>></td>
					<td>(45) Medialys</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_25" onclick="ajax()" <?php echo $etat_init[25]; ?>></td>
					<td>(47) SDNum</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_61" onclick="ajax()" <?php echo $etat_init[61]; ?>></td>
					<td>(48) Net 48</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_31" onclick="ajax()" <?php echo $etat_init[31]; ?>></td>
					<td>(49) Melis@</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_62" onclick="ajax()" <?php echo $etat_init[62]; ?>></td>
					<td>(50) Manche numérique</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_32" onclick="ajax()" <?php echo $etat_init[32]; ?>></td>
					<td>(55) Net 55</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_23" onclick="ajax()" <?php echo $etat_init[23]; ?>></td>
					<td>(58) NiverTel</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_34" onclick="ajax()" <?php echo $etat_init[34]; ?>></td>
					<td>(64) IRIS 64</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_35" onclick="ajax()" <?php echo $etat_init[35]; ?>></td>
					<td>(65) HPN</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_36" onclick="ajax()" <?php echo $etat_init[36]; ?>></td>
					<td>(67) Net 67</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_20" onclick="ajax()" <?php echo $etat_init[20]; ?>></td>
					<td>(72) SARTEL</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_37" onclick="ajax()" <?php echo $etat_init[37]; ?>></td>
					<td>(77) Sem@for</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_57" onclick="ajax()" <?php echo $etat_init[57]; ?>></td>
					<td>(84) Vaucluse numérique</td>
				</tr>
				<tr>
					<td class="check_cell"><input type="checkbox" id="check_op_38" onclick="ajax()" <?php echo $etat_init[38]; ?>></td>
					<td>(86) Bollore Telecom</td>
				</tr>
			</table>
		</div> 
	</div>
	<div id="credits" onclick="affichage_credits();">
	Cette carte est réalisée à partir de données issues de <a href="http://www.cartoradio.fr">Cartoradio</a>.<br><br>Mes remerciements à <a href="https://twitter.com/MarinMoulinier">Marin</a>, <a href="https://twitter.com/_GaLaK_">Nicolas</a>, <a href="https://twitter.com/Network_Addict">Thomas</a>, <a href="https://twitter.com/lafibreinfo">Vivien</a>, <a href="https://twitter.com/Chairdan">Vince</a> pour leur collaboration.<br><br>Contact, remarques, signalements de bugs: <a href="https://twitter.com/buchanan_">@buchanan_</a>, ou sur <a href=https://lafibre.info/4g/site-de-cartographie-des-faisceaux-hertziens-bugs-idees-damelioration/>lafibre.info</a>.
	</div>
	<script type="application/javascript" src="le_script.js"></script> 
</body>
</html>