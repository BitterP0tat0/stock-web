export default class StocksDto {

//   "data": [
//     {
//       "p": 7296.89,
//       "s": "BINANCE:BTCUSDT",
//       "t": 1575526691134,
//       "v": 0.011467
//     }
//   ],
//   "type": "trade"
    constructor(data, type) {
        this.data = data;
        this.type = type; 
    }
    
    getData() {
        return this.data;
    }
    
    getType() {
        return this.type;
    }
    
    setData(data) {
        this.data = data;
    }
    
    setType(type) {
        this.type = type;
    }
}
