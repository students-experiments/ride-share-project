
module.exports.isRequestUidValid = function isRequestUidValid(req) {
  if (!req.body.data.user.uid) {
    return false;
  }
  return true;
};
// The below code: 
/*
this.isRequestUidValid or this.isRequestUidValid(req)

this.isRequestUidValid(req) - throws and erro like: TypeError: this.isRequestUidValid is not a function

this.isRequestUidValid - I myself dont know how this works. Mostly its is taking the ref of functions.  
But still dont know how req object is being passed around

It would be great if you could deep dive.

*/
module.exports.requireRiderAuth = function (req, res, next) {

  if (this.isRequestUidValid || req.body.data.user.role !== "rider") {
    res.send(400);
  } else {
    console.log("authorised Rider :", req.body.data.user);
    // eslint-disable-next-line callback-return
    next();
  }
};

module.exports.requireDriverAuth =  function  (req,res,next){
  
    if(this.isRequestUidValid || req.body.data.user.role !== 'driver')
    {
      res.send(400);
    }
    else{
      
      console.log("authorised Driver :",req.body.data.user)
      // eslint-disable-next-line callback-return
      next();
    }
  
  }

  module.exports.requireUser =  function (req,res,next){
    data=req.body.data;
    if(this.isRequestUidValid)
    {
      res.send(400);
    }
    else{
      
      console.log("authorised user :",data.uid)
      // eslint-disable-next-line callback-return
      next();
    }
  
  }

