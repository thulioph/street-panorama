'use strict';

/**
 * @ngdoc function
 * @name streetViewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the streetViewApp
 */
angular.module('streetViewApp')
  .controller('MainCtrl', function ($scope, Gmaps, $http) {

    $scope.v_data = '';

    // ====
    // helpers functions
    function getLocation() {
      if (navigator.geolocation) {
        console.log('Get userlocation...');
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        window.alert('Geolocation is not supported.');
      }
    }

    function success(position) {
      $scope.location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      $scope.$broadcast('pick_my_location');
      $scope.$broadcast('im_here');
    }

    function error(err) {
      window.alert('Error: ', err);
    }

    function _initStreetView(params) {
      var position = {
        lat: params.lat,
        lng: params.lng
      };

      var map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        zoom: 14
      });

      var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('panoramic'), {
          position: position,
          pov: {
            heading: 34,
            pitch: 10
          }
        });

      map.setStreetView(panorama);
    }

    function _initPanoramica() {
      var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('map_panoramic'), {
          pano: 'reception',
          visible: true,
          panoProvider: getCustomPanorama
        });
    }

    function _getCustomPanoramaTileUrl(pano, zoom, tileX, tileY) {
      // return 'http://cdn1.matadornetwork.com/blogs/1/2006/11/360-panorama-matador-seo.jpg';
      return $scope.view.url;
    }

    function getCustomPanorama(pano, zoom, tileX, tileY) {
      if (pano === 'reception') {
        return {
          location: {
            pano: 'reception',
            description: 'Google Sydney - Reception'
          },
          links: [],
            // The text for the copyright control.
            copyright: 'Imagery (c) 2010 Google',
            // The definition of the tiles for this panorama.
            tiles: {
              tileSize: new google.maps.Size(1024, 512),
              worldSize: new google.maps.Size(1024, 512),
              // The heading in degrees at the origin of the panorama
              // tile set.
              centerHeading: 105,
              getTileUrl: _getCustomPanoramaTileUrl
            }
          };
        }
      }
    // ====

    // ====
    // g_streetview_service, g_streetview_image
    $scope.autoComplete = function(address) {
      return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          sensor: false,
          language: 'pt-BR'
        }
      }).then(function(response){
        console.log(response);

        return response.data.results.map(function(item){
          return item.formatted_address;
        });
      });
    };
    // ====

    // ====
    // g_streetview_service, g_streetview_image
    $scope.getAddress = function(address) {
      var params = address;

      Gmaps.geocode(params, function(result) {
        var coords = result.results[0].geometry.location;
        _initStreetView(coords);
        $scope.coords = coords;
      })
    }
    // ====

    // ====
    // g_streetview_service
    $scope.pickMyLocation = function() {
      getLocation()
    }

    $scope.$on('pick_my_location', function() {
      _initStreetView($scope.location);
    });
    // ====

    // ====
    // g_streetview_image
    $scope.setRangeValues = function() {
      $scope.range = {
        fov : {
          value: 90,
          options: { floor: 90, ceil: 120 }
        },
        heading : {
          value: 180,
          options: { floor: 0, ceil: 360 }
        },
        pitch : {
          value: 1,
          options: { floor: 0, ceil: 180 }
        },
        size : {
          value: 360,
          options: { floor: 0, ceil: 1024 }
        }
      };
    };

    $scope.setRangeValues();
    // ====

    // ====
    // g_streetview_image
    $scope.ImHere = function() {
      getLocation();
    };

    $scope.$on('im_here', function() {
      $scope.coords = $scope.location;
    });
    // ====

    // ====
    // g_streetview_custom
    $scope.view = {};

    $scope.getPanoramica = function() {
      var params = $scope.view.url;

      _initPanoramica();
    };
    // ====

  });
