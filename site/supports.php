<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$obj_sup = new StdClass();
$flag_trouve_sup=false;
date_default_timezone_set('Europe/Paris');

if(!isset($_GET["date"])){
	$date_c=date("Y").date("m");
	$date_c_1=date("Y",time()-30*24*3600).date("m",time()-30*24*3600);
	if(file_exists($date_c."/supports.txt")){
		$_GET["date"]=$date_c;
	}elseif(file_exists($date_c_1."/supports.txt")){
		$_GET["date"]=$date_c_1;
	}else{
		$_GET["date"]="201508";
	}
}

if(isset($_GET["no_sup"]) && file_exists($_GET["date"]."/supports.txt")){
	$le_fichier_sup=fopen($_GET["date"]."/supports.txt","r");
	while(!$flag_trouve_sup && !feof($le_fichier_sup)){
		$la_ligne=fgets($le_fichier_sup);
		$les_champs=explode("|",$la_ligne);
		if($les_champs[0]==$_GET["no_sup"]){
			$flag_trouve_sup=true;
		}
	}
	fclose($le_fichier_sup);
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
}else{
	$obj_sup->no_sup=0;
	$obj_sup->coords="";
	$obj_sup->adresse="";
	$obj_sup->c_post="";
	$obj_sup->commune="";
	$obj_sup->prop="";
	$obj_sup->type="";
	$obj_sup->nom_prop="";
}

$obj_sup->antennes=array();
if(isset($_GET["liste_ant"]) && $_GET["liste_ant"]=="1"){
	$op_liste=explode("|",$_GET["op_liste"]);
	if(file_exists($_GET["date"]."/antennes.txt")){
		$le_fichier_ant=fopen($_GET["date"]."/antennes.txt","r");
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
?>