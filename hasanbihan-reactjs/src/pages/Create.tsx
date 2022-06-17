import React, {useState } from 'react';
import CategoryDropdown from '../components/CategoryDropdown';
import { NewProduct } from "../types";
import {
    postProduct
} from "../network/network"
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

interface IProps { }

const Create: React.FC<IProps> = (props) => {
    const developerEmail: string = "bihanhasan33@gmail.com"
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    let navigate = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const getSelectedCategory = (e: any) => {
        setSelectedCategory(e.name)

    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            name: { value: string };
            description: { value: string };
            imageurl: { value: string };
            price: { value: string };
        };
        const name = target.name.value;
        const description = target.description.value;
        const imageurl = target.imageurl.value;
        const price = target.price.value;

        if (
            name.trim() === "" || description.trim() === "" || imageurl.trim() === "" || price.trim() === ""
        ) {
            Toast.fire({
                icon: 'error',
                title: 'Please fill all the inputs!'
            })
        } else {
            const payload: NewProduct = {
                name: name,
                description: description,
                avatar: imageurl,
                price: Number(price),
                developerEmail: developerEmail,
                category: selectedCategory
            }

            try {
                const response = await postProduct(payload)
                if (response.status === 201 && response.statusText === "Created") {
                    Toast.fire({
                        icon: 'success',
                        title: 'Product created successfully!'
                    })
                    navigate("/", { replace: true });
                }
            } catch {
                Toast.fire({
                    icon: 'error',
                    title: 'API Error!'
                })
            }


        }
    };
    return (
        <div className="flex items-center justify-center h-screen">

            <form onSubmit={handleSubmit}>
                <p className="text-center mb-6 text-3xl">Create Product</p>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Product Name</label>
                <div className="mb-6 w-96 bg-white rounded-lg drop-shadow-md  ">
                    <input type="text" id="name" className="bg-white  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                <div className="mb-6 w-96 bg-white rounded-lg drop-shadow-md  ">
                    <textarea rows={4} id="description" className="bg-white  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Image URL</label>
                <div className="mb-6 w-96 bg-white rounded-lg drop-shadow-md  ">
                    <input type="text" id="imageurl" className="bg-white  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                <div className="mb-6 w-96 bg-white rounded-lg drop-shadow-md border-gray-300 ">
                    <input type="number" id="price" className="bg-white  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 z-0" />
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Categories</label>
                <div className="mb-6 w-96 bg-white rounded-lg drop-shadow-md z-99 ">
                    <CategoryDropdown getSelectedCategory={getSelectedCategory} create={true} />
                </div>
                <div className="mb-6 w-96 justify-center">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center ">Submit</button>
                </div>
            </form>

        </div>
    )
}

export default Create