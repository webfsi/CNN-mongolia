import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import $ from 'jquery';

const headerOffset = 80;

import { isTouchDevice } from '../utils';


class Map {



    createMap($el) {
        mapboxgl.accessToken =
        'pk.eyJ1IjoiY25uZGlnaXRhbCIsImEiOiJiYjIwMTgxNDZmNjgyODllMjAxYTYwOTAxYmY2MzI2MyJ9.8F6TQITXymFzCXy8tBqGgg';
    
        let activeLocationId = 0;
        const markerElements = [];
        const $locations = [].slice.call($el.querySelectorAll('.map-location'));
        const isDesktop = window.innerWidth > 1024;
        const $locationsHolder = $el.querySelector('.map-locations-holder');
      
        const locationsData = $locations.reduce((acc, location) => {
          const id = location.dataset.locationId;
          const coords = location.dataset.coords;
          const coordsTitle = location.dataset.coordsTitle;
          
          const category = location.closest('.map-category') &&
            location.closest('.map-category').getAttribute('data-category');
          const title =
            location.querySelector('.title') &&
            location.querySelector('.title').textContent;
      
          let coordinates = [];
      
          if (coords && coords.length) {
            const [long, lat] = coords.split(',');
            coordinates = [parseFloat(lat), parseFloat(long)];
          }
      
          acc.push({
            id: id,
            id2: id,
            category,
            title: coordsTitle ?? title,
            coordinates,
          });

          if (location.dataset["coords-2"]) {
            const coords2 = location.dataset["coords-2"];
            const coords2title = location.dataset["coords-2Title"];
          
        
            let coordinates2 = [];
        
            if (coords2 && coords2.length) {
              const [long, lat] = coords2.split(',');
              coordinates2 = [parseFloat(lat), parseFloat(long)];
            }
      
            acc.push({
              id: id+ "--1",
              id2: id,
              category,
              title: coords2title ?? title,
              coordinates: coordinates2,
            });
          }
          if (location.dataset["coords-3"]) {
            const coords3 = location.dataset["coords-3"];
            const coords3title = location.dataset["coords-3Title"];
        
            let coordinates3 = [];
        
            if (coords3 && coords3.length) {
              const [long, lat] = coords3.split(',');
              coordinates3 = [parseFloat(lat), parseFloat(long)];
            }
      
            acc.push({
              id: id+ "--2",
              id2: id,
              category,
              title: coords3title ?? title,
              coordinates: coordinates3,
            });
          }
          return acc;
        }, []);
        
        $locations[0].classList.add('active'); //initial
      
        const pinsData = locationsData
          .filter((location) => location.coordinates.length)
          .map((location) => ({
            type: 'Feature',
            id: location.id,
            id2: location.id2,
            title: location.title,
            category: location.category,
            geometry: {
              type: 'Point',
              coordinates: location.coordinates,
            },
          }));
      
        const geojson = {
          type: 'FeatureCollection',
          features: pinsData,
        };
      
        let map;
        const mapBoxStyle = 'mapbox://styles/cnndigital/cljxr81om003z01pda9x90qs9';
      
        const bounds = new mapboxgl.LngLatBounds();
        pinsData.forEach(({ geometry }) => bounds.extend(geometry.coordinates));
      
        if (isDesktop) {
          map = new mapboxgl.Map({
            container: $el.id,
            style: mapBoxStyle,
            center: {lng: 110.29442651018508, lat: 47.09365332993602},
            // zoom: 15,
            zoom: 11,
            offset: [-1000, 0],
            minZoom: 3,
            cooperativeGestures: isTouchDevice
          });
        } else {
          map = new mapboxgl.Map({
            container: $el.id,
            style: mapBoxStyle,
            center: {lng: 110.29442651018508, lat: 47.09365332993602},
            // zoom: 15,
            zoom: 10,
            minZoom: 0.1,
            cooperativeGestures: isTouchDevice
          });
        }
      
        const boundsOffset =  [0, 0];
        const boundsPadding = 
        isDesktop ? { top: 120, left: 100, right: 600, bottom: 120 } :  { top: 20, left: 60, right: 60, bottom: 200 };
      
        setTimeout(() => {
          map.fitBounds(bounds, { padding: boundsPadding, offset: boundsOffset });
        }, 1000);
      
        setTimeout(() => {
          map.setMinZoom(map.getZoom());
        }, 3000);
      
        map.addControl(new mapboxgl.NavigationControl(), isDesktop? 'bottom-left' : "top-right");
      
        $locations.forEach(function (location) {
          location.addEventListener('click', onLocationClick);
        });
      
        // Event Handlers
      
        function onMarkerClick(event) {
          const marker = event.currentTarget.querySelector('[data-marker-id]');
          const markerId = marker.dataset.markerId;
          if (markerId) {
            highlightLocation(markerId);
            highlightMarker(markerId);
      
          }
        }
      
        function onLocationClick(event) {
          const $location = event.currentTarget;
          const locationId = $location.dataset.locationId;
          if (locationId) {
            const locationIsSelected = locationId === activeLocationId;
      
            if (!locationIsSelected) {
              highlightLocation(locationId);
              highlightMarker(locationId);
            }
          }
        }
      
        let timer;
        function highlightMarker(id) {
          var parentId = id.replace('--1','').replace('--2','').replace('--3','')
          const markers = geojson.features.filter(function (m) {
            return m.id === parentId || m.id2 === parentId;
          });
          const bounds = new mapboxgl.LngLatBounds();
              for (let c of markers) {
                bounds.extend(c.geometry.coordinates) 
              }
          if (markers.length > 0) { 
            clearTimeout(timer);
            timer = setTimeout(() => {
              map.fitBounds(bounds, { padding: boundsPadding, offset: boundsOffset, maxZoom: 8 });
              removeMarkersHighlight();
              
              setTimeout(() => {
                removeMarkersHighlight();
                var markerDoms = $('[data-marker-id=' + parentId + '], [data-marker-id=' + parentId + '--1],[data-marker-id=' + parentId + '--2],[data-marker-id=' + parentId + '--3]')
                
                markerDoms.addClass('active');
                markerDoms.parent().addClass('active');
              }, 500)
              

            }, 500);
            
            return;
          }
        }
      
        function removeMarkersHighlight() {
          $('[data-marker-id').removeClass('active');
          $('[data-marker-id').removeClass('active-pause');
          $('[data-marker-id').parent().removeClass('active');
        }
      
        function removeLocationsHighlight() {
          $locations.forEach(function (l) {
            l.classList.remove('active');
          });
          if (activeLocationId) {
            activeLocationId = 0;
          }
        }
      
        function scrollToLocationCard($location) {
          /*gsap.to(window, {
            duration: 0.3,
            ease: 'Power2.easeOut',
            scrollTo: {
              y: $el,
              offsetY: headerOffset,
            },
          });*/
      
          if (!$location) return;
      
          if (isDesktop) {
            const winHeight = window.innerHeight;
            const cardHeight = $location.getBoundingClientRect().height;
            const offsetY = winHeight / 2 - cardHeight / 2 - 50; // -50 for visual center, to compensate header
            console.log($locationsHolder)
            gsap.to($locationsHolder, {
              scrollTo: { y: $location, offsetY },
            });
          } else {
            const cardWidth = $location.getBoundingClientRect().width;
            const winWidth = window.innerWidth;
            const offsetX = winWidth / 2 - cardWidth / 2;
      
            gsap.to($locationsHolder, { scrollTo: { x: $location, offsetX } });
          }
        }
      
        function highlightLocation(id) {
          const $location = $locations.find(function (l) {
            return l.getAttribute('data-location-id') === id.replace('--1','').replace('--2','').replace('--3','');
          });
          if (!$location) return;
          if (id === activeLocationId) return; //same location
      
          const prevActiveLocationId = activeLocationId;
          removeLocationsHighlight();
      
          const locationIndex = $locations.findIndex(
            (l) => l.getAttribute('data-location-id') === id.replace('--1','').replace('--2','').replace('--3','')
          );
          
          $location.parentElement.parentElement.classList.add('open');
      
          let scrollToBlock = locationIndex < 2 ? 'start' : 'center';
          const scrollOptions = { block: scrollToBlock };
          if (!isDesktop) {
            scrollOptions.block = 'center';
            scrollOptions.inline = 'center';
          }
      
          scrollToLocationCard($location);
      
          if (prevActiveLocationId !== id) {
            activeLocationId = id;
            $location.classList.add('active');
          }
        }
      
        map.on('load', function () {
          geojson.features.forEach(function (marker, i) {
            // create a HTML element for each feature
            const markerId = marker.id ? marker.id : 'id-' + i;
            const markerEl = document.createElement('div');
            markerEl.className = 'marker';
            markerEl.innerHTML =
              '<span class="pin" data-marker-id="' +
              markerId +
              '" data-category="' +
              marker.category +
              '" data-title="' +
              marker.title +
              '"></span>';
            // make a marker for each feature and add it to the map
            new mapboxgl.Marker(markerEl)
              .setLngLat(marker.geometry.coordinates)
              .addTo(map);
            markerEl.addEventListener('click', onMarkerClick);
            markerElements.push(markerEl);
          });
        });
      
        map.on('movestart', function () {
          // removeLocationsHighlight();
        });
        map.scrollZoom.disable();

    }
    initMap(mapId) {
        const $mapHolder = document.querySelector(mapId);
      
        if (!$mapHolder) {
          return false;
        }
      
        this.createMap($mapHolder);
      };
      

    initMapHandlers() {
        var map = this;
        map.initMap('#map-mongolia');


        const categoryHeaders = document.querySelectorAll('.map-category-header');
        for (var i = 0; i < categoryHeaders.length; i++) {
          categoryHeaders[i].addEventListener("click", function(e) {
            e.target.parentElement.classList.toggle('open');
          });
        }
    }


    initLocations() {
      
      const mapContainer =  $( '#map-holder' );
    const locationContainer = $( '#map-wrapper .map-locations-holder' );

      document.querySelector('#map-wrapper .map-locations-holder' )?.addEventListener( 'mousewheel', ( event ) => {
          event.stopPropagation();
      } );
      
      mapContainer.bind( 'touchmove', function( e ) {
          // if( window.innerHeight > window.innerWidth ) {
              e.stopPropagation();
          // }
      } );

      $('#map-wrapper').on('mouseenter', '.pin', function (e) {
        $('.pin.active').not(e.target).addClass('active-pause');
      })
      $('#map-wrapper').on('mouseleave', '.pin', function () {
        $('.pin.active').removeClass('active-pause');
      })

      var isStart = false, sx, sy, ex, ey, tx, ty;
      locationContainer.bind('touchstart', function( e ) {
         sx = e.originalEvent.touches[0].clientX;
         sy = e.originalEvent.touches[0].clientY;
      } );

      // Swipe move function
      locationContainer.bind( 'touchmove', function( e ) {
          if( ! isStart ) {
              isStart = true;
              ex = e.originalEvent.changedTouches[0].clientX;
              ey = e.originalEvent.changedTouches[0].clientY;

              tx = Math.abs( sx - ex );
              ty = sy - ey;
          }
          // Swipe function on portrait mode condition
          if( window.innerHeight > window.innerWidth ) {
              if( tx >= Math.abs( ty ) ) {
                  e.stopPropagation();
              }
          // Swipe function on landscape mode condition
          } else {
              let { scrollHeight, scrollTop, clientHeight } = locationContainer.get(0);
              if( ty >= 0 ) {
                  // When the scroll are not reach the bottom
                  if( ! ( Math.abs( scrollHeight - clientHeight - scrollTop ) < 1 ) ) {
                      e.stopPropagation();
                  // When the scroll reach the bottom
                  } else {
                      e.preventDefault();
                  }
              } else {
                  // When the scroll are not reach the top
                  if( ! ( Math.abs( scrollTop ) <= 0 ) ) {
                      e.stopPropagation();
                  // When the scroll reach the top
                  } else {
                      e.preventDefault();
                  }
              }
          }
      } );
      
      locationContainer.bind( 'touchend', function( e ) {
          isStart = false;
      } );
  }
}

export default function () {
	  gsap.registerPlugin(ScrollToPlugin);
    let map = new Map();
    map.initMap();
    map.initMapHandlers();
    map.initLocations();
}