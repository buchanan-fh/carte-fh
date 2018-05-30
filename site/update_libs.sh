#!/bin/sh

# This script will update certain JS libraries used by Carte FH

set -ex

curl -sLo leaflet.js https://unpkg.com/leaflet/dist/leaflet.js
curl -sLo leaflet.css https://unpkg.com/leaflet/dist/leaflet.css
curl -sLo leaflet-geosearch.js https://unpkg.com/leaflet-geosearch/dist/bundle.min.js
curl -sLo leaflet-geosearch.css https://unpkg.com/leaflet-geosearch/assets/css/leaflet.css
