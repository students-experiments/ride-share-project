const users = require('../firebase-db/auth/Users.js');

exports.loginDriver=function(req, res){
        
}
exports.registerAndLogin = function (req, res) {

    user_data=prepare_user_data(req,'rider');
    user_data['role']="rider";
    users.registerUser(user_data).then(() => {
        console.log('registered User',user_data.email);
        res.redirect('/loginRider');
    }).catch((error) => {
        res.send("Yo Bro check up whats the issue here:  " + error);
    });
}