import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Logo from "../assets/logo.svg"
import { Button } from './ui/button'
import { Link, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { AnimatePresence, motion } from 'framer-motion'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Home, LogOut } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
const navItems = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'About',
        href: '/about'
    },
    {
        name: 'Features',
        href: '/features'
    },
    {
        name: 'Pricing',
        href: '/pricing'
    },
    {
        name: 'Contact',
        href: '/contact'
    }
]
type Props = {}

function Navbar({ }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const location = useLocation()
    const isDashboard = location.pathname.includes("/dashboard");
    const {isAuthenticated,user} = useSelector((state:RootState)=>state.user)
   
    return (
        <nav className="">
            <div className={`  ${isDashboard ? "border-b border-gray-700/50" : "fixed top-0 px-4 left-0 right-0 z-50"} `}>
                <div className={`px-2  ${isDashboard ? "rounded-none my-2" : "rounded-lg md:rounded-full backdrop-blur-sm border my-5 container max-w-[1280px] mx-auto"} `}>
                    <div className='flex justify-between items-center'>
                        <img src={Logo} alt="logo" className='w-28 h-16 pl-3' />
                        <div className='hidden md:flex'>
                            <ul className='flex gap-5 text-white items-center'>
                                {
                                    navItems.map((item) => (
                                        <li key={item.name} className='relative py-1 cursor-pointer hover:text-yellow-500 group'>
                                            <Link to={item.href}>
                                                <span className='px-1'>{item.name}</span>
                                            </Link>
                                            <div className='absolute mt-1 bottom-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 group-hover:bg-yellow-500 transition-all duration-300 bg-white'></div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='md:hidden mr-2 '>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-menu text-white md:hidden mr-2"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <line
                                    x1="3"
                                    y1="6"
                                    x2="21"
                                    y2="6"
                                    className={twMerge(
                                        "origin-right transition",
                                        isOpen && "-rotate-45 -translate-y-1"
                                    )}
                                ></line>
                                <line
                                    x1="3"
                                    y1="12"
                                    x2="21"
                                    y2="12"
                                    className={twMerge("transition", isOpen && "hidden")}
                                ></line>
                                <line
                                    x1="3"
                                    y1="18"
                                    x2="21"
                                    y2="18"
                                    className={twMerge(
                                        "origin-right transition",
                                        isOpen && "rotate-45 translate-y-1"
                                    )}
                                ></line>
                            </svg>
                        </div>
                        <div className='md:block hidden '>
                            {user ?
                                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen} >
                                    <DropdownMenuTrigger className='outline-none'>
                                        <Avatar className='w-10 h-10 outline-none'>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='bg-gray-900 w-[200px] absolute top-4 right-0'>
                                        <DropdownMenuLabel className='text-center'>
                                            <span className='text-white font-bold text-lg'>{user.name}</span>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>
                                            <span className='text-white' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                                <Link to={"/dashboard"} className='flex items-center gap-2'>
                                                    <Home />
                                                    <span className='text-white px-2'>Dashboard</span>
                                                </Link>
                                                
                                            </span>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>
                                            <span className='text-white flex items-center gap-2' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                                <LogOut />
                                                <span className='text-white px-2'>Logout</span>
                                            </span>
                                        </DropdownMenuLabel>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                : <Link to={"/login"}>
                                    <Button className='h-[50px] w-[100px] rounded-full text-lg bg-yellow-600 hover:bg-yellow-500 text-white'>Login</Button>
                                </Link>}
                        </div>
                    </div>
                    <AnimatePresence>
                        {
                            isOpen &&
                            <motion.div initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"  >
                                <div
                                    className="flex flex-col items-center gap-4 mb-4 transition duration-300 "
                                >
                                    {navItems.map((item) => (
                                        <Link to={item.href} onClick={() => setIsOpen(false)} key={item.name} className="text-white active:text-yellow-500">
                                            {item.name}
                                        </Link>
                                    ))}
                                    {
                                        isAuthenticated ?
                                            <Link to={"/dashboard"}>
                                                <Button onClick={()=>setIsOpen(false)} className='w-fit px-10 bg-yellow-600 hover:bg-yellow-500 text-white '>Dashboard</Button>
                                            </Link>
                                            :
                                            <Link to={"/login"}>
                                                <Button onClick={() => setIsOpen(false)} className='w-fit px-10 bg-yellow-600 hover:bg-yellow-500 text-white '>Login</Button>
                                            </Link>
                                    }
                                </div>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    )
}

export default Navbar