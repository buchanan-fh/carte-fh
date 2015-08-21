<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$tab_sup=array();

if(file_exists("communes_supports_utf8.txt")){
	$le_fichier_sup=fopen("communes_supports_utf8.txt","r");
	while(!feof($le_fichier_sup)){
		//$la_ligne=stream_get_line($le_fichier_sup,1000,"\r\n");
		$la_ligne=fgets($le_fichier_sup);
		$les_champs=explode("|",$la_ligne);
		if(count($les_champs)>2 && (!isset($_GET['dept']) || $_GET['dept']==trim($les_champs[2]))){
			array_push($tab_sup,htmlentities($les_champs[1]." - ".$les_champs[0],ENT_QUOTES,'UTF-8'));
		}
	}
	fclose($le_fichier_sup);
}
echo json_encode($tab_sup);
?>