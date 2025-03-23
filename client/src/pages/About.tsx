import { RootState } from "@/store/store";
import { Upload } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  return (
    <div className="min-h-screen bg-gray-950/10 mt-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-1/2 left-1/2 transform-1/2 h-0 w-0 boxx animate-pulse"></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-100 mb-8">
            About Our AI Resume Shortlisting System
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Transforming the recruitment process with artificial intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-300">What We Do</h2>
            <p className="text-gray-200">
              Our AI-powered system streamlines the recruitment process by
              automatically analyzing and shortlisting resumes based on job
              requirements. We use advanced machine learning algorithms to
              evaluate candidates' qualifications, skills, and experience,
              ensuring a fair and efficient selection process.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-300">
              How It Works
            </h2>
            <ul className="space-y-4 text-gray-200">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                Upload job requirements and candidate resumes
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                AI analyzes resumes against job criteria
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                Automatic shortlisting of qualified candidates
              </li>
              <li className="flex items-start">
                <span className="mr-2">4.</span>
                Generate detailed analysis reports
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-600/20 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white mb-4">
              Time Saving
            </h3>
            <p className="text-gray-200">
              Reduces resume screening time by up to 75%, allowing HR teams to
              focus on strategic tasks
            </p>
          </div>
          <div className="bg-gray-600/20 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white mb-4">Accuracy</h3>
            <p className="text-gray-200">
              Advanced AI algorithms ensure consistent and unbiased evaluation
              of all candidates
            </p>
          </div>
          <div className="bg-gray-600/20 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white mb-4">
              Cost Effective
            </h3>
            <p className="text-gray-200">
              Significantly reduces recruitment costs and improves hiring
              efficiency
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-300 mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          {isAuthenticated ? (
            <button
              onClick={() => (window.location.href = "/register")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md transition duration-300 flex justify-center items-center gap-2 mx-auto"
            >
              Upload Resumes <Upload/>
            </button>
          ) : (
            <button
              onClick={() => (window.location.href = "/register")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md transition duration-300"
            >
              Get Started Today
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
