import React, { useEffect, useState } from 'react';
const AnimatedComponent = ({
  as: Component = 'div',
  children,
  animationClass = 'in',
  className = '',
  ...props
}) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const getData = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(getData);
  }, []);

  return (
    <Component
      className={`animate-fade ${className} ${isAnimated ? animationClass : ''}`}
      {...props}
    >
      {children}
    </Component>
  );
};
export default AnimatedComponent;