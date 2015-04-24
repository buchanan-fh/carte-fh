<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$t_start=microtime(true);

$tab_dates_ok=array("201501","201502","201503","201504");
$all_links = array();
$short_links = array();
$final_links = array();
$all_sup = array();
$nb_ant_sup = array();
$final_result = new StdClass();

if(array_search($_GET["date"],$tab_dates_ok)!==FALSE){

	$nom_tile=get_nom_tile($_GET["west"],$_GET["east"],$_GET["north"],$_GET["south"]);
	$op_liste=explode("|",$_GET["op_liste"]);
	
	for($i_ope=1;$i_ope<5;$i_ope++){
		if(in_array($i_ope,$op_liste)){
			if(file_exists($_GET["date"]."/liens_".$nom_tile."_".$i_ope.".json")){
				$le_fichier=fopen($_GET["date"]."/liens_".$nom_tile."_".$i_ope.".json","r");
				$last_sups=array();
				while(!feof($le_fichier)){
					$la_ligne=stream_get_line($le_fichier,10000,"\r\n");
					if($la_ligne!=""){
						$les_champs=explode("|",$la_ligne);
						if(overlap($les_champs[1],$les_champs[3],$les_champs[0],$les_champs[2],$_GET["west"],$_GET["east"],$_GET["north"],$_GET["south"])){
							if(((int)$les_champs[7] & (int)$_GET["status"] & 3) && ((int)$les_champs[7] & (int)$_GET["status"] & 12)){
								if((int)$les_champs[6] & (int)$_GET["bande_code"]){
									$tab_nos_sup=explode(",",$les_champs[9]);
									for($i_sup=count($tab_nos_sup)-1;$i_sup>=0;--$i_sup){
										$code_sup="s".$tab_nos_sup[$i_sup];
										if(isset($all_sup[$code_sup])){
											$all_sup[$code_sup]["nb_ant"] += 1;
										}else{
											$les_prop=explode(",",$les_champs[11]);
											$all_sup[$code_sup] = array("coords" => array((float)$les_champs[0+2*$i_sup],(float)$les_champs[1+2*$i_sup],0), "nb_ant" => 1, "prop" => (int)$les_prop[$i_sup]);
										}									
									}
								}
							}
						}
					}
				}
				fclose($le_fichier);
			}
		}
	}

	foreach($all_sup as $sup_tab){
		$nb_ant_sup[]=$sup_tab["nb_ant"];
	}
	array_multisort($nb_ant_sup,SORT_DESC,$all_sup);
	unset($nb_ant_sup);
	
	$limitation_act=false;
	$nb_limite=(int)$_GET["limit"];
	if($nb_limite<count($all_sup)){
		$nb_ant_prec=0;
		$keys=array_keys($all_sup);
		$nb_keys=count($keys);
		for($i=0;$i<$nb_keys;++$i){
			if($i>=$nb_limite && $all_sup[$keys[$i]]["nb_ant"]<$nb_ant_prec){
				$limitation_act=true;
				break;
			}else{
				$nb_ant_prec=$all_sup[$keys[$i]]["nb_ant"];
			}
		}
		$all_sup=array_slice($all_sup,0,$i,true);
	}
	unset($keys);
	
	$d_min=7*28284/pow(2,(int)$_GET["zoom"]+8);	
	for($i_ope=1;$i_ope<5;$i_ope++){
		if(in_array($i_ope,$op_liste)){
			if(file_exists($_GET["date"]."/liens_".$nom_tile."_".$i_ope.".json")){
				$le_fichier=fopen($_GET["date"]."/liens_".$nom_tile."_".$i_ope.".json","r");
				while(!feof($le_fichier)){
					$la_ligne=stream_get_line($le_fichier,10000,"\r\n");
					if($la_ligne!=""){
						$les_champs=explode("|",$la_ligne);
						$tab_nos_sup=explode(",",$les_champs[9]);
						for($i_sup=count($tab_nos_sup)-1;$i_sup>=0;--$i_sup){
							if(isset($all_sup["s".$tab_nos_sup[$i_sup]])){
								if(overlap($les_champs[1],$les_champs[3],$les_champs[0],$les_champs[2],$_GET["west"],$_GET["east"],$_GET["north"],$_GET["south"])){
									if (((int)$les_champs[7] & (int)$_GET["status"] & 12) && ((int)$les_champs[7] & (int)$_GET["status"] & 3)){
										if ((int)$les_champs[6] & (int)$_GET["bande_code"]){
											if(count($tab_nos_sup)>1){
												$code_lien=str_replace(",","_",$les_champs[10]);
											}else{
												$code_lien=$les_champs[10]."_";
											}
											if((float)$les_champs[8]>=$d_min){
												$final_links[$code_lien] = array("coords" => array(array((float)$les_champs[0],(float)$les_champs[1],0),array((float)$les_champs[2],(float)$les_champs[3],0)), "ope" => (int)$les_champs[4], "syst" => (int)$les_champs[5], "band" => (int)$les_champs[6], "stat" => (int)$les_champs[7], "lon" => (int)$les_champs[8], "nos_sup" => array_map("floatval",explode(",",$les_champs[9])), "nos_ant" => array_map("floatval",explode(",",$les_champs[10])));
											}else{
												$short_links[$code_lien] = array("coords" => array(array((float)$les_champs[0],(float)$les_champs[1],0),array((float)$les_champs[2],(float)$les_champs[3],0)), "ope" => (int)$les_champs[4], "syst" => (int)$les_champs[5], "band" => (int)$les_champs[6], "stat" => (int)$les_champs[7], "lon" => (int)$les_champs[8], "nos_sup" => array_map("floatval",explode(",",$les_champs[9])), "nos_ant" => array_map("floatval",explode(",",$les_champs[10])));
											}
										}
									}
								}
								break;
							}
						}
					}
				}
				fclose($le_fichier);
			}
		}
	}
	
	if((count($short_links)+count($final_links))<=(3*(int)$_GET["limit"])){
		$final_links=array_merge($final_links,$short_links);
	}else{
		$limitation_act=true;
	}
	
	$final_result->ex_time = floor(1000*(microtime(true)-$t_start));
	$final_result->liens = $final_links;
	$final_result->supports = $all_sup;
	$final_result->full = 0;
	$final_result->limitation_act = $limitation_act;
	$final_result->tile = $nom_tile;
	$premier_sup=reset($all_sup);
	$final_result->nb_ant_max = $premier_sup["nb_ant"];
	$dernier_sup=end($all_sup);
	$final_result->nb_ant_min = $dernier_sup["nb_ant"];
	$final_result->ind_req = $_GET["req"];
	
	echo json_encode($final_result);
}else{
	$final_result->liens = $final_links;
	$final_result->supports = $all_sup;
	$final_result->full = -1;
	$final_result->limitation_act = false;
	$final_result->tile = 0;
	$final_result->nb_ant_max = 0;
	$final_result->nb_ant_min = 0;
	$final_result->ex_time = floor(1000*(microtime(true)-$t_start));
	$final_result->ind_req = $_GET["req"];
	echo json_encode($final_result);
}


function overlap($p_lon1,$p_lon2,$p_lat1,$p_lat2,$b_west,$b_east,$b_north,$b_south){
	if ($p_lon1<=$p_lon2) {
		$p_left=$p_lon1;
		$p_right=$p_lon2;
	} else{
		$p_left=$p_lon2;
		$p_right=$p_lon1;
	}	
	if ($p_lat1<=$p_lat2) {
		$p_bottom=$p_lat1;
		$p_top=$p_lat2;
	} else{
		$p_bottom=$p_lat2;
		$p_top=$p_lat1;
	}
	$separe=($p_left > $b_east) || ($p_right < $b_west) || ($p_bottom > $b_north) || ($p_top < $b_south);
	return (!$separe);
}

function get_nom_tile($b_west,$b_east,$b_north,$b_south){
	if($b_east<=1 && $b_south>=46.7){
		return "11";
	}else if($b_west>1 && $b_east<=4.5 && $b_south>=46.7){
		return "12";
	}else if($b_west>4.5 && $b_south>=46.7){
		return "13";
	}else if($b_east<=1 && $b_north<46.7){
		return "21";
	}else if($b_west>1 && $b_east<=4.5 && $b_north<46.7){
		return "22";
	}else if($b_west>4.5 && $b_north<46.7){
		return "23";
	}else if($b_north<47.9){
		return "2";
	}else if($b_south>=45.4){
		return "1";
	}else{
		return "0";
	}
}
?>
