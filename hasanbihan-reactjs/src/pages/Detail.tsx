import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { typeProduct } from "../types";
import {
    getProduct
} from "../network/network"
import Spinner from '../components/Spinner';

interface IProps { }

const Detail: React.FC<IProps> = (props) => {
    const params = useParams()
    const [product, setProduct] = useState<typeProduct | any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const productId: any = params.productId

        const response = await getProduct(productId)
        if (response) {
            setProduct(response)
            setIsLoaded(true)
        } else {
            setIsError(true)
            setIsLoaded(true)
        }

    }

    return (
        <>
            {isLoaded ?
                <section className="text-gray-700 body-font overflow-hidden bg-white">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap ">
                            <img alt="productavatar" className="md:w-full lg:w-72 w-full object-cover object-center rounded border border-gray-200" src={product.avatar} />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>


                                <div className="flex h-full mt-4 lg:mt-0  lg:relative ">
                                    <span className="title-font font-medium text-2xl text-gray-900 lg:absolute lg:left-2 lg:bottom-2 ">${product.price}</span>

                                </div>
                            </div>
                        </div>
                        <div className="relative flex py-5 items-center mx-2 lg:mx-32 ">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <span className="flex-shrink mx-4 text-gray-800">Description</span>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>
                        <div className="mx-2 lg:mx-32 p-8">
                            <p>{product.description}</p>
                        </div>
                    </div>
                </section>
                :
                <div className="mt-6 m-auto">
                    <Spinner />
                </div>}
        </>

    )
}

export default Detail