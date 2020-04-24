import axios from 'axios';

export function post(route,data){
    const url= getBaseURL()+ route ;
    console.log('request',{data})
    return axios.post(url,{data});
}

function getBaseURL() {
    if(process.env.NODE_ENV === "development"){
        console.log('dev env',process.env);
        return process.env.REACT_APP_LOCAL_BACKEND_URL
    }
    console.log('prod env')
    return process.env.REACT_APP_PROD_BACKEND_URL
}

