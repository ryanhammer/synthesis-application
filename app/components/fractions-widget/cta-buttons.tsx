import { FormEvent, useState } from 'react';
import { ArrowDownIcon, ArrowPathIcon, ArrowRightIcon } from '@heroicons/react/20/solid';

interface ContinueButtonProps {
  currentStepIndex: number;
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>;
  setOptionChoice: React.Dispatch<React.SetStateAction<number>>;
}

export const ContinueButton = ({
  currentStepIndex,
  setCurrentStepIndex,
  setOptionChoice,
}: ContinueButtonProps): JSX.Element => {
  const buttonClickHandler = (): void => {
    if (currentStepIndex === 6) setOptionChoice(0);

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

export const NumericInputForm = ({ currentStepIndex, setCurrentStepIndex, setOptionChoice }: NumericInputFormProps) => {
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

export const OptionButtons = ({
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

interface ResetButtonProps {
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>;
  setLineCount: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPartIndex: React.Dispatch<React.SetStateAction<number>>;
  setShouldDisplaySquare: React.Dispatch<React.SetStateAction<boolean>>;
  fullLessonReset: boolean;
}

export const ResetButton = ({
  setCurrentStepIndex,
  setLineCount,
  setCurrentPartIndex,
  setShouldDisplaySquare,
  fullLessonReset,
}: ResetButtonProps): JSX.Element => {
  const buttonClickHandler = (): void => {
    setLineCount(0);
    setCurrentStepIndex(fullLessonReset ? 0 : 7);

    if (fullLessonReset) {
      setShouldDisplaySquare(false);
      setCurrentPartIndex(0);
    }
  };

  return (
    <div className='flex items-end'>
      <button className='flex gap-2 rounded-2xl bg-strong-blue text-white p-3' onClick={() => buttonClickHandler()}>
        <ArrowPathIcon className='w-5 h-5' />
        {fullLessonReset ? 'Reset Lesson' : 'Clear Square'}
      </button>
    </div>
  );
};
