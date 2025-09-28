import axios from 'axios';

const apiUrl = 'http://localhost:5000/users';

export async function getAllUsers(){
    return await axios.get(`${apiUrl}/getAllUsers`)
}

export async function searchUsersByName(name){
    return await axios.get(`${apiUrl}/searchUsersByName?name=${name}`)
}

export async function getOrderAllUsersByAge(){
    return await axios.get(`${apiUrl}/getOrderAllUsersByAge`)
}

export async function getUserBetweenXAndY(minAge, maxAge){
    console.log(minAge, maxAge);
    return await axios.post(`${apiUrl}/getUserBetweenXAndY`,{minAge, maxAge})
}

export async function deleteUserById(id){
    return await axios.delete(`${apiUrl}/deleteUser/${id}`)
}

export async function addUser(userData){
    return await axios.post(`${apiUrl}/addUser`, userData)
}
