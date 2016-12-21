<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if(isset($_GET['date']) && isset($_GET['nos_sup']) && isset($_GET['nos_ant']) && $_GET['nos_sup']!='' && $_GET['nos_ant']!=''){
	if(file_exists($_GET['date'].'/antennes.txt') && file_exists($_GET['date'].'/supports.txt')){
		$seuil_bas_alt=-50;
		$flag_trouve_sup1=false;
		$flag_trouve_sup2=false;
		$tab_nos_sup=explode(',',$_GET['nos_sup']);
		$le_fichier_sup=fopen($_GET["date"]."/supports.txt","r");
		$h_sup_1=0;
		$h_sup_2=0;
		$lon_1=0;
		$lon_2=0;
		$lat_1=0;
		$lat_2=0;
		$obj_return=new stdClass();
		while((!$flag_trouve_sup1 || !$flag_trouve_sup2) && !feof($le_fichier_sup)){
			$la_ligne=fgets($le_fichier_sup);
			$les_champs=explode("|",$la_ligne);
			if(!$flag_trouve_sup1 && $les_champs[0]==$tab_nos_sup[0]){
				$h_sup_1=(float)$les_champs[9];
				$lat_1=(float)$les_champs[7];
				$lon_1=(float)$les_champs[8];
				$flag_trouve_sup1=true;
			}
			if(!$flag_trouve_sup2 && $les_champs[0]==$tab_nos_sup[1]){
				$h_sup_2=(float)$les_champs[9];
				$lat_2=(float)$les_champs[7];
				$lon_2=(float)$les_champs[8];
				$flag_trouve_sup2=true;
			}
		}
		fclose($le_fichier_sup);
		$flag_trouve_ant1=false;
		$flag_trouve_ant2=false;
		$tab_nos_ant=explode(',',$_GET['nos_ant']);
		$le_fichier_ant=fopen($_GET["date"]."/antennes.txt","r");
		$h_ant_1=0;
		$h_ant_2=0;
		while((!$flag_trouve_ant1 || !$flag_trouve_ant2) && !feof($le_fichier_ant)){
			$la_ligne=fgets($le_fichier_ant);
			$les_champs=explode("|",$la_ligne);
			if(!$flag_trouve_ant1 && $les_champs[0]==$tab_nos_ant[0]){
				$h_ant_1=(float)$les_champs[5];
				$flag_trouve_ant1=true;
			}elseif(!$flag_trouve_ant2 && $les_champs[0]==$tab_nos_ant[1]){
				$h_ant_2=(float)$les_champs[5];
				$flag_trouve_ant2=true;
			}
		}
		fclose($le_fichier_ant);
		if($lon_1>$lon_2){
			$ltmp=$lon_2;
			$lon_2=$lon_1;
			$lon_1=$ltmp;
			$ltmp=$lat_2;
			$lat_2=$lat_1;
			$lat_1=$ltmp;
			$ltmp=$h_sup_2;
			$h_sup_2=$h_sup_1;
			$h_sup_1=$ltmp;
			$ltmp=$h_ant_2;
			$h_ant_2=$h_ant_1;
			$h_ant_1=$ltmp;
		}

		$dist=haversineGreatCircleDistance($lat_1,$lon_1,$lat_2,$lon_2);
		$nb_points=min(720,intval($dist/50));

		$le_fichier_cle=fopen("config/ign_key.txt","r");
		$la_cle=fgets($le_fichier_cle);
		
		$curl=curl_init();
		curl_setopt($curl,CURLOPT_URL,'http://wxs.ign.fr/'.$la_cle.'/alti/rest/elevationLine.json?sampling='.$nb_points.'&lon='.$lon_1.'|'.$lon_2.'&lat='.$lat_1.'|'.$lat_2);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_REFERER,'https://carte-fh.lafibre.info/');
		$return = curl_exec($curl);
		curl_close($curl);
		
		$obj_ign=json_decode($return);
		if(isset($obj_ign->elevations)){
			$obj_out=new stdClass();
			$obj_out->type='Feature';
			$obj_out->h_ant_1=$h_ant_1;
			$obj_out->h_ant_2=$h_ant_2;
			$obj_out->h_sup_1=$h_sup_1;
			$obj_out->h_sup_2=$h_sup_2;
			$obj_out->geometry=new stdClass();
			$obj_out->geometry->type='LineString';
			$obj_out->geometry->coordinates=array();
			if($obj_ign->elevations[0]->z < $seuil_bas_alt){
				$obj_out->geometry->coordinates[]=array($obj_ign->elevations[0]->lon,$obj_ign->elevations[0]->lat,$h_sup_1);
			}else{
				$obj_out->geometry->coordinates[]=array($obj_ign->elevations[0]->lon,$obj_ign->elevations[0]->lat,$obj_ign->elevations[0]->z+$h_sup_1);
			}
			foreach($obj_ign->elevations as $coord_point){
				if($coord_point->z < $seuil_bas_alt){
					$obj_out->geometry->coordinates[]=array($coord_point->lon,$coord_point->lat,0);
				}else{
					$obj_out->geometry->coordinates[]=array($coord_point->lon,$coord_point->lat,$coord_point->z);
				}
			}
			if(end($obj_ign->elevations)->z < $seuil_bas_alt){
				$obj_out->geometry->coordinates[]=array(end($obj_ign->elevations)->lon,end($obj_ign->elevations)->lat,$h_sup_2);
			}else{
				$obj_out->geometry->coordinates[]=array(end($obj_ign->elevations)->lon,end($obj_ign->elevations)->lat,end($obj_ign->elevations)->z+$h_sup_2);
			}
			$obj_return->elevation=$obj_out;
		}
		echo(json_encode($obj_return));
	}
}elseif(isset($_GET['lon']) && isset($_GET['lat'])){
	
	$a_lon=explode('|',$_GET['lon']);
	$a_lat=explode('|',$_GET['lat']);
	
	if(count($a_lon)==2 && count($a_lat)==2){
		$lon_1=$a_lon[0];
		$lon_2=$a_lon[1];
		$lat_1=$a_lat[0];
		$lat_2=$a_lat[1];
		$obj_return=new stdClass();
		
		if($lon_1>$lon_2){
			$ltmp=$lon_2;
			$lon_2=$lon_1;
			$lon_1=$ltmp;
			$ltmp=$lat_2;
			$lat_2=$lat_1;
			$lat_1=$ltmp;
		}

		$dist=haversineGreatCircleDistance($lat_1,$lon_1,$lat_2,$lon_2);
		$nb_points=min(720,intval($dist/50));

		$le_fichier_cle=fopen("config/ign_key.txt","r");
		$la_cle=fgets($le_fichier_cle);
		
		$curl=curl_init();
		curl_setopt($curl,CURLOPT_URL,'http://wxs.ign.fr/'.$la_cle.'/alti/rest/elevationLine.json?sampling='.$nb_points.'&lon='.$lon_1.'|'.$lon_2.'&lat='.$lat_1.'|'.$lat_2);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_REFERER,'https://carte-fh.lafibre.info/');
		$return = curl_exec($curl);
		curl_close($curl);
		
		$obj_ign=json_decode($return);
		if(isset($obj_ign->elevations)){
			$seuil_bas_alt=-50;
			$obj_out=new stdClass();
			$obj_out->type='Feature';
			$obj_out->h_ant_1=0;
			$obj_out->h_ant_2=0;
			$obj_out->h_sup_1=0;
			$obj_out->h_sup_2=0;
			$obj_out->geometry=new stdClass();
			$obj_out->geometry->type='LineString';
			$obj_out->geometry->coordinates=array();
			if($obj_ign->elevations[0]->z < $seuil_bas_alt){
				$obj_out->geometry->coordinates[]=array($obj_ign->elevations[0]->lon,$obj_ign->elevations[0]->lat,0);
			}else{
				$obj_out->geometry->coordinates[]=array($obj_ign->elevations[0]->lon,$obj_ign->elevations[0]->lat,$obj_ign->elevations[0]->z);
			}
			foreach($obj_ign->elevations as $coord_point){
				if($coord_point->z < $seuil_bas_alt){
					$obj_out->geometry->coordinates[]=array($coord_point->lon,$coord_point->lat,0);
				}else{
					$obj_out->geometry->coordinates[]=array($coord_point->lon,$coord_point->lat,$coord_point->z);
				}
			}
			if(end($obj_ign->elevations)->z < $seuil_bas_alt){
				$obj_out->geometry->coordinates[]=array(end($obj_ign->elevations)->lon,end($obj_ign->elevations)->lat,0);
			}else{
				$obj_out->geometry->coordinates[]=array(end($obj_ign->elevations)->lon,end($obj_ign->elevations)->lat,end($obj_ign->elevations)->z);
			}
			$obj_return->elevation=$obj_out;
		}
		echo(json_encode($obj_return));
		
		
	}
}

function haversineGreatCircleDistance($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371000){
  $latFrom = deg2rad($latitudeFrom);
  $lonFrom = deg2rad($longitudeFrom);
  $latTo = deg2rad($latitudeTo);
  $lonTo = deg2rad($longitudeTo);

  $latDelta = $latTo - $latFrom;
  $lonDelta = $lonTo - $lonFrom;

  $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) + cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
  return $angle * $earthRadius;
}
?>