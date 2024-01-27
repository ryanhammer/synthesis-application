import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Line {
  x: number;
  y: number;
  key: number;
  type: 'horizontal' | 'vertical';
}

export const InteractiveSquare = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [nextLineType, setNextLineType] = useState<'horizontal' | 'vertical'>('horizontal');

  const addLine = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newLine = { x, y, key: Date.now(), type: nextLineType };
    setLines([...lines, newLine]);

    setNextLineType(nextLineType === 'horizontal' ? 'vertical' : 'horizontal');
  };

  return (
    <div className='relative w-full h-full'>
      <motion.div className='w-full h-full bg-strong-blue' onClick={addLine} style={{ position: 'relative' }}>
        {lines.map((line) => (
          <React.Fragment key={line.key}>
            {line.type === 'horizontal' && (
              <motion.div
                style={{
                  position: 'absolute',
                  top: `${line.y}px`,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'white',
                }}
              />
            )}
            {line.type === 'vertical' && (
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: `${line.x}px`,
                  width: '2px',
                  height: '100%',
                  backgroundColor: 'white',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
