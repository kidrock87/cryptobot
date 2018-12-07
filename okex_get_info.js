"use strict";
var fs = require('fs');
const ccxt = require ('ccxt');
const axios = require('axios');


// ----------------------------------------------------------------------------

;(async () => {

        const exchange = new ccxt.okex ({

              'apiKey': '2717547b-35ce-45d2-b773-c8c59e04a1de',
              'secret': '2917016AB1A8C7A9A10C2B43EDD4CE7D',
              'verbose': false, // set to true to see more debugging output
              'timeout': 60000,
              'enableRateLimit': true, // add this

        })
        await exchange.loadMarkets ()
        let symbols = exchange.symbols;
        const ohlcv = await exchange.fetchOHLCV('BTC/USDT', '1m')
        console.log(ohlcv);

        /*
        symbols.forEach(async function (value) {
          if( value.indexOf('/USDT') >= 0){

            let ticker = await exchange.fetchTicker(value);
            let pair =  ticker.symbol
            pair = pair.replace('/', '');
            let volume = ticker.baseVolume;
            let insert_date = Math.floor(Date.now() / 1000);
            let bid = ticker.bid;
            let ask = ticker.ask;
            let spread = ask - bid;
            let volume5 = '0';
            let res = await axios('http://localhost:3000/tickers/okex/'+pair);
            console.log(res.data)
            //console.log(ticker)


            if(res.data.length > 0){
                let pre_volume = res.data[0].volume;
                volume5 = volume - pre_volume;
                console.log(pair);
                console.log(volume);
                console.log(pre_volume);
                console.log(volume5)
            }else{
              volume5 = '0';
            }

            axios.post('http://localhost:3000/tickers', {

              ask_price: ask,
              bid_price: bid,
              spread: spread,
              volume: volume,
              trades24: '0',
              insert_date: insert_date,
              exchange : 'okex',
              pair: pair,
              altname: pair,
              ask_rat: '0',
              spread_rat: '0',
              volume_mod: '0',
              ask_mod: '0',
              volume5: volume5,
            })
            .then(function (response) {
              //console.log(response);
            })
            .catch(function (error) {
              //console.log(error);
            });


            //Взять волюм, взять пару/ посчитать волюм за последние пять минут
            //Добавить время.
            //Записать в бд

          }
        });
        */
        //console.log(await exchange.fetchTicker("BTC/USDT"));
        //console.log(await exchange.symbols);


}) ()
