'use strict';

/**
 * @ngdoc service
 * @name streetViewApp.Gmaps
 * @description
 * # Gmaps
 * Service in the streetViewApp.
 */
angular.module('streetViewApp')
  .service('Gmaps', function ($http, AppConfig) {

    var geocode_url = AppConfig.API_GEOCODE;

    var obj = {};

    obj.geocode = function (data, callback) {
      $http.get(geocode_url + 'json?address=' + data)
        .success(function (data) {
          console.log('Success geocode: ', data);
          callback(data);
        }).error(function (error) {
        console.log('Error geocode: ', error);
      });
    };

    return obj;
  });
