// Забрать все пары которые есть на трёх биржах
// разбить на несколько скриптов
//
//
const ccxt = require ('ccxt');
const axios = require('axios');


;(async () => {


  const okex = new ccxt.okex ({

        'apiKey': '2717547b-35ce-45d2-b773-c8c59e04a1de',
        'secret': '2917016AB1A8C7A9A10C2B43EDD4CE7D',
        'verbose': false, // set to true to see more debugging output
        'timeout': 60000,
        'enableRateLimit': true, // add this

  })


  const huobi = new ccxt.huobipro ({

        'apiKey': 'c3850d41-896d81a3-415cec4c-6a15c',
        'secret': '4085b4e0-ad87ba96-5ff69621-ed8d0',
        'verbose': false, // set to true to see more debugging output
        'timeout': 60000,
        'enableRateLimit': true, // add this

  })

  const binance = new ccxt.binance ({

        'apiKey': 'yT2JoDwxuo8sE4O5KnDB3l7uV04hXaYgqEXsndtfaOpdWJVjCWKPJEn9pLZkp1tD',
        'secret': 'N8EaLjDDUvvDyJHNEBs9nEggDpQEQTKryef4zraPHF3ZE7f91lQtfQP2TnNr2Lcs',
        'verbose': false, // set to true to see more debugging output
        'timeout': 60000,
        'enableRateLimit': true, // add this

  })

  await okex.loadMarkets ()
  await huobi.loadMarkets ()
  await binance.loadMarkets ()

  let huobi_symbols = huobi.symbols;
  let okex_symbols = okex.symbols;
  let binance_symbols = binance.symbols;


  let a = new Set(huobi_symbols);
  let b = new Set(okex_symbols);
  let c = new Set(binance_symbols);

  let ab = new Set(
    [...a].filter(x => b.has(x)));

 const pairs =
 [
 "IOTA/ETH",
 "ONT/ETH",
 "XLM/ETH",
 "ADA/ETH",
 "QTUM/ETH",
 "SRN/ETH",
 "EOS/ETH",
 "NEO/BTC",
 "WAVES/BTC",
 "IOTA/BTC",
 "ONT/BTC",
 "BTG/BTC",
 "TRX/BTC",
 "SRN/BTC",
 "XLM/BTC",
 "XMR/BTC",
 "ADA/BTC",
 "ZEC/BTC",
 "QTUM/BTC",
 "DASH/BTC",
 "LTC/BTC",
 "ETH/BTC",
 "IOTA/USDT",
 "XMR/USDT",
 "XEM/USDT",
 "QTUM/USDT",
 "ONT/USDT",
 "ADA/USDT",
 "XRP/BTC",
 "XLM/USDT",
 "ZEC/USDT",
 "BTC/USDT",
 "EOS/USDT",
 "TRX/USDT",
 "LTC/USDT",
 "ETH/USDT",
 "XRP/USDT",
 "NEO/USDT",
 "DASH/USDT"
 ]



  pairs.forEach(function (pair, index) {
    axios.post(`http://68.183.64.195:3000/arbitrage/pairs`, {
        pair: pair,
        exchange: 'h_hbtc'
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  });















}) ()
