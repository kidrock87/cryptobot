var get_info = require('./get_info/bitfinex_get_info');
var get_candidates = require('./candidates/get_candidates')
var take_volume = require('./candidates/take_volume')
//get_info.bitfinex_get_info_from_exchange();
function getCoffee() {
  return new Promise(resolve => {
    setTimeout(() => resolve('☕'), 5000); // it takes 2 seconds to make coffee
  });
}
//var body_common = '["tBTCUSD","tLTCUSD","tETHUSD","tETCUSD","tZECUSD","tXMRUSD","tDASHUSD","tXRPUSD","tIOTAUSD","tEOSUSD","tSANUSD","tOMGUSD","tBCHUSD","tNEOUSD","tETPUSD","tQTUMUSD","tAVTUSD"]';
//get_candidates.get_candidates(body_common, "bitfinex");
var pairs = ['tBTCUSD','tETHUSD','tBCHUSD','tNEOUSD','tXRPUSD','tETCUSD','tZECUSD','tXMRUSD','tEOSUSD','tSANUSD','tAVTUSD','tOMGUSD'];
//["btcusd","ltcusd","ethusd","etcusd","rrtusd","zecusd","xmrusd","dshusd","xrpusd","iotusd","eosusd","sanusd","omgusd","bchusd","neousd","etpusd","qtmusd","avtusd","edousd","btgusd","datusd","qshusd","yywusd","gntusd","sntusd","batusd","mnausd","funusd","zrxusd","tnbusd","spkusd","trxusd","rcnusd","rlcusd","aidusd","sngusd","repusd","elfusd","iosusd","aiousd","requsd","rdnusd","lrcusd","waxusd","daiusd","cfiusd","agiusd","bftusd","mtnusd","odeusd","antusd","dthusd","mitusd","stjusd","xlmusd","xvgusd","bciusd","mkrusd","venusd","kncusd","poausd","lymusd","utkusd","veeusd","dadusd","orsusd","aucusd","poyusd","fsnusd","cbtusd","zcnusd","senusd","ncausd","cndusd","ctxusd","paiusd","seeusd","essusd"]
//'tEOSUSD' 'tIOTAUSD', tDASHUSD tETPUSD'


async function printFiles () {

      await take_volume.take_volume('tBTCUSD');
      await take_volume.take_volume('tETHUSD');
      await take_volume.take_volume('tBCHUSD');
      await take_volume.take_volume('tNEOUSD');
      await take_volume.take_volume('tXRPUSD');
      await take_volume.take_volume('tETCUSD');
      await take_volume.take_volume('tZECUSD');
      await take_volume.take_volume('tXMRUSD');
      await take_volume.take_volume('tEOSUSD');
      await take_volume.take_volume('tSANUSD');
      await take_volume.take_volume('tAVTUSD');
      await take_volume.take_volume('tOMGUSD');
      await take_volume.take_volume('tLTCUSD');
      await take_volume.take_volume('tIOTUSD');
      await take_volume.take_volume('tNEOUSD');
      await take_volume.take_volume('tETPUSD');
      await process.exit(1);

}


printFiles ()
