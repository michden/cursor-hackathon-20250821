import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Users, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-elbe-blue via-blue-600 to-eco-green overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-20 right-10 w-60 h-60 bg-white opacity-10 rounded-full"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Make Hamburg
              <span className="block text-yellow-300">Great Again</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-50">
              Join the community-driven initiative to keep our waterways clean
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <button className="bg-white text-elbe-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-200 shadow-xl">
              Report Pollution
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-elbe-blue transition-all duration-200">
              Join Event
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
              <div className="text-3xl font-bold">48</div>
              <div className="text-sm">Active Spots</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <Users className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
              <div className="text-3xl font-bold">234</div>
              <div className="text-sm">Volunteers</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <Sparkles className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
              <div className="text-3xl font-bold">3.4t</div>
              <div className="text-sm">Waste Collected</div>
            </div>
          </motion.div>

          <motion.div
            className="mt-8"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-6 w-6 mx-auto text-white opacity-70" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
