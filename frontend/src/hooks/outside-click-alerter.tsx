import React, { useEffect } from 'react';

export function useOutsideClickAlerter(ref:  React.MutableRefObject<any>, onClose: () => void) {
    useEffect(() => {
      //make the component desappear when clicking outside of it

      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
            onClose();
            // here need to make my react component desappear
            // but I don't know how to do it
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }