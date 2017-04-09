angular.module('starter')
.controller('SolicitarController', function($scope, $ionicPopup,$state,$ionicHistory){

	$scope.enviado = function(){

		$ionicPopup.alert({
			title: 'Enviado com sucesso!',
			template:'<p>Sua solicitação foi encaminhada, verifique as unidades que você pode retirar o medicamento</p>'
		}).then(function(){
			$ionicHistory.clearCache();
			$state.go('principal',{id:3});

		})

	}

})