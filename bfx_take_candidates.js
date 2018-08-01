var get_info = require('./get_info/bitfinex_get_info');
var get_candidates = require('./candidates/get_candidates')
var take_candidates = require('./candidates/take_candidates')
//get_info.bitfinex_get_info_from_exchange();

//var body_common = '["tBTCUSD","tLTCUSD","tETHUSD","tETCUSD","tZECUSD","tXMRUSD","tDASHUSD","tXRPUSD","tIOTAUSD","tEOSUSD","tSANUSD","tOMGUSD","tBCHUSD","tNEOUSD","tETPUSD","tQTUMUSD","tAVTUSD"]';
//get_candidates.get_candidates(body_common, "bitfinex");
take_candidates.take_candidates();
