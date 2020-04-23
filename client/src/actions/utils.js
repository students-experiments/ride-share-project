// https://www.quora.com/How-can-I-add-two-JSON-objects-into-one-object-JavaScript

export function addUser(data,uid,role){
    const user={'uid':uid,'role':role}
    data.user=user;
   return  data
}