'use strict';
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeqaes-256-ctrd6F3Efd6F3Efeqaes-256-ctrd6F3Ef';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password);
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
 
var hw = encrypt("hello world")
// outputs hello world
console.log(hw);
console.log(decrypt(hw));
var cob = {
  encrypt: encrypt,
  decrypt: decrypt
}
module.exports = cob;