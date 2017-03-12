(function(){
	'use strict';
	angular.module('authApp')
		.controller('AuthController',AuthController);
	function AuthController($auth,$state,$http,$rootScope){
		var vm = this;
		vm.login = function(){
			var credentials = {
				email:vm.email,
				password:vm.password
			}
			$http({
				method:'POST',
				url:'/api/authenticate',
				data:credentials
			}).then(function(data){
				debugger;
				$rootScope.data = data.data;
				var data_str = JSON.stringify(data.data);
				localStorage.setItem('user',data_str);
				$rootScope.authenticated = true;
				$state.go('users',{});
			},function(err){
				debugger;
			})
			// //use Satellizer's $auth service to login
			// $auth.login(credentials).then(function(data){
			// 	//if login is successful,redirect to the users state
			// 	//$state.go('users',{});
			// 	//Return an $http request for the now authenticated user so that
			// 	//we can flaten the promise chain
			// 	//console.log($auth.isAuthenticated());
			// 	debugger;
			// 	console.log(data.token,'and ',data.user);
			// 	//return $http.get('api/authenticate/user');
			// },function(error){
			// 	vm.loginError = true;
			// 	vm.loginErrorText = error.data.error;
			// }).then(function(response){
			// 	//Stringify the returned data to prepare it to go into local storage
			// 	debugger;
			// 	// var user = JSON.stringify(response.data)
			// });
		}
	}
})();