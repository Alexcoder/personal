import axios from "axios";

export const api = axios.create({
    // baseURL: "http://localhost:8000/api"
    baseURL: "https://personal-api-amc2.onrender.com/api"
});

export const getPost=(route)=> api.get(route);
export const createPost=(route, data)=> api.post(route, data)
export const upDatePost=(route, data)=> api.post(route, data)
export const deletePost=(routeWithParams)=> api.delete(routeWithParams)

export const monthFormat ={
    Jan : "January",
    Feb : "February",
    Mar : "March",
    Apr : "April",
    May : "May",
    Jun : "June",
    Jul : "July",
    Aug : "August",
    Sep : "September",  
    Oct : "October" ,
    Nov : "November",
    Dec : "December",
  };

  export const formatDate ={
    weekDay : new Date().toString().slice(0,3),
    date    : new Date().getDate(),
    month   : monthFormat[`${new Date().toString().slice(4,7)}`],
    year    : new Date().toString().slice(11,15),
    time    : new Date().toString().slice(15,24),
    fullDate(){
      return `${this.date}-${this.month}-${this.year}`
  }
};

export const getItemLocalStorage =(key, value)=> JSON.parse(localStorage.getItem(key, value));
export const setItemLocalStorage =(key, value)=> localStorage.setItem(key, JSON.stringify(value)) 
export const clearLocalStorage =(key)=> localStorage.setItem(key) 

