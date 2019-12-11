var axios = require('axios');
const ccxt = require ('ccxt');




;(async () => {
	let binance = ['HC/BTC','ETH/BTC','TRX/BTC','PHX/BTC','BCHSV/BTC','BNB/BTC','XRP/BTC','QKC/BTC','LINK/BTC','XLM/BTC','TUSD/BTC','BCHABC/BTC','LTC/BTC','WAVES/BTC','EOS/BTC','ADA/BTC','QTUM/BTC','XVG/BTC','DOCK/BTC','ONT/BTC','POLY/BTC','ZIL/BTC','NEO/BTC','XMR/BTC','RVN/BTC','WTC/BTC','ZEC/BTC','XEM/BTC','DLT/BTC','IOTX/BTC','ETC/BTC','VET/BTC','PPT/BTC','MTL/BTC','ENJ/BTC','BAT/BTC','ICX/BTC','MANA/BTC','ARN/BTC','FUEL/BTC','STORM/BTC','STEEM/BTC','STRAT/BTC','DENT/BTC','ZRX/BTC','XZC/BTC','IOST/BTC','NPXS/BTC','DASH/BTC','NANO/BTC','ZEN/BTC','GO/BTC','FUN/BTC','QSP/BTC','CDT/BTC','AION/BTC','LEND/BTC','IOTA/BTC','INS/BTC','WAN/BTC','TNT/BTC','VIB/BTC','PIVX/BTC','ELF/BTC','LRC/BTC','OMG/BTC','POA/BTC','THETA/BTC','GVT/BTC','MTH/BTC','AE/BTC','HC/ETH','TRX/ETH','BNB/ETH','XRP/ETH','PHX/ETH','LINK/ETH','TUSD/ETH','XLM/ETH','EOS/ETH','DOCK/ETH','LTC/ETH','NPXS/ETH','ADA/ETH','QKC/ETH','WAVES/ETH','QTUM/ETH','ZIL/ETH','GTO/ETH','XVG/ETH','NEO/ETH','ARN/ETH','ONT/ETH','VET/ETH','XEM/ETH','ENJ/ETH','DLT/ETH','BAT/ETH','OMG/ETH','PPT/ETH','MANA/ETH','ETC/ETH','IOTA/ETH','ZEC/ETH','XMR/ETH','ICX/ETH','WTC/ETH','VIB/ETH','IOST/ETH','EVX/ETH','STEEM/ETH','ZRX/ETH','NANO/ETH','DASH/ETH','AE/ETH','INS/ETH','SNT/ETH','BCD/ETH','FUN/ETH','XZC/ETH','ELF/ETH','STRAT/ETH','STORM/ETH','AION/ETH','NULS/ETH','BTC/USDT','ETH/USDT','BCHSV/USDT','TRX/USDT','EOS/USDT','XRP/USDT','BNB/USDT','BCHABC/USDT','LTC/USDT','XLM/USDT','PAX/USDT','ADA/USDT','NEO/USDT','ETC/USDT','ONT/USDT','TUSD/USDT','QTUM/USDT','USDC/USDT','ICX/USDT','VET/USDT','IOTA/USDT'
]

  let huobi = [
	'BTC/USDT','EOS/USDT','ETH/USDT','TRX/USDT','BCH/USDT','LTC/USDT','HC/USDT','XRP/USDT','HT/USDT','ETC/USDT','BSV/USDT','QTUM/USDT','OMG/USDT','ONT/USDT','ZEC/USDT','MDS/USDT','DASH/USDT','ADA/USDT','PAI/USDT','EOS/BTC','ETH/BTC','ZEC/BTC','LTC/BTC','DASH/BTC','HC/BTC','BSV/BTC','TRX/BTC','XRP/BTC','HT/BTC','BCH/BTC','QTUM/BTC','EDU/BTC','MDS/BTC','PAI/BTC','ITC/BTC','EOS/ETH','OMG/ETH','HC/ETH','TRX/ETH','HT/ETH','EDU/ETH','GXC/ETH','CTXC/ETH','SSP/ETH','MDS/ETH','MTN/ETH','GSC/ETH','CHAT/ETH','ITC/ETH','AE/ETH','UTK/ETH','LET/ETH','QUN/ETH','GET/ETH','EKO/ETH','EKT/ETH','STK/ETH','SMT/ETH','RTE/ETH','QTUM/ETH','BOX/ETH','YEE/ETH','QASH/ETH','XLM/ETH','BFT/ETH','IIC/ETH','GNX/ETH','TNB/ETH','PAI/ETH','WAVES/ETH','TRIO/ETH','WPR/ETH','KCASH/ETH','SOC/ETH','ADA/ETH','DAT/ETH','MTX/ETH','KAN/ETH','ONT/ETH','RUFF/ETH','CNN/ETH','EVX/ETH','BUT/ETH','DTA/ETH','IOST/ETH',
	]
  let okex = ['BTC/USDT','ETH/USDT','EOS/USDT','LTC/USDT','ETC/USDT','XRP/USDT','TRX/USDT','OKB/USDT','TRUE/USDT','QTUM/USDT','BSV/USDT','HC/USDT','BCH/USDT','PAX/USDT','TUSD/USDT','GTO/USDT','XLM/USDT','ONT/USDT','NEO/USDT','LTC/BTC','ETH/BTC','ETC/BTC','EOS/BTC','TRUE/BTC','PAX/BTC','XRP/BTC','TRX/BTC','OKB/BTC','QTUM/BTC','GTO/BTC','HC/BTC','TUSD/BTC','XLM/BTC','NEO/BTC','ONT/BTC','BSV/BTC','BCH/BTC','EOS/ETH','ETC/ETH','HYC/ETH','XRP/ETH','OKB/ETH','SWFTC/ETH','TRUE/ETH','GTO/ETH','TRX/ETH','CTXC/ETH','RNT/ETH','QTUM/ETH','EGT/ETH','TRIO/ETH','LTC/ETH','HC/ETH','NEO/ETH','FAIR/ETH','VITE/ETH','ONT/ETH','XLM/ETH','NAS/ETH','ZCO/ETH']

	let h = new Set(huobi);
  let o = new Set(okex);
  let b = new Set(binance);

	let ho = new Set([...h].filter(x => o.has(x)));
	let hb = new Set([...h].filter(x => b.has(x)));
	let ob = new Set([...o].filter(x => b.has(x)));





	let remove = await axios.post('http://68.183.64.195:3000/arbitrage/pairs/remove');

	for await (let pair of ho) {
				axios.post(`http://68.183.64.195:3000/arbitrage/pairs`, {
						pair: pair,
						exchange: 'ho'
				})
				.then(function (response) {
					console.log(response.data);
				})
				.catch(function (error) {
					console.log(error);
				});
	}

	for await (let pair of hb) {
				axios.post(`http://68.183.64.195:3000/arbitrage/pairs`, {
						pair: pair,
						exchange: 'hb'
				})
				.then(function (response) {
					console.log(response.data);
				})
				.catch(function (error) {
					console.log(error);
				});
	}

	for await (let pair of ob) {
				axios.post(`http://68.183.64.195:3000/arbitrage/pairs`, {
						pair: pair,
						exchange: 'ob'
				})
				.then(function (response) {
					console.log(response.data);
				})
				.catch(function (error) {
					console.log(error);
				});
	}


}) ()
