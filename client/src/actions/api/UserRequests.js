import axios from 'axios';

export function postUserClaims(uid,claims){

    const post_params={
        claims:claims,
        uid:uid
    }
    return axios.post(`http://localhost:5000/addUserClaims`, post_params);
}
