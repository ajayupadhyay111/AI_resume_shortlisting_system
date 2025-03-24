import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../API/authenticationAPIs';
import toast from 'react-hot-toast';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {   
    window.scrollTo(0, 0);
  },[])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await forgotPassword(email);
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 
        'Failed to process request'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950/10 flex items-center justify-center">
      <div className="bg-gray-600/20 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Forgot Password
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-500 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className={`w-full ${
              isLoading || !email
                ? "bg-yellow-400 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-700"
            } text-white py-2 rounded-lg transition duration-200`}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-yellow-600 hover:text-yellow-700 text-sm"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;