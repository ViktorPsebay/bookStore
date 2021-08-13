import React, { useState }  from 'react';

interface CardProps {
  width?: string,
  height?: string,
  children?: React.ReactChild | React.ReactNode,
  onClick: (num: number) => void,
}

export const Card = ({width, height, children, onClick}: CardProps): JSX.Element => {
  const [count, setCount] = useState(0);
  return (
    <div style={{width, height, background: 'gray'}}
      onClick={() => {onClick(count); setCount(count+1);}}
    >
      {children}
    </div>
  );
};
