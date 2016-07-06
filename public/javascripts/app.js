'use strict';
var app = angular.module('angularApp', ['ngResource']);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/main.html'
	})
	.when('/characters/new', {
		templateUrl: 'views/characters/form.html',
		controller: 'CharactersCreateCtrl'
	})
	.when('/users/:username', {
		templateUrl: 'views/users/view.html',
		controller: 'UsersDetailCtrl'
	})
	.when('/users/:username/edit', {
		templateUrl: 'views/users/form.html',
		controller: 'UsersUpdateCtrl'
	})
	.when('/users/:username/delete', {
		templateUrl: 'views/users/view.html',
		controller: 'UsersDeleteCtrl'
	})
	.when('/characters/:charactername', {
		templateUrl: 'views/characters/view.html',
		controller: 'CharactersDetailCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
	//$locationProvider.html5Mode(true).hashPrefix('!');
});
