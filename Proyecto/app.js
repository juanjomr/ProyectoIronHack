var find = function(array,id){
  for(var i = 0, m = null ; i<array.length ; ++i){
    if(array[i].id == id){
        return array[i];
        break;
      };
    };
   /*var i=0;
    var encontrado = false;
    var park;
    while(i<array.length && !encontrado){
    	if(array[i].id == id){
        	park=array[i];
        	encontrado=true;
      	};
    	i++
    };
    return park;*/
};


(function(){
	var datavi = "data/videos.json";
	var datacont = "data/continents.json";
	var datapark = "data/parks.json";
	var datanew = "data/news.json"

	var app = angular.module('myApp',['ngRoute','ngMap']);
	// Rutas:
	app.config(['$locationProvider','$routeProvider',function($locationProvider,$routeProvider){
		$locationProvider.html5Mode(true); // para quitar el # de la ruta

		$routeProvider
		.when('/',{
			templateUrl:"Templates/home.html",
			controller:"indexController",
        	controllerAs:"home"
		})
		// donde??
		.when('/showWhere',{ 
          	templateUrl:"Templates/where.html",
          	controller:"indexController",
          	controllerAs:"where"
      	})		
		.when('/showParks/:parkId',{ 
          	templateUrl:"Templates/parks.html",
          	controller:"whereController",
          	controllerAs:"where"
      	})

		.when('/showNews',{ //novedades 
          templateUrl:"Templates/news.html",
          controller:"indexController",
          controllerAs:"news"
      	})
		.when('/showForm',{ //formulario
          templateUrl:"Templates/form.html",
          controller:"indexController",
          controllerAs:"form"
      	})
      	.when('/showMsnForm',{ //formulario
          templateUrl:"Templates/formmsn.html",
          controller:"indexController",
          controllerAs:"msnform"
      	})

	}]);

	//Directivas:
	app.directive('headerDirective',function(){
		return{
			restrict: "E",
			templateUrl: "Components/header.html"
		};
	});
	app.directive('footerDirective',function(){
		return{
			restrict: "E",
			templateUrl: "Components/footer.html"
		};
	});

	// Home:
	app.directive('carouselDirective',function(){
		return{
			restrict: "E",
			templateUrl: "Components/carousel.html"
		};
	});
	app.directive('videosDirective',function(){
		return{
			restrict: "E",
			templateUrl: "Components/videos.html"
		};
	});
	app.directive('continentsDirective',function(){
		return{
			restrict: "E",
			templateUrl: "Components/continents.html"
		};
	});
	app.directive('navbarDirective',function(){
		return{
			restrict: "E",
			templateUrl: "Components/navbar.html"
		};
	});

	app.directive('parkDirective',function(){
		return{
			restrict: "A",
			templateUrl: "Components/contpark.html"
		};
	});

	app.directive('imgparkDirective',function(){
		return{
			restrict: "E",
			templateUrl: "Components/imagepark.html"
		};
	});

	app.directive('newsDirective',function(){
		return{
			restrict: "E",
			templateUrl: "Components/new.html"
		};
	});
	
	

	// Controladores:

	app.controller('indexController',function($scope,$http){
		$http.get(datacont).then(function(res){
			$scope.continents=res.data;
		});
		$http.get(datavi).then(function(res){
			$scope.videos=res.data;
		});
		$http.get(datapark).then(function(res){
			$scope.parks=res.data;
		});
		$http.get(datanew).then(function(res){
			$scope.news=res.data;
		});

		$scope.viewLoaded=function(){
			$('.carousel ').carousel()
		}
	});

	app.controller('whereController',function($scope,$routeParams,$http){
    	$http.get(datapark).then(function(res){
      		var Id = $routeParams.parkId;
      		var parks = res.data;
      		$scope.park = find(parks,Id)
    	});
    });

	app.controller('MainCtrl', function ($scope) {
  		$scope.formData = {};
  
  		$scope.submitForm = function (formData) {
   		alert('Form submitted with' + JSON.stringify(formData));
  		};
	});
})();
