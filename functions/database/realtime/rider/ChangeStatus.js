const db =require('../../init-db').realtimedb
const Constants =require('../../ConstantsUtil');
const CommonStatus= require('../common/Status');


module.exports.changeRiderStatus = function changeRiderStatus(uid, status) {
    return CommonStatus.changeStatus(Constants.RIDER,status,uid)
}
