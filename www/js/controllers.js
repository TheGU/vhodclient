'use strict';

/* Controllers */

var vhodControllers = angular.module('vhodControllers', []);

vhodControllers.controller('QuestionListCtrl', ['$scope', 'Question',
  function ($scope, Question) {
        $scope.question_list = Question.query();
        $scope.orderProp = '-update';
  }]);

vhodControllers.controller('QuestionDetailCtrl', ['$scope', '$location', '$http', '$routeParams', 'Question',
  function ($scope,$location,$http, $routeParams, Question) {
        $scope.question = Question.get({
            questionId: $routeParams.questionId,
            action: '/detail'
        }, function (question) {
            //$scope.mainImageUrl = question.images[0];
        });
      
        $scope.setImage = function (imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };
        
        $scope.voteQuestion = function (voteValue) {
            $http({
                method: 'POST',
                url: 'http://vhod-server.appspot.com/vote',
                params: {
                    voteValue: voteValue
                },
                data: $scope.question,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
            .success(function (data, status, headers, config) {
                $scope.question = Question.get({
                    questionId: $routeParams.questionId,
                    action: '/detail'
                });
            });            
        }
  }]);

vhodControllers.controller('QuestionCreateCtrl', ['$scope', '$location', '$http', '$cookies', 'Question',
  function ($scope, $location, $http, $cookies, Question) {
        $scope.question = {};

        $scope.createQuestion = function () {
            //var newQuestion = new Question({questionId:'create'});
            //newQuestion.data = $scope.question;
            //newQuestion.$save();

            $http({
                method: 'POST',
                url: 'http://vhod-server.appspot.com/create',
                params: {
                    name: 'test'
                },
                data: $scope.question,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
            .success(function (data, status, headers, config) {
                $location.path('/');
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
           
        };

  }]);