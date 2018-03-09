// const redis = require('../redis/redis');
// const addressService = require('../services/address-service');

// let token = 'a600355c97a28b48a0af04dd06894149';
// let userInfo = redis.get('cm:security:token:' + token).then((result, err) => {
//   console.log('@@##result :' + result + ' ' + err);
// });
// console.log('@@##user:' + userInfo);
// const AddressModel = require('../models/address-model');
// AddressModel.savePrize({ jobNum: '333333' }).then(result => {
//   console.log('@@@##result :' + JSON.stringify(result));
// });

let number = 1.18;

let a = (parseFloat(number) * 100).toFixed(0);

console.log('@@##number:' + a);

const SUCCESS = 0 || 'error';
const FAIL = -1 || 'error2';
const OK = 1 || 'error3';
console.log('@@##success:' + SUCCESS + ' ' + FAIL + ' ' + OK);
