import axios from "axios";


const baseURL = "https://62286b649fd6174ca82321f1.mockapi.io"

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json"
    }
})

export async function getProducts() {

    const response = await api.get('/case-study/products/')
    if (response.status === 200) {
        return response.data
    }

}

export async function getProduct(id: string) {
    const response = await api.get(`/case-study/products/${id}`)
    if (response.status === 200) {
        return response.data
    }
}

export async function postProduct(payload: object) {
    const response = await api.post(`/case-study/products/`, payload)
    return response
}

export async function getCategories() {
    const response = await api.get('/case-study/categories/')
    return response.data
}

export async function getCategory(id: number) {
    const response = await api.get(`/case-study/categories/${id}`)
    return response.data
}