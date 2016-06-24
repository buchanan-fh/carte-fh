<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if(isset($_GET['lon']) && isset($_GET['lat'])){
	$les_lon=explode('|',$_GET['lon']);
	$les_lat=explode('|',$_GET['lat']);
	if(count($les_lon)==2 && count($les_lat)==2){

		$dist=haversineGreatCircleDistance($les_lat[0],$les_lon[0],$les_lat[1],$les_lon[1]);
		$nb_points=min(1000,intval($dist/50));

		$le_fichier_cle=fopen("config/ign_key.txt","r");
		$la_cle=fgets($le_fichier_cle);
		
		$curl=curl_init();
		curl_setopt($curl,CURLOPT_URL,'http://wxs.ign.fr/'.$la_cle.'/alti/rest/elevationLine.json?sampling='.$nb_points.'&lon='.$_GET['lon'].'&lat='.$_GET['lat']);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_REFERER,'https://carte-fh.lafibre.info/');
		$return = curl_exec($curl);
		curl_close($curl);
		
		$obj_ign=json_decode($return);
		if(isset($obj_ign->elevations)){
			$obj_out=new stdClass();
			$obj_out->type='Feature';
			$obj_out->geometry=new stdClass();
			$obj_out->geometry->type='LineString';
			$obj_out->geometry->coordinates=array();
			foreach($obj_ign->elevations as $coord_point){
				if($coord_point->z < -500){
					$obj_out->geometry->coordinates[]=array($coord_point->lon,$coord_point->lat,0);
				}else{
					$obj_out->geometry->coordinates[]=array($coord_point->lon,$coord_point->lat,$coord_point->z);
				}
			}
			echo(json_encode($obj_out));
		}
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