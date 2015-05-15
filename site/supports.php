<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$obj_sup = new StdClass();
$flag_trouve_sup=false;
if(file_exists($_GET["date"]."/supports.json")){
	$le_fichier_sup=fopen($_GET["date"]."/supports.json","r");
	while(!$flag_trouve_sup && !feof($le_fichier_sup)){
		$la_ligne=stream_get_line($le_fichier_sup,10000,"\r\n");
		$les_champs=explode("|",$la_ligne);
		if($les_champs[0]==$_GET["no_sup"]){
			$flag_trouve_sup=true;
		}
	}
	fclose($le_fichier_sup);
}
if($flag_trouve_sup==true){
	if(file_exists("photos/".$_GET["no_sup"].".jpg")){
		$img_disp=1;
		$img_url="photos/".$_GET["no_sup"].".jpg";
	}else{
		$img_disp=0;
		$img_url="";
	}
	$obj_sup->no_sup=(int)$les_champs[0];
	$obj_sup->coords=array((float)$les_champs[7],(float)$les_champs[8],0);
	$obj_sup->img_disp=$img_disp;
	$obj_sup->img_url=$img_url;
	$obj_sup->adresse=$les_champs[1];
	$obj_sup->c_post=$les_champs[2];
	$obj_sup->commune=$les_champs[3];
	$obj_sup->prop=$les_champs[4];
	$obj_sup->type=$les_champs[5];
	$obj_sup->nom_prop=$les_champs[6];
}else{
	$obj_sup->no_sup=0;
	$obj_sup->coords="";
	$obj_sup->img_disp=0;
	$obj_sup->img_url="";
	$obj_sup->adresse="";
	$obj_sup->c_post="";
	$obj_sup->commune="";
	$obj_sup->prop="";
	$obj_sup->type="";
	$obj_sup->nom_prop="";
}

$obj_sup->antennes=array();
$op_liste=explode("|",$_GET["op_liste"]);
if($_GET["liste_ant"]=="1"){
	if(file_exists($_GET["date"]."/antennes.json")){
		$le_fichier_ant=fopen($_GET["date"]."/antennes.json","r");
		while(!feof($le_fichier_ant)){
			$la_ligne=stream_get_line($le_fichier_ant,10000,"\r\n");
			if($la_ligne!=""){
				$les_champs=explode("|",$la_ligne);
				if($les_champs[1]==$_GET["no_sup"]){
					if(in_array((int)$les_champs[4],$op_liste)){
						if((int)$les_champs[7]  & (int)$_GET["status"] & 12){
							if((int)$les_champs[6] & (int)$_GET["bande_code"]){
								array_push($obj_sup->antennes,array_map('floatval',explode("|",$la_ligne)));
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