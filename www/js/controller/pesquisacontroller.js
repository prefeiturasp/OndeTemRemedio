angular.module('starter')
.controller('PesquisaController',function($scope,DataBaseQuerys, $http, $state, $rootScope,$ionicPopup){

	$scope.dadosBusca = {
		unidade : '',
		medicacao : ''
	}

	$scope.hideUnidades = true;

	$scope.buscaDados = function(data){
		
		DataBaseQuerys.selectTodasUnidadesNome(data.unidade).then(function(response){
			if(response.length == 0){
				$ionicPopup.alert({
					title: 'Unidade não encontrada!',
					template: '<p>Por favor, escolha umas das opções sugeridas pelo app</p>'
				})
			}else{
				data.cnes = $scope.cnes;
				DataBaseQuerys.selectNomeRemedios(data).then(function(response){
					if(response.length == 0){
						$ionicPopup.alert({
							title: 'Remédio Não encontrado!',
							template: '<p>Por favor, digite novamente para uma busca!</p>'
						})
					}else{
						if(response[0].quantidade == 0){
							$rootScope.dataResponse = response;
							$ionicPopup.alert({
							title: 'Não temos o remédio em estoque!',
							template: '<p>Você será redirecionado para a tela de solicitação de remédios!</p>'
						}).then(function(){
							$state.go('principal',{id:0});
						});
						}else{
							$rootScope.dataResponse = response;
							$state.go('principal',{id:1});
						}
					}
				}).catch(function(error){
					console.log(error);
				})

			}
		}).catch(function(error){
			console.log(error);
		})
	}

	$scope.autocompleteText = function(string){

		if(string != null && string.length > 2){
	        $scope.hideUnidades = false;
	        var  todasUnidades = $scope.allUnidades;
	        var outputUnidades = [];

	        angular.forEach(todasUnidades,function(todasAsUnidades,key){
	          if(todasAsUnidades.unidade.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
	            outputUnidades.push(todasAsUnidades);
	          }
	        });
	        $scope.filterUnidade = outputUnidades;
		  }else{
		    $scope.hideUnidades = true;
		  }
	}

	$scope.fillTextbox = function(string){

		$scope.dadosBusca.unidade = string.unidade;
	    $scope.cnes = string.cnes;
	    $scope.hideUnidades = true;

	}

	$scope.listAllUnidades = function(){
		DataBaseQuerys.selectTodasUnidades().then(function(response){
			$scope.allUnidades = response;
		}).catch(function(error){
			console.log(error);
		})
	}

	$scope.listAllUnidades();

})