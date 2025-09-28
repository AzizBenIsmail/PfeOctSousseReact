import axios from "axios";

const apiUrl = "http://localhost:3000/users";

export const getAllUsers = async () => {
    return await axios.get(`${apiUrl}/getAllUsers`);
}

export const deleteUser = async (id) => {
    return await axios.delete(`${apiUrl}/deleteUser/${id}`);
}

export const updateUser = async (id, userData) => {
    return await axios.put(`${apiUrl}/updateUser/${id}`, userData);
}

export const addUser = async (userData) => {
    return await axios.post(`${apiUrl}/addUser`, userData);
}

export const getUsersById = async (id) => {
    return await axios.get(`${apiUrl}/getUsersById/${id}`);
}

export async function getOrderAllUsersByAge() {
    return await axios.get(`${apiUrl}/getOrderAllUsersByAge`);
}

export async function getUserBetweenXAndY(min,max) {
    return await axios.post(`${apiUrl}/getUserBetweenXAndY`, { min, max });
}

export async function searchUsersByName(name) {
    return await axios.get(`${apiUrl}/searchUsersByName/${name}`);
}

export async function getUsers18() {
    return await axios.get(`${apiUrl}/getUsers18`);
}