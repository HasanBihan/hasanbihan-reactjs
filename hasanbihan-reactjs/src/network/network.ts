import axios from "axios";
import { typeCategories,typeProduct, typeNewProduct } from "../types";



interface Category {
    name: string;
    price: string;
    category: string;
    description: string;
    avatar: string;
    developerEmail: string;
}

const baseURL = "https://62286b649fd6174ca82321f1.mockapi.io"

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json"
    }
})

export async function getProducts() {

    const response = await api.get<typeProduct[]>('/case-study/products/')
    if (response.status === 200) {
        return response.data
    }

}

export async function getProduct(id: number) {
    const response = await api.get(`/case-study/products/${id}`)
    return response.data
}

export async function postProduct(payload: object) {
    const response = await api.post<typeNewProduct[]>(`/case-study/products/}`, payload)
    return response.data
}

export async function getCategories() {
    const response = await api.get<typeCategories[]>('/case-study/categories/')
    return response.data
}

export async function getCategory(id: number) {
    const response = await api.get<typeCategories[]>(`/case-study/categories/${id}`)
    return response.data
}