'use client';

import { motion } from 'framer-motion';
import { RocketLaunchIcon, Cog6ToothIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import fractionsWithHammerImage from '../../../public/fractions_hammer.png';
import { stepsText, StepText } from './lesson-steps';
import { useState } from 'react';

interface FractionsWidgetProps {
  className?: string;
}

interface Step {
  stepPath: StepText[];
  stepCta: JSX.Element;
}

export const FractionsWidget = ({ className }: FractionsWidgetProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [optionChoice, setOptionChoice] = useState(0);

  const steps: Step[] = [
    {
      stepPath: [stepsText.stepOneText],
      stepCta: (
        <OptionButtons
          options={['Fractions', 'Something other than fractions']}
          setOptionChoice={setOptionChoice}
          currentStepIndex={currentStepIndex}
          setCurrentStepIndex={setCurrentStepIndex}
        />
      ),
    },
    {
      stepPath: [stepsText.stepTwoPathOneText, stepsText.stepTwoPathTwoText],
      stepCta: (
        <OptionButtons 
          options={['No. What are those?', 'Yep, sure have.']}
          setOptionChoice={setOptionChoice}
          currentStepIndex={currentStepIndex}
          setCurrentStepIndex={setCurrentStepIndex}
        />
      )
    }
  ];

  return (
    <div className={`${className} flex h-screen`}>
      <div className='w-1/4 bg-black flex flex-col justify-between p-4'>
        <div className='flex w-full gap-3'>
          <button className='h-12 bg-slate-gray rounded px-3'>
            <Cog6ToothIcon className='h-5 w-5' color='gray' />
          </button>
          <button className='text-white h-12 px-4 bg-strong-blue rounded transition duration-300'>
            <div className='flex items-center gap-x-2'>
              <RocketLaunchIcon className='h-5 w-5' color='white' />
              <div className='text-sm text-nowrap'>Sign Up Now</div>
            </div>
          </button>
        </div>
        <div className='flex flex-col w-full'>
          {steps[currentStepIndex].stepPath[optionChoice].map((stepText) => {
            return (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className='text-white'
                >
                  <div className='mb-8'>
                    {stepText.map((stepSubtextItem, i) => (
                      <p key={i} className='mb-4'>
                        {stepSubtextItem}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </>
            );
          })}
          {steps[currentStepIndex].stepCta}
        </div>
        <div className='text-white'> {/* Synthesis logo here */} </div>
      </div>

      <div className='w-3/4 h-full flex flex-col bg-white m-3 rounded-lg justify-center items-start p-3'>
        <div className='w-full flex flex-col items-center bg-white'>
          <div>
            <Image src={fractionsWithHammerImage} alt='Fractions with hammer logo' />
          </div>
        </div>
      </div>
    </div>
  );
};

interface OptionButtonsProps {
  options: string[];
  setOptionChoice: React.Dispatch<React.SetStateAction<number>>;
  currentStepIndex: number;
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>;
}

const OptionButtons = ({
  options,
  setOptionChoice,
  currentStepIndex,
  setCurrentStepIndex,
}: OptionButtonsProps): JSX.Element => {
  const buttonClickHandler = (ind: number): void => {
    setOptionChoice(ind);
    setCurrentStepIndex(currentStepIndex + 1);
  };
  return (
    <>
      <div className='flex flex-col gap-y-3'>
        {options.map((option, ind) => (
          <button className='rounded-2xl border border-strong-blue bg-strong-blue bg-opacity-30 text-white text-lg p-3 pr-10 w-fit max-w-[80%]' key={ind} onClick={() => buttonClickHandler(ind)}>
            {option}
          </button>
        ))}
      </div>
    </>
  );
};
