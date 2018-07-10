
var rnd= require('./services/rnd')
var get_candidates = require('./candidates/get_candidates')
var take_candidates = require('./candidates/take_candidates')
var db_manage = require('./services/db_manage')
var get_info = require('./get_info/kraken_get_info')


/*
kraken.getOHLC({ pair: 'ZECEUR', interval: 1 }).then((response) => {
	  console.log(response.result.XZECZEUR[0]);
	}).catch((error) => {
	});
*/

var asssk = 272.55
var number2 = 0.01
//result = number1*number2


take_candidates.take_candidates();

//console.log(rnd.rnd_sort('1','2','3','original'))

//get_info.Kraken_get_info_from_exchange()



//get_candidates.get_candidates()
