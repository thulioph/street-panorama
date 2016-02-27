'use strict';

angular.module('streetViewApp')
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
  }])
  .constant('AppConfig', {
    'API_STREETVIEW': 'https://maps.googleapis.com/maps/api/streetview',
    'API_GEOCODE': 'https://maps.googleapis.com/maps/api/geocode/',
    'DISTANCE_KEY': 'AIzaSyDhYgr3oSOFPtTNynI7fOxMxJkU2LPQnQk',
    'LANGUAGE': 'pt-BR',
    'DIRECTIONS_KEY': 'AIzaSyCWmTGDejJLsv4LLNv2T8qkiazU5Y5l4X4'
  });
