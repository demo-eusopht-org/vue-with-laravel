import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api' // Your API base URL

const axiosInstance = axios.create({
    baseURL: BASE_URL
})

const handleError = (error) => {
    console.error('Request Error:', error)
    throw error // Rethrow the error for handling in calling function
}

export const apiGet = async(url, params = {}) => {
    try {
        const token = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : null
        axiosInstance.defaults.headers.common['Authorization'] = token
        axiosInstance.defaults.headers.common['Content-Type'] = 'application/json'
        const response = await axiosInstance.get(url, { params })
        return response.data
    } catch (error) {
        handleError(error)
    }
}

export const apiPost = async(url, data = {}) => {
    try {
        const token = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : null
        axiosInstance.defaults.headers.common['Authorization'] = token
        axiosInstance.defaults.headers.common['Content-Type'] = 'application/json'
        const response = await axiosInstance.post(url, data)
        return response.data
    } catch (error) {
        handleError(error)
    }
}

export const apiPut = async(url, data = {}) => {
    try {
        const token = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : null
        axiosInstance.defaults.headers.common['Authorization'] = token
        axiosInstance.defaults.headers.common['Content-Type'] = 'application/json'
        const response = await axiosInstance.put(url, data)
        return response.data
    } catch (error) {
        handleError(error)
    }
}

export const apiDelete = async(url) => {
    try {
        const token = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : null
        axiosInstance.defaults.headers.common['Authorization'] = token
        axiosInstance.defaults.headers.common['Content-Type'] = 'application/json'
        const response = await axiosInstance.delete(url)
        return response.data
    } catch (error) {
        handleError(error)
    }
}