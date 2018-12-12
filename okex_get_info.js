//Взять минутные свечи
//Преобразовать в пятиминутные
//Высчитать средний объем за 12 часов по пятиминуткам
//Сравнить объем одноминутки со средним объемом за 12 часов по пятиминуткам
//Если объем больше  чем 12ч объем дать сигнал.


"use strict";
var fs = require('fs');
const ccxt = require ('ccxt');
const axios = require('axios');

function separateIt(arr, size) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += size) {
        var sliceIt = arr.slice(i, i + size);
        newArr.push(sliceIt);
    }
    return newArr;
}
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

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
        symbols = symbols.reverse(); 
        console.log(symbols.length);

        //const ohlcv = await exchange.fetchOHLCV('ZRX/USDT', '1m')

        //let pair = "BTC/USDT";
        for await (let pair of symbols) {
          if( pair.indexOf('/USDT') >= 0){
                //await delay(1500);
                const ohlcv = await exchange.fetchOHLCV(pair, '1m')
                //Первая минутная свеча
                if(ohlcv.length > 1){
                          let candle_1 = await ohlcv[0][5];
                          let c1_insert_date = await ohlcv[0][0];

                          let aaa = await separateIt(ohlcv, 5);

                          let candle_5 = aaa.map(function(value) {
                              //console.log(value.length);
                              //console.log(value);
                              //console.log('--------------------------')
                              try {

                                let insert_date = value[4][0];
                                let open_price = value[0][1];
                                let high_price = value.reduce((prev, cur) => Math.max(prev, cur[2]), 0);
                                let low_price = value.reduce((prev, cur) => Math.min(prev, cur[3]), 0);
                                let closing_price = value[4][4];
                                let sumVolume = value.reduce((prev, cur) => prev + cur[5], 0);

                                let pre_candle_5 = [];
                                pre_candle_5.push(insert_date);
                                pre_candle_5.push(open_price);
                                pre_candle_5.push(high_price);
                                pre_candle_5.push(low_price);
                                pre_candle_5.push(closing_price);
                                pre_candle_5.push(sumVolume);
                                //СОХРАНИТЬ В БД 5-МИНУТНУЮ СВЕЧУ

                                console.log(open_price)
                                console.log(ohlcv.length)
                                console.log(pair)
                                console.log("-----------------------------------------------------------")


                                return pre_candle_5;

                              } catch (err) {
                                  console.log(pair)
                                  console.log('err')

                              }

                          });


                          candle_5 = candle_5.slice(0, 144);
                          let sumVolume5 = candle_5.reduce((prev, cur) => prev + cur[5], 0);

                          //Средний объем по пятиминуткам за 12 часов
                          let average_volume = sumVolume5 / 144;
                          //Запись в бд среднего значения
                          //console.log(average_volume)
                          //console.log(candle_1)
                          let signal = '0';
                          if(candle_1 > average_volume){
                            signal = '1';

                          }

                          let exchange_name = "okex"
                          let pair_name = pair.replace('/', '');


                          //let last_pair = await axios('http://localhost:3000/signal/'+exchange_name+'/'+pair);

                          let lp_insert_date = '0';

                          //if(last_pair.data){
                          //  lp_insert_date = last_pair.data.insert_date
                        //  }
                          if(c1_insert_date > lp_insert_date){
                                  axios.post('http://localhost:3000/signals', {
                                    pair: pair_name,
                                    exchange: exchange_name,
                                    average_volume: average_volume,
                                    volume: candle_1,
                                    signal: signal,
                                    insert_date: c1_insert_date,
                                  })
                                  .then(function (response) {
                                    //console.log(response.data);
                                  })
                                  .catch(function (error) {
                                    //console.log(error);
                                  });
                          }


                }

          }
        }

        //console.log(await exchange.fetchTicker("BTC/USDT"));
        //console.log(await exchange.symbols);


}) ()
