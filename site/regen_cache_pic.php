<?php
header('Access-Control-Allow-Origin: *');

$cache_file = 'cache/cache_url_photo.txt';
$flag_file = 'cache/flag_cache_url_photo.txt';
date_default_timezone_set('Europe/Paris');

if(!file_exists($flag_file) && (!file_exists($cache_file) || (filemtime($cache_file) < (time() - 60 * 10 )))) {
	
	file_put_contents($flag_file,'flag', LOCK_EX);
	
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_URL,'https://carte-fh.lafibre.info/galerie_photo/ws.php?format=json&method=pwg.session.login');
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_HEADER, 1);
	curl_setopt($curl, CURLOPT_COOKIEJAR, 'cache/cookie.txt');
	curl_setopt($curl, CURLOPT_POSTFIELDS, 'username=carte-fh&password=carte-fh');
	$return = curl_exec($curl);
	curl_close($curl);
	$n_page=0;
	$pics=array();
	do{
		$curl=curl_init();
		curl_setopt($curl,CURLOPT_URL,'https://carte-fh.lafibre.info/galerie_photo/ws.php?format=json&method=pwg.categories.getImages&cat_id=354&per_page=500&page='.$n_page);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_COOKIEFILE, 'cache/cookie.txt');
		$return = curl_exec($curl);
		curl_close($curl);
		$obj_return = json_decode($return);
		$pics=array_merge($pics,$obj_return->result->images);
		$count_in_page=count($obj_return->result->images);
		$n_page+=1;
	}while($count_in_page==500);
	$tab_sup_url=[];
	foreach($pics as $key => $pic){
		$curl=curl_init();
		curl_setopt($curl,CURLOPT_URL,'https://carte-fh.lafibre.info/galerie_photo/ws.php?format=json&method=pwg.images.getInfo&image_id='.$pic->id);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_COOKIEFILE, 'cache/cookie.txt');
		$return = curl_exec($curl);
		curl_close($curl);
		$obj_return = json_decode($return);
		$pic_det=$obj_return->result;
		foreach($pic_det->categories as $key_c => $cat){
			$no_sup=explode(' - ',$cat->name);
			if(isset($no_sup[1]) && is_numeric($no_sup[1])){
				$tab_sup_url[$no_sup[1]]=new stdClass();
				$tab_sup_url[$no_sup[1]]->url_photo_small=$pic->derivatives->{'2small'}->url;
				$tab_sup_url[$no_sup[1]]->url_photo_det=$pic->derivatives->small->url;
				$tab_sup_url[$no_sup[1]]->url_cat_photo=$cat->url;
			}
		}
	}
	file_put_contents($cache_file, serialize($tab_sup_url), LOCK_EX);
	
	unlink($flag_file);
}

?>