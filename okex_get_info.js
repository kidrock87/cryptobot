//Взять минутные свечи
//Преобразовать в пятиминутные
//Высчитать средний объем за 12 часов по пятиминуткам
//Сравнить объем одноминутки со средним объемом за 12 часов по пятиминуткам
//Если объем больше  чем 12ч объем дать сигнал.
//amir_traders_bot 612695221:AAGWws3igJEQ3RDUiptHf-zep2N-9adE-3U

"use strict";
var fs = require('fs');
const ccxt = require ('ccxt');
const moment = require ('moment');
const axios = require('axios');
const dotenv = require('dotenv');
//const TelegramBot = require('node-telegram-bot-api');
//const token = '568981743:AAH5juMeVw9-8kjuApL7iRpNtzv0qEs_lgU';
//const bot = new TelegramBot(token, {polling: true});
dotenv.config({ path: '/home/cryptobot/.env', debug: true});
dotenv.load();

const SERVER_ADDR_IP = process.env.SERVER_ADDR_IP || "68.183.64.195";
//console.log(process.env);
//const SERVER_ADDR_IP = "68.183.64.195";

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


  let keff1 = await axios.get('http://68.183.64.195:3000/signals/index/okex');
  const keff = keff1.data[0].value;
  const now_insert_date = Date.now();
  console.log(keff);


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
        //console.log(symbols.length);

        //const ohlcv = await exchange.fetchOHLCV('ZRX/USDT', '1m')

        //let pair = "BTC/USDT";
        for await (let pair of symbols) {
          if( pair.indexOf('/USDT') >= 0){
                //await delay(1500);


                try {
                        const ohlcv = await exchange.fetchOHLCV(pair, '1m')
                        //Первая минутная свеча
                        if(ohlcv.length > 1){
                                  let candle_1 = await ohlcv[0][5];
                                  let c1_insert_date = await ohlcv[0][0];
                                  let c1_close = await ohlcv[0][4];
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
                                        let close_price = value[4][4];
                                        let sumVolume = value.reduce((prev, cur) => prev + cur[5], 0);

                                        let pre_candle_5 = [];
                                        pre_candle_5.push(insert_date);
                                        pre_candle_5.push(open_price);
                                        pre_candle_5.push(high_price);
                                        pre_candle_5.push(low_price);
                                        pre_candle_5.push(close_price);
                                        pre_candle_5.push(sumVolume);
                                        //СОХРАНИТЬ В БД 5-МИНУТНУЮ СВЕЧУ

                                        //console.log(open_price)
                                        //console.log(ohlcv.length)
                                        //console.log(pair)
                                        //console.log("-----------------------------------------------------------")


                                        return pre_candle_5;

                                      } catch (err) {
                                          //console.log(pair)
                                          //console.log('err')

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
                                  let av_keff = keff*average_volume;
                                  if(candle_1 > av_keff){

                                    signal = '1';


                                    const axios = require('axios');
                                    const token = '568981743:AAH5juMeVw9-8kjuApL7iRpNtzv0qEs_lgU';
                                    const chat_id = '-1001432024726';
                                    const msg = encodeURI("Сигнал по объему\r\n Пара: <b>"+pair+"</b>\r\nДата: "+moment.unix(c1_insert_date/1000).format("HH:mm DD/MM/YYYY")+" \r\nОбъем за минуту: "+candle_1+"\r\nСр. объем за 12ч.:"+average_volume);

                                    let pp = await axios.post('https://api.telegram.org/bot'+token+'/sendMessage?chat_id='+chat_id+'&parse_mode=html&text='+msg);

                                    console.log(keff)
                                    console.log(candle_1)
                                    console.log(average_volume)
                                    console.log(av_keff)

                                    //bot.sendMessage("-387984137", ");
                                    //bot.sendMessage("294132907", "Сигнал по объему\r\n Пара: "+pair+"\r\nДата: "+moment.unix(c1_insert_date/1000).format("HH:mm DD/MM/YYYY")+" \r\nОбъем за минуту: "+candle_1+"\r\nСр. объем за 12ч.:"+average_volume);
                                  }
                                    //bot.sendMessage("7618953", "Пара: "+pair+"\r\nДата: "+pair+"\r\nОбъем за минуту: "+pair+"\r\nСр. Объем: "+pair);


                                  let exchange_name = "okex"
                                  let pair_name = pair.replace('/', '');


                                  //let last_pair = await axios('http://localhost:3000/signal/'+exchange_name+'/'+pair);

                                  let lp_insert_date = '0';

                                  //if(last_pair.data){
                                  //  lp_insert_date = last_pair.data.insert_date
                                //  }

                                  if(c1_insert_date > lp_insert_date){

                                          axios.post(`http://${SERVER_ADDR_IP}:3000/signals`, {
                                          //axios.post(`http://68.183.64.195:3000/signals`, {
                                            pair: pair_name,
                                            exchange: exchange_name,
                                            average_volume: average_volume,
                                            volume: candle_1,
                                            signal: signal,
                                            insert_date: now_insert_date,
                                            c1_close: c1_close,
                                            keff: keff,
                                          })
                                          .then(function (response) {
                                            console.log(response.data);
                                          })
                                          .catch(function (error) {
                                            console.log(error);
                                          });
                                  }


                        }
                } catch (e) {
                    console.log('ERROR _ ERROR _ ERROR')
            }


          }
        }
        //bot.sendMessage("7618953", "Пара: "+pair+"\r\nтаймфрейм: "+tf+"\r\nПроцент: "+rrr+"\r\nНаправленность: "+vector_sign);
        //console.log(await exchange.fetchTicker("BTC/USDT"));
        //console.log(await exchange.symbols);


}) ()
