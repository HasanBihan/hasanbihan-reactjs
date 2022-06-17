import React from 'react';

interface IProps {
    avatar?:string;
    name?:string;
    price?:number
 }

const ProductCard: React.FC<IProps> = (props) => {

    return (

        <div className=" bg-white h-96 hover:bg-gray-300 rounded-lg border border-white-200 hover:border-gray-300 shadow-md cursor-pointer">
            <a href="#">
                <img className="mt-2 rounded-t-lg w-48 h-48 object-contain m-auto" src={props.avatar} alt=""/>
            </a>
            <div className="relative p-5  h-48">
                <a href="#">
                    <h6 className="mb-2 text-lg font-bold tracking-tight text-black ">{props.name}</h6>
                </a>
                <p className="absolute left-2 bottom-2 mb-3 text-lg tex text-gray-700">${props.price}</p>
                
            </div>
        </div>

    )
}

export default ProductCard