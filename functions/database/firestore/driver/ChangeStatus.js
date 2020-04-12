const Constants =require('../../ConstantsUtil');
const CommonStatus= require('../common/Status');


module.exports.changeDriverStatus = function (uid, status) {
    return CommonStatus.changeStatus(Constants.DRIVER,status,uid)
}
module.exports.writeDriverStatus = function (uid, status) {
    return CommonStatus.writeStatus(Constants.DRIVER,status,uid)
}
