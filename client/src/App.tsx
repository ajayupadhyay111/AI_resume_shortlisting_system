import { Routes, Route } from "react-router-dom"
import './App.css'
import { lazy, Suspense, useEffect } from "react"
import { getProfile } from "./API/authenticationAPIs"
import { AppDispatch } from "./store/store"
import { useDispatch } from "react-redux"
import { setUser } from "./store/features/user/userSlice"
import axios, { AxiosError } from "axios"

const Home = lazy(() => import("./pages/Home"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Setting = lazy(() => import("./sections/Dashboard/Setting"))
const Navbar = lazy(() => import("./components/Navbar"))
const Footer = lazy(() => import("./components/Footer"))
const Payment = lazy(() => import("./sections/Dashboard/Payment"))
const Profile = lazy(() => import("./sections/Dashboard/Profile"))
const SubDashboard = lazy(() => import("./sections/Dashboard/SubDashboard"))
const Attempt = lazy(() => import("./components/Attempt"))
const Features = lazy(() => import("./pages/Features"))
const Pricing = lazy(() => import("./pages/Pricing"))
const About = lazy(() => import("./pages/About"))
const Contact = lazy(() => import("./pages/Contact"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const ResumeUpload = lazy(() => import("./pages/ResumeUpload"))
import { useNavigate } from "react-router-dom"

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()


  useEffect(()=>{
    const response = axios.get("https://ai-resume-shortlisting-system.onrender.com/")
    console.log(response)
  },[])


useEffect(()=>{
  window.scrollTo(0,0);

  (async()=>{
   try {
    const response = await getProfile()
    dispatch(setUser(response.user))
   } catch (error) {
    const axiosError = error as AxiosError;
  if(axiosError.response?.status === 401){
    localStorage.removeItem("accessToken")
    navigate("/login")
    }
   }
  })()
},[])
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
        <Routes>

          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* private routes */}

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<SubDashboard />}>
              <Route path="attempt/:id" element={<Attempt />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Setting />} />
            <Route path="payments" element={<Payment />} />
          </Route>
          <Route path="/upload" element={<ResumeUpload />} />
        </Routes>
      <Footer />
      </Suspense>
    </>
  )
}

export default App
