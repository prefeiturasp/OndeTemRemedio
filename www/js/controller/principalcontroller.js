angular.module('starter').
controller('PrincipalController', function($scope ,$cordovaGeolocation,$ionicLoading, $ionicPopup, $rootScope, $stateParams,$state, DataBaseQuerys){

	$scope.carregaMapa = function(registro){
		console.log(registro);
		var options = {timeout: 10000, enableHighAccuracy: true};
 

	  	$cordovaGeolocation.getCurrentPosition(options).then(function(position){

	    //var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	    //var latLng = new google.maps.LatLng(-23.5095100, -46.4972500);

	    /*var lat = parseFloat(registro.latitude), lng = parseFloat(registro.longitude);
	    var latLng = new google.maps.LatLng(lat, lng);
	    var mapOptions = {
	      center: latLng,
	      zoom: 17,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };

	    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
	    var bounds = new google.maps.LatLngBounds();
	    var marker = new google.maps.Marker({
            position: latLng,
            map: $scope.map,
            draggable: false,
            animation: google.maps.Animation.DROP//,
            //icon: 'icon.png'//icons[c[iterator][2]].icon
        });
        bounds.extend(latLng);*/

        var iterator = 0;
        function initialize(unit, id, NextFunct) {
            var mapOptions = {
                zoom: 12,
                scrollwheel: false
            };

            var map = new google.maps.Map(document.getElementById(id), mapOptions);
            var bounds = new google.maps.LatLngBounds();
            drop(map, bounds, unit, NextFunct, id);
        }

        function drop(m,b,c,n,id) {
            var j=0;
            for (var i = 0; i < c.length; i++) {
                setTimeout(function() {
                    addMarker(m,b,c);
                    if(j==c.length-1){
                        m.fitBounds(b);
                    }
                    j++;
                }, i * 200);
            }
        }

        function fitBoundsToVisibleMarkers(m) {
            var bounds = new google.maps.LatLngBounds(), bLen = 0;
            for (var i=0; i<markers.length; i++) {
                if(markers[i].getVisible()) {
                    bounds.extend( markers[i].getPosition() );
                    bLen++;
                }
            }
            //para redimensionar apenas se estiver algum sendo exibido
            if (bLen>0) m.fitBounds(bounds);
        }

        function addMarker(m,b,c) {
            var marker = new google.maps.Marker({
                position: c[iterator][0],
                map: m,
                title: c[iterator][1],
                draggable: false,
                animation: google.maps.Animation.DROP//,
                //icon: 'icon.png'//icons[c[iterator][2]].icon
            });

            b.extend(c[iterator][0]);
            iterator++;
        }

        function Mapa() {
            var FindUnit = [], tRa=0, rodaAjax=0;
				
            if(registro.length==0){
				for(var x=0;x<registro.length;x++){
		            var valueToPush = new Array();
		            valueToPush[0] = new google.maps.LatLng(parseFloat(registro[x].latitude), parseFloat(registro[x].longitude));
		            valueToPush[1] = registro[x].unidade;
		            FindUnit.push(valueToPush);
		        }
        	}else{
	            var valueToPush = new Array();
	            valueToPush[0] = new google.maps.LatLng(parseFloat(registro.latitude), parseFloat(registro.longitude));
	            valueToPush[1] = registro.unidade;
	            FindUnit.push(valueToPush);
        	}

            initialize(FindUnit, 'map');
        }

        Mapa();
	 
	  }, function(error){
	    console.log("Could not get location");
	  });
	}

	$scope.dataView = $rootScope.dataResponse[0];

	if(angular.fromJson($stateParams.id) == 1){
		$scope.isCardVisivel = true;
		$scope.mensagem = 'Prezado Cidadão, o medicamento encontra-se disponível para a retirada na unidade,'
		  		+' pedimos que se direcione a unidade, com um documento de indentificação com foto e seu cartão SUS.';
		console.log("a");
		$scope.carregaMapa($scope.dataView);
	}else if(angular.fromJson($stateParams.id) == 0){
		$scope.isCardVisivel = true;
		$scope.mensagem = 'Prezado Cidadão, o medicamento encontra-se indisponível para a retirada na unidade,'
		  		+' pedimos que faça a solicitação de pedido do medicamento, através do botão abaixo.';

		$scope.isVisivel = true;
		console.log("b");
		$scope.carregaMapa($scope.dataView);
	}else{
		$scope.isCardVisivel = false;
		$scope.mensagem = 'Abaixo seguem as unidades que possuem o medicamento para a retirada, pedimos que se direcione até uma delas!';

		DataBaseQuerys.selectNomeRemediosAllUnidades($rootScope.dataResponse[0].nome).then(function(response){
			$scope.listAllRegisters = response;
			//console.log(response);
			console.log("c");
			$scope.carregaMapa(response);
		}).catch(function(error){
			console.log(error);
		})

		$scope.isCardIsVisivel = true;
	}

	$scope.solicitarRemedio = function(){
		$state.go('solicitar');
	}

})