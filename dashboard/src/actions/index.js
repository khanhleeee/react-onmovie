import axios from 'axios';


//-----------------movie------------

//fetch all movies
export const fetchMovies = async() => {
    const response = await axios.get("http://localhost:4000/dashboard/movies");
    return response;
}

export const getDetailMovie = async(id) => {
    const response = await axios.get(`http://localhost:4000/dashboard/movie/${id}`);
    return response;
}

//create movie
export const uploadMovie = async(movie) => {
    const request = await axios.post("http://localhost:5555/movie/", movie)
    return request;
}

//update movie
export const upgradeMovie = async(id, data) => {
    const request = await axios.put(`http://localhost:5555/movie/${id}`, data)
    return request;
}

//delete solfly movie
export const removeMovie = async(id) => {
    const request = await axios.delete(`http://localhost:5555/movie/${id}`)
    return request;
}

//-------------user-------------

//get all user
export const getAllUser = async() => {
    const request = await axios.get("http://localhost:5555/user/getAll")
    return request;
}

//update user
export const upgradeUser = async(id, data) => {
    const request = await axios.put(`http://localhost:5555/user/${id}`, data)
    return request;
}

//delete user
export const removeUser = async(id) => {
    const request = await axios.delete(`http://localhost:5555/user/removeUser/${id}`)
    return request;
}

//--------------home-----------------

//get statistics table
export const getStat = async() => {
    const request = await axios.get("http://localhost:5555/user/stats")
    return request;
}

//get all new register users
export const getUser = async() => {
    const request = await axios.get("http://localhost:5555/user?new=true")
    return request;
}

//get all new transaction users
export const getTransaction = async() => {
    const request = await axios.get("http://localhost:5555/user/transaction")
    return request;
}

//check login
export const checkLogin = async(user) => {
    const request = await axios.post("http://localhost:5555/auth/login", user);
    return request;
}


//-----------list-----------------

//fetch all lists
export const fetchList = async() => {
    const request = await axios.get("http://localhost:5555/list/")
    return request;
}

//create list
export const uploadList = async(movie) => {
    const request = await axios.post("http://localhost:5555/list/", movie)
    return request;
}

//update list
export const upgradeList = async(id, data) => {
    const request = await axios.put(`http://localhost:5555/list/${id}`, data)
    return request;
}

//delete solfly list
export const removeList = async(id) => {
    const request = await axios.delete(`http://localhost:5555/list/${id}`)
    return request;
}

