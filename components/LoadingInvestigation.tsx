'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';
import { useState, useEffect } from 'react';

const steps = [
  'Checking website identity...',
  'Verifying security certificates...',
  'Analyzing trust signals...',
  'Scanning fraud indicators...',
  'Generating AI assessment...',
];

export default function LoadingInvestigation() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.div
        className="w-full max-w-md px-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-3xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Investigating...
          </motion.h1>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            WebVerify AI is analyzing this website
          </motion.p>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              {index < currentStep ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                </motion.div>
              ) : index === currentStep ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Circle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                </motion.div>
              ) : (
                <Circle className="w-6 h-6 text-gray-300 flex-shrink-0" />
              )}
              <span
                className={`text-sm font-medium ${
                  index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-8">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Status Text */}
        <motion.p
          className="text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {currentStep === steps.length - 1 ? (
            <span className="text-green-600 font-medium">Analysis complete! Redirecting...</span>
          ) : (
            <span>Step {currentStep + 1} of {steps.length}</span>
          )}
        </motion.p>
      </motion.div>
    </div>
  );
}
