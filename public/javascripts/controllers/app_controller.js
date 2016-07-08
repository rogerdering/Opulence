app.controller('AppCtrl', ['$scope','$location', '$http','parse',
	function AppCtrl($scope, $location, $http, parse) {
		$scope.sidebar = 'views/partials/sidebar.html';
		$scope.logged = $('.userinfo').attr('data-username');
		$scope.breadcrumburl = 'views/partials/breadcrumb.html';
		$scope.anarchisturl = 'views/story/anarchist.html';
		$scope.copurl = 'views/story/cop.html';
		$scope.gangsterurl = 'views/story/gangster.html';
		$scope.mechanicurl = 'views/story/mechanic.html';
		$scope.officeworkerurl = 'views/story/officeworker.html';
		$scope.scientisturl = 'views/story/scientist.html';
		$scope.faketerminalurl = 'views/story/fake-terminal.html';
		$scope.terminallinkurl = 'views/story/terminallink.html';

		$scope.setFlash = function(title,message,type){
			var base = 'alert alert-block alert-';

			$scope.flash = {
				title: title,
				message: message,
				type: base + type,
				url: 'views/partials/flash.html'
			}
		}
	}
	]);
