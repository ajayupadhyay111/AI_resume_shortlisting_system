import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { deleteAccount } from '../../API/authenticationAPIs';

const Setting: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const response = await deleteAccount();
      if (response.success) {
        toast.success('Account deleted successfully');
        navigate('/login');
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 
        'Failed to delete account'
      );
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      {/* Delete Account Section */}
      <div className="rounded-lg shadow p-6 border-2">
        <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
        <p className="text-gray-400 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            Delete Account
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-red-600 font-medium">
              Are you sure you want to delete your account?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleDeleteAccount}
                disabled={isLoading}
                className={`${
                  isLoading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                } text-white px-4 py-2 rounded transition`}
              >
                {isLoading ? "Deleting..." : "Yes, Delete Account"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;