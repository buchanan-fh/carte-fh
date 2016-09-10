<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$obj_sup = new StdClass();
$flag_trouve_sup=false;
$cache_file = 'cache/cache_url_photo.txt';
date_default_timezone_set('Europe/Paris');

if(isset($_GET["no_sup"]) && isset($_GET["date"])){
	$search_forward=true;
	$date_current=$_GET["date"];
	$date_found='';
	while($search_forward && !$flag_trouve_sup){
		if(file_exists($date_current."/supports.txt")){
			$le_fichier_sup=fopen($date_current."/supports.txt","r");
			while(!$flag_trouve_sup && !feof($le_fichier_sup)){
				$la_ligne=fgets($le_fichier_sup);
				$les_champs=explode("|",$la_ligne);
				if($les_champs[0]==$_GET["no_sup"]){
					$flag_trouve_sup=true;
					$date_found=$date_current;
				}
			}
			fclose($le_fichier_sup);
			$date_current=date_plus($date_current);
		}else{
			$search_forward=false;
		}
	}
	if(!$flag_trouve_sup){
		$search_backward=true;
		$date_current=date_moins($_GET["date"]);
		while($search_backward && !$flag_trouve_sup){
			if(file_exists($date_current."/supports.txt")){
				$le_fichier_sup=fopen($date_current."/supports.txt","r");
				while(!$flag_trouve_sup && !feof($le_fichier_sup)){
					$la_ligne=fgets($le_fichier_sup);
					$les_champs=explode("|",$la_ligne);
					if($les_champs[0]==$_GET["no_sup"]){
						$flag_trouve_sup=true;
						$date_found=$date_current;
					}
				}
				fclose($le_fichier_sup);
				$date_current=date_moins($date_current);
			}else{
				$search_backward=false;
			}
		}
	}
}

if($flag_trouve_sup==true){
	$obj_sup->no_sup=(int)$les_champs[0];
	$obj_sup->coords=array((float)$les_champs[7],(float)$les_champs[8]);
	$obj_sup->adresse=$les_champs[1];
	$obj_sup->c_post=$les_champs[2];
	$obj_sup->commune=$les_champs[3];
	$obj_sup->prop=$les_champs[4];
	$obj_sup->type=$les_champs[5];
	$obj_sup->nom_prop=$les_champs[6];
	$obj_sup->hauteur=(float)$les_champs[9];
	$obj_sup->url_photo_small="";
	$obj_sup->url_photo_det="";
	$obj_sup->url_cat_photo="";
	$obj_sup->date_found=$date_found;
}else{
	$obj_sup->no_sup=0;
	$obj_sup->coords="";
	$obj_sup->adresse="";
	$obj_sup->c_post="";
	$obj_sup->commune="";
	$obj_sup->prop="";
	$obj_sup->type="";
	$obj_sup->nom_prop="";
	$obj_sup->hauteur=0;
	$obj_sup->url_photo_small="";
	$obj_sup->url_photo_det="";
	$obj_sup->url_cat_photo="";
	$obj_sup->date_found='';
}

$flag_regen_cache=false;
if($flag_trouve_sup){
	
	$tab_sup_url = unserialize(file_get_contents($cache_file));
	if(isset($tab_sup_url[(int)$les_champs[0]])){
		$obj_sup->url_photo_small=$tab_sup_url[(int)$les_champs[0]]->url_photo_small;
		$obj_sup->url_photo_det=$tab_sup_url[(int)$les_champs[0]]->url_photo_det;
		$obj_sup->url_cat_photo=$tab_sup_url[(int)$les_champs[0]]->url_cat_photo;
	}
	
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_URL,'https://carte-fh.lafibre.info/regen_cache_pic.php');
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_TIMEOUT_MS, 100);
	$return = curl_exec($curl);
	curl_close($curl);
}

$obj_sup->antennes=array();
if($flag_trouve_sup==true && isset($_GET["liste_ant"]) && $_GET["liste_ant"]=="1"){
	$op_liste=explode("|",$_GET["op_liste"]);
	if(file_exists($date_found."/antennes.txt")){
		$le_fichier_ant=fopen($date_found."/antennes.txt","r");
		while(!feof($le_fichier_ant)){
			$la_ligne=fgets($le_fichier_ant);
			if(!empty($la_ligne)){
				$les_champs=explode('|',$la_ligne);
				if($les_champs[1]==$_GET['no_sup']){
					if(in_array((int)$les_champs[4],$op_liste)){
						if((int)$les_champs[7]  & (int)$_GET['status'] & 12){
							if((int)$les_champs[6] & (int)$_GET['bande_code']){
								//--
								$elts=explode('|',$la_ligne);
								$array_ant=array();
								for($i=0;$i<8;++$i){
									array_push($array_ant,(float)$elts[$i]);
								}
								if(count($elts)>8){
									array_push($array_ant,$elts[8]);
									array_push($array_ant,(float)$elts[9]);
								}
								array_push($obj_sup->antennes,$array_ant);
								//array_push($obj_sup->antennes,array_map('floatval',explode("|",$la_ligne)));
							}
						}
					}
				}
			}
		}
		fclose($le_fichier_ant);	
	}
}

echo json_encode($obj_sup);

function date_plus($date){
	$year=intval(substr($date,0,4));
	$month=intval(substr($date,4,2));
	if($month==12){
		return strval($year+1).'01';
	}else{
		if($month<9){
			return strval($year).'0'.strval($month+1);
		}else{
			return strval($year).strval($month+1);
		}
	}
}
function date_moins($date){
	$year=intval(substr($date,0,4));
	$month=intval(substr($date,4,2));
	if($month==1){
		return strval($year-1).'12';
	}else{
		if($month<11){
			return strval($year).'0'.strval($month-1);
		}else{
			return strval($year).strval($month-1);
		}
		
	}
}
?>