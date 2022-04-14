const pubKey = 'a8704d261e7b93acfb1c9f2200a0c1ed'
const pvtKey = '81279fd66b68de68948d2c2944efbef7206d25da'

var CryptoJS = require('crypto-js')
var hash = CryptoJS.MD5(1 + pvtKey + pubKey).toString()

export default hash
