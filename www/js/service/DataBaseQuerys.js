angular.module('starter')
.factory('DataBaseQuerys',['$q','SQLiteService',function($q, SQLiteService){

	return{
		createTableUnidades : function(){
			var query = 'CREATE TABLE IF NOT EXISTS unidades (cnes integer not null, unidade text not null, endereco text not null, bairro text not null, latitude text not null, longitude text not null)';
			return $q.when( SQLiteService.executeSql( query ) );
		},
		createTableRemedios : function(){
			var query = 'CREATE TABLE IF NOT EXISTS remedios (unidades id integer not null, nome text not null, quantidade integer not null)';
			return $q.when( SQLiteService.executeSql( query ) );
		},
		dropTableUnidades : function(){
			var query = 'DROP TABLE IF EXISTS unidades';
			return $q.when( SQLiteService.executeSql( query ) );
		},
		dropTableRemedios : function(){
			var query = 'DROP TABLE IF EXISTS remedios';
			return $q.when( SQLiteService.executeSql( query ) );
		},
		selectNomeRemedios : function(clausula){
			var query = "SELECT a.nome, a.quantidade, b.cnes, b.unidade, b.endereco, b.bairro, b.latitude, b.longitude FROM remedios a inner join unidades b on b.cnes == a.unidades where a.unidades = "+clausula.cnes+" and a.nome like '"+clausula.medicacao+"%'";
			return $q.when(SQLiteService.getItems(query));
		},
		selectNomeRemediosAllUnidades : function(nome){
			var query = "SELECT a.nome, a.quantidade, b.unidade, b.endereco, b.bairro, b.latitude, b.longitude FROM remedios a inner join unidades b on b.cnes == a.unidades where a.quantidade <> 0 and a.nome like '"+nome+"%'";
			return $q.when(SQLiteService.getItems(query));
		},
		updateQuantidadeRemedio : function(){
			var query = 'UPDATE unidades set latitude = "-23.53221", longitude = "-46.70092" where cnes = 2788985';
			return $q.when( SQLiteService.executeSql( query ) );
		},
		selectNumeroTodasUnidades : function(){
			var query = 'SELECT COUNT(*) AS todasUnidades FROM unidades';
			return $q.when(SQLiteService.getItems(query));
		},
		selectNumeroTodosRemedios : function(){
			var query = 'SELECT COUNT(*) AS todosRemedios FROM remedios';
			return $q.when(SQLiteService.getItems(query));
		},
		selectTodasUnidadesNome : function(clausula){
			var query = 'SELECT * FROM unidades where unidade = "'+clausula+'"';
			return $q.when(SQLiteService.getItems(query));
		},
		selectTodasUnidades : function(){
			var query = 'SELECT * FROM unidades';
			return $q.when(SQLiteService.getItems(query));
		},
		insertTodasUnidades : function(){
			var query = 'INSERT INTO unidades (cnes, unidade, endereco, bairro, latitude, longitude) VALUES '
				+ '(2787938,"UBS J VERA CRUZ PERDIZES","R SARAMENHA - 60","PERDIZES","-23.53819","-46.68906")'
				+ '(2788845,"UBS VILA EDE","R PADRE MARCOS SIMONI - 390","VILA EDE","-23.54800","-46.63600"),'
				+ '(7889844,"SAD SAO MATEUS","AV MATEO BEI - 838","SAO MATEUS","-23.58292","-46.49099"),'
				+ '(2788985,"UBS V IPOJUCA WANDA COELHO DE MORAES","RUA CATAO - 01266","VILA ROMANA","-23.53221","-46.70092")'
				+ '(2787326,"UBS JD D ABRIL","RUA PAULO MARANHAO - 0444","JARDIM DABRIL","-2.357.598","-4.677.549"),'
				+ '(2788438,"UBS IACAPE JD PLANALTO","RUA IACAPE - 302","PQ STA MADALENA","-2.357.895","-4.676.520"),'
				+ '(2765993,"UBS CHACARA SANTO ANTONIO DR MARCILIO DE ARRUDA PENTEADO F","RUA ALEXANDRE DUMAS - 719","CHACARA STO ANTONIO","-2.363.538","-4.669.925"),'
				+ '(2788640,"UBS SANTO AMARO DR SERGIO VILLACA BRAGA","RUA CONDE DE ITU - 359","SANTO AMARO","-2.364.767","-4.670.176"),'
				+ '(2788969,"UBS VILA GUILHERMINA DOUTOR AMERICO RASPA NETO","RUA JOAO MARCHIORI - 59","VILA GUILHERMINA","-2.352.892","-4.651.680"),'
				+ '(2788683,"UBS V ANGLO JOSE SERRA RIBEIRO","RUA TURIASSU - 1765","VILA POMPEIA","-23.52844","-46.67908")'
				+ '(2786826,"UBS BUTANTA","R CABRAL DE MENEZES - 51","VILA GOMES","-2.357.669","-4.673.388"),'
				+ '(2752182,"UBS BRAS MANOEL SALDIVA NETO","RUA SAMPSON - 61","BRAS","-2.354.850","-4.663.458"),'
				+ '(2788772,"AMA UBS INTEGRADA VL CARMOSINA","RUA IPOPOCA - 61","ITAQUERA","-2.354.800","-4.663.600"),'
				+ '(2787652,"UBS JD NITEROI","RUA SAMUEL ARNOLD - 596","JARDIM NITEROI","-2.356.738","-4.657.038"),'
				+ '(2789280,"UBS VARGEM GRANDE","RUA DAS ARARAS - 49","VARGEM GRANDE","-2.386.377","-4.671.254"),'
				+ '(2787067,"UBS GAIVOTAS","AV SAO PAULO - 23","JARDIM GAIVOTAS","-2.373.434","-4.666.377"),'
				+ '(2787407,"UBS JARDIM GUANABARA","AV PETRONIO PORTELA - 663","FREGUESIA DO O","-2.349.340","-4.670.087"),'
				+ '(2789140,"AMA UBS INTEGRADA VILA PALMEIRAS","RUA FRANCISCO LOTUFO - 24","FREGUESIA DO O","-2.349.461","-4.668.530"),'
				+ '(2788225,"AMA UBS INTEGRADA PERUS","PRACA VIGARIO JOAO GONCALVES LIMA - 239","PERUS","-2.354.800","-4.663.600"),'
				+ '(2788152,"UBS JD NOVE DE JULHO","SIBALDO LINS - 146","SAO MATEUS","-23.58449","-46.49183")';

			return $q.when( SQLiteService.executeSql( query ) );
		},
		insertTodosRemedios : function(){
			var query = 'INSERT INTO remedios (unidades, nome, quantidade) VALUES '
			+'(2787938,"PARACETAMOL 500 MG COMPRIMIDO",4500)'
			+'(2787938,"ACIDO ACETILSALICILICO 100 MG COMPRIMIDO",12500),'
			+'(2787938,"DIPIRONA SODICA 500 MG/ML SOLUCAO ORAL GOTAS FRASCO 10 ML",200),'
			+'(2787938,"DIPIRONA SODICA 500 MG/ML SOLUCAO INJETAVEL AMP. 2 ML",10),'
			+'(2787938,"DIPIRONA SODICA 500 MG COMPRIMIDO",7500),'
			+'(2787938,"PARACETAMOL 200 MG/ML SOLUCAO ORAL GOTAS FRASCO 15 ML",100),'
			+'(2788985,"LIDOCAINA CLORIDRATO 20 MG/ML (2%) SOLUCAO INJETAVEL FAM 20 ML",2)'
			+'(2787938,"LIDOCAINA CLORIDRATO 20 MG/G (2%) GEL BISNAGA 30 G",10),'
			+'(2787938,"LIDOCAINA CLORIDRATO 50 MG/G (5%) POMADA BISNAGA 25 G",1),'
			+'(2787938,"LIDOCAINA CLORIDRATO 100 MG/ML (10%) AEROSSOL FRASCO 50 ML",1),'
			+'(2788152,"SAMU - SONDA DE ASPIRACAO TRAQUEAL COM VALVULA CALIBRE 8",1),'
			+'(2788152,"PRESERVATIVOS",1500),'
			+'(2788152,"PARACETAMOL 500 MG COMPRIMIDO",5000)'
			+'(2788152,"ACIDO ACETILSALICILICO 100 MG COMPRIMIDO",12000),'
			+'(2788152,"ACIDO ACETILSALICILICO 500 MG COMPRIMIDO",100),'
			+'(2788152,"DIPIRONA SODICA 500 MG/ML SOLUCAO ORAL GOTAS FRASCO 10 ML",500),'
			+'(2788152,"DIPIRONA SODICA 500 MG/ML SOLUCAO INJETAVEL AMP. 2 ML",15),'
			+'(2788152,"DIPIRONA SODICA 500 MG COMPRIMIDO",7000),'
			+'(2788152,"PARACETAMOL 200 MG/ML SOLUCAO ORAL GOTAS FRASCO 15 ML",200),'
			+'(2788152,"LIDOCAINA CLORIDRATO 20 MG/ML (2%) SOLUCAO INJETAVEL FAM 20 ML",3),'
			+'(2788152,"LIDOCAINA CLORIDRATO 20 MG/G (2%) GEL BISNAGA 30 G",10),'
			+'(2788683,"PARACETAMOL 500 MG COMPRIMIDO",7000)'
			+'(2788683,"ACIDO ACETILSALICILICO 100 MG COMPRIMIDO",17000),'
			+'(2788683,"DIPIRONA SODICA 500 MG/ML SOLUCAO ORAL GOTAS FRASCO 10 ML",250),'
			+'(2788683,"DIPIRONA SODICA 500 MG/ML SOLUCAO INJETAVEL AMP. 2 ML",10),'
			+'(2788683,"DIPIRONA SODICA 500 MG COMPRIMIDO",7000),'
			+'(2788683,"PARACETAMOL 200 MG/ML SOLUCAO ORAL GOTAS FRASCO 15 ML",200),'
			+'(2788683,"LIDOCAINA CLORIDRATO 20 MG/ML (2%) SOLUCAO INJETAVEL FAM 20 ML",3),'
			+'(2788683,"LIDOCAINA CLORIDRATO 20 MG/G (2%) GEL BISNAGA 30 G",3),'
			+'(2788683,"LIDOCAINA CLORIDRATO 50 MG/G (5%) POMADA BISNAGA 25 G",2),'
			+'(2788683,"LIDOCAINA CLORIDRATO 100 MG/ML (10%) AEROSSOL FRASCO 50 ML",1),'
			+'(2788683,"SUXAMETONIO CLORETO 100 MG PARA SOLUCAO INJETAVEL FAM",2)';

			return $q.when( SQLiteService.executeSql( query ) );
		}
	}

}])