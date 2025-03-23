import { useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../API/authenticationAPIs';
import toast from 'react-hot-toast';

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {forgotPasswordToken} = useParams();
    // Redirect if no email in state
  if (!forgotPasswordToken) {
    navigate('/forgot-password');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword(forgotPasswordToken,formData.newPassword);
      if (response.success) {
        toast.success('Password reset successfully');
        navigate('/login');
      }
    } catch (error: any) {
        console.log("Error:", error);
      toast.error(
        error.response?.data?.message ||
        'Failed to reset password'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950/10">
      <div className="bg-gray-600/20 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
                   <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading  || !formData.newPassword || !formData.confirmPassword}
            className={`w-full ${
              isLoading  || !formData.newPassword || !formData.confirmPassword
                ? "bg-yellow-400 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-700"
            } text-white py-2 rounded-lg transition duration-200`}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;