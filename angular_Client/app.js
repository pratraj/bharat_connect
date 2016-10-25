var app = angular.module("app", []);
	app.controller("dashBoardController", function ($scope,UserService) {
        function res(response){
			oStringify = JSON.stringify(response.data);
			swal("Posted Sucessfully",oStringify,"success");
		};
		function fail(response){
			oStringify = JSON.stringify(response.data);
			swal("Failed",oStringify,"error");
		};
		
		
		$scope.sign = function(value){
       		if(value=='up'){
       			UserService.signup($scope.user, res , fail)
       		}else{
       			UserService.signin($scope.user, res , fail)
       		}
        }
    });
 
	app.service('UserService', ["HTTPConnection", function(HTTPConnection) {
		var url = 'http://localhost:3000/api/users';
		this.signup = function(data, success, failure) {
			console.log(data);
			HTTPConnection.post(url+"/signUp", data, success,failure);
		}
		this.signin = function(success, failure) {
			HTTPConnection.post(url+"/signIn",success,failure);
		}
}]);

app.service('HTTPConnection', ['$http', '$q',function($http, $q) {
	this.post = function(url, data, success, failure){
		// $http returns a promise, which has a then function, which also returns a promise
		var deferred = $q.defer();
		var options = {
	            headers: {},
	        };
		var promise = $http.post(url, data, options).then(function (response) {
			success(response, deferred);
		}, function(response) {
			if(failure) {
				failure(response, deferred);
			} 
		}).catch(function(e) {
        });
		return deferred.promise;
	};
	
	this.get = function(url, success, failure){
		var deferred = $q.defer();
		var promise = $http.get(url).then(function (response) {
			success(response, deferred);
		}, function(response) {
			if(failure) {
				failure(response, deferred);
			} 
			}).catch(function(e) {
        });
		return deferred.promise;
	};
}]);