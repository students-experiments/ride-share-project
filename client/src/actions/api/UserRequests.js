import axios from 'axios';

export function postUserClaims(user,claims){
    const data={
        "claims":claims,
        "uid":user.uid
    }
    const base_url = getBaseURL()
    const post_params={data}
    console.log('posting params',post_params);
    const url=base_url+ 'index/addUserClaims' ;
    return axios.post(url, post_params);
}
function getBaseURL() {
    if(process.env.NODE_ENV === "development"){
        console.log('dev env',process.env);
        return process.env.REACT_APP_LOCAL_BACKEND_URL
    }
    console.log('prod env')
    return process.env.REACT_APP_PROD_BACKEND_URL
}
