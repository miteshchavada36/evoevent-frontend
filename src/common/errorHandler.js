// errorHandler.js
// import { showUpdatedToasterMessage } from './yourToasterMessageModule';

import { Slide, toast } from 'react-toastify';
export const handleApiError = (error, setError = false) => {
  const toastId = 'toast-api-error';
  if (typeof error?.message === 'string') {
    toast.error(error.message, { toastId, transition: Slide });
  } else if (typeof error?.message === 'object') {
    const keys = Object.keys(error.message);
    if (keys.length > 0) {
      if (setError) {
        setError(keys[0], {
          type: 'custom',
          message: error.message[keys[0]].message,
        });
      } else {
        toast.error(error.message[keys[0]].message, {
          toastId,
          transition: Slide,
        });
      }
    }
  } else {
    console.error(error);
  }
};
