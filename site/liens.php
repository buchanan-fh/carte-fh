<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$t_start=microtime(true);

$tab_dates_ok=array('201501','201502','201503','201504','201505','201506','201507','201508','201509','201510','201511','201512','201601','201602','201603');
$short_links = array();
$final_links = array();
$all_sup = array();
$nb_ant_sup = array();
$final_result = new StdClass();
$cache_file = 'cache/cache_url_photo.txt';
$lock=false;

if(array_search($_GET['date'],$tab_dates_ok)!==FALSE && $lock==false){

	if(isset($_GET["avec_photo"]) && isset($_GET["sans_photo"]) && ($_GET["avec_photo"] * $_GET["sans_photo"] == 0)){
		$skip_photo=false;
		$sans_photo=($_GET["sans_photo"]==1);
		$avec_photo=($_GET["avec_photo"]==1);
		$liste_no_sup_photo = unserialize(file_get_contents($cache_file));
		
		$curl=curl_init();
		curl_setopt($curl,CURLOPT_URL,'https://carte-fh.lafibre.info/regen_cache_pic.php');
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_TIMEOUT_MS, 10);
		$return = curl_exec($curl);
		curl_close($curl);
	}else{
		$skip_photo=true;
	}
	
	$noms_tile=get_nom_tile();
	$op_liste=explode('|',$_GET['op_liste']);
	if(isset($_GET['prop_liste'])){
		$prop_liste=explode('|',$_GET['prop_liste']);
		if(count($prop_liste)==67){
			$skip_prop_sup=true;
		}else{
			$skip_prop_sup=false;
			$prop_liste=array_flip($prop_liste);
		}
	}else{
		$skip_prop_sup=true;
	}
	if(isset($_GET['nat_liste'])){
		$nat_liste=explode('|',$_GET['nat_liste']);
		if(count($nat_liste)==36){
			$skip_nat_sup=true;
		}else{
			$skip_nat_sup=false;
			$nat_liste=array_flip($nat_liste);
		}
	}else{
		$skip_nat_sup=true;
	}
	
	$checked_links=array();
	
	foreach($op_liste as $i_ope){
		foreach($noms_tile as $nom_tile){
			if(file_exists($_GET['date'].'/liens_'.$nom_tile.'_'.$i_ope.'.txt')){
				$le_fichier=fopen($_GET['date'].'/liens_'.$nom_tile.'_'.$i_ope.'.txt','r');
				while(!feof($le_fichier)){
					$la_ligne=fgets($le_fichier);
					if(!empty($la_ligne)){
						$les_champs=explode('|',$la_ligne);
						if(CohenSutherlandModif($les_champs[1],$les_champs[3],$les_champs[0],$les_champs[2])){
							if(((int)$les_champs[7] & (int)$_GET['status'] & 3) && ((int)$les_champs[7] & (int)$_GET['status'] & 12)){
								if((int)$les_champs[6] & (int)$_GET['bande_code']){
									if(!isset($checked_links[$les_champs[10]])){
										$checked_links[$les_champs[10]]=true;
										$tab_nos_sup=explode(',',$les_champs[9]);
										$tab_prop_sup=explode(',',$les_champs[11]);
										$tab_nat_sup=explode(',',trim($les_champs[12]));
										for($i_sup=count($tab_nos_sup)-1;$i_sup>=0;--$i_sup){
											if($skip_photo || ($sans_photo && isset($liste_no_sup_photo[$tab_nos_sup[$i_sup]])==false) || ($avec_photo && isset($liste_no_sup_photo[$tab_nos_sup[$i_sup]]))){
												if($skip_prop_sup || isset($prop_liste[$tab_prop_sup[$i_sup]])){
													if($skip_nat_sup || isset($nat_liste[$tab_nat_sup[$i_sup]])){
														$code_sup='s'.$tab_nos_sup[$i_sup];
														if(isset($all_sup[$code_sup])){
															$all_sup[$code_sup] += 1;
														}else{
															$all_sup[$code_sup] = 1;
														}
													}
												}
											}
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

	arsort($all_sup);
	
	$limitation_act=false;
	$nb_limite=(int)$_GET['limit'];
	if($nb_limite<count($all_sup) && $nb_limite>0){
		$nb_ant_prec=0;
		$keys=array_keys($all_sup);
		$nb_keys=count($keys);
		for($i=0;$i<$nb_keys;++$i){
			if($i>=$nb_limite && $all_sup[$keys[$i]]<$nb_ant_prec){
				$limitation_act=true;
				break;
			}else{
				$nb_ant_prec=$all_sup[$keys[$i]];
			}
		}
		$all_sup=array_slice($all_sup,0,$i,true);
		unset($keys);
	}
	
	$all_sup_final=array();
	$checked_links=array();
	$d_min=7*28284/pow(2,(int)$_GET['zoom']+8);	
	foreach($op_liste as $i_ope){
		foreach($noms_tile as $nom_tile){
			if(file_exists($_GET['date'].'/liens_'.$nom_tile.'_'.$i_ope.'.txt')){
				$le_fichier=fopen($_GET['date'].'/liens_'.$nom_tile.'_'.$i_ope.'.txt','r');
				while(!feof($le_fichier)){
					$la_ligne=fgets($le_fichier);
					if(!empty($la_ligne)){
						$les_champs=explode('|',$la_ligne);
						if(!isset($checked_links[$les_champs[10]])){
							$checked_links[$les_champs[10]]=true;
							$tab_nos_sup=explode(',',$les_champs[9]);
							$flag_ajoute=false;
							for($i_sup=count($tab_nos_sup)-1;$i_sup>=0;--$i_sup){
								$code_sup='s'.$tab_nos_sup[$i_sup];
								if(isset($all_sup[$code_sup])){
									if(is_numeric($all_sup[$code_sup])){
										if(ComputeOutCode((float)$les_champs[1+2*$i_sup],(float)$les_champs[2*$i_sup])){
											$all_sup[$code_sup]='outside';
										}else{
											$les_prop=explode(',',$les_champs[11]);
											$all_sup_final[$code_sup] = array('coords' => array((float)$les_champs[2*$i_sup],(float)$les_champs[1+2*$i_sup]), 'nb_ant' => $all_sup[$code_sup], 'prop' => (int)$les_prop[$i_sup]);
											$all_sup[$code_sup]='inside';
										}
									}
									if(!$flag_ajoute){
										if(CohenSutherlandModif($les_champs[1],$les_champs[3],$les_champs[0],$les_champs[2])){
											if (((int)$les_champs[7] & (int)$_GET['status'] & 12) && ((int)$les_champs[7] & (int)$_GET['status'] & 3)){
												if ((int)$les_champs[6] & (int)$_GET['bande_code']){
													if(count($tab_nos_sup)>1){
														$code_lien=str_replace(',','_',$les_champs[10]);
													}else{
														$code_lien=$les_champs[10].'_';
													}
													if((float)$les_champs[8]>=$d_min){
														$final_links[$code_lien] = array('coords' => array(array((float)$les_champs[0],(float)$les_champs[1]),array((float)$les_champs[2],(float)$les_champs[3])), 'ope' => (int)$les_champs[4], 'syst' => (int)$les_champs[5], 'band' => (int)$les_champs[6], 'stat' => (int)$les_champs[7], 'nos_sup' => array_map('floatval',explode(',',$les_champs[9])), 'nos_ant' => array_map('floatval',explode(',',$les_champs[10])));
													}else{
														$short_links[$code_lien] = array('coords' => array(array((float)$les_champs[0],(float)$les_champs[1]),array((float)$les_champs[2],(float)$les_champs[3])), 'ope' => (int)$les_champs[4], 'syst' => (int)$les_champs[5], 'band' => (int)$les_champs[6], 'stat' => (int)$les_champs[7], 'nos_sup' => array_map('floatval',explode(',',$les_champs[9])), 'nos_ant' => array_map('floatval',explode(',',$les_champs[10])));
													}
													$flag_ajoute=true;
												}
											}
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
	
	if(((count($short_links)+count($final_links))<=(3*$nb_limite))||$nb_limite==0){
		$final_links=array_merge($final_links,$short_links);
	}else{
		$limitation_act=true;
	}
	
	$final_result->liens = $final_links;
	$final_result->supports = $all_sup_final;
	$final_result->full = 0;
	$final_result->limitation_act = $limitation_act;
	$final_result->tiles = $noms_tile;
	$final_result->nb_ant_max = $all_sup_final[array_shift(array_keys($all_sup,'inside'))]['nb_ant'];
	$final_result->nb_ant_min = $all_sup_final[array_pop(array_keys($all_sup,'inside'))]['nb_ant'];
	$final_result->ind_req = $_GET['req'];
	$final_result->ex_time = floor(1000*(microtime(true)-$t_start));
	echo json_encode($final_result);
}else{
	$final_result->liens = $final_links;
	$final_result->supports = $all_sup_final;
	$final_result->full = -1;
	$final_result->limitation_act = false;
	$final_result->tiles = array();
	$final_result->nb_ant_max = 0;
	$final_result->nb_ant_min = 0;
	$final_result->ind_req = $_GET['req'];
	$final_result->ex_time = floor(1000*(microtime(true)-$t_start));
	echo json_encode($final_result);
}


function overlap($p_lon1,$p_lon2,$p_lat1,$p_lat2){
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
	$separe=($p_left > $_GET['east']) || ($p_right < $_GET['west']) || ($p_bottom > $_GET['north']) || ($p_top < $_GET['south']);
	return (!$separe);
}

function CohenSutherlandModif($p_lon1,$p_lon2,$p_lat1,$p_lat2){
	$outcode1=ComputeOutCode($p_lon1,$p_lat1);
	if($outcode1==0){
		return true;
		break;
	}
	$outcode2=ComputeOutCode($p_lon2,$p_lat2);
	if($outcode2==0){
		return true;
		break;
	}
	if($outcode1 & $outcode2){
		return false;
		break;
	}
	while(true){
		if($outcode1==0 || $outcode2==0){
			return true;
			break;
		}elseif($outcode1 & $outcode2){
			return false;
			break;
		}else{
			$outcodeOut = $outcode1 ? $outcode1 : $outcode2;
			if($outcodeOut & 8){
				$n_lon=$p_lon1+($p_lon2-$p_lon1)*($_GET['north']-$p_lat1)/($p_lat2-$p_lat1);
				$n_lat=$_GET['north'];
			}elseif($outcodeOut & 4){
				$n_lon=$p_lon1+($p_lon2-$p_lon1)*($_GET['south']-$p_lat1)/($p_lat2-$p_lat1);
				$n_lat=$_GET['south'];
			}elseif($outcodeOut & 2){
				$n_lat=$p_lat1+($p_lat2-$p_lat1)*($_GET['east']-$p_lon1)/($p_lon2-$p_lon1);
				$n_lon=$_GET['east'];
			}elseif($outcodeOut & 1){
				$n_lat=$p_lat1+($p_lat2-$p_lat1)*($_GET['west']-$p_lon1)/($p_lon2-$p_lon1);
				$n_lon=$_GET['west'];
			}
			if($outcodeOut==$outcode1){
				$p_lon1=$n_lon;
				$p_lat1=$n_lat;
				$outcode1=ComputeOutCode($p_lon1,$p_lat1);
			}else{
				$p_lon2=$n_lon;
				$p_lat2=$n_lat;
				$outcode2=ComputeOutCode($p_lon2,$p_lat2);
			}
		}
	}
}
function ComputeOutCode($p_lon,$p_lat){
	$p_code=0;
	if($p_lon<$_GET['west']){
		$p_code |= 1;
	}elseif($p_lon>$_GET['east']){
		$p_code |= 2;
	}
	if($p_lat<$_GET['south']){
		$p_code |= 4;
	}elseif($p_lat>$_GET['north']){
		$p_code |= 8;
	}
	return $p_code;
}

function get_nom_tile(){
	$tiles=array();
	$tiles["11"]=array(-180,1,46.7,90);
	$tiles["12"]=array(1,4.5,46.7,90);
	$tiles["13"]=array(4.5,180,46.7,90);
	$tiles["21"]=array(-180,1,-90,46.7);
	$tiles["22"]=array(1,4.5,-90,46.7);
	$tiles["23"]=array(4.5,180,-90,46.7);	
	$noms_tiles=array();
	foreach($tiles as $nom_tile => $coords_tile){
		if(overlap($coords_tile[0],$coords_tile[1],$coords_tile[2],$coords_tile[3],$_GET['west'],$_GET['east'],$_GET['north'],$_GET['south'])){
			$noms_tiles[]=$nom_tile;
		}
	}
	return $noms_tiles;
}
?>