import React, { useEffect, useState } from 'react';
import {
    getProducts
} from "../network/network"
import ProductCard from "./../components/ProductCard"
import CategoryDropdown from "./../components/CategoryDropdown"
import { typeProduct } from "../types";
import { Link } from "react-router-dom";
import Spinner from "./../components/Spinner"

interface IProps { }

const Home: React.FC<IProps> = (props) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [products, setProducts] = useState<typeProduct[]>([])
    const [filteredProducts, setFilteredProducts] = useState<typeProduct[]>([])
    const [filteredByCategory, setFilteredByCategory] = useState<typeProduct[]>([])
    const [searchValue, setSearchValue] = useState<string>("")

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {

        const response = await getProducts()
        if (Array.isArray(response)) {
            console.log(response);
            setProducts(response)
            setFilteredProducts(response)
            setFilteredByCategory(response)
            setIsLoaded(true)
        }

    }

    const filterProducts = (searchValue: string) => {
        const filteredItems = filteredProducts.filter((item) => item?.name?.toLowerCase().includes(searchValue.toLowerCase()) || item?.description?.toLowerCase().includes(searchValue.toLowerCase()) || item?.category?.toLowerCase().includes(searchValue.toLowerCase()))
        console.log(filteredItems);
        if (searchValue === "") {
            setFilteredProducts(products)
        } else {
            setFilteredProducts(filteredItems)
        }
        setSearchValue(searchValue)
    }

    const getSelectedCategory = (e: any) => {
        if (e.id === "0") {
            setFilteredProducts(products)
        } else {
            const newItems = products.filter((product) => product?.category === e.name);
            setFilteredByCategory(newItems);
            setFilteredProducts(newItems);
            setSearchValue("")
        }
    };

    return (
        <>
            {isLoaded ?
                <div className="relative">
                    <div className="mx-8 md:mx-32">
                        <div className="relative flex items-center  justify-between">
                            <div className="mt-6 bg-white rounded-lg drop-shadow-md overflow-hidden  sm:w-1/3 lg:w-1/3">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    id="search"
                                    value={searchValue}
                                    onChange={(e) => filterProducts(e.target.value)}
                                    className="p-2 w-full text-sm text-gray-base outline-none "
                                ></input>
                            </div>
                            <div className="mt-6 ml-2 bg-white rounded-lg drop-shadow-md z-10  w-3/4 lg:w-1/3">
                                <CategoryDropdown getSelectedCategory={getSelectedCategory} />
                            </div>
                        </div>

                        <div className="mt-6 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredProducts?.map((item: typeProduct, index) => {
                                return (
                                    <div key={index}>
                                        <ProductCard avatar={item.avatar} name={item.name} price={item.price} id={item.id} />
                                    </div>
                                )
                            })}
                        </div>



                    </div>
                    <div className="fixed right-3 bottom-5">

                        <Link to="/create"><p className="bg-indigo-700 text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Add Product</p></Link>

                    </div>
                </div>
                :
                <div className="mt-6 m-auto">
                    <Spinner />
                </div>}
        </>


    )
}

export default Home