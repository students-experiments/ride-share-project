function prepareUserDBObject(user){
    var data;
    data={
        "role": user.role,
        "username": user.username,
        "email":user.email
    };
    if(user.role==='rider'){
       data['uin']= user.uin
    }
    return data;

}


function handleError(error){
    // Handle Errors here.
    let errorCode= 404;
    if(error.code)
        errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
}

module.exports={
    prepareUserDBObject: prepareUserDBObject,
    handleError: handleError
};

