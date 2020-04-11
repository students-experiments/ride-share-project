import axios from 'axios';

export function postUserClaims(user,claims){

    const data={
        claims:claims,
        user:user
    }
    const post_params={data}
    console.log('posting params',post_params);
    return axios.post(`http://localhost:5000/addUserClaims`, post_params);
}
