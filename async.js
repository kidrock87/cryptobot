const axios = require('axios');
const moment = require('moment');
const Binance = require('binance-api-node').default



const binance = Binance({
  apiKey: 'DLqcZLhixvTKAQDh24Wx3NrlVx9sWtyiqLBZ4MbTIlDn2nbhsYSCeNez3AIAH37a',
  apiSecret: '6HD3d5Yqnzv3KAsvlfyfonekuYmAXKxd4477SdndXLcz3I2zyZeWg0egxOzqoWlX',
  //getTime: xxx // time generator function, optional, defaults to () => Date.now()
})

const  is_open = async() => {
  let pp = await axios.get('http://localhost:3000/position')
  if(pp.data[0].status === "open"){
    return true;
  }else{
    return false;
  }
}

const logs = async(log_type, comment) => {
  let insert_date = moment().format("DD/MM/YYYY HH:mm");
  let pp = await axios.post('http://localhost:3000/logs', {log_type: log_type, insert_date: insert_date, comment: comment})
}


const order = async(type, quantity) =>{
  //обращение к бинансу
  try {
    let kkk = await binance.order({symbol: 'PAXUSDT', side: type, quantity: quantity,  type: 'market'})
    let price = kkk.fills[0].price;
    console.log(price);
    //запись лога
    await logs(type, "{'type': '"+type+"', 'quantity': "+quantity+", 'price': "+price+"}")
  } catch (err) {
    console.log(err)
    await logs("error", err)
  }
}




;(async () => {
  const ohlcv = await binance.trades({ symbol: 'PAXUSDT', limit: 1 })
  const low = parseFloat(ohlcv[0].price);

  let pp2 = await axios.get('http://localhost:3000/position')
  const lowest_price = pp2.data.lowest_price;
  const highest_price = pp2.data.highest_price;
  const quant = pp2.data.quantity;

  let status = await is_open()

  if(status){
    //  Продавай

    if(low > highest_price){
      console.log('Продаю')
      await order('sell', quant)
      // Меняю статус позиции
      let pp = await axios.post('http://localhost:3000/position', {status: 'close'})
      //Лог продажи
    }
  }else{
    ///Покупаю
    if(low > lowest_price){
      console.log('Покупаю')
      await order('buy', quant)
      // Меняю статус позиции
      let pp = await axios.post('http://localhost:3000/position', {status: 'open'})
    }
  }
}) ()
