'use client';

import { FormEvent, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RocketLaunchIcon, Cog6ToothIcon, ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import fractionsWithHammerImage from '../../../public/fractions_hammer.png';
import { stepsText, StepText } from './lesson-steps';
import { InteractiveSquare } from './interactive-square';

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
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [shouldDisplaySquare, setShouldDisplaySquare] = useState(false);

  console.log(currentStepIndex, currentPartIndex);

  const steps: Step[] = useMemo(
    () => [
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
        ),
      },
      {
        stepPath: [stepsText.stepThreePathOneText, stepsText.stepThreePathTwoText],
        stepCta: <ContinueButton currentStepIndex={currentStepIndex} setCurrentStepIndex={setCurrentStepIndex} />,
      },
      {
        stepPath: [stepsText.stepFourPathOneText, stepsText.stepFourPathTwoText],
        stepCta: (
          <NumericInputForm
            setOptionChoice={setOptionChoice}
            currentStepIndex={currentStepIndex}
            setCurrentStepIndex={setCurrentStepIndex}
          />
        ),
      },
      {
        stepPath: [stepsText.stepFivePathOneText],
        stepCta: <ContinueButton currentStepIndex={currentStepIndex} setCurrentStepIndex={setCurrentStepIndex} />,
      },
      {
        stepPath: [stepsText.stepSixPathOneText],
        stepCta: <ContinueButton currentStepIndex={currentStepIndex} setCurrentStepIndex={setCurrentStepIndex} />,
      },
      {
        stepPath: [stepsText.stepSevenPathOneText, stepsText.stepSevenPathTwoText],
        stepCta: <ContinueButton currentStepIndex={currentStepIndex} setCurrentStepIndex={setCurrentStepIndex} />,
      },
      {
        stepPath: [stepsText.stepEightText],
        stepCta: <div className='hidden'>Space</div>,
      },
      {
        stepPath: [stepsText.stepNineText],
        stepCta: <div className='hidden'>Space</div>,
      },
      {
        stepPath: [stepsText.step10Text],
        stepCta: <div className='hidden'>Space</div>,
      },
      {
        stepPath: [stepsText.stepElevenText],
        stepCta: <div className='hidden'>Space</div>,
      },
    ],
    [currentStepIndex]
  );

  useEffect(() => {
    setCurrentPartIndex(0);
  }, [currentStepIndex]);

  useEffect(() => {
    if (currentStepIndex === 3 && currentPartIndex === steps[3].stepPath[optionChoice].length - 1) {
      setShouldDisplaySquare(true);
    }

    if (currentPartIndex < steps[currentStepIndex].stepPath[optionChoice].length - 1) {
      const timeoutId = setTimeout(() => {
        setCurrentPartIndex((prevIndex) => prevIndex + 1);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [currentPartIndex, steps, currentStepIndex, optionChoice]);

  return (
    <div className={`${className} flex h-screen w-full`}>
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
          {steps[currentStepIndex].stepPath[optionChoice].map((stepText, i) => {
            return (
              <>
                {currentPartIndex === i && (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 10 }}
                    transition={{ duration: 0.75 }}
                    className='text-white text-left'
                    exit={{ x: -300, opacity: 0 }}
                  >
                    <div className='mb-8'>
                      {stepText.map((stepSubtextItem, i) => (
                        <p key={i} className='mb-4'>
                          {stepSubtextItem}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            );
          })}
          {steps[currentStepIndex].stepPath[optionChoice].length - 1 === currentPartIndex && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75 }}>
              {steps[currentStepIndex].stepCta}
            </motion.div>
          )}
        </div>
        <div className='text-white'> {/* Synthesis logo here */} </div>
      </div>

      <div className='w-3/4  flex flex-col bg-white m-3 rounded-lg justify-center items-start p-3'>
        <div className={`w-full ${shouldDisplaySquare ? 'h-full' : ''} flex flex-col items-center bg-white`}>
          {shouldDisplaySquare ? (
            <InteractiveSquare />
          ) : (
            <div>
              <Image src={fractionsWithHammerImage} alt='Fractions with hammer logo' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ContinueButtonProps {
  currentStepIndex: number;
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ContinueButton = ({ currentStepIndex, setCurrentStepIndex }: ContinueButtonProps): JSX.Element => {
  const buttonClickHandler = (): void => {
    setCurrentStepIndex(currentStepIndex + 1);
  };

  return (
    <div className='flex items-end'>
      <button className='rounded-2xl bg-strong-blue text-white p-3' onClick={() => buttonClickHandler()}>
        <ArrowDownIcon className='w-5 h-5' />
      </button>
    </div>
  );
};

interface NumericInputFormProps extends ContinueButtonProps {
  setOptionChoice: React.Dispatch<React.SetStateAction<number>>;
}

const NumericInputForm = ({ currentStepIndex, setCurrentStepIndex, setOptionChoice }: NumericInputFormProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const numericValue = parseInt(inputValue, 10);
    if (numericValue === 1) {
      setOptionChoice(1);
      setCurrentStepIndex(6);
    } else {
      setOptionChoice(0);
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex w-full justify-between text-white'>
      <input
        id='numericInput'
        type='number'
        value={inputValue}
        placeholder='Enter a number...'
        onChange={(e) => setInputValue(e.target.value)}
        required
        className='hideNumberInputArrows rounded-lg border border-strong-blue bg-strong-blue bg-opacity-30 pl-3 py-2'
      />
      <button type='submit' className='rounded-2xl bg-strong-blue text-white p-3'>
        <ArrowRightIcon className='w-5 h-5' />
      </button>
    </form>
  );
};

interface OptionButtonsProps extends NumericInputFormProps {
  options: string[];
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
          <button
            className='rounded-2xl border border-strong-blue bg-strong-blue bg-opacity-30 text-white text-lg p-3 pr-10 w-fit max-w-[80%]'
            key={ind}
            onClick={() => buttonClickHandler(ind)}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
};
