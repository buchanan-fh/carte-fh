liste_col_fr=['#FFFFFF','#FF8400','#ED0000','#0067ED','#6A6A6A','#39AC39','#E11C78','#ED3529'];

liste_col_uk=['#FFFFFF','#007B85','#524FA6','#0D3D73','#E60000','#969696','#39AC39'];

current_zone="";

nature_support=[];nature_support["0"]="Sans nature";nature_support["40"]="Sémaphore";nature_support["41"]="Phare";nature_support["4"]="Château d'eau - réservoir";
nature_support["38"]="Immeuble";nature_support["39"]="Local technique";nature_support["42"]="Mât";nature_support["8"]="Intérieur galerie";nature_support["9"]="Intérieur sous-terrain";
nature_support["10"]="Tunnel";nature_support["11"]="Mât béton";nature_support["12"]="Mât métallique";nature_support["21"]="Pylône";nature_support["17"]="Bâtiment";
nature_support["19"]="Monument historique";nature_support["20"]="Monument religieux";nature_support["22"]="Pylône autoportant";nature_support["23"]="Pylône autostable";
nature_support["24"]="Pylône haubané";nature_support["25"]="Pylône treillis";nature_support["26"]="Pylône tubulaire";nature_support["31"]="Silo";nature_support["32"]="ouvrage d'art (pont, viaduc)";
nature_support["33"]="Tour hertzienne";nature_support["34"]="Dalle en béton";nature_support["999999999"]="Support non décrit";nature_support["43"]="Fût";
nature_support["44"]="Tour de contrôle";nature_support["45"]="Contre-poids au sol";nature_support["46"]="Contre-poids sur shelter";nature_support["47"]="Support DEFENSE";
nature_support["48"]="pylône arbre";nature_support["49"]="Ouvrage de signalisation (portique routier, panneau routier, panneau publicitaire)";nature_support["50"]="balise ou bouée";
nature_support["51"]="XXX";nature_support["52"]="Eolienne";

nom_exploit_fr=[];
nom_exploit_fr["149"]="AFRIPA Telecom";nom_exploit_fr["2"]="Réseau privé";nom_exploit_fr["3"]="ANFR / DTCG";nom_exploit_fr["4"]="ARCEP";nom_exploit_fr["5"]="DAPESID";nom_exploit_fr["139"]="E*MESSAGE";
nom_exploit_fr["150"]="MFS Communication";nom_exploit_fr["127"]="DOLPHIN Telecom";nom_exploit_fr["6"]="Bouygues Telecom";nom_exploit_fr["9"]="CEREMA";nom_exploit_fr["11"]="CNES";
nom_exploit_fr["12"]="CSA";nom_exploit_fr["13"]="DIRISI (Terre)";nom_exploit_fr["14"]="DGA";nom_exploit_fr["15"]="DGGN";nom_exploit_fr["18"]="Intérieur";nom_exploit_fr["140"]="BELGACOM ICS France";
nom_exploit_fr["20"]="EMM";nom_exploit_fr["21"]="Orange service fixe";nom_exploit_fr["23"]="Orange";nom_exploit_fr["26"]="Météo";nom_exploit_fr["145"]="Completel";nom_exploit_fr["28"]="Min. déf. / Div. technique";
nom_exploit_fr["30"]="Radioastronomie";nom_exploit_fr["141"]="ARQUIVA SAS";nom_exploit_fr["38"]="STNA (Aviation civile)";nom_exploit_fr["39"]="TDF";nom_exploit_fr["16"]="TTOM";nom_exploit_fr["142"]="LDCOM";
nom_exploit_fr["129"]="INFOMOBILE";nom_exploit_fr["130"]="Altitude Telecom";nom_exploit_fr["131"]="SQUADRAN";nom_exploit_fr["132"]="BLR Services";nom_exploit_fr["133"]="9 Telecom Entreprise";
nom_exploit_fr["136"]="LANDTEL";nom_exploit_fr["137"]="SFR";nom_exploit_fr["138"]="WLL";nom_exploit_fr["143"]="DIRISI (Air)";nom_exploit_fr["146"]="UPC";nom_exploit_fr["147"]="Outremer Telecom";
nom_exploit_fr["148"]="SPM Telecom";nom_exploit_fr["151"]="Saint Martin Mobiles";nom_exploit_fr["152"]="SKYBRIDGE";nom_exploit_fr["153"]="Dauphin Telecom";nom_exploit_fr["154"]="Mediaserv";
nom_exploit_fr["155"]="DIRISI";nom_exploit_fr["156"]="EXPERTMEDIA";nom_exploit_fr["166"]="Gouv. Nouvelle Calédonie (OPT)";nom_exploit_fr["167"]="Gouv. Polynésie française (DGEN)";
nom_exploit_fr["168"]="HCR Nouvelle Calédonie";nom_exploit_fr["169"]="HCR Polynésie";nom_exploit_fr["170"]="Towercast";nom_exploit_fr["160"]="OPTLiNE Service";nom_exploit_fr["171"]="IMTS";
nom_exploit_fr["172"]="GUYACOM";nom_exploit_fr["179"]="Altitude Wireless";nom_exploit_fr["180"]="Eurek@";nom_exploit_fr["187"]="EUTELSAT";nom_exploit_fr["191"]="Sem@for 77";nom_exploit_fr["198"]="SDNUM";
nom_exploit_fr["209"]="CG 64";nom_exploit_fr["232"]="IMR Telecom";nom_exploit_fr["233"]="NET Bourgogne";nom_exploit_fr["236"]="REG.I.E.S.";nom_exploit_fr["237"]="Ariège Telecom";nom_exploit_fr["178"]="HDDR";
nom_exploit_fr["161"]="GLOBECAST";nom_exploit_fr["162"]="Digicel";nom_exploit_fr["186"]="Melis@ territoires ruraux";nom_exploit_fr["220"]="WizeO";nom_exploit_fr["234"]="BT France";nom_exploit_fr["174"]="TELOISE";
nom_exploit_fr["175"]="CAP CONNEXION";nom_exploit_fr["176"]="MEDIALYS";nom_exploit_fr["177"]="IRIS 64";nom_exploit_fr["181"]="17 numérique";nom_exploit_fr["182"]="NIVERTEL";nom_exploit_fr["185"]="TALCO Langudoc";
nom_exploit_fr["216"]="RATP";nom_exploit_fr["215"]="Direction des routes";nom_exploit_fr["217"]="ONC";nom_exploit_fr["218"]="Sté de transport audiovisuel";nom_exploit_fr["219"]="Station étrangère";
nom_exploit_fr["221"]="STOI";nom_exploit_fr["229"]="Guadeloupe Téléphone Mobile";nom_exploit_fr["230"]="Martinique Téléphone Mobile";nom_exploit_fr["231"]="Guyane Téléphone Mobile";
nom_exploit_fr["243"]="TMN (FH dépt 37)";nom_exploit_fr["244"]="ADTIM (FH dépt 07, 26)";nom_exploit_fr["245"]="HPN (FH dépt 65)";nom_exploit_fr["158"]="IFW";nom_exploit_fr["173"]="SHD";
nom_exploit_fr["188"]="EADS Astrium";nom_exploit_fr["207"]="Martinique numérique";nom_exploit_fr["208"]="La Réunion numérique";nom_exploit_fr["184"]="Bolloré Telecom";nom_exploit_fr["210"]="Site privé";
nom_exploit_fr["211"]="Société d'autoroute";nom_exploit_fr["212"]="Télé analogique";nom_exploit_fr["225"]="R'LAN";nom_exploit_fr["214"]="TV ou radio étrangère";nom_exploit_fr["239"]="Armor Connectic";
nom_exploit_fr["242"]="Alsatis Réseaux";nom_exploit_fr["190"]="Guyane numérique";nom_exploit_fr["197"]="EMETTEL";nom_exploit_fr["203"]="EDF";nom_exploit_fr["206"]="SNCF";nom_exploit_fr["238"]="Altitude Infra.";
nom_exploit_fr["157"]="UTS Caraïbes";nom_exploit_fr["201"]="NET 67";nom_exploit_fr["193"]="SRR";nom_exploit_fr["200"]="NET 55";nom_exploit_fr["223"]="ITAS TIM";nom_exploit_fr["228"]="BPT";nom_exploit_fr["195"]="CG 39";
nom_exploit_fr["227"]="TIKIPHONE";nom_exploit_fr["194"]="NET Aveyron";nom_exploit_fr["240"]="Free Mobile";nom_exploit_fr["202"]="SNCF Réseau";nom_exploit_fr["235"]="CS12";nom_exploit_fr["199"]="Radioamateur";
nom_exploit_fr["205"]="ONECAST";nom_exploit_fr["189"]="Airbus";nom_exploit_fr["163"]="AXIONE";nom_exploit_fr["164"]="AXIONE Limousin";nom_exploit_fr["165"]="SARTEL";nom_exploit_fr["246"]="Viti SAS";
nom_exploit_fr["262"]="Comm Infra. UK LTD";nom_exploit_fr["264"]="Vaucluse numérique";nom_exploit_fr["258"]="Gigalis";nom_exploit_fr["252"]="BJT Partners";nom_exploit_fr["253"]="SYSOCO";
nom_exploit_fr["266"]="GLOBALTEL";nom_exploit_fr["251"]="e-tera";nom_exploit_fr["260"]="Custom Connect MW B.V.";nom_exploit_fr["267"]="PMT/Vodafone";nom_exploit_fr["249"]="Hub Telecom";nom_exploit_fr["265"]="RTE";
nom_exploit_fr["269"]="SPLANG";nom_exploit_fr["271"]="ATHD";nom_exploit_fr["254"]="GRAM";nom_exploit_fr["261"]="Global Connect";nom_exploit_fr["247"]="Melis@ exploitation";nom_exploit_fr["259"]="Decyben";
nom_exploit_fr["248"]="SAT Consult";nom_exploit_fr["256"]="SANEF";nom_exploit_fr["257"]="NET 48";nom_exploit_fr["263"]="Latent Networks";nom_exploit_fr["250"]="NomoTech";nom_exploit_fr["272"]="Vannes agglo numérique";
nom_exploit_fr["268"]="Dassault aviation";nom_exploit_fr["278"]="Telco OI";nom_exploit_fr["273"]="CG 08";nom_exploit_fr["274"]="Cher haut débit";nom_exploit_fr["275"]="Manche numérique";
nom_exploit_fr["276"]="Tutor Calvados";nom_exploit_fr["277"]="McKay Brothers International";nom_exploit_fr["279"]="Manche Haut Débit";nom_exploit_fr["280"]="TWS International";nom_exploit_fr["281"]="Gers Haut Débit";
nom_exploit_fr["282"]="Memonet";

nom_exploit_uk=[];
nom_exploit_uk["1"]="AB Internet Ltd";nom_exploit_uk["2"]="Aberdeen City Council";nom_exploit_uk["3"]="Adelphi Net1 Limited";nom_exploit_uk["4"]="Affinity Communications";nom_exploit_uk["5"]="Airband Community Internet Limited";
nom_exploit_uk["6"]="Airspeed Telecom";nom_exploit_uk["7"]="Airwave Solutions Limited";nom_exploit_uk["8"]="Altram Lrt Limited";nom_exploit_uk["9"]="Anglian Water Services Limited";nom_exploit_uk["10"]="Angus Council";
nom_exploit_uk["11"]="Apache Beryl I Limited";nom_exploit_uk["12"]="APC Solutions (UK) Ltd";nom_exploit_uk["13"]="Aquila Air Traffic Management Services Limited";nom_exploit_uk["14"]="Arqiva Limited";nom_exploit_uk["15"]="Arqiva Services Limited";
nom_exploit_uk["16"]="Associated British Ports";nom_exploit_uk["17"]="Associated British Ports Holdings Limited";nom_exploit_uk["18"]="Atlas Communications NI Ltd";nom_exploit_uk["19"]="Aviat Networks UK Ltd";
nom_exploit_uk["20"]="BAE Systems Surface Ships Ltd";nom_exploit_uk["21"]="Barnet Council";nom_exploit_uk["22"]="Bedfordshire Police";nom_exploit_uk["23"]="Birmingham City Council";nom_exploit_uk["24"]="Bitstream Broadcast Ltd";
nom_exploit_uk["25"]="Bluebox Broadband Ltd";nom_exploit_uk["26"]="Bluewave Communications";nom_exploit_uk["27"]="Boston Networks Limited";nom_exploit_uk["28"]="Boundless Communications Ltd";nom_exploit_uk["29"]="Boundless Networks Ltd";
nom_exploit_uk["30"]="Bp Exploration";nom_exploit_uk["31"]="Bridge Systems Limited";nom_exploit_uk["32"]="Briskona Limited";nom_exploit_uk["33"]="Bristol Water Plc";nom_exploit_uk["34"]="Bt";nom_exploit_uk["35"]="Buz Broadband Ltd";
nom_exploit_uk["36"]="C.E.M. Day Limited";nom_exploit_uk["37"]="Caleycom Limited";nom_exploit_uk["38"]="Cardiff Council";nom_exploit_uk["39"]="Celador Radio (South West) Ltd";nom_exploit_uk["40"]="Central North Sea Fibre Telecommunications Company Ltd";
nom_exploit_uk["41"]="Central Security Systems Limited";nom_exploit_uk["42"]="CENTRICA NORTH SEA GAS LIMITED";nom_exploit_uk["43"]="Centrica North Sea Limited";nom_exploit_uk["44"]="Centrica Production Nederland BV";
nom_exploit_uk["45"]="Centrica Storage Limited";nom_exploit_uk["46"]="Cheltenham Borough Council";nom_exploit_uk["47"]="Cherwell District Council";nom_exploit_uk["48"]="Cheshire West and Chester";nom_exploit_uk["49"]="Chevron North Sea Limited";
nom_exploit_uk["50"]="Church Communities Uk";nom_exploit_uk["51"]="City Of Bradford Metropolitan District Council";nom_exploit_uk["52"]="City Of Edinburgh Council";nom_exploit_uk["53"]="Cloudnet IT Solutions";nom_exploit_uk["54"]="Co-Channel Electronics Limited";
nom_exploit_uk["55"]="Commercial Radio Systems Limited";nom_exploit_uk["56"]="Comvergent Limited";nom_exploit_uk["57"]="Conocophillips (UK) Britannia Limited";nom_exploit_uk["58"]="Conocophillips (UK) Limited";nom_exploit_uk["59"]="Contingency Networks Limited";
nom_exploit_uk["60"]="Core Integrated Solutions Limited";nom_exploit_uk["61"]="County Broadband Ltd";nom_exploit_uk["62"]="Crystal Rig II Limited";nom_exploit_uk["63"]="Custom Connect MW";nom_exploit_uk["64"]="Dacorum Borough Council";
nom_exploit_uk["65"]="DCN Communications Ltd";nom_exploit_uk["66"]="DEA UK SNS Ltd";nom_exploit_uk["67"]="Deacom Limited";nom_exploit_uk["68"]="Decyben";nom_exploit_uk["69"]="Denbridge Marine Limited";nom_exploit_uk["70"]="DEPARTMENT OF HOME AFFAIRS COMMUNICATIONS DIVISION";
nom_exploit_uk["71"]="Derbyshire Constabulary";nom_exploit_uk["72"]="Digiweb Limited";nom_exploit_uk["73"]="Domicilium ( Iom ) Ltd";nom_exploit_uk["74"]="Doncaster College";nom_exploit_uk["75"]="DONG Energy Burbo Extension (UK) Ltd";
nom_exploit_uk["76"]="Dong Energy RB (UK) Ltd";nom_exploit_uk["77"]="Dong Energy Walney Extension (UK) Limited";nom_exploit_uk["78"]="DONG Energy West of Duddon Sands (UK) Limited";nom_exploit_uk["79"]="Dumfries And Galloway Council";
nom_exploit_uk["80"]="Dundee City Council";nom_exploit_uk["81"]="Durham County Council";nom_exploit_uk["82"]="Dyfed-Powys Police";nom_exploit_uk["83"]="E.ON E&P UK Limited";nom_exploit_uk["84"]="East Coast Radio Ltd";
nom_exploit_uk["85"]="East Midlands International Airport Limited";nom_exploit_uk["86"]="Edinburgh Buses Limited";nom_exploit_uk["87"]="Edinburgh Trams Limited";nom_exploit_uk["88"]="EE Limited";nom_exploit_uk["89"]="Eircom UK Limited";
nom_exploit_uk["90"]="ENI Liverpool Bay Operating Company Limited";nom_exploit_uk["91"]="EOG Resources United Kingdom Limited";nom_exploit_uk["92"]="ESB Telecom Services";nom_exploit_uk["93"]="Essex Auto Group Ltd";
nom_exploit_uk["94"]="Fenland District Council";nom_exploit_uk["95"]="Fife Council";nom_exploit_uk["96"]="First Ark Ltd";nom_exploit_uk["97"]="First Edinburgh Limited";nom_exploit_uk["98"]="First Manchester Limited";
nom_exploit_uk["99"]="Fixed Links Unit";nom_exploit_uk["100"]="Flexiscale Technologies Limited";nom_exploit_uk["101"]="Flow Traders B.V.";nom_exploit_uk["102"]="G4S Technology Limited";nom_exploit_uk["103"]="General Dynamics UK Ltd";
nom_exploit_uk["104"]="General Motors UK Limited";nom_exploit_uk["105"]="Glenvale Transport Limited";nom_exploit_uk["106"]="Global Connect";nom_exploit_uk["107"]="Global Energy (Holdings) Limited";nom_exploit_uk["108"]="Goldman Sachs Property Management Limited";
nom_exploit_uk["109"]="Greater Manchester Police";nom_exploit_uk["110"]="Guernsey Airtel Limited";nom_exploit_uk["111"]="Hartlepool Borough Council";nom_exploit_uk["112"]="Hendy Group Ltd";nom_exploit_uk["113"]="Higher Rhythm Limited";
nom_exploit_uk["114"]="Highlands and Islands Enterprise";nom_exploit_uk["115"]="Highways Agency";nom_exploit_uk["116"]="Horsebridge Network Systems Limited";nom_exploit_uk["117"]="Housing Leeds (Leeds City Council)";
nom_exploit_uk["118"]="Hull And East Yorkshire Hospitals";nom_exploit_uk["119"]="Humberside Police Service";nom_exploit_uk["120"]="Hydrocarbon Resources Limited";nom_exploit_uk["121"]="Ineedbroadband Ltd";nom_exploit_uk["122"]="Ingenitech Ltd";
nom_exploit_uk["123"]="Internexus Networks Limited";nom_exploit_uk["124"]="Invisible Link UK Limited";nom_exploit_uk["125"]="IRG Computers Ltd";nom_exploit_uk["126"]="Irish Broadband Internet Services Limited";nom_exploit_uk["127"]="Isle of Anglesey County Council";
nom_exploit_uk["128"]="ITS Technology Group Ltd";nom_exploit_uk["129"]="Jersey Airtel Limited";nom_exploit_uk["130"]="Jhcs Ltd";nom_exploit_uk["131"]="Joint Radio Company Ltd";nom_exploit_uk["132"]="JT (Guernsey) Limited";
nom_exploit_uk["133"]="JT (Jersey) Limited";nom_exploit_uk["134"]="Kaldien Limited";nom_exploit_uk["135"]="Kcom Group Public Limited Company";nom_exploit_uk["136"]="Kencomp Internet Ltd";nom_exploit_uk["137"]="Kevin Smith";
nom_exploit_uk["138"]="Keycom PLC";nom_exploit_uk["139"]="Kingdom Fm Radio Ltd";nom_exploit_uk["140"]="Lancashire Constabulary";nom_exploit_uk["141"]="Lancashire County Council";nom_exploit_uk["142"]="Lancaster University Network Services Limited";
nom_exploit_uk["143"]="Latent Networks Limited";nom_exploit_uk["144"]="Leicester City Council";nom_exploit_uk["145"]="London Borough of Barking & Dagenham";nom_exploit_uk["146"]="London Borough Of Ealing";nom_exploit_uk["147"]="London Borough of Hounslow";
nom_exploit_uk["148"]="London Borough Of Newham";nom_exploit_uk["149"]="London Borough Of Redbridge";nom_exploit_uk["150"]="Lothian Broadband Networks Limited";nom_exploit_uk["151"]="Lucite International Uk Limited";
nom_exploit_uk["152"]="Maersk Oil North Sea Uk Ltd";nom_exploit_uk["153"]="Marathon Oil UK LLC";nom_exploit_uk["154"]="MARITIME AND COASTGUARD AGENCY";nom_exploit_uk["155"]="Maxxwave Limited";nom_exploit_uk["156"]="Mckay Brothers Communications Ltd";
nom_exploit_uk["157"]="Mckay Brothers International SA";nom_exploit_uk["158"]="Metranet Communications Ltd";nom_exploit_uk["159"]="Metronet (UK) Limited";nom_exploit_uk["160"]="Metropolitan Police Service";nom_exploit_uk["161"]="Midlothian Council";
nom_exploit_uk["162"]="Milford Haven Port Authority";nom_exploit_uk["163"]="Mll Telecom Ltd";nom_exploit_uk["164"]="Mobile Broadband Network Limited as Agent of Everything Everywhere and Hutchison 3G UK Limited";nom_exploit_uk["165"]="MP & E TRADING COMPANY LIMITED";
nom_exploit_uk["166"]="National Farmers Union Mutual Insurance Society Limited";nom_exploit_uk["167"]="Nats (En Route) Plc";nom_exploit_uk["168"]="Nats (Services) Limited";nom_exploit_uk["169"]="Network Rail Infrastructure Limited";
nom_exploit_uk["170"]="Network Repeater Services Limited";nom_exploit_uk["171"]="New Line Networks LLC";nom_exploit_uk["172"]="Newcastle City Council";nom_exploit_uk["173"]="Newcastle International Airport Limited";
nom_exploit_uk["174"]="Newtel Limited";nom_exploit_uk["175"]="Nexen Petroleum Uk Limited";nom_exploit_uk["176"]="Nexen Petroleum UK Limited";nom_exploit_uk["177"]="Nexxcomwireless";nom_exploit_uk["178"]="NHS Ayrshire and Arran";
nom_exploit_uk["179"]="NHS Grampian";nom_exploit_uk["180"]="Norfolk Constabulary";nom_exploit_uk["181"]="North Wales Police";nom_exploit_uk["182"]="North Yorkshire Police";nom_exploit_uk["183"]="Northern Ireland Electricity";
nom_exploit_uk["184"]="Northern Ireland Water Limited";nom_exploit_uk["185"]="Northern Media Group Ltd";nom_exploit_uk["186"]="Nottingham Trams Limited";nom_exploit_uk["187"]="Ntl National Networks Limited";nom_exploit_uk["188"]="Office of Communications";
nom_exploit_uk["189"]="Offshore Renewable Energy Catapult";nom_exploit_uk["190"]="Oldham FM Ltd";nom_exploit_uk["191"]="Optiver Holding B.V.";nom_exploit_uk["192"]="Oranje-Nassau Energie UK Limited";nom_exploit_uk["193"]="Orbital Net Ltd";
nom_exploit_uk["194"]="Orkney Islands Council";nom_exploit_uk["195"]="Pauls Hill Wind Ltd";nom_exploit_uk["196"]="PD Teesport Limited";nom_exploit_uk["197"]="Perenco Uk Limited";nom_exploit_uk["198"]="Perth & Kinross Council";
nom_exploit_uk["199"]="Petrofac Facilities Management Limited";nom_exploit_uk["200"]="Police and Crime Commissioner for Cleveland.";nom_exploit_uk["201"]="Police Scotland";nom_exploit_uk["202"]="Police Service Of Northern Ireland";
nom_exploit_uk["203"]="PORT OF LONDON AUTHORITY";nom_exploit_uk["204"]="Portmeirion Group UK Limited";nom_exploit_uk["205"]="Ports Of Jersey Limited";nom_exploit_uk["206"]="Preston City Council";nom_exploit_uk["207"]="Projex Cellular Infrastructure UK Ltd";
nom_exploit_uk["208"]="Qinetiq Group Plc";nom_exploit_uk["209"]="Queens Harbour Master Plymouth";nom_exploit_uk["210"]="Quickline Communications Limited";nom_exploit_uk["211"]="Rapid Computers Ltd";nom_exploit_uk["212"]="RCT Homes Ltd";
nom_exploit_uk["213"]="Reading Broadcasting Company Limited";nom_exploit_uk["214"]="Reading Transport Limited";nom_exploit_uk["215"]="Retail Crime Operation (Birmingham) Limited";nom_exploit_uk["216"]="Rhenus Lupprians Limited";
nom_exploit_uk["217"]="Saga Group Limited";nom_exploit_uk["218"]="Salford City Council";nom_exploit_uk["219"]="Salix Homes Limited";nom_exploit_uk["220"]="SANDWELL HOMES LIMITED";nom_exploit_uk["221"]="Sandwell Metropolitan Borough Council";
nom_exploit_uk["222"]="Scalpay Limited";nom_exploit_uk["223"]="Scira Offshore Energy Limited";nom_exploit_uk["224"]="Scot-Tel Ltd";nom_exploit_uk["225"]="Scottish Fire and Rescue";nom_exploit_uk["226"]="Scottish Police Authority";
nom_exploit_uk["227"]="Scottish Seabird Centre";nom_exploit_uk["228"]="Scottish Water";nom_exploit_uk["229"]="Secure Web Services Limited";nom_exploit_uk["230"]="Shefa Ltd";nom_exploit_uk["231"]="Shell U.K. Exploration & Production Limited";
nom_exploit_uk["232"]="Shell UK Limited";nom_exploit_uk["233"]="Shetland Islands Council";nom_exploit_uk["234"]="Simply IP Limited";nom_exploit_uk["235"]="Skyline Networks & Consultancy Ltd";nom_exploit_uk["236"]="Smartable LLC";
nom_exploit_uk["237"]="Solway Communications Limited";nom_exploit_uk["238"]="South Ayrshire Council";nom_exploit_uk["239"]="South Central Ambulance Service NHS Trust";nom_exploit_uk["240"]="South Lanarkshire Council";
nom_exploit_uk["241"]="South Staffordshire and Shropshire Healthcare NHS Foundation Trust";nom_exploit_uk["242"]="South Tyneside Council";nom_exploit_uk["243"]="South Warwickshire Broadband";nom_exploit_uk["244"]="South West Communications Group Limited";
nom_exploit_uk["245"]="South West Water Services Ltd";nom_exploit_uk["246"]="Spirit FM Limited";nom_exploit_uk["247"]="Staffordshire and Shropshire Healthcare NHS Foundation Trust - SSHIS";nom_exploit_uk["248"]="Staffordshire Fire and Rescue Service";
nom_exploit_uk["249"]="States of Guernsey";nom_exploit_uk["250"]="Statoil (UK) Limited";nom_exploit_uk["251"]="Stirling Council";nom_exploit_uk["252"]="SugarNet Limited";nom_exploit_uk["253"]="Sure (Guernsey) Limited";
nom_exploit_uk["254"]="Sure (Isle of Man) Limited";nom_exploit_uk["255"]="Sure (Jersey) Limited";nom_exploit_uk["256"]="Surebroadband (Infrastructure) Limited";nom_exploit_uk["257"]="Swindon Borough Council";nom_exploit_uk["258"]="Talisman Sinopec Energy UK Ltd";
nom_exploit_uk["259"]="Tameside & Glossop CCG";nom_exploit_uk["260"]="Tampnet As";nom_exploit_uk["261"]="Technology Solutions Limited";nom_exploit_uk["262"]="Telefonica UK Limited";nom_exploit_uk["263"]="telent Technology Services Limited";
nom_exploit_uk["264"]="The Mersey Docks & Harbour Company";nom_exploit_uk["265"]="The Networking People (Northwest) Limited";nom_exploit_uk["266"]="The Police and Crime Commissioner for Northamptonshire";nom_exploit_uk["267"]="Tixos Limited";
nom_exploit_uk["268"]="Total E&P Norge AS";nom_exploit_uk["269"]="TOTAL E&P UK Limited";nom_exploit_uk["270"]="Trellisworks Limited";nom_exploit_uk["271"]="Trunknet Limited";nom_exploit_uk["272"]="UK Broadband Limited";
nom_exploit_uk["273"]="Updata Infrastructure 2012 Limited";nom_exploit_uk["274"]="Urban Wimax Limited";nom_exploit_uk["275"]="Vale Of Glamorgan Council";nom_exploit_uk["276"]="Verizon Uk Limited";nom_exploit_uk["277"]="Viatel Ireland Limited";
nom_exploit_uk["278"]="Vigilant Global UK Limited";nom_exploit_uk["279"]="Vodafone Limited";nom_exploit_uk["280"]="VoIP-Un Limited";nom_exploit_uk["281"]="Vts Centre";nom_exploit_uk["282"]="Walney UK Offshore Windfarms Ltd";
nom_exploit_uk["283"]="Waltham Forest Council";nom_exploit_uk["284"]="WATMOS Community Homes";nom_exploit_uk["285"]="Wb-Internet Limited";nom_exploit_uk["286"]="West Mercia Constabulary";nom_exploit_uk["287"]="Westermost Rough Limited";
nom_exploit_uk["288"]="Westica Communications Limited";nom_exploit_uk["289"]="Whitefriars Housing Group Limited";nom_exploit_uk["290"]="Wifinity";nom_exploit_uk["291"]="Wightfibre Limited";nom_exploit_uk["292"]="Wirral Council";
nom_exploit_uk["293"]="Wispire Limited";nom_exploit_uk["294"]="Wolverhampton Homes Limited";nom_exploit_uk["295"]="World Class Wireless LLC";nom_exploit_uk["296"]="Your Homes Newcastle Limited";nom_exploit_uk["297"]="Zycomm Electronics Limited";

couleur_main_ope_fr=[];
couleur_main_ope_fr[21]=liste_col_fr[1];
couleur_main_ope_fr[23]=liste_col_fr[1];
couleur_main_ope_fr[148]=liste_col_fr[1];
couleur_main_ope_fr[137]=liste_col_fr[2];
couleur_main_ope_fr[193]=liste_col_fr[2];
couleur_main_ope_fr[6]=liste_col_fr[3];
couleur_main_ope_fr[158]=liste_col_fr[4];
couleur_main_ope_fr[240]=liste_col_fr[4];
couleur_main_ope_fr[147]=liste_col_fr[6];
couleur_main_ope_fr[278]=liste_col_fr[6];
couleur_main_ope_fr[162]=liste_col_fr[7];
couleur_main_ope_fr[267]=liste_col_fr[7];

couleur_main_ope_uk=[];
couleur_main_ope_uk[88]=liste_col_uk[1];
couleur_main_ope_uk[34]=liste_col_uk[2];
couleur_main_ope_uk[262]=liste_col_uk[3];
couleur_main_ope_uk[279]=liste_col_uk[4];
couleur_main_ope_uk[164]=liste_col_uk[5];

couleur_proprio=[];
couleur_proprio[4]=liste_col_fr[3];
couleur_proprio[16]=liste_col_fr[1];
couleur_proprio[21]=liste_col_fr[1];
couleur_proprio[27]=liste_col_fr[2];
couleur_proprio[31]=liste_col_fr[2];
couleur_proprio[42]=liste_col_fr[4];
couleur_proprio[44]=liste_col_fr[6];
couleur_proprio[51]=liste_col_fr[7];
couleur_proprio[66]=liste_col_fr[6];

liste_reg_mod_fr=[
	{name:"Orange",short_name:"Orange",no_expl:[21,23],color:liste_col_fr[1]},
	{name:"Free",short_name:"Free",no_expl:[158,240],color:liste_col_fr[4]},
	{name:"(14, 31, 35, 61, 79,<br>85) Altitude Infra.",no_expl:[238]},
	{name:"(03, 15, 43, 63) ATHD",no_expl:[271]},
	{name:"(19, 23, 87) Axione<br>Limousin",no_expl:[164]},
	{name:"(21, 71, 89) Net Bourgogne",no_expl:[233]},
	{name:"(07, 26) ADTIM",no_expl:[244]},
	{name:"(08) CG 08",no_expl:[273]},
	{name:"(12) Net Aveyron",no_expl:[194]},
	{name:"(14) Tutor Calvados",no_expl:[276]},
	{name:"(17) 17 numérique",no_expl:[181]},
	{name:"(18) Cher haut débit",no_expl:[274]},
	{name:"(22) Armor connectic",no_expl:[239]},
	{name:"(27) Eurek@",no_expl:[180]},
	{name:"(29) Axione",no_expl:[163]},
	{name:"(32) Gers Haut Débit",no_expl:[281]},
	{name:"(37) TMN",no_expl:[243]},
	{name:"(39) CG 39",no_expl:[195]},
	{name:"(45) Medialys",no_expl:[176]},
	{name:"(47) SDNum",no_expl:[198]},
	{name:"(48) Net 48",no_expl:[257]},
	{name:"(49) Melis@",short_name:"Melis@",no_expl:[186,247]},
	{name:"(50) Manche numérique",no_expl:[275]},
	{name:"(50) Manche haut débit",no_expl:[279]},
	{name:"(55) Net 55",no_expl:[200]},
	{name:"(58) NiverTel",no_expl:[182]},
	{name:"(64) IRIS 64",no_expl:[177]},
	{name:"(65) HPN",no_expl:[245]},
	{name:"(67) Net 67",no_expl:[201]},
	{name:"(72) SARTEL",no_expl:[165]},
	{name:"(77) Sem@for",no_expl:[191]},
	{name:"(84) Vaucluse numérique",no_expl:[264]},
	{name:"(86) Bolloré Telecom",no_expl:[184]},
	{name:"Direction des<br>routes",no_expl:[215]},
	{name:"Sté de transport<br>audiovisuel",no_expl:[218]}
];

liste_reg_mod_uk=[
	{name:"MBNL",no_expl:[164]}
];

/*
tab_ope_ID=[];
liste_ope=[];
for(var l_reg_mod in liste_reg_mod_fr){
	obj_ope={};
	obj_ope.name=liste_reg_mod_fr[l_reg_mod].short_name || nom_exploit_fr[liste_reg_mod_fr[l_reg_mod].no_expl[0]];
	obj_ope.leg_name=liste_reg_mod_fr[l_reg_mod].name;
	obj_ope.color=liste_reg_mod_fr[l_reg_mod].color || couleur_main_ope_fr[liste_reg_mod_fr[l_reg_mod].no_expl[0]] || liste_col_fr[5];
	obj_ope.no_expl=liste_reg_mod_fr[l_reg_mod].no_expl;
	ope_ID=liste_reg_mod_fr[l_reg_mod].no_expl.sort().join("_");
	for(var i in liste_reg_mod_fr[l_reg_mod].no_expl){
		tab_ope_ID[liste_reg_mod_fr[l_reg_mod].no_expl[i]]=ope_ID;
	}
	liste_ope[ope_ID]=obj_ope;
}
for(var no_expl in nom_exploit_fr){
	if(!(no_expl in tab_ope_ID)){
		obj_ope={};
		obj_ope.name=nom_exploit_fr[no_expl];
		obj_ope.leg_name=obj_ope.name;
		obj_ope.color=couleur_main_ope_fr[no_expl] || liste_col_fr[5];
		obj_ope.no_expl=[];
		obj_ope.no_expl.push(no_expl);
		ope_ID=no_expl.toString();
		tab_ope_ID[no_expl]=ope_ID;
		liste_ope[ope_ID]=obj_ope;
	}
}
*/

liste_proprio=[]
for(i=0;i<67;i++){
	if(i in couleur_proprio){
		liste_proprio[i]={color:couleur_proprio[i]};
	}else{
		liste_proprio[i]={color:liste_col_fr[0]};
	}
}

liste_ope_zones=[];
liste_ope_zones["fr_metro"]={nom_zone:"France métropolitaine", bounds:[[41,-5.7],[51.5,10]], main:["6","158_240","21_23","137"],
	other:["2","219","242","9","262","145","260","259","215","203","251","258","261","254","249","171","223","263","277","282","26","250","160",
	"236","265","225","256","248","202","218","253","185","39","170","280","272","220","238","271","164","233","244","273","194","276","181",
	"274","239","180","163","281","243","195","176","198","257","186_247","275","279","200","182","177","245","201","165","191","264","184"]};
liste_ope_zones["fr_971"]={nom_zone:"Guadeloupe (971)", bounds:[[15.78,-61.9],[16.54,-60.9]], main:["162","21_23","147"], other:["2","203","171","154","218","39"]};
liste_ope_zones["fr_972"]={nom_zone:"Martinique (972)", bounds:[[14.35,-61.3],[14.9,-60.7]], main:["162","21_23","147"], other:["2","171","207","154","218","39"]};
liste_ope_zones["fr_973"]={nom_zone:"Guyane (973)", bounds:[[2,-54.7],[5.9,-51.4]], main:["162","21_23","147"], other:["11","203","190","269","218","39"]};
liste_ope_zones["fr_974"]={nom_zone:"La Réunion (974)", bounds:[[-21.43,55.15],[-20.83,55.9]], main:["21_23","147","193","278"], other:["2","203","208","218","39","138",]};
liste_ope_zones["fr_975"]={nom_zone:"Saint-Pierre-et-Miquelon (975)", bounds:[[46.72,-56.50],[47.17,-56.08]], main:["21_23","148"], other:["39"]};
liste_ope_zones["fr_976"]={nom_zone:"Mayotte (976)", bounds:[[-13.1,44.9],[-12.55,45.33]], main:["21_23","147","193","278"], other:["252","203","221","39"]};
liste_ope_zones["fr_9778"]={nom_zone:"Saint-Barthélemy (977)/Saint-Martin (978)", bounds:[[17.87,-63.17],[18.13,-62.78]], main:["162","21_23"], other:["2","219","153","218","39"]};
liste_ope_zones["fr_986"]={nom_zone:"Wallis-et-Futuna (986)", bounds:[[-13.4,-176.3],[-13.17,-176.09]], main:["228"], other:[]};
liste_ope_zones["fr_987"]={nom_zone:"Polynésie française (987)", bounds:[[-28,-155],[-7,-134]], main:["167","267","246"], other:[]};
liste_ope_zones["fr_988"]={nom_zone:"Nouvelle-Calédonie (988)", bounds:[[-23,163.3],[-19.4,168.1]], main:["166"], other:[]};
liste_ope_zones["uk"]={nom_zone:"Royaume-Uni", bounds:[[48.7,-7.8],[61.8,4.5]], main:["34","88","164","262","279"],
	other:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28",
	"29","30","31","32","33","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57",
	"58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85",
	"86","87","89","90","91","92","93","94","95","96","97","98","99","100","101","102","103","104","105","106","107","108","109","110","111",
	"112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134",
	"135","136","137","138","139","140","141","142","143","144","145","146","147","148","149","150","151","152","153","154","155","156","157",
	"158","159","160","161","162","163","165","166","167","168","169","170","171","172","173","174","175","176","177","178","179","180","181",
	"182","183","184","185","186","187","188","189","190","191","192","193","194","195","196","197","198","199","200","201","202","203","204",
	"205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227",
	"228","229","230","231","232","233","234","235","236","237","238","239","240","241","242","243","244","245","246","247","248","249","250",
	"251","252","253","254","255","256","257","258","259","260","261","263","264","265","266","267","268","269","270","271","272","273","274",
	"275","276","277","278","280","281","282","283","284","285","286","287","288","289","290","291","292","293","294","295","296","297"]};

function build_interface(fit,zone,select_ope){
	
	///////
	
	tab_ope_ID=[];
	liste_ope=[];
	nom_exploit=[];
	
	if(zone=='uk'){
		for(var l_reg_mod in liste_reg_mod_uk){
			obj_ope={};
			obj_ope.name=liste_reg_mod_uk[l_reg_mod].short_name || nom_exploit_uk[liste_reg_mod_uk[l_reg_mod].no_expl[0]];
			obj_ope.leg_name=liste_reg_mod_uk[l_reg_mod].name;
			obj_ope.color=liste_reg_mod_uk[l_reg_mod].color || couleur_main_ope_uk[liste_reg_mod_uk[l_reg_mod].no_expl[0]] || liste_col_uk[5];
			obj_ope.no_expl=liste_reg_mod_uk[l_reg_mod].no_expl;
			ope_ID=liste_reg_mod_uk[l_reg_mod].no_expl.sort().join("_");
			for(var i in liste_reg_mod_uk[l_reg_mod].no_expl){
				tab_ope_ID[liste_reg_mod_uk[l_reg_mod].no_expl[i]]=ope_ID;
			}
			liste_ope[ope_ID]=obj_ope;
		}
		for(var no_expl in nom_exploit_uk){
			nom_exploit[no_expl]=nom_exploit_uk[no_expl];
			if(!(no_expl in tab_ope_ID)){
				obj_ope={};
				obj_ope.name=nom_exploit_uk[no_expl];
				obj_ope.leg_name=obj_ope.name;
				obj_ope.color=couleur_main_ope_uk[no_expl] || liste_col_uk[6];
				obj_ope.no_expl=[];
				obj_ope.no_expl.push(no_expl);
				ope_ID=no_expl.toString();
				tab_ope_ID[no_expl]=ope_ID;
				liste_ope[ope_ID]=obj_ope;
			}
		}
	}else{
		for(var l_reg_mod in liste_reg_mod_fr){
			obj_ope={};
			obj_ope.name=liste_reg_mod_fr[l_reg_mod].short_name || nom_exploit_fr[liste_reg_mod_fr[l_reg_mod].no_expl[0]];
			obj_ope.leg_name=liste_reg_mod_fr[l_reg_mod].name;
			obj_ope.color=liste_reg_mod_fr[l_reg_mod].color || couleur_main_ope_fr[liste_reg_mod_fr[l_reg_mod].no_expl[0]] || liste_col_fr[5];
			obj_ope.no_expl=liste_reg_mod_fr[l_reg_mod].no_expl;
			ope_ID=liste_reg_mod_fr[l_reg_mod].no_expl.sort().join("_");
			for(var i in liste_reg_mod_fr[l_reg_mod].no_expl){
				tab_ope_ID[liste_reg_mod_fr[l_reg_mod].no_expl[i]]=ope_ID;
			}
			liste_ope[ope_ID]=obj_ope;
		}
		for(var no_expl in nom_exploit_fr){
			nom_exploit[no_expl]=nom_exploit_fr[no_expl];
			if(!(no_expl in tab_ope_ID)){
				obj_ope={};
				obj_ope.name=nom_exploit_fr[no_expl];
				obj_ope.leg_name=obj_ope.name;
				obj_ope.color=couleur_main_ope_fr[no_expl] || liste_col_fr[5];
				obj_ope.no_expl=[];
				obj_ope.no_expl.push(no_expl);
				ope_ID=no_expl.toString();
				tab_ope_ID[no_expl]=ope_ID;
				liste_ope[ope_ID]=obj_ope;
			}
		}
	}
	
	/////
	
	document.getElementById('choix_zone').style.display='none';
	current_zone=zone;
	document.getElementById("nom_zone").innerHTML=liste_ope_zones[zone].nom_zone;
	for(id_zone in liste_ope_zones){
		if(id_zone==zone){
			document.getElementById("text_"+id_zone).style.fontWeight="bold";
		}else{
			document.getElementById("text_"+id_zone).style.fontWeight="normal";
		}
	}
	var tab_main = document.getElementById("tab_ope_main");
	while (tab_main.firstChild) {
		tab_main.removeChild(tab_main.firstChild);
	}
	var tab_other = document.getElementById("tab_autres_ope");
	while (tab_other.firstChild) {
		tab_other.removeChild(tab_other.firstChild);
	}
	if(select_ope!==undefined){
		var tab_select_ope=select_ope.split("|");
		var tab_select_ID=tab_select_ope.map(function(no_ope){
			return tab_ope_ID[no_ope];
		})
	}
	for(i=0;i<liste_ope_zones[zone].main.length;++i){
		if(tab_select_ope===undefined || (tab_select_ID.indexOf(liste_ope_zones[zone].main[i])>-1)){
			var init_state="checked";
		}else{
			var init_state="unchecked";
		}
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
		td1.className="check_cell";
		td2.className="color_cell";
		td1.innerHTML="<input type=\"checkbox\" id=\"check_op_"+liste_ope_zones[zone].main[i]+"\" onclick=\"ajax()\" "+init_state+">";
		td2.innerHTML="<table class=\"tab_col\" cellpadding=\"5\"><tr><td style=\"background-color:"+liste_ope[liste_ope_zones[zone].main[i]].color+"\"></td></tr></table>";
		td3.innerHTML=liste_ope[liste_ope_zones[zone].main[i]].leg_name;
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		document.getElementById("tab_ope_main").appendChild(tr);
	}
	document.getElementById("check_op_autres").checked=true;
	for(i=0;i<liste_ope_zones[zone].other.length;++i){
		if(tab_select_ope===undefined || (tab_select_ID.indexOf(liste_ope_zones[zone].other[i])>-1)){
			var init_state="checked";
		}else{
			var init_state="unchecked";
		}
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		td1.className="check_cell";
		td1.innerHTML="<input type=\"checkbox\" id=\"check_op_"+liste_ope_zones[zone].other[i]+"\" onclick=\"ajax()\" "+init_state+">";
		td2.innerHTML=liste_ope[liste_ope_zones[zone].other[i]].leg_name;
		tr.appendChild(td1);
		tr.appendChild(td2);
		document.getElementById("tab_autres_ope").appendChild(tr);
	}
	divs_ope=[];
	tabs_ope=[];
	rows_ope=[];
	d_divs_ope=[];
	d_tabs_ope=[];
	d_rows_ope=[];
	while (la_div_ant.firstChild){
		la_div_ant.removeChild(la_div_ant.firstChild);
	}
	while (d_div_ant.firstChild){
		d_div_ant.removeChild(d_div_ant.firstChild);
	}
	for(i=0;i<liste_ope_zones[zone].main.length;++i){
		divs_ope[liste_ope_zones[zone].main[i]]=document.createElement("div");
		tabs_ope[liste_ope_zones[zone].main[i]]=document.createElement("table");
		la_div_ant.appendChild(divs_ope[liste_ope_zones[zone].main[i]]);
		d_divs_ope[liste_ope_zones[zone].main[i]]=document.createElement("div");
		d_tabs_ope[liste_ope_zones[zone].main[i]]=document.createElement("table");
		d_div_ant.appendChild(d_divs_ope[liste_ope_zones[zone].main[i]]);
	}
	for(i=0;i<liste_ope_zones[zone].other.length;++i){
		divs_ope[liste_ope_zones[zone].other[i]]=document.createElement("div");
		tabs_ope[liste_ope_zones[zone].other[i]]=document.createElement("table");
		la_div_ant.appendChild(divs_ope[liste_ope_zones[zone].other[i]]);
		d_divs_ope[liste_ope_zones[zone].other[i]]=document.createElement("div");
		d_tabs_ope[liste_ope_zones[zone].other[i]]=document.createElement("table");
		d_div_ant.appendChild(d_divs_ope[liste_ope_zones[zone].other[i]]);
	}
	if(fit){
		map.fitBounds(liste_ope_zones[zone].bounds);
	}
}

function auto_build_interface(map_bounds){
	var overlapped_zones=[];
	for(var zone in liste_ope_zones){
		if(liste_ope_zones.hasOwnProperty(zone)){
			if(overlap(liste_ope_zones[zone].bounds,map_bounds)){
				overlapped_zones.push(zone);
			}
		}
	}
	if(overlapped_zones.length==1 && current_zone!=overlapped_zones[0]){
		build_interface(false,overlapped_zones[0]);
	}
}

function choix_zone(){
	if(document.getElementById('choix_zone').style.display=='block'){
		document.getElementById('choix_zone').style.display='none';
	}else{
		document.getElementById('choix_zone').style.display='block';
	}
}

function overlap(z,m_bounds){
	var m=[[m_bounds.getSouthWest().lat,m_bounds.getSouthWest().lng],[m_bounds.getNorthEast().lat,m_bounds.getNorthEast().lng]];
	var separe=(z[0][1]>m[1][1])||(z[1][1]<m[0][1])||(z[0][0]>m[1][0])||(z[1][0]<m[0][0]);
	return(!separe)
}