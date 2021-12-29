import { useEffect, useRef, useState } from 'react';

const useClickOutside = (initialState: boolean) => {
  const [clickedOutside, setClickedOutside] = useState(initialState);
  const ref = useRef<any>(null);

  const clickOutsideHandler = (event: MouseEvent) => {
    if (!ref.current) return;

    if (!ref.current.contains(event.target)) {
      setClickedOutside(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler);

    return () => document.removeEventListener('click', clickOutsideHandler);
  });

  return { ref, clickedOutside, setClickedOutside };
};

export default useClickOutside;
