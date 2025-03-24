import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { getProfile } from "./API/authenticationAPIs";
import { AppDispatch, RootState } from "./store/store";
import { useDispatch } from "react-redux";
import { setUser } from "./store/features/user/userSlice";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Setting = lazy(() => import("./sections/Dashboard/Setting"));
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const Payment = lazy(() => import("./sections/Dashboard/Payment"));
const Profile = lazy(() => import("./sections/Dashboard/Profile"));
const SubDashboard = lazy(() => import("./sections/Dashboard/SubDashboard"));
const Attempt = lazy(() => import("./components/Attempt"));
const Features = lazy(() => import("./pages/Features"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ResumeUpload = lazy(() => import("./pages/ResumeUpload"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);

    (async () => {
      try {
        const response = await getProfile();
        dispatch(setUser(response.user));
      } catch (error) {
        console.log("You are not login yet");
      }
    })();
  }, []);

  const GoogleAuthWrapper = ()=>{
    return <GoogleOAuthProvider clientId={import.meta.env.VITE_GoogleOauthClientId}>
      <Login />
    </GoogleOAuthProvider>
  }
  return (
    <>
      <Suspense
        fallback={
          <div className="h-screen w-full flex justify-center items-center">
            <div className="w-6 h-6 border-b-2 animate-spin rounded-full"></div>
          </div>
        }
      >
        <Navbar />
        <div className="min-h-screen">
          <Routes>
            {/* public routes */}
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to={"/login"} />}
            />
            <Route  
              path="/login"
              element={isAuthenticated ? <Navigate to={"/"} /> : <GoogleAuthWrapper/>}
            />
            <Route path="/register" element={isAuthenticated ? <Navigate to={"/"}/>:<Register />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/verify-email"
              element={
                isAuthenticated ? <Navigate to={"/login"} /> : <VerifyEmail />
              }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path={`/reset-password/:forgotPasswordToken`} element={<ResetPassword />} />

            {/* private routes */}
            <Route path="/dashboard" element={isAuthenticated?<Dashboard />:<Navigate to="/login" />}>
              <Route path="" element={<SubDashboard />}>
                <Route path="attempt/:id" element={<Attempt />} />
              </Route>  
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Setting />} />
              <Route path="payments" element={<Payment />} />
            </Route>
            <Route path="/upload" element={<ResumeUpload />} />
          </Routes>
        </div>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
