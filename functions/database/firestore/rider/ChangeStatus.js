
const Constants =require('../../ConstantsUtil');
const CommonStatus= require('../common/Status');


module.exports.changeRiderStatus = function changeRiderStatus(uid, status) {
    return new Promise((resolve,reject)=>{
        CommonStatus.changeStatus(Constants.RIDER,status,uid)
        .then(resolve({uid:uid}))
        .catch(reject(uid))
    })

}

module.exports.writeRiderStatus = function (uid, status) {
    return new Promise(( resolve,reject)=>{
        CommonStatus.writeStatus(Constants.RIDER,status,uid)
        .then(resolve({uid:uid}))
        .catch(reject(uid))
    })
}