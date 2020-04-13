import axios from 'axios';

export function postUserClaims(user,claims){

    const data={
        "claims":claims,
        "uid":user.uid
    }
    const post_params={data}
    console.log('posting params',post_params);
    return axios.post(`http://localhost:5001/uic-rider/us-central1/app/index/addUserClaims`, post_params);
}
