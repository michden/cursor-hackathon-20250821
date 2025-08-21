import React from 'react';
import { Waves, Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-16 transition-colors duration-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Waves className="h-8 w-8 text-elbe-blue dark:text-blue-400" />
              <span className="text-2xl font-bold">ElbeClean</span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Community-driven initiative to keep Hamburg's waterways clean and beautiful.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-500">
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Report Pollution</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Join Event</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">View Map</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Leaderboard</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-500">
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Volunteer</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Donate</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Partner with Us</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Organize Event</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
              Stay updated with our cleanup events and impact reports.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 dark:bg-gray-900 text-white rounded-l-lg focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-800"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-elbe-blue dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 rounded-r-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 dark:border-gray-900 text-center text-sm text-gray-400 dark:text-gray-500">
          <p className="flex items-center justify-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for Hamburg Hackathon 2025
          </p>
          <p className="mt-2">© 2025 ElbeClean. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
