import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950/10 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-yellow-500 mb-4">404</h1>
        
        <div className="mb-8">
          <h2 className="text-4xl font-semibold text-white mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-400">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 
            text-black rounded-lg transition-colors duration-200"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </button>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-500 rounded-full animate-ping" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-500 rounded-full animate-ping 
          animation-delay-200" />
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-yellow-500 rounded-full animate-ping 
          animation-delay-400" />
      </div>
    </div>
  );
};

export default PageNotFound;