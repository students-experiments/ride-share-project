const Constants =require('../../ConstantsUtil');
const CommonStatus= require('../common/Status');


module.exports.changeDriverStatus = function (uid, status) {
    return new Promise((resolve,reject)=>{
        CommonStatus.changeStatus(Constants.DRIVER,status,uid)
        .then(resolve(uid))
        .catch(reject(uid))
    })
}
module.exports.writeDriverStatus = function (uid, status) {
    return new Promise(( resolve,reject)=>{
        CommonStatus.writeStatus(Constants.DRIVER,status,uid)
        .then(resolve(uid))
        .catch(reject(uid))
    })
}
