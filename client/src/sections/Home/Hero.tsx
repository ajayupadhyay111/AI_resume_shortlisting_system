import { RootState } from "@/store/store";
import { Upload } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {};

function Hero({}: Props) {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const user = isAuthenticated;
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      navigate("/upload");
    } else {
      navigate("/login");
    }
  };
  return (
    <section className=" py-28 mt-[5px]">
      <div className="container max-w-[1280px] mx-auto px-4">
        <div className="flex justify-center items-center flex-col gap-5">
          <div className="bg-gradient-to-tl mt-7 from-gray-900 px-8 to-yellow-800 w-fit p-2 rounded-full">
            <span>🌟 AI powered</span>
          </div>
          <div className="mt-3 md:px-14 lg:px-28 text-center">
            <h1 className="text-[40px] leading-[50px] md:text-[60px] lg:text-[65px] md:leading-[80px] tracking-tighter font-bold">
              Smart AI-Powered Resume Shortlisting – Find the Right Talent in
              Seconds! 🚀💼
            </h1>
          </div>
          <p className="text-gray-400 max-w-[800px] text-center text-lg mt-5">
            Effortlessly shortlist the best candidates with AI-powered
            precision. Save time, improve hiring decisions, and streamline your
            recruitment process—all in one smart dashboard!
          </p>
          {isAuthenticated ? (
            <button onClick={()=>navigate("/upload")} className="py-4 font-bold rounded-full bg-yellow-600 text-white mt-5 w-[200px] flex  items-center justify-center gap-2    "
            >Upload Resumes <Upload/></button>
          ) : (
            <button
              onClick={handleClick}
              className="py-4 font-bold rounded-full bg-yellow-600 text-white mt-5 w-[200px]"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
