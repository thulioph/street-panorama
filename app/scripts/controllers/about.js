'use strict';

/**
 * @ngdoc function
 * @name streetViewApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the streetViewApp
 */
angular.module('streetViewApp')
  .controller('AboutCtrl', function ($scope, $timeout, Gmaps) {

    var map;
    var marker;
    var infoWindow;

    function LatLng(lat, lng) {
      return new google.maps.LatLng(lat, lng);
    }

    function initMap() {
      var lat_lng = LatLng(-8.086918599999999, -34.892232);

      map = new google.maps.Map(document.getElementById('mapa-zoom'), {
        center: lat_lng,
        zoom: 12
      });

      marker = new google.maps.Marker({
        position: lat_lng,
        map: map
      });

      // evento para quando mexer no mapa
      google.maps.event.addListener(map, 'idle', showMarkers);
    }

    function showMarkers() {
      var bounds = map.getBounds();

      // var south = map.getBounds().getSouthWest();
      var south_lat = map.getBounds().getSouthWest().lat();
      var south_lng = map.getBounds().getSouthWest().lng();

      // var north = map.getBounds().getNorthEast();
      var north_lat = map.getBounds().getNorthEast().lat();
      var north_lng = map.getBounds().getNorthEast().lng();

      var center_lat = (south_lat + north_lat)/2;
      var center_lng = (south_lng + north_lng)/2;

      console.warn('center_lat -> ', center_lat);
      console.warn('center_lng -> ', center_lng);

      var marker = new google.maps.Marker({
        position: LatLng(center_lat, center_lng),
        map: map
      });
    }

    $scope.init = function() {
      $timeout(function() {
        initMap()
      }, 2000);
    };

  });
