import { useState } from "react";
import user from "../assets/user.png";
import { FaEyeSlash, FaEye, FaLock, FaSpinner } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

// import { AuthContext } from "@/context/authContext.js";
import GoogleIcon from "../assets/google.svg";
import { googleAuthLogin, login } from "@/API/authenticationAPIs";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/features/user/userSlice";
import { AppDispatch } from "@/store/store";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [focusField, setFocusField] = useState<string | null>(null);
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  interface FormData {
    email: string;
    password: string;
  }
  interface AuthResult {
    code: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>(); // 🔥 Now it's type-safe!
  const navigate = useNavigate();
  //   const { setUser, setAccessToken } = useContext(AuthContext);
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const response = await login(data);
      console.log("Response:", response);
      if (response.success) {
        toast.success(response.message);
        dispatch(setUser(response.user));
        localStorage.setItem("accessToken", response.accessToken);
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // google login functionality is written below
  const responseGoogle = async (authResult: AuthResult) => {
    try {
      console.log(authResult.code)
      const response = await googleAuthLogin(authResult.code);
      dispatch(setUser(response.user));
      toast.success(`Welcome ${response.user.name}`);
      localStorage.setItem("accessToken", response.accessToken);
      navigate("/");
    } catch (error) {
      console.log("error while requesting google code ", error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
  });
  return (
    <div
      className="w-full mt-7 h-screen flex justify-center items-center"
      onClick={() => {
        setFocusField(null);
      }}
    >
      <div className="w-[500px] bg-gray-950/10 shadow-md h-[470px] flex justify-center flex-col items-center">
        <img src={user} alt="user" className="w-24 h-24 mt-5" />
        <h1 className="font-semibold uppercase text-4xl">Welcome</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=""
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`relative h-[65px] ${
              focusField === "email"
                ? "border-b-[2px] border-yellow-600"
                : "border-b-[1px]  border-gray-700"
            }`}
          >
            <div className="absolute bottom-0 z-10 flex justify-center items-center gap-3 px-2 py-1">
              <MdEmail
                className={`${
                  focusField === "email" ? "text-yellow-600" : "text-gray-700"
                } transition-all duration-100`}
              />
              <input
                type="email"
                required
                className="outline-none border-none p-1 text-yellow-600 font-semibold placeholder:text-gray-500 border border-gray-300 rounded"
                placeholder="Enter your email"
                readOnly={focusField !== "email"}
                onFocus={() => setFocusField("email")}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                  onBlur: () => setFocusField(null), // ✅ Correctly merged onBlur
                })}
              />
            </div>
          </div>

          <div
            className={`relative h-[65px] ${
              focusField === "password"
                ? "border-b-[2px] border-yellow-600"
                : "border-b-[1px]  border-gray-700"
            }`}
          >
            <div className="absolute bottom-0 z-10 flex justify-center items-center gap-3 px-2 py-1">
              <FaLock
                className={`${
                  focusField === "password"
                    ? "text-yellow-600"
                    : "text-gray-700"
                } transition-all duration-100`}
              />
              <input
                type={passwordHidden ? "password" : "text"}
                className="outline-none border-none p-1 text-yellow-600 font-semibold placeholder:text-gray-500 border border-gray-300 rounded"
                placeholder="Enter your password"
                readOnly={focusField !== "password"}
                onFocus={() => setFocusField("password")}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  onBlur: () => setFocusField(null), // Correct way to merge onBlur
                })}
              />

              {passwordHidden ? (
                <FaEyeSlash
                  onClick={() => setPasswordHidden((prev) => !prev)}
                  className={`transition-all duration-100`}
                />
              ) : (
                <FaEye onClick={() => setPasswordHidden((prev) => !prev)} />
              )}
            </div>
          </div>
          {errors.email && (
            <p className="text-red-500">{errors?.email?.message}</p>
          )}
          {errors.password && (
            <p className="text-red-500">{errors?.password?.message}</p>
          )}

          <div className="w-[270px] flex justify-end mt-1 underline ">
            <Link to={"/forgot-password"} className="active:text-blue-500">
              Forgot Password
            </Link>
          </div>
          <button
            type="submit"
            disabled={isLoading ? true : false}
            className={twMerge(
              "w-[270px] mt-3 text-white bg-yellow-600 hover:bg-yellow-500 border-none px-3 py-2 rounded-lg font-semibold",
              isLoading && "opacity-50 cursor-not-allowed",
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            )}
          >
            {isLoading ? (
              <div className="flex justify-center items-center animate-spin">
                <FaSpinner className="animate-spin" />
              </div>
            ) : (
              "Sign In"
            )}
          </button>
          <p className=" text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              SignUp
            </Link>
          </p>
        </form>
        <div className="relative w-1/2 mt-5">
          <hr />
          <span className="absolute -top-[10px] left-[46%] text-white text-sm">
            OR
          </span>
        </div>
        <div className="flex items-center justify-center h-screen">
      <button
        onClick={() => handleGoogleLogin()}
        className="border-2 text-white font-bold flex  items-center gap-2 mt-10 py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        Login with Google <img src={GoogleIcon} alt="" />
      </button>
    </div>
      </div>
    </div>
  );
};

export default Login;
