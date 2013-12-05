'use strict';

/* App Module */

var vhodApp = angular.module('vhodApp', [
  'ngRoute',
  'ngCookies',
  'vhodControllers',
  'vhodServices'
]);

vhodApp.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/list', {
            templateUrl: 'partials/question-list.html',
            controller: 'QuestionListCtrl'
        }).
        when('/new', {
            templateUrl: 'partials/question-create.html',
            controller: 'QuestionCreateCtrl'
        }).
        when('/:questionId/detail', {
            templateUrl: 'partials/question-detail.html',
            controller: 'QuestionDetailCtrl'
        }).
        otherwise({
            redirectTo: '/list'
        });
  }]);

vhodApp.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    'http://127.0.0.1**',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://vhod-server.appspot.com/**']);
});


function getCookies(name) {
  // Retrieving a cookie
  var favoriteCookie = $cookies.myFavorite;
  // Setting a cookie
  $cookies.myFavorite = 'oatmeal';
}

vhodApp.config(['$httpProvider',
    function ($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';  
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];           
    }
]);
