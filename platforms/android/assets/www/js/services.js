'use strict';

/* Services */

var vhodServices = angular.module('vhodServices', ['ngResource']);

vhodServices.factory('Question', ['$resource',
  function($resource){
    var vhodServer = 'http://vhod-server.appspot.com/:questionId:action';
    //var vhodServer = 'http://127.0.0.1/:questionId:action';
    return $resource(vhodServer, {}, {
      query: {method:'GET', params:{questionId:'list'}, isArray:true}
    });
  }]);
