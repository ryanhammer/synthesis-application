'use client';

import { useState } from 'react';

export default function Home() {
  const [sessionStarted, setSessionStarted] = useState(false);
  return (
    <>
      <div className='relative m-auto flex h-screen max-h-screen max-w-[1600px] flex-col items-start bg-black text-center shadow-2xl shadow-slate-900 '>
        {!sessionStarted ? (
          <div className='flex h-screen w-full flex-col items-center justify-center bg-black'>
            <div className='absolute z-20 flex h-screen w-screen items-center justify-center bg-[#07071F]'>
              <video autoPlay className='absolute -z-10 h-screen w-screen object-cover' loop playsInline preload='true'>
                <source src='/string_theory_tutor.mp4' type='video/mp4' />
              </video>
              <div>
                <div className='flex w-full max-w-4xl flex-col items-center justify-center px-8 text-center text-white'>
                  <h1 className='p-4 text-5xl'>Welcome to Synthesis Tutor.</h1>
                  <h2 className='flex flex-col text-3xl opacity-75'>
                    <span>Enjoy this 10-20 minute lesson.</span>
                    <span>For ages 8+.</span>
                  </h2>
                </div>
                <button
                  className='mt-12 w-72 rounded-md bg-white px-16 py-4 text-3xl font-semibold text-[#07071F] shadow-lg hover:bg-white/80'
                  onClick={() => setSessionStarted(true)}
                >
                  Let&apos;s begin
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>widget component loads here</div>
        )}
      </div>
    </>
  );
}
