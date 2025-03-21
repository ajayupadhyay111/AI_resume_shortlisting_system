import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

type Props = {}

function Footer({ }: Props) {
  const {isAuthenticated} = useSelector((state:RootState)=>state.user)
  let user = isAuthenticated;
  return (
    <footer className='bg-gray-900/40 py-10'>
      <div className='container mx-auto flex md:flex-row flex-col items-start'>
        <div className='flex flex-col items-start flex-1 gap-4'>
          <h1 className='text-[28px] pl-2 md:pl-0 md:text-3xl lg:text-4xl font-bold'>Stay Ahead in Recruitment</h1>
          <p className='text-gray-400 pl-2 md:pl-0 text-sm pr-10 md:pr-0 md:text-md lg:text-xl  lg:leading-[35px]'>Join thousands of HR professionals who trust our AI-powered resume shortlisting system. Simplify hiring, save time, and find the best talent effortlessly!</p>
          {
            user ? (
              <button className="ml-2 md:ml-0 py-2 lg:py-4 font-bold rounded-full bg-yellow-600 text-white mt-1 lg:mt-5 w-[100px] md:w-[150px] lg:w-[200px]">Get Started</button>
            ) : (
              <button className="ml-2 md:ml-0 py-2 lg:py-4 font-bold rounded-full bg-yellow-600 text-white mt-1 lg:mt-5 w-[100px] md:w-[150px] lg:w-[200px]">Login</button>
            )
          }
        </div>
        <div className='flex items-start flex-1 mt-7'>
          <div className='lg:flex-1'></div>
          <div className='flex-1 pl-2 md:pl-10 flex flex-col gap-4'>
            <div className='flex items-start gap-8 font-extrabold text-md lg:text-xl'>
              <span className='text-yellow-300 '>Email</span>
              <span>ajay@gmail.com</span>
            </div>
            <div className='flex items-start gap-8 font-extrabold text-md lg:text-xl'>
              <span className='text-yellow-300 '>Phone</span>
              <span>+91 9876543210</span>
            </div>
            <div className='flex items-start gap-8 font-extrabold text-md lg:text-xl'>
              <span className='text-yellow-300 '>Address</span>
              <span>Gorakhpur, Uttar Pradesh, India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer