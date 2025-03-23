import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return (<>
    <div className="fixed top-10 left-full transform-1/2 h-0 w-0 boxx skew-y-12"></div>
    <div className="min-h-screen bg-gray-950/10 mt-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-gray-300 t ext-lg">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-gray-900/40 p-6 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-gray-300">
                  <Mail className="h-6 w-6 text-yellow-500" />
                  <span>upadhyayajay156@gamil.com</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                  <Phone className="h-6 w-6 text-yellow-500" />
                  <span>+91 (800) 123-4567</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                  <MapPin className="h-6 w-6 text-yellow-500" />
                  <span>Vijay chowk, Gorakhpur</span>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-gray-900/40 p-6 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Office Hours
              </h2>
              <div className="space-y-2 text-gray-300">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900/40 p-8 rounded-xl border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg 
                    focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg 
                    focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg 
                    focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg 
                    focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none 
                    text-white h-32 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg
                  ${isLoading 
                    ? 'bg-yellow-600 cursor-not-allowed' 
                    : 'bg-yellow-500 hover:bg-yellow-600'
                  } text-black font-semibold transition-colors duration-200`}
              >
                {isLoading ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Contact;