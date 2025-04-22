'use client'
import { useState } from 'react';
import Link from 'next/link';
import logo from '../../public/makerspaceLogo.png'
import Image from 'next/image';

export default function NavMenu(){
    const [hidden, setHidden] = useState(true);

    if (hidden){
        return(
            <div className=" flex flex-row w-full justify-between items-center">
                <Image className="bg-white rounded-md ml-1 mt-1" src={logo} alt="makerspace logo" width={100} height={100} />
                <button 
                onClick={() => setHidden(!hidden)}
                className="flex h-[30%] mr-3 items-center px-3 py-2 rounded text-white border-2 border-white hover:text-gray-500 hover:border-gray-500">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
        )
    }

    return(
        <div>
            <nav className="flex items-center justify-between flex-wrap bg-green-900 bg-opacity-50 p-6">
                <div className="w-full flex justify-end mr-3">
                    <button 
                    onClick={() => setHidden(!hidden)}
                    className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-lg lg:flex-grow">
                        <Link href="/" className="block mt-4 md:inline-block md:mt-0 text-teal-lighter hover:text-white mr-4">
                            Home
                        </Link>
                        <Link href="/pHData" className="block mt-4 md:inline-block md:mt-0 text-teal-lighter hover:text-white mr-4">
                            PH Levels
                        </Link>
                        <Link href="/nutritionData" className="block mt-4 md:inline-block md:mt-0 text-teal-lighter hover:text-white mr-4">
                            Nutritions Levels
                        </Link>
                        <Link href="/about" className="block mt-4 md:inline-block md:mt-0 text-teal-lighter hover:text-white mr-4">
                            About
                        </Link>
                        <Link href="/contact" className="block mt-4 md:inline-block md:mt-0 text-teal-lighter hover:text-white mr-4">
                            Contact
                        </Link>
                        <Link href="/entryPoint" className="block mt-4 md:inline-block md:mt-0 text-teal-lighter hover:text-white">
                            Admin Access
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}