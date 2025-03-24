import { FC } from 'react';
import { Cpu, UserCheck, Clock, LineChart, Shield, Award } from 'lucide-react';

const Features: FC = () => {
  const features = [
    {
      icon: <Cpu className="w-8 h-8 text-yellow-500" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze resumes with precision and accuracy"
    },
    {
      icon: <UserCheck className="w-8 h-8 text-yellow-500" />,
      title: "Smart Matching",
      description: "Intelligent matching of candidate skills with job requirements"
    },
    {
      icon: <Clock className="w-8 h-8 text-yellow-500" />,
      title: "Time Efficiency",
      description: "Reduce screening time by up to 75% with automated processing"
    },
    {
      icon: <LineChart className="w-8 h-8 text-yellow-500" />,
      title: "Detailed Analytics",
      description: "Comprehensive reports and insights on candidate evaluations"
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-500" />,
      title: "Unbiased Selection",
      description: "Ensure fair and objective candidate evaluation process"
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: "Quality Hiring",
      description: "Improve hiring quality with data-driven decisions"
    }
  ];

  return (
    <div className="h-fit bg-gray-950/10 mt-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-300 mb-4">
            Powerful Features for Smart Recruitment
          </h1>
          <p className="text-xl text-gray-200">
            Discover how our AI-powered system revolutionizes the hiring process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-600/20 p-6 rounded-lg shadow-md transition duration-300 hover:transform hover:scale-105"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-200">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-200 mb-8">
            Ready to experience these features in action?
          </p>
          <button 
            onClick={() => window.location.href = '/register'}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md transition duration-300"
          >
            Start Using Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;