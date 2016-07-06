app.controller('UsersCtrl', ['$scope','$location', '$http','parse', '$routeParams',
	function UsersCtrl($scope, $location, $http, parse, $routeParams) {
		$scope.user = [];
		$scope.character = [];
		$scope.flash = [];
		$scope.logged = $('.userinfo').attr('data-username');

		$scope.get = function(){
			parse.all("users",function(error,response){
				$scope.users = response;
			});
		}

		$scope.destroy = function(id, index){
			parse.remove('users',id,function(error,response){
				$scope.users.splice(index,1);
			});
		}

		$scope.get = function(){
			parse.all("characters",function(error,response){
				$scope.characters = response;
			});
		}

		$scope.destroy = function(id, index){
			parse.remove('characters',id,function(error,response){
				$scope.characters.splice(index,1);
			});
		}

		$scope.get();
	}
	]);

app.controller('CharactersCreateCtrl', ['$scope','parse','$routeParams','$location',
	function CharactersCreateCtrl($scope,parse,$routeParams,$location){
		$scope.form_title = 'New character';
		$scope.form_edit = true;
		$scope.selected_character = false;
		$scope.character = [];

		$scope.breadcrumb = [{
			title: 'Home',
			url: '#/'
		},
		{
			title: 'New character',
			active: 'active'
		}];

		$scope.save = function(){
			var character = {
				charactername: slugify($scope.character.charactername),
				gender: $scope.character.gender,
				job: $scope.character.job,
				skill: $scope.character.skill,
				progress: $scope.character.progress,
				inCustody: $scope.character.inCustody,
				user: $scope.character.user
			};

			parse.create("characters/add/",{character: character},function(err,response){
				if(!err){
					$location.path('/');
				}
			});

		}
	}
	]);

app.controller('UsersUpdateCtrl', ['$scope','parse','$routeParams', '$location',
	function UsersUpdateCtrl($scope,parse,$routeParams, $location){
		$scope.form_edit = true;
		$scope.form_title = 'Update user';
		$scope.form_action = 'edit';

		$scope.breadcrumb = [{
			title: 'Home',
			url: '#/'
		},
		{
			title: $routeParams.username,
			url: '#users/' + $routeParams.username
		},
		{
			title: 'Edit',
			active: 'active'
		}];

		parse.get("users/" + $routeParams.username, function(error,response){
			$scope.form_edit = false;
			// Remvove password from response
			delete response.password;
			$scope.user = response;
		});

		$scope.save = function(){
			$scope.user.username = slugify($scope.user.username);
			if( $scope.user.username === 'admin'){
				// Cant change admins password!
				console.log('Cant change admin password');
				$location.path('/');
			} else {
				user = $scope.user;
				parse.update("users/" + user._id, {user: user},function(err,response){
					//$scope.setFlash('Success','User updated succefully','success');
					$location.path('/');
				});
			}


		}
	}
	]);

app.controller('UsersDetailCtrl', ['$scope', 'parse', '$routeParams',
	function UsersDetailCtrl($scope, parse, $routeParams) {

		$scope.breadcrumb = [{
			title: 'Home',
			url: '#/'
		},
		{
			title: $routeParams.username,
			active: 'active'
		}];

		$scope.view = function(username) {
			parse.get("users/" + username, function(error,response){
				$scope.form_edit = false;
				// Remvove password from response
				delete response.password;

				$scope.selected_user = response;
			});
		}

		if( $routeParams.username ) {
			$scope.username = $routeParams.username;
			$scope.view($scope.username);
		}
	}]);


app.controller('CharactersDetailCtrl', ['$scope', 'parse', '$routeParams',
	function CharactersDetailCtrl($scope, parse, $routeParams) {

		$scope.breadcrumb = [{
			title: 'Home',
			url: '#/'
		},
		{
			title: $routeParams.charactername,
			active: 'active'
		}];

		$scope.view = function(charactername) {
			parse.get("characters/" + charactername, function(error,response){
				$scope.form_edit = false;
				// Remvove password from response
				delete response.password;

				$scope.selected_character = response;
			});
		}

		if( $routeParams.charactername ) {
			$scope.charactername = $routeParams.charactername;
			$scope.view($scope.charactername);
		}
	}]);


app.controller('UsersDeleteCtrl',['$scope','parse','$routeParams','$location',
	function UsersDeleteCtrl($scope, parse, $routeParams, $location) {
		if( $routeParams.username !== 'admin' ) {
			parse.get("users/" + $routeParams.username, function(err, res){
				parse.remove("users", res._id, function(err_delete, res_delete){
					console.log(res_delete);
					$location.path('/');
				})
			});
		} else {
			console.log('You cant delete the admin.');
			$location.path('/');
		}
	}]);
