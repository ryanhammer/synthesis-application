'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [sessionStarted, setSessionStarted] = useState(false);
  return (
    <main className='flex min-h-screen bg-dark-blue flex-col items-center justify-between p-24'>
      {!sessionStarted ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {/* Welcome Text */}
          <h1 className='text-white text-4xl ...'>Welcome to Synthesis Tutor.</h1>
          {/* Subtext */}
          <p className='text-gray-300 ...'>Enjoy this 10-20 minute lesson. For ages 8+.</p>
          {/* Let's begin button */}
          <motion.button whileHover={{ scale: 1.05 }} className='...' onClick={() => setSessionStarted(true)}>
            Let&apos;s begin
          </motion.button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Content that appears after clicking 'Let's begin' */}
          <p className='text-white ...'>
            Ah, there you are again! Looks like we had a bit of a hiccup with our connection.
          </p>
          {/* Other UI elements */}
        </motion.div>
      )}
    </main>
  );
}
