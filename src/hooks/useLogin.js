import { Routes } from '../routes/Routes';

const useLogin = (auth) => {
  return auth ? Routes(auth) : Routes(false);
}; 

export default useLogin;