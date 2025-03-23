import { Check } from 'lucide-react';

interface PricingPlan {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  button: string;
}

const Pricing: React.FC = () => {
  const pricing: PricingPlan[] = [
    {
      title: "Personal Plan",
      subtitle: "For Individual Recruiters & Small-Scale Hiring",
      price: "Basic Plan – Free",
      features: ["Upload up to 10 resumes per day", "100% free", "No credit card required", "AI-powered resume screening"],
      button: "Get Started"
    },
    {
      title: "Standard Plan",
      subtitle: "For Growing Teams & Efficient Shortlisting",
      price: "₹1499/month",
      features: ["Upload up to 500 resumes per month", "AI-powered resume shortlisting", "Download shortlisted resumes", "Basic search & filter options"],
      button: "Purchase Now"
    },
    {
      title: "Enterprise Plan",
      subtitle: "For Enterprises with High-Volume Hiring Needs",
      price: "₹3999/month",
      features: ["Unlimited resume uploads", "Advanced AI shortlisting", "Custom search & filters", "Priority support"],
      button: "Purchase Now"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950/10 mt-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-300 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-200">Select the perfect plan for your recruitment needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-900/40 p-8 rounded-xl border-2 
                ${index === 1 
                  ? 'border-yellow-500 md:scale-105' 
                  : 'border-gray-700 hover:border-yellow-500/50'} 
                transition-all duration-300`}
            >
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-500 text-black text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.subtitle}</p>
                <div className="text-3xl font-bold text-white mb-2">{plan.price}</div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-gray-300">
                    <Check className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300
                  ${index === 1
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                    : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                  }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="mt-4 text-gray-400">
            Need a custom plan? {' '}
            <a href="/contact" className="text-yellow-500 hover:text-yellow-600 underline">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;