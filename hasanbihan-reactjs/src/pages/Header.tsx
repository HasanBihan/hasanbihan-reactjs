import React from 'react';
import { Link } from "react-router-dom";

interface IProps { }

const Header: React.FC<IProps> = (props) => {

    return (
        <div className="max-w-full mx-4 md:mx-32 px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex  items-center  justify-between h-16">
                <div className="text-white">
                    <Link to="/" reloadDocument={true}><p >UPayments Store</p></Link>
                </div>
                <div className="bg-green-700 text-gray-100 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                    Register
                </div>
            </div>
        </div >
    )
}

export default Header