import { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyEmail } from "../API/authenticationAPIs";
import toast from "react-hot-toast";

const VerifyEmail: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Email not found. Please register again.");
      navigate("/register");
      return;
    }

    if (code.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyEmail(email,code);
      
      if (response.success) {
        toast.success(response.message);
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 
        "Failed to verify email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-800">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white w-full max-w-md border border-gray-500">
        <h2 className="text-3xl font-bold mb-6 text-center">Email Verification</h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter the verification code sent to<br />
          <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="code" className="block text-sm font-medium">
            Enter Verification Code
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            className="w-full px-4 py-2 rounded-lg border border-gray-500 focus:ring-2 focus:ring-yellow-500 outline-none"
            placeholder="Enter 6-digit code"
            maxLength={6}
            required
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className={`w-full ${
              isLoading || code.length !== 6
                ? "bg-yellow-400 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-700"
            } transition text-white py-2 rounded-lg`}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;