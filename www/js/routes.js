angular.module('starter')
.config(function($stateProvider,$urlRouterProvider){

$urlRouterProvider.otherwise('pesquisa');

$stateProvider //Utilizado nas rotas

.state('pesquisa',{
	url: '/pesquisa',
	templateUrl: 'templates/pesquisa.html',
	controller: 'PesquisaController'
})

.state('principal',{
	url: '/principal/:id',
	templateUrl: 'templates/principal.html',
	controller: 'PrincipalController'
})

.state('solicitar',{
	url: '/solicitar',
	templateUrl: 'templates/solicitar.html',
	controller: 'SolicitarController'
})

})
