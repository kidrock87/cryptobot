// Забрать все пары которые есть на трёх биржах
// разбить на несколько скриптов
//
//


const ccxt = require ('ccxt');
const axios = require('axios');
const moment = require ('moment');


function  relDiff(a, b) {
 return  Math.round(100 * Math.abs( ( a - b ) / ( (a+b)/2 ) ) * 100) / 100;
}



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

  try {

                          await okex.loadMarkets ()
                          await huobi.loadMarkets ()
                          await binance.loadMarkets ()

                          let pairs = await axios.get('http://68.183.64.195:3000/arbitrage/pairs');

                          pairs = [{"pair":"HC/ETH", "exchange":"ho"},{"pair":"HC/ETH", "exchange":"ob"},{"pair":"HC/ETH", "exchange":"hb"}];
                          //pairs = pairs.data.map(officer => officer.pair);

                          let pair_arr = [];

                          for await (let pair of pairs) {
                            const insert_date = Date.now();
                            const token = '568981743:AAH5juMeVw9-8kjuApL7iRpNtzv0qEs_lgU';
                            const addrs = ['7618953'];
                            const pers = 1;
                            let t1 = '';
                            let t2 = '';
                            let exchange_indicator = '';
                            let ticker1 = [];
                            let ticker2 = [];
                            try {

                              if(pair.exchange === "ho"){
                                t1 = "huobi"
                                t2 = "okex"
                                ticker1 =  await huobi.fetchTicker(pair.pair)
                                ticker2 = await okex.fetchTicker(pair.pair)
                                exchange_indicator = "Huobi - Okex";
                              } else if (pair.exchange === "ob") {
                                t1 = "okex";
                                t2 = "binance";
                                ticker1 =  await okex.fetchTicker(pair.pair)
                                ticker2 = await binance.fetchTicker(pair.pair)
                                exchange_indicator = "Okex - Binance";
                              }else if (pair.exchange ==="hb") {
                                t1 = "huobi";
                                t2 = "binance";
                                ticker1 =  await huobi.fetchTicker(pair.pair)
                                ticker2 = await binance.fetchTicker(pair.pair)
                                exchange_indicator = "Huobi - Binance";
                              }

                              let diff = relDiff(ticker1.close, ticker2.close);

                              console.log(pair.pair)
                              console.log(t1)
                              console.log(t2)
                              console.log(ticker1.close)
                              console.log(ticker2.close)
                              console.log(diff)
                              if(diff > pers){
                                //okex_huobi

                                let p_arr = {"pair":pair.pair, "diff": diff, "exchange": pair.exchange}
                                pair_arr.push(p_arr);


                                addrs.forEach(async function  (addr, index) {
                                  const msg = encodeURI("Сигнал по арбитражу "+exchange_indicator+"\r\n Пара: <b>"+pair.pair+"</b>\r\nДата: "+moment.unix(insert_date/1000).format("HH:mm DD/MM/YYYY")+" \r\nцена на "+t1+": "+ticker1.close+"\r\nцена на "+t2+": "+ticker2.close+"\r\nРазница:"+diff+"%");
                                  let pp = await axios.post('https://api.telegram.org/bot'+token+'/sendMessage?chat_id='+addr+'&parse_mode=html&text='+msg);

                                });


                              }

                            } catch (e) {
                              console.log(e)
                            } finally {

                            }

                          }



                          console.log(pair_arr)
                          let highest_pair = pair_arr.reduce((max, pair) => {
                            return pair.diff >= max.diff ? pair : max;
                          })


                          //Работа по самой большой
                          //if exchange
                          //взять котировки
                          //определить биржу1 и биржу2
                          //




/*

                          for await (let pair of pairs) {

                            try {
                              let binance_ticker = await binance.fetchTicker(pair)
                              let okex_ticker = await okex.fetchTicker(pair)
                              let huobi_ticker = await huobi.fetchTicker(pair)
                              binance_ticker = binance_ticker.close
                              okex_ticker = okex_ticker.close
                              huobi_ticker = huobi_ticker.close

                              const pers = 1;
                              const token = '568981743:AAH5juMeVw9-8kjuApL7iRpNtzv0qEs_lgU';
                              //const chat_id = '-1001432024726';
                              const chat_id = '294132907';
                              const chat_id2 = '7618953';
                              const insert_date = Date.now();


                              let p_bo = relDiff(binance_ticker,okex_ticker);
                              let p_oh = relDiff(huobi_ticker,okex_ticker);
                              let p_bh = relDiff(huobi_ticker,binance_ticker);
                              if(p_bh > pers){
                                //binance_huobi

                                const msg = encodeURI("Сигнал по арбитражу[Binace - Huobi]\r\n Пара: <b>"+pair+"</b>\r\nДата: "+moment.unix(insert_date/1000).format("HH:mm DD/MM/YYYY")+" \r\nцена на binance: "+binance_ticker+"\r\nцена на huobi: "+huobi_ticker+"\r\nРазница:"+p_bh+"%");
                                let pp = await axios.post('https://api.telegram.org/bot'+token+'/sendMessage?chat_id='+chat_id+'&parse_mode=html&text='+msg);
                                let pp2= await axios.post('https://api.telegram.org/bot'+token+'/sendMessage?chat_id='+chat_id2+'&parse_mode=html&text='+msg);
                              }

                              if(p_bo > pers){
                                //binance_okex

                                const msg = encodeURI("Сигнал по арбитражу [Binace - Okex]\r\n Пара: <b>"+pair+"</b>\r\nДата: "+moment.unix(insert_date/1000).format("HH:mm DD/MM/YYYY")+" \r\nцена на binance: "+binance_ticker+"\r\nцена на okex: "+okex_ticker+"\r\nРазница:"+p_bo+"%");
                                let pp = await axios.post('https://api.telegram.org/bot'+token+'/sendMessage?chat_id='+chat_id+'&parse_mode=html&text='+msg);
                                let pp2 = await axios.post('https://api.telegram.org/bot'+token+'/sendMessage?chat_id='+chat_id2+'&parse_mode=html&text='+msg);
                              }

                              if(p_oh > pers){
                                //okex_huobi

                                const msg = encodeURI("Сигнал по арбитражу [Okex - Huobi]\r\n Пара: <b>"+pair+"</b>\r\nДата: "+moment.unix(insert_date/1000).format("HH:mm DD/MM/YYYY")+" \r\nцена на okex: "+okex_ticker+"\r\nцена на huobi: "+huobi_ticker+"\r\nРазница:"+p_oh+"%");
                                let pp = await axios.post('https://api.telegram.org/bot'+token+'/sendMessage?chat_id='+chat_id+'&parse_mode=html&text='+msg);
                                let pp2 = await axios.post('https://api.telegram.org/bot'+token+'/sendMessage?chat_id='+chat_id2+'&parse_mode=html&text='+msg);
                              }



                              console.log(pair)
                              console.log('----------------------------------')
                              console.log('binance: '+binance_ticker);
                              console.log('----------------------------------')
                              console.log('okex: '+okex_ticker);
                              console.log('----------------------------------')
                              console.log('huobi: '+huobi_ticker);
                              console.log('----------------------------------')
                              console.log ('binance_okex: '+p_bo)
                              console.log ('okex_huobi: '+p_oh)
                              console.log ('binance_huobi: '+p_bh)
                              console.log('**************************************')
                            } catch (e) {
                                console.log(e)
                            } finally {

                            }

                          }
*/

  } catch (e) {
    console.log(e)
  } finally {

  }






}) ()
