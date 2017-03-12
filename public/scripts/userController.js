(function(){
	'use strict';
	angular.module('authApp')
		.controller('UserController',UserController);
	function UserController($http,$rootScope){
		console.log($rootScope);
		var vm = this;
		vm.users;
		vm.error;
		vm.getUsers = function(){
			//this request will hit the index method in the AuthenticateController 
			// on the Laravel side and will return the list of users
			$http.get('api/authenticate?token='+$rootScope.data.token.token).then(function(users){
				debugger;
				vm.users = users.data;
			},function(error){
				debugger;
				vm.error = error.data.error;
			});
		}
	}
})();