import { motion } from 'framer-motion';
import { RocketLaunchIcon } from '@heroicons/react/20/solid';

interface FractionsWidgetProps {
  className?: string;
}

const FractionsWidget = ({ className }: FractionsWidgetProps) => {
  return (
    <div className={`${className} flex h-screen`}>
      <div className="w-1/4 bg-black flex flex-col justify-between p-4">
        <button className="text-white uppercase text-sm py-2 px-4 border border-white rounded hover:bg-white hover:text-slate-black transition duration-300">
          <RocketLaunchIcon color='white' />
          Sign Up Now
        </button>
        <div className="text-white"> {/* Synthesis logo here */} </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 flex flex-col justify-center items-start p-8">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white"
        >
          <p className="mb-4">
            Ah, there you are again! Looks like we had a bit of a hiccup with
            our connection.
          </p>
          <p className="mb-8">
            No worries at all! Let&apos;s jump right back to the last lesson
            section we were exploring.
          </p>
          {/* Arrow button here */}
          <button className="...">{/* Icon or text for the button */}</button>
        </motion.div>
      </div>
    </div>
  );
};

export default FractionsWidget;
