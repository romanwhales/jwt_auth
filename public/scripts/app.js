'use strict';
var authApp = angular.module('authApp',['ui.router','satellizer']);
authApp.config(['$stateProvider','$urlRouterProvider','$authProvider',function($stateProvider,$urlRouterProvider,$authProvider){
		//Satellizer configuration that specifies which API
		//route the JWT should be retreived from
		$authProvider.loginUrl = '/api/authenticate';
		//Redirect to the auth state if any other state
		//are requested other than users
		$urlRouterProvider.otherwise('/auth');
		$stateProvider.state('auth',{
			url:'/auth',
			templateUrl:'../views/authView.html',
			controller:'AuthController as auth'
		})
		.state('users',{
			url:'/users',
			templateUrl:'../views/userView.html',
			controller:'UserController as user'
		})
}]);