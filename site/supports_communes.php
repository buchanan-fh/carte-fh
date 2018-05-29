<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$tab_sup=array();

if(isset($_GET['dept'])){
	
	if(file_exists("france2016.txt")){
		$noms_com=array();
		$flag_ardt=false;
		if(strlen($_GET['dept'])==5){
			$flag_ardt=true;
		}
		$le_fichier_sup=fopen("france2016.txt","r");
		while(!feof($le_fichier_sup)){
			$la_ligne=fgets($le_fichier_sup);
			$les_champs=explode("\t",$la_ligne);
			if(count($les_champs)>5 && ($les_champs[0]=="1" || $les_champs[0]=="5") && ($_GET['dept']==$les_champs[5] || ($flag_ardt && $_GET['dept']==$les_champs[5].$les_champs[6]))){
				if(empty($les_champs[14])){
					$nom_com=$les_champs[15];
				}elseif($les_champs[14]=="(L')"){
					$nom_com="L'".$les_champs[15];
				}else{
					$nom_com=trim($les_champs[14],"()")." ".$les_champs[15];
				}
				$noms_com[$les_champs[5].$les_champs[6]]=htmlentities($nom_com,ENT_QUOTES,'ISO-8859-1');
			}
		}
		fclose($le_fichier_sup);
	}
	if(file_exists("SUP_SUPPORT.txt")){
		$le_fichier_sup=fopen("SUP_SUPPORT.txt","r");
		while(!feof($le_fichier_sup)){
			$la_ligne=trim(fgets($le_fichier_sup));
			$les_champs=explode(";",$la_ligne);
			if(count($les_champs)>16 && array_key_exists($les_champs[18],$noms_com)){
				$push_string=utf8_encode($noms_com[$les_champs[18]]." - ".$les_champs[0]);
				if(!in_array($push_string,$tab_sup)){
					array_push($tab_sup,$push_string);
				}
			}
		}
		fclose($le_fichier_sup);
	}	
	
}elseif(isset($_GET['no_sup'])){
	
	if(file_exists("SUP_SUPPORT.txt")){
		$flag_found=false;
		$le_fichier_sup=fopen("SUP_SUPPORT.txt","r");
		while(!feof($le_fichier_sup) && !$flag_found){
			$la_ligne=fgets($le_fichier_sup);
			$les_champs=explode(";",$la_ligne);
			if(count($les_champs)>16 && $_GET['no_sup']==$les_champs[0]){
				$flag_found=true;
				$champs_adresse=array();
				for($i=13;$i<17;$i++){
					if(!empty($les_champs[$i])){
						array_push($champs_adresse, htmlentities($les_champs[$i],ENT_QUOTES,'ISO-8859-1'));
					}
				}
				$tab_sup["adresse"]=implode(", ", $champs_adresse);
			}
		}
		fclose($le_fichier_sup);
	}
	
}
echo json_encode($tab_sup);
?>